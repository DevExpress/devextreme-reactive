import * as React from 'react';
import { Plugin, Getter } from '@devexpress/dx-react-core';
import { memoize } from '@devexpress/dx-core';
import {
  getGroupingItemsFromResources, expandViewCellsDataWithGroups,
  sortFilteredResources, filterResourcesByGrouping, updateGroupingWithMainResource,
} from '@devexpress/dx-scheduler-core';
import { IntegratedGroupingProps } from '../types';

const pluginDependencies = [
  { name: 'Resources' },
  { name: 'GroupingState' },
  { name: 'DayView', optional: true },
  { name: 'MonthView', optional: true },
  { name: 'WeekView', optional: true },
];

const getViewCellsDataComputed = memoize((
  { viewCellsData, groupingItems, resourcesToGroupBy },
) => expandViewCellsDataWithGroups(viewCellsData, groupingItems, resourcesToGroupBy));

const getGroupingItemsComputed = memoize((
  { resourcesToGroupBy },
) => getGroupingItemsFromResources(resourcesToGroupBy));

const getResourcesToGroupByComputed = memoize((
  { resources, grouping },
) => sortFilteredResources(filterResourcesByGrouping(resources, grouping), grouping));

const getGroupingComputed = memoize((
  { grouping, resources },
) => updateGroupingWithMainResource(grouping, resources));

const IntegratedGroupingBase: React.SFC<IntegratedGroupingProps> = React.memo(() => (
  <Plugin
    name="IntegratedGrouping"
    dependencies={pluginDependencies}
  >
    <Getter name="grouping" computed={getGroupingComputed} />
    <Getter name="resourcesToGroupBy" computed={getResourcesToGroupByComputed} />
    <Getter name="groupingItems" computed={getGroupingItemsComputed} />
    <Getter name="viewCellsData" computed={getViewCellsDataComputed} />
  </Plugin>
));

/** A plugin that performs built-in grouping. */
export const IntegratedGrouping: React.ComponentType<
  IntegratedGroupingProps
> = IntegratedGroupingBase;
