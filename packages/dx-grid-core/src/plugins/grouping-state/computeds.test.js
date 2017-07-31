import {
    groupedRows,
    expandedGroupRows,
    groupedColumns,
    draftGrouping,
    draftGroupedColumns,
} from './computeds';

describe('GroupingPlugin computeds', () => {
  describe('#groupedRows', () => {
    const rows = [
      { a: 1, b: 1 },
      { a: 1, b: 2 },
      { a: 2, b: 1 },
      { a: 2, b: 2 },
    ];

    it('can group by one column', () => {
      const groupings = [{ name: 'a' }];

      const grouped = groupedRows(rows, groupings);
      expect(grouped).toHaveLength(2);
      expect(grouped[0]).toMatchObject({
        key: '1',
        value: '1',
        type: 'groupRow',
        column: { name: 'a' },
      });
      expect(grouped[0].rows).toHaveLength(2);
      expect(grouped[0].rows[0]).toMatchObject(rows[0]);
      expect(grouped[0].rows[1]).toMatchObject(rows[1]);

      expect(grouped[1]).toMatchObject({
        key: '2',
        value: '2',
        type: 'groupRow',
        column: { name: 'a' },
      });
      expect(grouped[1].rows).toHaveLength(2);
      expect(grouped[1].rows[0]).toMatchObject(rows[2]);
      expect(grouped[1].rows[1]).toMatchObject(rows[3]);
    });

    it('can group by several columns', () => {
      const groupings = [{ name: 'a' }, { name: 'b' }];

      const grouped = groupedRows(rows, groupings);
      expect(grouped).toHaveLength(2);
      expect(grouped[0]).toMatchObject({
        key: '1',
        value: '1',
        type: 'groupRow',
        column: { name: 'a' },
      });
      expect(grouped[0].rows).toHaveLength(2);
      expect(grouped[0].rows[0]).toMatchObject({
        key: '1|1',
        value: '1',
        type: 'groupRow',
        column: { name: 'b' },
      });
      expect(grouped[0].rows[1]).toMatchObject({
        key: '1|2',
        value: '2',
        type: 'groupRow',
        column: { name: 'b' },
      });
      expect(grouped[0].rows[0].rows).toHaveLength(1);
      expect(grouped[0].rows[1].rows).toHaveLength(1);
      expect(grouped[1].rows[0].rows).toHaveLength(1);
      expect(grouped[1].rows[1].rows).toHaveLength(1);
      expect(grouped[0].rows[0].rows[0]).toMatchObject(rows[0]);
      expect(grouped[0].rows[1].rows[0]).toMatchObject(rows[1]);
      expect(grouped[1].rows[0].rows[0]).toMatchObject(rows[2]);
      expect(grouped[1].rows[1].rows[0]).toMatchObject(rows[3]);
    });
  });

  describe('#expandedGroupRows', () => {
    const rows = [
      {
        type: 'groupRow',
        key: 'toExpand',
        rows: [
          { a: 1 },
        ],
      },
      {
        type: 'groupRow',
        key: 'keepCollapsed',
        rows: [
          { a: 1 },
        ],
      },
    ];

    it('can expand groups', () => {
      const expandedGroups = new Set(['toExpand']);

      const expanded = expandedGroupRows(rows, expandedGroups);
      expect(expanded).toEqual([
        {
          type: 'groupRow',
          key: 'toExpand',
          rows: [
            { a: 1 },
          ],
        },
        { a: 1 },
        {
          type: 'groupRow',
          key: 'keepCollapsed',
          rows: [
            { a: 1 },
          ],
        },
      ]);
    });
  });

  describe('#groupedColumns', () => {
    const columns = [
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
      const processedColumns = groupedColumns(columns, grouping);

      expect(processedColumns).toHaveLength(2);
      expect(processedColumns[0]).toBe(columns[0]);
      expect(processedColumns[1]).toBe(columns[2]);
    });
  });

  describe('#draftGroupedColumns', () => {
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
      const processedColumns = draftGroupedColumns(columns, visGrouping);

      expect(processedColumns).toHaveLength(2);
      expect(processedColumns[0]).toBe(columns[0]);
      expect(processedColumns[1]).toEqual({
        ...columns[2],
        isDraft: true,
      });
    });
  });

  describe('#draftGrouping', () => {
    it('can add draft column to draftGrouping', () => {
      const grouping = [
        { columnName: 'a' },
        { columnName: 'c' },
      ];
      const processedGrouping = draftGrouping(grouping, { columnName: 'b', groupIndex: 1 });

      expect(processedGrouping)
        .toEqual([
          { columnName: 'a' },
          { columnName: 'b', isDraft: true, mode: 'add' },
          { columnName: 'c' },
        ]);
    });

    it('can reset draftGrouping', () => {
      const grouping = [{ columnName: 'a' }];

      expect(draftGrouping(grouping, null))
        .toEqual([
          { columnName: 'a' },
        ]);
    });

    it('can mark a column as draft in draftGrouping', () => {
      const grouping = [
        { columnName: 'a' },
        { columnName: 'b' },
      ];

      expect(draftGrouping(grouping, { columnName: 'a', groupIndex: -1 }))
        .toEqual([
          { columnName: 'a', isDraft: true, mode: 'remove' },
          { columnName: 'b' },
        ]);
      expect(draftGrouping(grouping, { columnName: 'b', groupIndex: -1 }))
        .toEqual([
          { columnName: 'a' },
          { columnName: 'b', isDraft: true, mode: 'remove' },
        ]);
    });

    it('can change grouping order', () => {
      const grouping = [
        { columnName: 'a' },
        { columnName: 'b' },
      ];

      expect(draftGrouping(grouping, { columnName: 'a', groupIndex: 1 }))
        .toEqual([
          { columnName: 'b' },
          { columnName: 'a', isDraft: true, mode: 'reorder' },
        ]);
    });
  });
});
