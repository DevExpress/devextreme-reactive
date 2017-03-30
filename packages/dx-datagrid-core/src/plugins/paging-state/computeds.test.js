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
    test('should work', () => {
      const rows = [
        { a: 1 },
        { a: 2 },
        { a: 3 },
        {
          a: 3,
          _parentRow: {
            b: 1,
            _parentRow: {
              c: 1,
            },
          },
        },
      ];

      const computedRows = ensurePageHeaders(rows, 3);
      expect(computedRows).toHaveLength(6);
      expect(computedRows[0]).toBe(rows[0]);
      expect(computedRows[1]).toBe(rows[1]);
      expect(computedRows[2]).toBe(rows[2]);
      expect(computedRows[3]).toBe(rows[3]._parentRow._parentRow);
      expect(computedRows[4]).toBe(rows[3]._parentRow);
      expect(computedRows[5]).toBe(rows[3]);
    });
  });
});
