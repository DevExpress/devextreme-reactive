import { SEPARATOR } from './computeds';

import { getUngroupedColumnIndex } from './helpers';

export const groupByColumn = (prevGrouping, { columnName, groupIndex }) => {
  const grouping = Array.from(prevGrouping);
  const index = grouping.findIndex(g => g.columnName === columnName);
  let targetIndex = groupIndex;

  if (index > -1) {
    grouping.splice(index, 1);
  } else if (groupIndex === undefined) {
    targetIndex = grouping.length;
  }

  if (targetIndex > -1) {
    grouping.splice(targetIndex, 0, {
      columnName,
    });
  }

  return grouping;
};

export const updateExpandedGroups = (prevExpandedGroups, { prevGrouping, grouping }) => {
  const ungroupedColumnIndex = getUngroupedColumnIndex(prevGrouping, grouping);
  if (ungroupedColumnIndex === -1) {
    return prevExpandedGroups;
  }

  return prevExpandedGroups.filter(group => group.split(SEPARATOR).length <= ungroupedColumnIndex);
};
