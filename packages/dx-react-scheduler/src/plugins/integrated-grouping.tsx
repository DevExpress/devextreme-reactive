import * as React from 'react';
import {
  Plugin,
  Getter,
} from '@devexpress/dx-react-core';
import { memoize } from '@devexpress/dx-core';
import {
  getGroupingItemsFromResources, getGroupedViewCellsData,
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
  { grouping, resources },
) => getGroupingItemsFromResources(resources, grouping));

class IntegratedGroupingBase extends React.PureComponent {
  render() {
    return (
      <Plugin
        name="IntegratedGrouping"
        dependencies={pluginDependencies}
      >
        <Getter name="groupingItems" computed={getGroupingItemsComputed} />
        <Getter name="viewCellsData" computed={getViewCellsDataComputed} />
      </Plugin>
    );
  }
}

/** A plugin that renders the Scheduler's grouping panel. */
export const IntegratedGrouping: React.ComponentType = IntegratedGroupingBase;
