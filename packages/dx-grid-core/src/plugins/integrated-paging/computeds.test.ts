import {
  paginatedRows,
  rowsWithPageHeaders,
  currentPage,
} from './computeds';

describe('IntegratedPaging computeds', () => {
  describe('#paginatedRows', () => {
    it('should work', () => {
      const rows = [1, 2, 3];

      let page = paginatedRows(rows, 2, 0);
      expect(page).toEqual([1, 2]);

      page = paginatedRows(rows, 2, 1);
      expect(page).toEqual([3]);

      page = paginatedRows(rows, 2, 3);
      expect(page).toEqual([]);

      page = paginatedRows(rows, 0, 1);
      expect(page).toEqual(rows);
    });
  });

  describe('#rowsWithPageHeaders', () => {
    const getRowLevelKey = row => row.levelKey;

    it('should work with single headers', () => {
      const rows = [
        { a: 1, levelKey: 'a' },
        { a: 2 },
        { a: 3 },
      ];

      const computedRows = rowsWithPageHeaders(rows, 5, getRowLevelKey);
      expect(computedRows).toHaveLength(3);
      expect(computedRows[0]).toBe(rows[0]);
      expect(computedRows[1]).toBe(rows[1]);
      expect(computedRows[2]).toBe(rows[2]);
    });

    it('should work with singe header on several pages', () => {
      const rows = [
        { a: 1, levelKey: 'a' },
        { a: 2 },
        { a: 3 },
        { a: 4 },
      ];

      const computedRows = rowsWithPageHeaders(rows, 3, getRowLevelKey);
      expect(computedRows).toHaveLength(5);
      expect(computedRows[0]).toBe(rows[0]);
      expect(computedRows[1]).toBe(rows[1]);
      expect(computedRows[2]).toBe(rows[2]);
      expect(computedRows[3]).toBe(rows[0]);
      expect(computedRows[4]).toBe(rows[3]);
    });

    it('should work with multiple repeated headers', () => {
      const rows = [
        { a: 1, levelKey: 'a' },
        { a: 2, levelKey: 'a' },
        { a: 3 },
        { a: 4 },
      ];

      const computedRows = rowsWithPageHeaders(rows, 5, getRowLevelKey);
      expect(computedRows).toHaveLength(4);
      expect(computedRows[0]).toBe(rows[0]);
      expect(computedRows[1]).toBe(rows[1]);
      expect(computedRows[2]).toBe(rows[2]);
      expect(computedRows[3]).toBe(rows[3]);
    });

    it('should work with multiple headers', () => {
      const rows = [
        { a: 1, levelKey: 'a' },
        { a: 2 },
        { a: 3 },
        { a: 4, levelKey: 'a' },
        { a: 5 },
      ];

      const computedRows = rowsWithPageHeaders(rows, 3, getRowLevelKey);
      expect(computedRows).toHaveLength(5);
      expect(computedRows[0]).toBe(rows[0]);
      expect(computedRows[1]).toBe(rows[1]);
      expect(computedRows[2]).toBe(rows[2]);
      expect(computedRows[3]).toBe(rows[3]);
      expect(computedRows[4]).toBe(rows[4]);
    });

    it('should work with multiple headers ended by header', () => {
      const rows = [
        { a: 1, levelKey: 'a' },
        { a: 2 },
        { a: 3 },
        { a: 4, levelKey: 'a' },
      ];

      const computedRows = rowsWithPageHeaders(rows, 3, getRowLevelKey);
      expect(computedRows).toHaveLength(4);
      expect(computedRows[0]).toBe(rows[0]);
      expect(computedRows[1]).toBe(rows[1]);
      expect(computedRows[2]).toBe(rows[2]);
      expect(computedRows[3]).toBe(rows[3]);
    });

    it('should work with nested headers', () => {
      const rows = [
        { a: 1, levelKey: 'a' },
        { a: 2, levelKey: 'b' },
        { a: 3 },
        { a: 4, levelKey: 'b' },
        { a: 5 },
      ];

      const computedRows = rowsWithPageHeaders(rows, 3, getRowLevelKey);
      expect(computedRows).toHaveLength(6);
      expect(computedRows[0]).toBe(rows[0]);
      expect(computedRows[1]).toBe(rows[1]);
      expect(computedRows[2]).toBe(rows[2]);
      expect(computedRows[3]).toBe(rows[0]);
      expect(computedRows[4]).toBe(rows[3]);
      expect(computedRows[5]).toBe(rows[4]);
    });

    it('should work with nested headers and different depth', () => {
      const rows = [
        { a: 1, levelKey: 'a' },
        { a: 2, levelKey: 'b' },
        { a: 3 },
        { a: 4, levelKey: 'a' },
        { a: 5 },
      ];

      const computedRows = rowsWithPageHeaders(rows, 3, getRowLevelKey);
      expect(computedRows).toHaveLength(5);
      expect(computedRows[0]).toBe(rows[0]);
      expect(computedRows[1]).toBe(rows[1]);
      expect(computedRows[2]).toBe(rows[2]);
      expect(computedRows[3]).toBe(rows[3]);
      expect(computedRows[4]).toBe(rows[4]);
    });

    it('should work if pageSize is 0', () => {
      const rows = [
        { a: 1, levelKey: 'a' },
        { a: 2 },
        { a: 3 },
        { a: 4 },
      ];

      const computedRows = rowsWithPageHeaders(rows, 0, getRowLevelKey);
      expect(computedRows).toHaveLength(4);
      expect(computedRows[0]).toBe(rows[0]);
      expect(computedRows[1]).toBe(rows[1]);
      expect(computedRows[2]).toBe(rows[2]);
      expect(computedRows[3]).toBe(rows[3]);
    });

    it('should throw human readable error if page size is less that header count', () => {
      const rows = [
        { a: 1, levelKey: 'a' },
        { a: 2, levelKey: 'b' },
        { a: 3, levelKey: 'c' },
        { a: 4 },
      ];

      expect(() => {
        rowsWithPageHeaders(rows, 3, getRowLevelKey);
      }).toThrowError(/page size/);
    });

    it('should return original rows if getRowLevelKey getter is not defined', () => {
      const rows = [
        { a: 1, levelKey: 'a' },
        { a: 2, levelKey: 'b' },
        { a: 3, levelKey: 'c' },
        { a: 4 },
      ];

      expect(rowsWithPageHeaders(rows, 3))
        .toBe(rows);
    });
  });

  describe('#currentPage', () => {
    it('should change the "currentPage" if starting row index exceeds the rows count', () => {
      const page = 4;
      const totalCount = 6;
      const pageSize = 2;
      const setCurrentPage = () => {};

      expect(currentPage(
        page,
        totalCount,
        pageSize,
        setCurrentPage,
      )).toEqual(2);
    });
  });
});
