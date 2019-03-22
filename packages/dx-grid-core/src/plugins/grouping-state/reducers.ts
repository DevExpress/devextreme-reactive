import { PureReducer, slice } from '@devexpress/dx-core';
import { Getters } from '@devexpress/dx-react-core';
import { GROUP_KEY_SEPARATOR } from './constants';
import {
  Grouping, ColumnGroupingState, ChangeGroupingPayload, ToggleGroupPayload, DraftGroupingState,
} from '../../types';

const applyColumnGrouping: PureReducer<Grouping[], ChangeGroupingPayload> = (
  grouping, { columnName, groupIndex },
) => {
  let nextGrouping = grouping;
  const groupingIndex = nextGrouping.findIndex(g => g.columnName === columnName);
  let targetIndex = groupIndex;

  if (groupingIndex > -1) {
    nextGrouping = slice(grouping);
    (nextGrouping as Grouping[]).splice(groupingIndex, 1);
  } else if (groupIndex === undefined) {
    targetIndex = nextGrouping.length;
  }

  if (targetIndex > -1) {
    nextGrouping = slice(nextGrouping);
    (nextGrouping as Grouping[]).splice(targetIndex, 0, {
      columnName,
    });
  }

  return nextGrouping;
};

export const changeColumnGrouping: PureReducer<ColumnGroupingState, ChangeGroupingPayload> = (
  { grouping, expandedGroups }, { columnName, groupIndex },
) => {
  const nextGrouping = applyColumnGrouping(grouping!, { columnName, groupIndex });

  const ungroupedColumnIndex = grouping!.findIndex(
    (group, index) => !nextGrouping[index] || group.columnName !== nextGrouping[index].columnName,
  );
  if (ungroupedColumnIndex === -1) {
    return {
      grouping: nextGrouping,
    };
  }

  const filteredExpandedGroups = expandedGroups!.filter(
    group => group.split(GROUP_KEY_SEPARATOR).length <= ungroupedColumnIndex,
  );
  if (filteredExpandedGroups.length === expandedGroups!.length) {
    return {
      grouping: nextGrouping,
    };
  }

  return {
    grouping: nextGrouping,
    expandedGroups: filteredExpandedGroups,
  };
};

export const toggleExpandedGroups: PureReducer<ColumnGroupingState, ToggleGroupPayload> = (
  state, { groupKey },
) => {
  const expandedGroups = slice(state.expandedGroups);
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

export const draftColumnGrouping: PureReducer<
  Getters, ChangeGroupingPayload, DraftGroupingState
> = (
  { grouping, draftGrouping },
  { columnName, groupIndex },
) => ({
  draftGrouping: applyColumnGrouping(draftGrouping || grouping, { columnName, groupIndex }),
});

export const cancelColumnGroupingDraft = () => ({
  draftGrouping: null,
});
