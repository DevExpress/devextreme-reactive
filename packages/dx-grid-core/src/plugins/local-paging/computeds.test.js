import {
  paginate,
  ensurePageHeaders,
  pageCount,
  rowCount,
} from './computeds';

describe('PagingState computeds', () => {
  describe('#paginate', () => {
    it('should work', () => {
      const gridRows = [1, 2, 3];

      let page = paginate(gridRows, 2, 0);
      expect(page).toEqual([1, 2]);

      page = paginate(gridRows, 2, 1);
      expect(page).toEqual([3]);

      page = paginate(gridRows, 2, 3);
      expect(page).toEqual([]);

      page = paginate(gridRows, 0, 1);
      expect(page).toEqual(gridRows);
    });
  });

  describe('#ensurePageHeaders', () => {
    it('should work with single headers', () => {
      const gridRows = [
        { row: 1, headerKey: 'a' },
        { row: 2 },
        { row: 3 },
      ];

      const computedRows = ensurePageHeaders(gridRows, 5);
      expect(computedRows).toHaveLength(3);
      expect(computedRows[0]).toBe(gridRows[0]);
      expect(computedRows[1]).toBe(gridRows[1]);
      expect(computedRows[2]).toBe(gridRows[2]);
    });

    it('should work with singe header on several pages', () => {
      const gridRows = [
        { row: 1, headerKey: 'a' },
        { row: 2 },
        { row: 3 },
        { row: 4 },
      ];

      const computedRows = ensurePageHeaders(gridRows, 3);
      expect(computedRows).toHaveLength(5);
      expect(computedRows[0]).toBe(gridRows[0]);
      expect(computedRows[1]).toBe(gridRows[1]);
      expect(computedRows[2]).toBe(gridRows[2]);
      expect(computedRows[3]).toBe(gridRows[0]);
      expect(computedRows[4]).toBe(gridRows[3]);
    });

    it('should work with multiple repeated headers', () => {
      const gridRows = [
        { row: 1, headerKey: 'a' },
        { row: 2, headerKey: 'a' },
        { row: 3 },
        { row: 4 },
      ];

      const computedRows = ensurePageHeaders(gridRows, 5);
      expect(computedRows).toHaveLength(4);
      expect(computedRows[0]).toBe(gridRows[0]);
      expect(computedRows[1]).toBe(gridRows[1]);
      expect(computedRows[2]).toBe(gridRows[2]);
      expect(computedRows[3]).toBe(gridRows[3]);
    });

    it('should work with multiple headers', () => {
      const gridRows = [
        { row: 1, headerKey: 'a' },
        { row: 2 },
        { row: 3 },
        { row: 4, headerKey: 'a' },
        { row: 5 },
      ];

      const computedRows = ensurePageHeaders(gridRows, 3);
      expect(computedRows).toHaveLength(5);
      expect(computedRows[0]).toBe(gridRows[0]);
      expect(computedRows[1]).toBe(gridRows[1]);
      expect(computedRows[2]).toBe(gridRows[2]);
      expect(computedRows[3]).toBe(gridRows[3]);
      expect(computedRows[4]).toBe(gridRows[4]);
    });

    it('should work with multiple headers ended by header', () => {
      const gridRows = [
        { row: 1, headerKey: 'a' },
        { row: 2 },
        { row: 3 },
        { row: 4, headerKey: 'a' },
      ];

      const computedRows = ensurePageHeaders(gridRows, 3);
      expect(computedRows).toHaveLength(4);
      expect(computedRows[0]).toBe(gridRows[0]);
      expect(computedRows[1]).toBe(gridRows[1]);
      expect(computedRows[2]).toBe(gridRows[2]);
      expect(computedRows[3]).toBe(gridRows[3]);
    });

    it('should work with nested headers', () => {
      const gridRows = [
        { row: 1, headerKey: 'a' },
        { row: 2, headerKey: 'b' },
        { row: 3 },
        { row: 4, headerKey: 'b' },
        { row: 5 },
      ];

      const computedRows = ensurePageHeaders(gridRows, 3);
      expect(computedRows).toHaveLength(6);
      expect(computedRows[0]).toBe(gridRows[0]);
      expect(computedRows[1]).toBe(gridRows[1]);
      expect(computedRows[2]).toBe(gridRows[2]);
      expect(computedRows[3]).toBe(gridRows[0]);
      expect(computedRows[4]).toBe(gridRows[3]);
      expect(computedRows[5]).toBe(gridRows[4]);
    });

    it('should work with nested headers and different depth', () => {
      const gridRows = [
        { row: 1, headerKey: 'a' },
        { row: 2, headerKey: 'b' },
        { row: 3 },
        { row: 4, headerKey: 'a' },
        { row: 5 },
      ];

      const computedRows = ensurePageHeaders(gridRows, 3);
      expect(computedRows).toHaveLength(5);
      expect(computedRows[0]).toBe(gridRows[0]);
      expect(computedRows[1]).toBe(gridRows[1]);
      expect(computedRows[2]).toBe(gridRows[2]);
      expect(computedRows[3]).toBe(gridRows[3]);
      expect(computedRows[4]).toBe(gridRows[4]);
    });

    it('should work if pageSize is 0', () => {
      const gridRows = [
        { row: 1, headerKey: 'a' },
        { row: 2 },
        { row: 3 },
        { row: 4 },
      ];

      const computedRows = ensurePageHeaders(gridRows, 0);
      expect(computedRows).toHaveLength(4);
      expect(computedRows[0]).toBe(gridRows[0]);
      expect(computedRows[1]).toBe(gridRows[1]);
      expect(computedRows[2]).toBe(gridRows[2]);
      expect(computedRows[3]).toBe(gridRows[3]);
    });

    it('should throw human readable error if page size is less that header count', () => {
      const gridRows = [
        { row: 1, headerKey: 'a' },
        { row: 2, headerKey: 'b' },
        { row: 3, headerKey: 'c' },
        { row: 4 },
      ];

      expect(() => {
        ensurePageHeaders(gridRows, 3);
      }).toThrowError(/page size/);
    });
  });

  describe('#pageCount', () => {
    it('should work', () => {
      let count = pageCount(3, 2);
      expect(count).toEqual(2);

      count = pageCount(3, 0);
      expect(count).toEqual(1);
    });
  });

  describe('#rowCount', () => {
    it('should work', () => {
      const count = rowCount([1, 2, 3]);
      expect(count).toEqual(3);
    });
  });
});
