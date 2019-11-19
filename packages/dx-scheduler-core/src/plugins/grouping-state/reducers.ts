import { PureReducer, slice } from '@devexpress/dx-core';
import {
  ResourceGroupingState, ToggleGroupPayload,
} from '../../types';

export const toggleExpandedGroups: PureReducer<ResourceGroupingState, ToggleGroupPayload> = (
  state, { groupKey },
) => {
  const expandedGroups = slice(state.expandedGroups);
  const groupKeyIndex = expandedGroups.indexOf(groupKey);

  if (groupKeyIndex > -1) {
    expandedGroups.splice(groupKeyIndex, 1);
  } else {
    expandedGroups.push(groupKey);
  }

  return { expandedGroups };
};
