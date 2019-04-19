import {
  mergeRows, calculateRequestedRange, rowToPageIndex,
  recalculateBounds, trimRowsToInterval,
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
          start: 10,
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
          start: 10,
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
          start: 10,
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
          start: 10,
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
          start: 10,
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
          start: 10,
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
          start: 10,
          rows,
        });
      });

      it('should merge rows when rows are empty', () => {
        const cacheInterval = createInterval(10, 20);
        const rowsInterval = intervalUtil.empty;
        const cache = generateRows(cacheInterval, 'cache');
        const rows = generateRows(rowsInterval, 'rows');

        expect(mergeRows(rowsInterval, cacheInterval, rows, cache, 15, 10)).toEqual({
          start: 10,
          rows: cache,
        });
      });

      it('should merge rows when both rows and cache are empty', () => {
        const cacheInterval = intervalUtil.empty;
        const rowsInterval = intervalUtil.empty;
        const cache = generateRows(cacheInterval, 'cache');
        const rows = generateRows(rowsInterval, 'rows');

        expect(mergeRows(rowsInterval, cacheInterval, rows, cache, 15, 10)).toEqual({
          start: undefined,
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
          start: 10,
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

        expect(calculateRequestedRange(loadedInterval, newInterval, 310, pageSize))
          .toEqual({ start: 400, end: 500 });
      });

      it('should caclulate requested range for previous page', () => {
        const loadedInterval = createInterval(200, 500);
        const newInterval = createInterval(100, 400);

        expect(calculateRequestedRange(loadedInterval, newInterval, 310, pageSize))
          .toEqual({ start: 100, end: 200 });
      });

      it('should caclulate requested range for next 2 pages', () => {
        const loadedInterval = createInterval(100, 400);
        const newInterval = createInterval(400, 700);

        expect(calculateRequestedRange(loadedInterval, newInterval, 580, pageSize))
          .toEqual({ start: 500, end: 700 });
      });

      it('should caclulate requested range for previous 2 pages', () => {
        const loadedInterval = createInterval(300, 600);
        const newInterval = createInterval(100, 400);

        expect(calculateRequestedRange(loadedInterval, newInterval, 270, pageSize))
          .toEqual({ start: 200, end: 400 });
      });
    });

    describe('edge cases', () => {
      it('should correctly process start of page', () => {
        const loadedInterval = createInterval(0, 200);
        const newInterval = createInterval(200, 500);

        expect(calculateRequestedRange(loadedInterval, newInterval, 300, pageSize))
          .toEqual({ start: 200, end: 400 });
      });

      it('should correctly process end of page', () => {
        const loadedInterval = createInterval(0, 200);
        const newInterval = createInterval(200, 500);

        expect(calculateRequestedRange(loadedInterval, newInterval, 399, pageSize))
          .toEqual({ start: 300, end: 500 });
      });
    });

    describe('fast scroll', () => {
      const loadedInterval = createInterval(200, 500);
      const newInterval = createInterval(1000, 1300);

      it('should return current and next page if page middle index passed', () => {
        expect(calculateRequestedRange(loadedInterval, newInterval, 1170, pageSize))
          .toEqual({ start: 1100, end: 1300 });
      });

      it('should return current and previous page if page middle index is not passed', () => {
        expect(calculateRequestedRange(loadedInterval, newInterval, 1120, pageSize))
          .toEqual({ start: 1000, end: 1200 });
      });
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
        start: 10,
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
        start: 15,
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
        start: 15,
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
        start: Number.POSITIVE_INFINITY,
        rows: [],
      });
    });
  });
});
