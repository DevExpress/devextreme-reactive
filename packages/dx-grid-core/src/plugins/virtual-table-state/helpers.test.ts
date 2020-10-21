import {
  mergeRows, calculateRequestedRange, rowToPageIndex,
  recalculateBounds, trimRowsToInterval,
  getForceReloadInterval, getAvailableRowCount,
  needFetchMorePages, shouldSendRequest, getRequestMeta,
} from './helpers';
import { intervalUtil } from './utils';
import { createInterval, generateRows, createVirtualRows } from './test-utils';

describe('VirtualTableState helpers', () => {
  describe('#mergeRows', () => {
    describe('nonoverlapping', () => {
      it('should merge rows when cache is before rows', () => {
        const cacheInterval = createInterval(10, 14);
        const rowsInterval = createInterval(14, 18);
        const cache = generateRows(cacheInterval, 'cache');
        const rows = generateRows(rowsInterval, 'rows');

        expect(mergeRows(rowsInterval, cacheInterval, rows, cache, 14, 10)).toEqual({
          skip: 10,
          rows: [
            ...cache, ...rows,
          ],
        });
      });

      it('should merge rows when rows are before cache', () => {
        const cacheInterval = createInterval(14, 18);
        const rowsInterval = createInterval(10, 14);
        const cache = generateRows(cacheInterval, 'cache');
        const rows = generateRows(rowsInterval, 'rows');

        expect(mergeRows(rowsInterval, cacheInterval, rows, cache, 10, 14)).toEqual({
          skip: 10,
          rows: [
            ...rows, ...cache,
          ],
        });
      });
    });

    describe('overlapping', () => {
      it('should merge rows when cache is before rows', () => {
        const cacheInterval = createInterval(10, 20);
        const rowsInterval = createInterval(15, 25);
        const cache = generateRows(cacheInterval, 'cache');
        const rows = generateRows(rowsInterval, 'rows');

        expect(mergeRows(rowsInterval, cacheInterval, rows, cache, 15, 10)).toEqual({
          skip: 10,
          rows: [
            ...cache.slice(0, 5), ...rows,
          ],
        });
      });

      it('should merge rows when rows are before cache', () => {
        const cacheInterval = createInterval(15, 25);
        const rowsInterval = createInterval(10, 20);
        const cache = generateRows(cacheInterval, 'cache');
        const rows = generateRows(rowsInterval, 'rows');

        expect(mergeRows(rowsInterval, cacheInterval, rows, cache, 10, 15)).toEqual({
          skip: 10,
          rows: [
            ...rows, ...cache.slice(5),
          ],
        });
      });

      it('should merge rows when cache contains rows', () => {
        const cacheInterval = createInterval(10, 30);
        const rowsInterval = createInterval(15, 25);
        const cache = generateRows(cacheInterval, 'cache');
        const rows = generateRows(rowsInterval, 'rows');

        expect(mergeRows(rowsInterval, cacheInterval, rows, cache, 15, 10)).toEqual({
          skip: 10,
          rows: [
            ...cache.slice(0, 5), ...rows, ...cache.slice(15),
          ],
        });
      });

      it('should merge rows when rows contain cache', () => {
        const cacheInterval = createInterval(15, 25);
        const rowsInterval = createInterval(10, 30);
        const cache = generateRows(cacheInterval, 'cache');
        const rows = generateRows(rowsInterval, 'rows');

        expect(mergeRows(rowsInterval, cacheInterval, rows, cache, 10, 15)).toEqual({
          skip: 10,
          rows,
        });
      });
    });

    describe('empty interval', () => {
      it('should merge rows when cache is empty', () => {
        const cacheInterval = intervalUtil.empty;
        const rowsInterval = createInterval(10, 20);
        const cache = generateRows(cacheInterval, 'cache');
        const rows = generateRows(rowsInterval, 'rows');

        expect(mergeRows(rowsInterval, cacheInterval, rows, cache, 10, 15)).toEqual({
          skip: 10,
          rows,
        });
      });

      it('should merge rows when rows are empty', () => {
        const cacheInterval = createInterval(10, 20);
        const rowsInterval = intervalUtil.empty;
        const cache = generateRows(cacheInterval, 'cache');
        const rows = generateRows(rowsInterval, 'rows');

        expect(mergeRows(rowsInterval, cacheInterval, rows, cache, 15, 10)).toEqual({
          skip: 10,
          rows: cache,
        });
      });

      it('should merge rows when both rows and cache are empty', () => {
        const cacheInterval = intervalUtil.empty;
        const rowsInterval = intervalUtil.empty;
        const cache = generateRows(cacheInterval, 'cache');
        const rows = generateRows(rowsInterval, 'rows');

        expect(mergeRows(rowsInterval, cacheInterval, rows, cache, 15, 10)).toEqual({
          skip: undefined,
          rows: [],
        });
      });
    });

    describe('partial merge', () => {
      it('should merge rows according to intervals', () => {
        const fullCacheInterval = createInterval(0, 30);
        const fullRowsInterval = createInterval(20, 50);
        const cache = generateRows(fullCacheInterval, 'cache');
        const rows = generateRows(fullRowsInterval, 'rows');
        const visibleCacheInterval = createInterval(10, 30);
        const visibleRowsInterval = createInterval(20, 40);

        expect(mergeRows(visibleRowsInterval, visibleCacheInterval, rows, cache, 20, 0)).toEqual({
          skip: 10,
          rows: [
            ...cache.slice(10, 20), ...rows.slice(0, 20),
          ],
        });
      });
    });
  });

  describe('#calculateRequestedRange', () => {
    const pageSize = 100;

    describe('simple cases', () => {
      it('should caclulate requested range for next page', () => {
        const loadedInterval = createInterval(100, 400);
        const newInterval = createInterval(200, 500);
        const virtualRows = createVirtualRows(loadedInterval);

        expect(calculateRequestedRange(virtualRows, newInterval, pageSize))
          .toEqual({ start: 400, end: 500 });
      });

      it('should caclulate requested range for previous page', () => {
        const loadedInterval = createInterval(200, 500);
        const newInterval = createInterval(100, 400);
        const virtualRows = createVirtualRows(loadedInterval);

        expect(calculateRequestedRange(virtualRows, newInterval, pageSize))
          .toEqual({ start: 100, end: 200 });
      });

      it('should caclulate requested range for next 2 pages', () => {
        const loadedInterval = createInterval(100, 400);
        const newInterval = createInterval(400, 700);
        const virtualRows = createVirtualRows(loadedInterval);

        expect(calculateRequestedRange(virtualRows, newInterval, pageSize))
          .toEqual({ start: 400, end: 700 });
      });

      it('should caclulate requested range for previous 2 pages', () => {
        const loadedInterval = createInterval(300, 600);
        const newInterval = createInterval(100, 400);
        const virtualRows = createVirtualRows(loadedInterval);

        expect(calculateRequestedRange(virtualRows, newInterval, pageSize))
          .toEqual({ start: 100, end: 400 });
      });
    });

    describe('edge cases', () => {
      it('should correctly process start of page', () => {
        const loadedInterval = createInterval(0, 200);
        const newInterval = createInterval(200, 500);
        const virtualRows = createVirtualRows(loadedInterval);

        expect(calculateRequestedRange(virtualRows, newInterval, pageSize))
          .toEqual({ start: 200, end: 500 });
      });

      it('should correctly process end of page', () => {
        const loadedInterval = createInterval(0, 200);
        const newInterval = createInterval(200, 500);
        const virtualRows = createVirtualRows(loadedInterval);

        expect(calculateRequestedRange(virtualRows, newInterval, pageSize))
          .toEqual({ start: 200, end: 500 });
      });

      it('should correctly process the last page', () => {
        const loadedInterval = createInterval(0, 200);
        const newInterval = createInterval(1000, 1200);
        const virtualRows = createVirtualRows(loadedInterval);

        expect(calculateRequestedRange(virtualRows, newInterval, pageSize))
          .toEqual({ start: 1000, end: 1200 });
      });
    });

    describe('fast scroll', () => {
      const loadedInterval = createInterval(200, 500);
      const newInterval = createInterval(1000, 1300);
      const virtualRows = createVirtualRows(loadedInterval);

      it('should return prev, current and next pages', () => {
        expect(calculateRequestedRange(virtualRows, newInterval, pageSize))
          .toEqual({ start: 1000, end: 1300 });
      });
    });

    describe('reference index', () => {
      // tslint:disable-next-line: max-line-length
      it('should caclulate correct if reference index more than the start of a calculated interval and less than half of page', () => {
        const loadedInterval = createInterval(100, 400);
        const newInterval = createInterval(200, 500);
        const virtualRows = createVirtualRows(loadedInterval);
        const referenceIndex = 440;

        expect(calculateRequestedRange(virtualRows, newInterval, pageSize, referenceIndex))
          .toEqual({ start: 400, end: 500 });
      });

      // tslint:disable-next-line: max-line-length
      it('should caclulate correct if reference index less than the start of a calculated interval', () => {
        const loadedInterval = createInterval(100, 400);
        const newInterval = createInterval(200, 500);
        const virtualRows = createVirtualRows(loadedInterval);
        const referenceIndex = 360;

        expect(calculateRequestedRange(virtualRows, newInterval, pageSize, referenceIndex))
          .toEqual({ start: 400, end: 500 });
      });

      // tslint:disable-next-line: max-line-length
      describe('reference index less than the start of a calculated interval and less than half of page', () => {
        const loadedInterval = createInterval(100, 400);
        const newInterval = createInterval(200, 500);
        const virtualRows = createVirtualRows(loadedInterval);
        const referenceIndex = 320;

        it('should caclulate correct if infinite scrolling', () => {
          expect(calculateRequestedRange(virtualRows, newInterval, pageSize, referenceIndex, true))
          .toEqual({ start: 300, end: 400 });
        });

        it('should caclulate correct if non-infinite scrolling', () => {
          expect(calculateRequestedRange(virtualRows, newInterval, pageSize, referenceIndex, false))
          .toEqual({ start: 400, end: 500 });
        });

        // T937684
        it('should calculate correctly if infinite scrolling is enabled and the end of the calculated interval is not divisible by the page size', () => {
          expect(calculateRequestedRange(
            createVirtualRows(createInterval(0, 100)),
            createInterval(0, 137),
            50,
            51,
            true))
          .toEqual({ start: 50, end: 100 });
        });
      });
    });

    // tslint:disable-next-line: max-line-length
    it('should caclulate correct in non-infinite scrolling', () => {
      const loadedInterval = createInterval(100, 400);
      const newInterval = createInterval(200, 500);
      const virtualRows = createVirtualRows(loadedInterval);
      const referenceIndex = 320;

      expect(calculateRequestedRange(virtualRows, newInterval, pageSize, referenceIndex))
        .toEqual({ start: 400, end: 500 });
    });
  });

  describe('#rowToPageIndex', () => {
    it('should return virtual page index', () => {
      expect(rowToPageIndex(0, 100)).toBe(0);
      expect(rowToPageIndex(50, 100)).toBe(0);
      expect(rowToPageIndex(99, 100)).toBe(0);
      expect(rowToPageIndex(100, 100)).toBe(1);
    });
  });

  describe('#calculateBounds', () => {
    it('should return boundaries from previous page start to next page end', () => {
      expect(recalculateBounds(350, 100, 1000)).toEqual({
        start: 200,
        end: 500,
      });
    });

    it('should correctly process start index of page', () => {
      expect(recalculateBounds(300, 100, 1000)).toEqual({
        start: 200,
        end: 500,
      });
    });

    it('should correctly process end index of page', () => {
      expect(recalculateBounds(299, 100, 1000)).toEqual({
        start: 100,
        end: 400,
      });
    });

    it('should be bounded below by 0', () => {
      expect(recalculateBounds(30, 100, 1000)).toEqual({
        start: 0,
        end: 200,
      });
    });

    it('should be bounded above by total rows count', () => {
      expect(recalculateBounds(950, 100, 1000)).toEqual({
        start: 800,
        end: 1000,
      });
    });
  });

  describe('#trimRowsToInterval', () => {
    it('should trim right side', () => {
      const rowsInterval = createInterval(10, 20);
      const targetInterval = createInterval(5, 15);
      const virtualRows = createVirtualRows(rowsInterval);

      expect(trimRowsToInterval(virtualRows, targetInterval)).toEqual({
        skip: 10,
        rows: [
          ...virtualRows.rows.slice(0, 5),
        ],
      });
    });

    it('should trim left side', () => {
      const rowsInterval = createInterval(10, 20);
      const targetInterval = createInterval(15, 25);
      const virtualRows = createVirtualRows(rowsInterval);

      expect(trimRowsToInterval(virtualRows, targetInterval)).toEqual({
        skip: 15,
        rows: [
          ...virtualRows.rows.slice(5, 10),
        ],
      });
    });

    it('should trim both sides', () => {
      const rowsInterval = createInterval(10, 30);
      const targetInterval = createInterval(15, 25);
      const virtualRows = createVirtualRows(rowsInterval);

      expect(trimRowsToInterval(virtualRows, targetInterval)).toEqual({
        skip: 15,
        rows: [
          ...virtualRows.rows.slice(5, 15),
        ],
      });
    });

    it('should return empty if target interval does not contain rows', () => {
      const rowsInterval = createInterval(10, 20);
      const targetInterval = createInterval(25, 35);
      const virtualRows = createVirtualRows(rowsInterval);

      expect(trimRowsToInterval(virtualRows, targetInterval)).toEqual({
        skip: Number.POSITIVE_INFINITY,
        rows: [],
      });
    });
  });

  describe('#getAvailableRowCount', () => {
    const totalRowCount = 1000;

    it('should return totalCount when not infinite scrolling', () => {
      const isInfniniteScroll = false;
      const newRowCount = 200;
      const lastRowCount = 100;

      expect(getAvailableRowCount(
        isInfniniteScroll,
        newRowCount,
        lastRowCount,
        totalRowCount,
      )).toEqual(totalRowCount);
    });

    describe('infinite scrolling mode', () => {
      const isInfniniteScroll = true;
      const newRowCount = 200;

      it('should return newRowCount if it more than lastRowCount in infinite scrolling', () => {
        const lastRowCount = 100;

        expect(getAvailableRowCount(
          isInfniniteScroll,
          newRowCount,
          lastRowCount,
          totalRowCount,
        )).toEqual(newRowCount);
      });

      it('should return lastRowCount if it more than newRowCount in infinite scrolling', () => {
        const lastRowCount = 300;

        expect(getAvailableRowCount(
          isInfniniteScroll,
          newRowCount,
          lastRowCount,
          totalRowCount,
        )).toEqual(lastRowCount);
      });

    });
  });

  describe('#getForceReloadInterval', () => {
    it('should return 2 pages if loaded interval is less than 2 pages', () => {
      const virtualRows = createVirtualRows(createInterval(100, 200));
      expect(getForceReloadInterval(virtualRows, 100, 1000)).toEqual({
        start: 100,
        end: 300,
      });
    });

    it('should return loaded interval if it is more than 2 pages', () => {
      const virtualRows = createVirtualRows(createInterval(100, 400));
      expect(getForceReloadInterval(virtualRows, 100, 1000)).toEqual({
        start: 100,
        end: 400,
      });
    });

    it('should return 2 pages if current total count is 0', () => {
      const virtualRows = createVirtualRows(createInterval(0, 0));
      expect(getForceReloadInterval(virtualRows, 100, 0)).toEqual({
        start: 0,
        end: 200,
      });
    });
  });

  describe('#needFetchMorePages', () => {
    const virtualRows = createVirtualRows(createInterval(100, 400));

    it('should return false when referenceIndex is inside of a middle page', () => {
      expect(needFetchMorePages(virtualRows, 220, 100))
        .toBeFalsy();
    });

    it('should return true when referenceIndex is inside of a top page', () => {
      expect(needFetchMorePages(virtualRows, 150, 100))
        .toBeTruthy();
    });

    it('should return true when referenceIndex is inside of a bottom page', () => {
      expect(needFetchMorePages(virtualRows, 350, 100))
        .toBeTruthy();
    });

    it('should return true when referenceIndex is outside of a loaded range', () => {
      expect(needFetchMorePages(virtualRows, 500, 100))
        .toBeTruthy();
    });
  });

  describe('#shouldSendRequest', () => {
    it('should return false if page is already requested', () => {
      expect(shouldSendRequest({ start: 100, end: 200 }, 100))
        .toBeFalsy();
    });

    it('should return true if page is not yet requested', () => {
      expect(shouldSendRequest({ start: 100, end: 200 }, 400))
        .toBeTruthy();
    });

    it('should return false if requested range is empty', () => {
      expect(shouldSendRequest({ start: 100, end: 100 }, 400))
        .toBeFalsy();
    });
  });

  describe('#getRequestMeta', () => {
    const virtualRows = createVirtualRows(createInterval(200, 500));

    it('should work', () => {
      expect(getRequestMeta(470, virtualRows, 100, 1000, false))
        .toEqual({
          actualBounds: { start: 300, end: 600 },
          requestedRange: { start: 500, end: 600 },
        });
    });

    it('should work with force reload', () => {
      expect(getRequestMeta(370, virtualRows, 100, 1000, true))
      .toEqual({
        actualBounds: { start: 200, end: 500 },
        requestedRange: { start: 200, end: 500 },
      });
    });
  });
});
