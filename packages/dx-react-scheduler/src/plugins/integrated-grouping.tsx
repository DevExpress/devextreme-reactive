import * as React from 'react';
import { Plugin, Getter, Getters } from '@devexpress/dx-react-core';
import {
  getGroupsFromResources, expandViewCellsDataWithGroups,
  sortFilteredResources, filterResourcesByGrouping, updateGroupingWithMainResource, expandGroups, VERTICAL_GROUP_ORIENTATION, VIEW_TYPES,
} from '@devexpress/dx-scheduler-core';
import { IntegratedGroupingProps } from '../types';

const pluginDependencies = [
  { name: 'Resources' },
  { name: 'GroupingState' },
  { name: 'DayView', optional: true },
  { name: 'MonthView', optional: true },
  { name: 'WeekView', optional: true },
];

const getViewCellsDataComputed = ({
  viewCellsData, groups, resourcesToGroupBy, groupByDate, currentView, groupOrientation,
}: Getters) => expandViewCellsDataWithGroups(
  viewCellsData, groups, resourcesToGroupBy,
  groupByDate(currentView.name), groupOrientation(currentView.name),
);

const getGroupsComputed = (
  { resourcesToGroupBy }: Getters,
) => getGroupsFromResources(resourcesToGroupBy);

const getResourcesToGroupByComputed = (
  { resources, grouping }: Getters,
) => sortFilteredResources(filterResourcesByGrouping(resources, grouping), grouping);

const getGroupingComputed = (
  { grouping, resources }: Getters,
) => updateGroupingWithMainResource(grouping, resources);

const getTimeTableAppointmentsComputed = ({
  timeTableAppointments, grouping, resourcesToGroupBy,
  groups, groupByDate, currentView, excludedDays,
}: Getters) => timeTableAppointments
  && expandGroups(
    timeTableAppointments, grouping, resourcesToGroupBy, groups,
    excludedDays, groupByDate(currentView?.name) && currentView?.type === VIEW_TYPES.MONTH,
  );

const getAllDayAppointmentsComputed = ({
    allDayAppointments, grouping, resourcesToGroupBy,
    groups, groupByDate, currentView, excludedDays,
  }: Getters) => allDayAppointments &&
  expandGroups(
    allDayAppointments, grouping, resourcesToGroupBy,
    groups, excludedDays, groupByDate(currentView?.name),
  );

const getGroupByDateComputed = ({
  currentView, groupByDate, groupOrientation,
}: Getters) => groupOrientation(currentView?.name) === VERTICAL_GROUP_ORIENTATION
  ? () => false : groupByDate;

const IntegratedGroupingBase: React.SFC<IntegratedGroupingProps> = React.memo(() => (
  <Plugin
    name="IntegratedGrouping"
    dependencies={pluginDependencies}
  >
    <Getter name="groupByDate" computed={getGroupByDateComputed} />
    <Getter name="grouping" computed={getGroupingComputed} />
    <Getter name="resourcesToGroupBy" computed={getResourcesToGroupByComputed} />
    <Getter name="groups" computed={getGroupsComputed} />
    <Getter name="viewCellsData" computed={getViewCellsDataComputed} />
    <Getter name="timeTableAppointments" computed={getTimeTableAppointmentsComputed} />
    <Getter name="allDayAppointments" computed={getAllDayAppointmentsComputed} />
  </Plugin>
));

/** A plugin that implements grouping. */
export const IntegratedGrouping: React.ComponentType<
  IntegratedGroupingProps
> = IntegratedGroupingBase;
