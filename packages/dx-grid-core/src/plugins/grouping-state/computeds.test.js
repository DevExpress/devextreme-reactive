import Immutable from 'seamless-immutable';

import {
    groupedRows,
    expandedGroupRows,
    groupedColumns,
    nextExpandedGroups,
    expandedGroupsWithChangedGrouping,
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
        colspan: 0,
      });
      expect(grouped[0].rows).toHaveLength(2);
      expect(grouped[0].rows[0]).toMatchObject(rows[0]);
      expect(grouped[0].rows[1]).toMatchObject(rows[1]);

      expect(grouped[1]).toMatchObject({
        key: '2',
        value: '2',
        type: 'groupRow',
        column: { name: 'a' },
        colspan: 0,
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
        colspan: 0,
      });
      expect(grouped[0].rows).toHaveLength(2);
      expect(grouped[0].rows[0]).toMatchObject({
        key: '1|1',
        value: '1',
        type: 'groupRow',
        column: { name: 'b' },
        colspan: 1,
      });
      expect(grouped[0].rows[1]).toMatchObject({
        key: '1|2',
        value: '2',
        type: 'groupRow',
        column: { name: 'b' },
        colspan: 1,
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

  describe('#nextExpandedGroups', () => {
    it('should add an opened group', () => {
      const groups = nextExpandedGroups(['a', 'b'], 'c');

      expect(groups).toEqual(['a', 'b', 'c']);
    });

    it('should remove a closed group', () => {
      const groups = nextExpandedGroups(['a', 'b', 'c'], 'c');

      expect(groups).toEqual(['a', 'b']);
    });

    it('should work with immutable groups', () => {
      const groups = nextExpandedGroups(Immutable(['a']), 'b');

      expect(groups).toEqual(['a', 'b']);
    });
  });

  describe('#expandedGroupsWithChangedGrouping', () => {
    it('should strip ungrouped rows', () => {
      const groups = expandedGroupsWithChangedGrouping(
        [{ columnName: 'a' }, { columnName: 'b' }, { columnName: 'c' }],
        [{ columnName: 'a' }, { columnName: 'c' }],
        ['a1', 'a2', 'a1|b1|c1', 'a2|b2'],
      );

      expect(groups).toEqual(['a1', 'a2']);
    });

    it('should strip all rows if there isn\'t any grouping', () => {
      const groups = expandedGroupsWithChangedGrouping(
        [{ columnName: 'a' }],
        [],
        ['a1', 'a2|b1', 'a3'],
      );

      expect(groups).toHaveLength(0);
    });

    it('should ignore added grouping', () => {
      const prevExpandedGroups = ['a1', 'a2'];
      const newExpandedGroups = expandedGroupsWithChangedGrouping(
        [{ columnName: 'a' }],
        [{ columnName: 'a' }, { columnName: 'b' }],
        prevExpandedGroups,
      );

      expect(prevExpandedGroups).toBe(newExpandedGroups);
    });
  });
});
