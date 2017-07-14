import { tableColumnsWithGroups, tableColumnsWithoutGroups } from './computeds';

describe('TableGroupRow Plugin computeds', () => {
  describe('#tableColumnsWithGroups', () => {
    const allColumns = [
      { name: 'a' },
      { name: 'b' },
    ];
    const grouping = [
      { columnName: 'a' },
      { columnName: 'b' },
    ];

    it('should work', () => {
      const columns = tableColumnsWithGroups(allColumns, grouping, 123);

      expect(columns).toHaveLength(4);
      expect(columns[0]).toMatchObject({
        type: 'groupColumn',
        group: { columnName: 'a' },
        width: 123,
      });
      expect(columns[1]).toMatchObject({
        type: 'groupColumn',
        group: { columnName: 'b' },
        width: 123,
      });
      expect(columns[2]).toBe(allColumns[0]);
      expect(columns[3]).toBe(allColumns[1]);
    });
  });

  describe('#tableColumnsWithoutGroups', () => {
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

    it('should work', () => {
      const columns = tableColumnsWithoutGroups(allColumns, grouping);

      expect(columns).toHaveLength(2);
      expect(columns[0]).toBe(allColumns[1]);
      expect(columns[1]).toBe(allColumns[3]);
    });

    it('should not remove column when grouping', () => {
      const visualGrouping = [
        { columnName: 'a' },
        { columnName: 'c', isDraft: true, mode: 'add' },
      ];
      const columns = tableColumnsWithoutGroups(allColumns, visualGrouping);

      expect(columns).toHaveLength(3);
      expect(columns[0]).toBe(allColumns[1]);
      expect(columns[1]).toEqual({
        ...allColumns[2],
        isDraft: true,
      });
      expect(columns[2]).toBe(allColumns[3]);
    });

    it('should add a draft column when ungrouping', () => {
      const visualGrouping = [
        { columnName: 'a' },
        { columnName: 'c', isDraft: true, mode: 'remove' },
      ];
      const columns = tableColumnsWithoutGroups(allColumns, visualGrouping);

      expect(columns).toHaveLength(3);
      expect(columns[0]).toBe(allColumns[1]);
      expect(columns[1]).toEqual({
        ...allColumns[2],
        isDraft: true,
      });
      expect(columns[2]).toBe(allColumns[3]);
    });

    it('should add a draft column when reordering groups', () => {
      const visualGrouping = [
        { columnName: 'a' },
        { columnName: 'c', isDraft: true, mode: 'reorder' },
      ];
      const columns = tableColumnsWithoutGroups(allColumns, visualGrouping);

      expect(columns).toHaveLength(2);
      expect(columns[0]).toBe(allColumns[1]);
      expect(columns[1]).toBe(allColumns[3]);
    });
  });
});
