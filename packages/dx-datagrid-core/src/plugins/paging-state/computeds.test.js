import {
    paginate,
    ensurePageHeaders,
} from './computeds';

describe('PagingState computeds', () => {
  describe('#paginate', () => {
    test('should work', () => {
      const rows = [1, 2, 3];

      let page = paginate(rows, 2, 0);
      expect(page).toEqual([1, 2]);

      page = paginate(rows, 2, 1);
      expect(page).toEqual([3]);

      page = paginate(rows, 2, 3);
      expect(page).toEqual([]);
    });
  });

  describe('#ensurePageHeaders', () => {
    test('should work with single headers', () => {
      const rows = [
        { a: 1, _headerKey: 'a' },
        { a: 2 },
        { a: 3 },
      ];

      const computedRows = ensurePageHeaders(rows, 5);
      expect(computedRows).toHaveLength(3);
      expect(computedRows[0]).toBe(rows[0]);
      expect(computedRows[1]).toBe(rows[1]);
      expect(computedRows[2]).toBe(rows[2]);
    });

    test('should work with singe header on several pages', () => {
      const rows = [
        { a: 1, _headerKey: 'a' },
        { a: 2 },
        { a: 3 },
        { a: 4 },
      ];

      const computedRows = ensurePageHeaders(rows, 3);
      expect(computedRows).toHaveLength(5);
      expect(computedRows[0]).toBe(rows[0]);
      expect(computedRows[1]).toBe(rows[1]);
      expect(computedRows[2]).toBe(rows[2]);
      expect(computedRows[3]).toBe(rows[0]);
      expect(computedRows[4]).toBe(rows[3]);
    });

    test('should work with multiple repeated headers', () => {
      const rows = [
        { a: 1, _headerKey: 'a' },
        { a: 2, _headerKey: 'a' },
        { a: 3 },
        { a: 4 },
      ];

      const computedRows = ensurePageHeaders(rows, 5);
      expect(computedRows).toHaveLength(4);
      expect(computedRows[0]).toBe(rows[0]);
      expect(computedRows[1]).toBe(rows[1]);
      expect(computedRows[2]).toBe(rows[2]);
      expect(computedRows[3]).toBe(rows[3]);
    });

    test('should work with multiple headers', () => {
      const rows = [
        { a: 1, _headerKey: 'a' },
        { a: 2 },
        { a: 3 },
        { a: 4, _headerKey: 'a' },
        { a: 5 },
      ];

      const computedRows = ensurePageHeaders(rows, 3);
      expect(computedRows).toHaveLength(5);
      expect(computedRows[0]).toBe(rows[0]);
      expect(computedRows[1]).toBe(rows[1]);
      expect(computedRows[2]).toBe(rows[2]);
      expect(computedRows[3]).toBe(rows[3]);
      expect(computedRows[4]).toBe(rows[4]);
    });

    test('should work with multiple headers ended by header', () => {
      const rows = [
        { a: 1, _headerKey: 'a' },
        { a: 2 },
        { a: 3 },
        { a: 4, _headerKey: 'a' },
      ];

      const computedRows = ensurePageHeaders(rows, 3);
      expect(computedRows).toHaveLength(4);
      expect(computedRows[0]).toBe(rows[0]);
      expect(computedRows[1]).toBe(rows[1]);
      expect(computedRows[2]).toBe(rows[2]);
      expect(computedRows[3]).toBe(rows[3]);
    });

    test('should work with nested headers', () => {
      const rows = [
        { a: 1, _headerKey: 'a' },
        { a: 2, _headerKey: 'b' },
        { a: 3 },
        { a: 4, _headerKey: 'b' },
        { a: 5 },
      ];

      const computedRows = ensurePageHeaders(rows, 3);
      expect(computedRows).toHaveLength(6);
      expect(computedRows[0]).toBe(rows[0]);
      expect(computedRows[1]).toBe(rows[1]);
      expect(computedRows[2]).toBe(rows[2]);
      expect(computedRows[3]).toBe(rows[0]);
      expect(computedRows[4]).toBe(rows[3]);
      expect(computedRows[5]).toBe(rows[4]);
    });

    test('should work with nested headers and different depth', () => {
      const rows = [
        { a: 1, _headerKey: 'a' },
        { a: 2, _headerKey: 'b' },
        { a: 3 },
        { a: 4, _headerKey: 'a' },
        { a: 5 },
      ];

      const computedRows = ensurePageHeaders(rows, 3);
      expect(computedRows).toHaveLength(5);
      expect(computedRows[0]).toBe(rows[0]);
      expect(computedRows[1]).toBe(rows[1]);
      expect(computedRows[2]).toBe(rows[2]);
      expect(computedRows[3]).toBe(rows[3]);
      expect(computedRows[4]).toBe(rows[4]);
    });
  });
});
