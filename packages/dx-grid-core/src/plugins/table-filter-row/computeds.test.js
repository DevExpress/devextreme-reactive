import {
    tableHeaderRows,
} from './computeds';

describe('TableFilterRow Plugin computeds', () => {
  describe('#tableHeaderRows', () => {
    const headerRows = [
      { type: 'a' },
      { type: 'b' },
    ];

    test('should work', () => {
      const rows = tableHeaderRows(headerRows, 100);

      expect(rows).toHaveLength(3);
      expect(rows[0]).toMatchObject({ type: 'a' });
      expect(rows[1]).toMatchObject({ type: 'b' });
      expect(rows[2]).toMatchObject({ type: 'filter', height: 100 });
    });
  });
});
