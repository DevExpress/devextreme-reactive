import {
    groupedRows,
    expandedGroupRows,
} from './computeds';

describe('GroupingPlugin computeds', () => {
  describe('#groupedRows', () => {
    const rows = [
      { a: 1, b: 1 },
      { a: 1, b: 2 },
      { a: 2, b: 1 },
      { a: 2, b: 2 },
    ];

    test('can group by one column', () => {
      const groupings = [{ column: 'a' }];

      const grouped = groupedRows(rows, groupings);
      expect(grouped).toHaveLength(2);
      expect(grouped[0]).toMatchObject({
        key: '1',
        value: '1',
        type: 'groupRow',
        column: 'a',
        colspan: 0,
      });
      expect(grouped[0].rows).toHaveLength(2);
      expect(grouped[0].rows[0]).toMatchObject(rows[0]);
      expect(grouped[0].rows[1]).toMatchObject(rows[1]);

      expect(grouped[1]).toMatchObject({
        key: '2',
        value: '2',
        type: 'groupRow',
        column: 'a',
        colspan: 0,
      });
      expect(grouped[1].rows).toHaveLength(2);
      expect(grouped[1].rows[0]).toMatchObject(rows[2]);
      expect(grouped[1].rows[1]).toMatchObject(rows[3]);
    });

    test('can group by several columns', () => {
      const groupings = [{ column: 'a' }, { column: 'b' }];

      const grouped = groupedRows(rows, groupings);
      expect(grouped).toHaveLength(2);
      expect(grouped[0]).toMatchObject({
        key: '1',
        value: '1',
        type: 'groupRow',
        column: 'a',
        colspan: 0,
      });
      expect(grouped[0].rows).toHaveLength(2);
      expect(grouped[0].rows[0]).toMatchObject({
        key: '1_1',
        value: '1',
        type: 'groupRow',
        column: 'b',
        colspan: 1,
      });
      expect(grouped[0].rows[1]).toMatchObject({
        key: '1_2',
        value: '2',
        type: 'groupRow',
        column: 'b',
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

    test('can expand groups', () => {
      const expandedGroups = { toExpand: true };

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
});
