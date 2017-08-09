import { GROUP_KEY_SEPARATOR } from './constants';

import { getFirstChangedGropingIndex } from './helpers';

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

export const draftGroupingChange = (prevGroupingChange, { columnName, groupIndex }) =>
  ({ columnName, groupIndex });

export const cancelGroupingChange = () => null;

export const removeOutdatedExpandedGroups = (prevExpandedGroups, { prevGrouping, grouping }) => {
  const ungroupedColumnIndex = getFirstChangedGropingIndex(prevGrouping, grouping);
  if (ungroupedColumnIndex === -1) {
    return prevExpandedGroups;
  }

  return prevExpandedGroups.filter(group =>
    group.split(GROUP_KEY_SEPARATOR).length <= ungroupedColumnIndex);
};

export const toggleExpandedGroups = (prevExpandedGroups, { groupKey }) => {
  const expandedGroups = Array.from(prevExpandedGroups);
  const groupKeyIndex = expandedGroups.indexOf(groupKey);

  if (groupKeyIndex > -1) {
    expandedGroups.splice(groupKeyIndex, 1);
  } else {
    expandedGroups.push(groupKey);
  }

  return expandedGroups;
};
