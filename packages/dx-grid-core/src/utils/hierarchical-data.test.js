import { rowsToTree, treeToRows } from './hierarchical-data';

describe('Hierarchical Utils', () => {
  const rows = [
    {
      grouped: true,
      groupLevelKey: 'group_a',
      groupedBy: 'a',
      value: 1,
    },
    {
      grouped: true,
      groupLevelKey: 'group_b',
      groupedBy: 'b',
      value: 1,
    },
    {
      grouped: true,
      groupLevelKey: 'group_b',
      groupedBy: 'b',
      value: 2,
    },
    { a: 1, b: 2 },
    { a: 2, b: 2 },
    {
      grouped: true,
      groupLevelKey: 'group_a',
      groupedBy: 'a',
      value: 2,
    },
  ];

  const tree = [
    {
      groupRow: {
        grouped: true,
        groupLevelKey: 'group_a',
        groupedBy: 'a',
        value: 1,
      },
      items: [
        {
          groupRow: {
            grouped: true,
            groupLevelKey: 'group_b',
            groupedBy: 'b',
            value: 1,
          },
          parentIndex: 0,
          items: [],
        },
        {
          groupRow: {
            grouped: true,
            groupLevelKey: 'group_b',
            groupedBy: 'b',
            value: 2,
          },
          items: [
            { a: 1, b: 2 },
            { a: 2, b: 2 },
          ],
        },
      ],
    },
    {
      groupRow: {
        grouped: true,
        groupLevelKey: 'group_a',
        groupedBy: 'a',
        value: 2,
      },
      items: [],
    },
  ];

  it('should convert plain rows to tree', () => {
    expect(rowsToTree(
      rows,
      row => row.grouped === true,
      row => row.groupLevelKey,
    )).toEqual(tree);
  });

  it('should convert tree to plain rows', () => {
    expect(treeToRows(tree)).toEqual(rows);
  });
});
