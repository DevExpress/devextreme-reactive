import { GROUP_KEY_SEPARATOR } from './constants';

const applyColumnGrouping = (grouping, { columnName, groupIndex }) => {
  const nextGrouping = grouping.slice();
  const groupingIndex = nextGrouping.findIndex(g => g.columnName === columnName);
  let targetIndex = groupIndex;

  if (groupingIndex > -1) {
    nextGrouping.splice(groupingIndex, 1);
  } else if (groupIndex === undefined) {
    targetIndex = nextGrouping.length;
  }

  if (targetIndex > -1) {
    nextGrouping.splice(targetIndex, 0, {
      columnName,
    });
  }

  return nextGrouping;
};

export const changeColumnGrouping = ({ grouping, expandedGroups }, { columnName, groupIndex }) => {
  const nextGrouping = applyColumnGrouping(grouping, { columnName, groupIndex });

  const ungroupedColumnIndex = grouping.findIndex(
    (group, index) => !nextGrouping[index] || group.columnName !== nextGrouping[index].columnName,
  );
  if (ungroupedColumnIndex === -1) {
    return {
      grouping: nextGrouping,
    };
  }

  const filteredExpandedGroups = expandedGroups.filter(
    group => group.split(GROUP_KEY_SEPARATOR).length <= ungroupedColumnIndex,
  );
  if (filteredExpandedGroups.length === expandedGroups.length) {
    return {
      grouping: nextGrouping,
    };
  }

  return {
    grouping: nextGrouping,
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

export const draftColumnGrouping = ({ grouping, draftGrouping }, { columnName, groupIndex }) => ({
  draftGrouping: applyColumnGrouping(draftGrouping || grouping, { columnName, groupIndex }),
});

export const cancelColumnGroupingDraft = () => ({
  draftGrouping: null,
});
