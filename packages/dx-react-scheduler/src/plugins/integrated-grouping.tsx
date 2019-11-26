import * as React from 'react';
import {
  Plugin,
  Getter,
} from '@devexpress/dx-react-core';
import { memoize } from '@devexpress/dx-core';
import {
  getGroupingItemsFromResources, getGroupedViewCellsData,
  sortFilteredResources, filterResourcesByGrouping,
} from '@devexpress/dx-scheduler-core';

const pluginDependencies = [
  { name: 'Resources' },
  { name: 'GroupingState' },
];

const getViewCellsDataComputed = memoize(({ viewCellsData, groupingItems, sortedResources }) => {
  const result = getGroupedViewCellsData(viewCellsData, groupingItems, sortedResources);
  return result;
});

const getGroupingItemsComputed = memoize((
  { sortedResources },
) => getGroupingItemsFromResources(sortedResources));

const getSortedResourcesComputed = memoize((
  { resources, grouping },
) => sortFilteredResources(filterResourcesByGrouping(resources, grouping), grouping));

class IntegratedGroupingBase extends React.PureComponent {
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

/** A plugin that renders the Scheduler's grouping panel. */
export const IntegratedGrouping: React.ComponentType = IntegratedGroupingBase;
