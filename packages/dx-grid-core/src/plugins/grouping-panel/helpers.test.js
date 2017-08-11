import {
  groupedColumns,
} from './helpers';

describe('Plugin helpers', () => {
  describe('#groupedColumns', () => {
    const columns = [
      { name: 'a' },
      { name: 'b' },
      { name: 'c' },
      { name: 'd' },
    ];
    const visGrouping = [
      { columnName: 'a' },
      { columnName: 'c', isDraft: true },
    ];

    it('should work', () => {
      const processedColumns = groupedColumns(columns, visGrouping);

      expect(processedColumns).toHaveLength(2);
      expect(processedColumns[0]).toBe(columns[0]);
      expect(processedColumns[1]).toEqual({
        ...columns[2],
        isDraft: true,
      });
    });
  });
});
