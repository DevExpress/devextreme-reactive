import { tableColumnsWithGrouping } from './computeds';

describe('TableGroupRow Plugin computeds', () => {
  describe('#tableColumnsWithGrouping', () => {
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
      const columns = tableColumnsWithGrouping(allColumns, grouping, [], 123);

      expect(columns).toHaveLength(6);
      expect(columns[0]).toMatchObject({
        type: 'groupColumn',
        group: { columnName: 'a' },
        width: 123,
      });
      expect(columns[1]).toMatchObject({
        type: 'groupColumn',
        group: { columnName: 'c' },
        width: 123,
      });
      expect(columns[2]).toBe(allColumns[0]);
      expect(columns[3]).toBe(allColumns[1]);
      expect(columns[4]).toBe(allColumns[2]);
      expect(columns[5]).toBe(allColumns[3]);
    });

    it('should not remove column when grouping', () => {
      const draftGrouping = [
        { columnName: 'a' },
        { columnName: 'c', isDraft: true, mode: 'add' },
      ];
      const columns = tableColumnsWithGrouping(allColumns, [], draftGrouping, 123);

      expect(columns).toHaveLength(3);
      expect(columns[0]).toBe(allColumns[1]);
      expect(columns[1]).toEqual({
        ...allColumns[2],
        isDraft: true,
      });
      expect(columns[2]).toBe(allColumns[3]);
    });

    it('should add a draft column when ungrouping', () => {
      const draftGrouping = [
        { columnName: 'a' },
        { columnName: 'c', isDraft: true, mode: 'remove' },
      ];
      const columns = tableColumnsWithGrouping(allColumns, [], draftGrouping, 123);

      expect(columns).toHaveLength(3);
      expect(columns[0]).toBe(allColumns[1]);
      expect(columns[1]).toEqual({
        ...allColumns[2],
        isDraft: true,
      });
      expect(columns[2]).toBe(allColumns[3]);
    });

    it('should add a draft column when reordering groups', () => {
      const draftGrouping = [
        { columnName: 'a' },
        { columnName: 'c', isDraft: true, mode: 'reorder' },
      ];
      const columns = tableColumnsWithGrouping(allColumns, [], draftGrouping, 123);

      expect(columns).toHaveLength(2);
      expect(columns[0]).toBe(allColumns[1]);
      expect(columns[1]).toBe(allColumns[3]);
    });
  });
});
