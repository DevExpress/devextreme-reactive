import * as React from 'react';
import { Plugin, Getter, Getters } from '@devexpress/dx-react-core';
import {
  getGroupingItemsFromResources, expandViewCellsDataWithGroups,
  sortFilteredResources, filterResourcesByGrouping, updateGroupingWithMainResource, expandGroups,
} from '@devexpress/dx-scheduler-core';
import { IntegratedGroupingProps } from '../types';

const pluginDependencies = [
  { name: 'Resources' },
  { name: 'GroupingState' },
  { name: 'DayView', optional: true },
  { name: 'MonthView', optional: true },
  { name: 'WeekView', optional: true },
];

const getViewCellsDataComputed = (
  { viewCellsData, groupingItems, resourcesToGroupBy }: Getters,
) => expandViewCellsDataWithGroups(viewCellsData, groupingItems, resourcesToGroupBy);

const getGroupingItemsComputed = (
  { resourcesToGroupBy }: Getters,
) => getGroupingItemsFromResources(resourcesToGroupBy);

const getResourcesToGroupByComputed = (
  { resources, grouping }: Getters,
) => sortFilteredResources(filterResourcesByGrouping(resources, grouping), grouping);

const getGroupingComputed = (
  { grouping, resources }: Getters,
) => updateGroupingWithMainResource(grouping, resources);

const getTimeTableAppointmentsComputed = (
  { timeTableAppointments, grouping, resourcesToGroupBy, groupingItems }: Getters,
) => timeTableAppointments
  && expandGroups(timeTableAppointments, grouping, resourcesToGroupBy, groupingItems);

const getAllDayAppointmentsComputed = (
  { allDayAppointments, grouping, resourcesToGroupBy, groupingItems }: Getters,
) => allDayAppointments &&
  expandGroups(allDayAppointments, grouping, resourcesToGroupBy, groupingItems);

const IntegratedGroupingBase: React.SFC<IntegratedGroupingProps> = React.memo(() => (
  <Plugin
    name="IntegratedGrouping"
    dependencies={pluginDependencies}
  >
    <Getter name="grouping" computed={getGroupingComputed} />
    <Getter name="resourcesToGroupBy" computed={getResourcesToGroupByComputed} />
    <Getter name="groupingItems" computed={getGroupingItemsComputed} />
    <Getter name="viewCellsData" computed={getViewCellsDataComputed} />
    <Getter name="timeTableAppointments" computed={getTimeTableAppointmentsComputed} />
    <Getter name="allDayAppointments" computed={getAllDayAppointmentsComputed} />
  </Plugin>
));

/** A plugin that performs built-in grouping. */
export const IntegratedGrouping: React.ComponentType<
  IntegratedGroupingProps
> = IntegratedGroupingBase;
