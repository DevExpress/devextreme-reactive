import { rowsToTree, treeToRows } from './hierarchical-data';

describe('Hierarchical Utils', () => {
  const rows = [
    {
      isNode: true,
      nodeLevelKey: 'a',
    },
    {
      isNode: true,
      nodeLevelKey: 'b',
    },
    {
      isNode: true,
      nodeLevelKey: 'c',
    },
    { a: 1, b: 2 },
    { a: 2, b: 2 },
    {
      isNode: true,
      nodeLevelKey: 'b',
    },
    {
      isNode: true,
      nodeLevelKey: 'c',
    },
    { a: 1, b: 2 },
    { a: 2, b: 2 },
    {
      isNode: true,
      nodeLevelKey: 'a',
    },
    {
      isNode: true,
      nodeLevelKey: 'a',
    },
  ];

  const tree = [
    {
      node: {
        isNode: true,
        nodeLevelKey: 'a',
      },
      items: [
        {
          node: {
            isNode: true,
            nodeLevelKey: 'b',
          },
          items: [
            {
              node: {
                isNode: true,
                nodeLevelKey: 'c',
              },
              items: [
                { a: 1, b: 2 },
                { a: 2, b: 2 },
              ],
            },
          ],
        },
        {
          node: {
            isNode: true,
            nodeLevelKey: 'b',
          },
          items: [
            {
              node: {
                isNode: true,
                nodeLevelKey: 'c',
              },
              items: [
                { a: 1, b: 2 },
                { a: 2, b: 2 },
              ],
            },
          ],
        },
      ],
    },
    {
      node: {
        isNode: true,
        nodeLevelKey: 'a',
      },
      items: [],
    },
    {
      node: {
        isNode: true,
        nodeLevelKey: 'a',
      },
      items: [],
    },
  ];

  it('should convert plain rows to tree', () => {
    expect(rowsToTree(
      rows,
      row => row.isNode === true,
      row => row.nodeLevelKey,
    )).toEqual(tree);
  });

  it('should convert tree to plain rows', () => {
    expect(treeToRows(tree)).toEqual(rows);
  });

  it('should process empty rows correctly', () => {
    expect(rowsToTree(
      [],
      row => row.isNode === true,
      row => row.nodeLevelKey,
    )).toEqual([]);
  });

  it('should process empty tree correctly', () => {
    expect(treeToRows([])).toEqual([]);
  });
});
