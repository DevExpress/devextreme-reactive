import * as React from 'react';
import {
  Plugin,
  Getter,
} from '@devexpress/dx-react-core';
import { memoize } from '@devexpress/dx-core';
import {
  getGroupingItemsFromResources, expandViewCellsDataWithGroups,
  sortFilteredResources, filterResourcesByGrouping,
} from '@devexpress/dx-scheduler-core';
import { IntegratedGroupingProps } from '../types';

const pluginDependencies = [
  { name: 'Resources' },
  { name: 'GroupingState' },
];

const getViewCellsDataComputed = memoize(({ viewCellsData, groupingItems, resourcesToGroupBy }) => {
  const result = expandViewCellsDataWithGroups(viewCellsData, groupingItems, resourcesToGroupBy);
  return result;
});

const getGroupingItemsComputed = memoize((
  { resourcesToGroupBy },
) => getGroupingItemsFromResources(resourcesToGroupBy));

const getResourcesToGroupByComputed = memoize((
  { resources, grouping },
) => sortFilteredResources(filterResourcesByGrouping(resources, grouping), grouping));

class IntegratedGroupingBase extends React.PureComponent<IntegratedGroupingProps> {
  render() {
    return (
      <Plugin
        name="IntegratedGrouping"
        dependencies={pluginDependencies}
      >
        <Getter name="resourcesToGroupBy" computed={getResourcesToGroupByComputed} />
        <Getter name="groupingItems" computed={getGroupingItemsComputed} />
        <Getter name="viewCellsData" computed={getViewCellsDataComputed} />
      </Plugin>
    );
  }
}

/** A plugin that implements Scheduler's grouping logic. */
export const IntegratedGrouping: React.ComponentType<
  IntegratedGroupingProps
> = IntegratedGroupingBase;
