import { NODE_CHECK, rowsToTree, treeToRows } from './hierarchical-data';

describe('Hierarchical Utils', () => {
  /* tslint:disable align */
  const rows = [
    { levelKey: 'a' }, // 0
      { levelKey: 'b' }, // 1
        { levelKey: 'c' }, // 2
          { a: 1 },
          { a: 2 },
      { levelKey: 'b' }, // 1
        { levelKey: 'c' }, // 2
          { a: 3 },
          { a: 4 },
          { a: 5 },
    { levelKey: 'a' }, // 0
      { levelKey: 'd' }, // 1
        { a: 6 },
    { levelKey: 'a' }, // 0
  ];
  /* tslint:enable align */

  const node = (root, ...children) => ({
    root,
    children,
    [NODE_CHECK]: true,
  });

  const tree = [
    node(
      { levelKey: 'a' },
      node(
        { levelKey: 'b' },
        node(
          { levelKey: 'c' },
          { a: 1 },
          { a: 2 },
        ),
      ),
      node(
        { levelKey: 'b' },
        node(
          { levelKey: 'c' },
          { a: 3 },
          { a: 4 },
          { a: 5 },
        ),
      ),
    ),
    node(
      { levelKey: 'a' },
      node(
        { levelKey: 'd' },
        { a: 6 },
      ),
    ),
    node({ levelKey: 'a' }),
  ];

  it('should convert plain rows to tree', () => {
    expect(rowsToTree(rows, row => row.levelKey))
      .toEqual(tree);
  });

  it('should convert tree to plain rows', () => {
    expect(treeToRows(tree))
      .toEqual(rows);
  });

  it('should process empty rows correctly', () => {
    expect(rowsToTree([], row => row.levelKey))
      .toEqual([]);
  });

  it('should process empty tree correctly', () => {
    expect(treeToRows([]))
      .toEqual([]);
  });
});
