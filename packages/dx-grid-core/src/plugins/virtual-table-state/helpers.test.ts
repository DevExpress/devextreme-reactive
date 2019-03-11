import { mergeRows, calculateRequestedRange, rowToPageIndex, recalculateBounds } from './helpers';
import { intervalUtil } from './utils';

describe('VirtualTableState helpers', () => {
  const createInterval = (start, end) => ({ start, end });
  const generateRows = (interval, type) => (
    Array
      .from({ length: interval.end - interval.start })
      .map((_, i) => ({ id: interval.start + i, type }))
  );

  describe('#mergeRows', () => {
    describe('nonoverlapping', () => {
      it('cache before rows', () => {
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

      it('rows before cache', () => {
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
      it('cache before rows', () => {
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

      it('rows before cache', () => {
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

      it('cache contains rows', () => {
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

      it('rows contain cache', () => {
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
      it('empty cache interval', () => {
        const cacheInterval = intervalUtil.empty;
        const rowsInterval = createInterval(10, 20);
        const cache = generateRows(cacheInterval, 'cache');
        const rows = generateRows(rowsInterval, 'rows');

        expect(mergeRows(rowsInterval, cacheInterval, rows, cache, 10, 15)).toEqual({
          start: 10,
          rows,
        });
      });

      it('empty rows interval', () => {
        const cacheInterval = createInterval(10, 20);
        const rowsInterval = intervalUtil.empty;
        const cache = generateRows(cacheInterval, 'cache');
        const rows = generateRows(rowsInterval, 'rows');

        expect(mergeRows(rowsInterval, cacheInterval, rows, cache, 15, 10)).toEqual({
          start: 10,
          rows: cache,
        });
      });

      it('both intervals empty', () => {
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
      it('next page', () => {
        const loadedInterval = createInterval(100, 400);
        const newInterval = createInterval(200, 500);

        expect(calculateRequestedRange(loadedInterval, newInterval, 310, pageSize))
          .toEqual({ start: 400, end: 500 });
      });

      it('previous page', () => {
        const loadedInterval = createInterval(200, 500);
        const newInterval = createInterval(100, 400);

        expect(calculateRequestedRange(loadedInterval, newInterval, 310, pageSize))
          .toEqual({ start: 100, end: 200 });
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

  describe('#recalculateCache', () => {

  });
});
