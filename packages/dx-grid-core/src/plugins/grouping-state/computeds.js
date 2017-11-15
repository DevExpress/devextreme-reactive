import { GROUP_ADD_MODE, GROUP_REMOVE_MODE, GROUP_REORDER_MODE } from './constants';

export const draftGrouping = (grouping, groupingChange) => {
  if (!groupingChange) return grouping;

  const { columnName, groupIndex } = groupingChange;
  let result = Array.from(grouping);

  if (groupIndex !== -1) {
    result = result.filter(g => g.columnName !== columnName);
    result.splice(groupIndex, 0, {
      columnName,
      draft: grouping.length > result.length ? GROUP_REORDER_MODE : GROUP_ADD_MODE,
    });
  } else {
    result = result.map(g => (g.columnName === columnName
      ? { columnName, draft: GROUP_REMOVE_MODE }
      : g));
  }

  return result;
};
