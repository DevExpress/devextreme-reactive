import {
    tableHeaderRows,
} from './computeds';

describe('TableHeaderRow Plugin computeds', () => {
  describe('#tableHeaderRows', () => {
    const rows = [
      { type: 'filter' },
    ];

    test('should work', () => {
      const headerRows = tableHeaderRows(rows);

      expect(headerRows).toHaveLength(2);
      expect(headerRows[0]).toMatchObject({ type: 'heading' });
      expect(headerRows[1]).toBe(rows[0]);
    });
  });
});
