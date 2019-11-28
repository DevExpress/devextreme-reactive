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

const getViewCellsDataComputed = memoize(({ viewCellsData, groupingItems, sortedResources }) => {
  const result = expandViewCellsDataWithGroups(viewCellsData, groupingItems, sortedResources);
  return result;
});

const getGroupingItemsComputed = memoize((
  { sortedResources },
) => getGroupingItemsFromResources(sortedResources));

const getSortedResourcesComputed = memoize((
  { resources, grouping },
) => sortFilteredResources(filterResourcesByGrouping(resources, grouping), grouping));

class IntegratedGroupingBase extends React.PureComponent<IntegratedGroupingProps> {
  render() {
    return (
      <Plugin
        name="IntegratedGrouping"
        dependencies={pluginDependencies}
      >
        <Getter name="sortedResources" computed={getSortedResourcesComputed} />
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
