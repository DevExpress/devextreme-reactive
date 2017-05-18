import {
    ungroupedColumns,
} from './computeds';

describe('GroupingPanel Plugin computeds', () => {
  describe('#ungroupedColumns', () => {
    const allColumns = [
      { name: 'a' },
      { name: 'b' },
      { name: 'c' },
      { name: 'd' },
    ];
    const grouping = [
      { columnName: 'a' },
      { columnName: 'c' },
    ];

    test('should work', () => {
      const columns = ungroupedColumns(allColumns, grouping);

      expect(columns).toHaveLength(2);
      expect(columns[0]).toMatchObject({ name: 'b' });
      expect(columns[1]).toMatchObject({ name: 'd' });
    });
  });
});
