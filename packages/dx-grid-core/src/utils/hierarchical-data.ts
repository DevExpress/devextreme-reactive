import { RowsToTreeFn, TreeToRowsFn, TreeNode } from '../types';

export const NODE_CHECK = Symbol('node');

export const rowsToTree: RowsToTreeFn = (rows, getRowLevelKey) => {
  if (!rows.length) return rows;

  const levels: any[] = [{ children: [] }];

  rows.forEach((row) => {
    const levelKey = getRowLevelKey(row);
    if (levelKey) {
      const levelIndex = levels.slice(1)
        .findIndex(level => getRowLevelKey(level.root) === levelKey) + 1;
      if (levelIndex > 0) {
        levels.splice(levelIndex, levels.length - levelIndex);
      }
      const node = { [NODE_CHECK]: true, root: row, children: [] };
      levels[levels.length - 1].children.push(node);
      levels.push(node);
    } else {
      levels[levels.length - 1].children.push(row);
    }
  });

  return levels[0].children;
};

export const treeToRows: TreeToRowsFn = (tree, rows = []) => {
  if (!tree.length) return tree;
  return tree.reduce(
    (acc, node) => {
      if (node[NODE_CHECK]) {
        acc.push(node.root);
        treeToRows(node.children, rows);
      } else {
        acc.push(node);
      }
      return acc;
    },
    rows as TreeNode[],
  );
};
