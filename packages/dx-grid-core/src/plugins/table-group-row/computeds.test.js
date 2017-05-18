import {
    tableColumns,
} from './computeds';

describe('TableGroupRow Plugin computeds', () => {
  describe('#tableHeaderRows', () => {
    const allColumns = [
      { name: 'a' },
      { name: 'b' },
    ];
    const grouping = [
      { columnName: 'a' },
      { columnName: 'b' },
    ];

    test('should work', () => {
      const columns = tableColumns(allColumns, grouping);

      expect(columns).toHaveLength(4);
      expect(columns[0]).toMatchObject({ type: 'groupColumn', group: { columnName: 'a' }, width: 20 });
      expect(columns[1]).toMatchObject({ type: 'groupColumn', group: { columnName: 'b' }, width: 20 });
      expect(columns[2]).toMatchObject({ name: 'a' });
      expect(columns[3]).toMatchObject({ name: 'b' });
    });
  });
});
