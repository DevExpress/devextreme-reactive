import {
    tableHeaderRowsWithFilter,
} from './computeds';

describe('TableFilterRow Plugin computeds', () => {
  describe('#tableHeaderRowsWithFilter', () => {
    const headerRows = [
      { type: 'heading' },
    ];

    test('should work', () => {
      const rows = tableHeaderRowsWithFilter(headerRows, 100);

      expect(rows).toHaveLength(2);
      expect(rows[0]).toMatchObject({ type: 'heading' });
      expect(rows[1]).toMatchObject({ type: 'filter', height: 100 });
    });
  });
});
