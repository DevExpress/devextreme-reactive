import { GROUP_KEY_SEPARATOR } from './constants';

export const groupByColumn = (state, { columnName, groupIndex }) => {
  const grouping = state.grouping.slice();
  const groupingIndex = grouping.findIndex(g => g.columnName === columnName);
  let targetIndex = groupIndex;

  if (groupingIndex > -1) {
    grouping.splice(groupingIndex, 1);
  } else if (groupIndex === undefined) {
    targetIndex = grouping.length;
  }

  if (targetIndex > -1) {
    grouping.splice(targetIndex, 0, {
      columnName,
    });
  }


  const ungroupedColumnIndex = state.grouping.findIndex((group, index) =>
    !grouping[index] || group.columnName !== grouping[index].columnName);
  if (ungroupedColumnIndex === -1) {
    return {
      grouping,
    };
  }

  const filteredExpandedGroups = state.expandedGroups.filter(group =>
    group.split(GROUP_KEY_SEPARATOR).length <= ungroupedColumnIndex);
  if (filteredExpandedGroups.length === state.expandedGroups.length) {
    return {
      grouping,
    };
  }

  return {
    grouping,
    expandedGroups: filteredExpandedGroups,
  };
};

export const toggleExpandedGroups = (state, { groupKey }) => {
  const expandedGroups = state.expandedGroups.slice();
  const groupKeyIndex = expandedGroups.indexOf(groupKey);

  if (groupKeyIndex > -1) {
    expandedGroups.splice(groupKeyIndex, 1);
  } else {
    expandedGroups.push(groupKey);
  }

  return {
    expandedGroups,
  };
};

export const draftGroupingChange = (state, { columnName, groupIndex }) =>
  ({ groupingChange: { columnName, groupIndex } });

export const cancelGroupingChange = () => ({ groupingChange: null });
