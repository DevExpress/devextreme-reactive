export const rowsToTree = (rows, isGroupRow, getRowLevelKey) =>
  rows.reduce((acc, item) => {
    const { tree, processedGroups } = acc;

    if (isGroupRow(item)) {
      const treeItem = { groupRow: item, items: [] };
      const key = getRowLevelKey(item);

      if (!processedGroups.length) {
        tree.push(treeItem);
      } else {
        const existingGroupItem =
          processedGroups.find(g => getRowLevelKey(g.groupRow) === key);

        if (!existingGroupItem) {
          const [parentGroup] = processedGroups.slice(-1);
          treeItem.parentIndex = processedGroups.length - 1;

          parentGroup.items.push(treeItem);
        } else {
          const { parentIndex } = existingGroupItem;
          if (parentIndex !== undefined) {
            processedGroups[parentIndex].items.push(treeItem);
          } else {
            tree.push(treeItem);
          }
        }
      }

      processedGroups.push(treeItem);
    } else if (!processedGroups.length) {
      tree.push(item);
    } else {
      processedGroups.slice(-1)[0].items.push(item);
    }

    return acc;
  }, { tree: [], processedGroups: [] }).tree;

export const treeToRows = (tree, rows = []) =>
  tree.reduce((acc, item) => {
    const { groupRow, items } = item;

    if (groupRow) {
      acc.push(groupRow);
      if (items && items.length) {
        treeToRows(items, acc);
      }
    } else {
      acc.push(item);
    }

    return acc;
  }, rows);
