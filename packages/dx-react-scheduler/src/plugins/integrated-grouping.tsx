import * as React from 'react';
import { Plugin, Getter, Getters } from '@devexpress/dx-react-core';
import {
  getGroupsFromResources, expandViewCellsDataWithGroups,
  sortFilteredResources, filterResourcesByGrouping, updateGroupingWithMainResource,
  expandGroups, VERTICAL_GROUP_ORIENTATION, VIEW_TYPES,
  updateTimeTableCellElementsMeta, updateAllDayCellElementsMeta, updateTimeCellsData,
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
const getAllDayCellsDataComputed = ({
  allDayCellsData, groups, resourcesToGroupBy, groupByDate, currentView, groupOrientation,
}: Getters) => allDayCellsData && expandViewCellsDataWithGroups(
  allDayCellsData, groups, resourcesToGroupBy,
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

const getTimeTableElementsMetaComputed = ({
  timeTableElementsMeta, groupOrientation, groups, allDayPanelExists, viewCellsData, currentView,
}: Getters) => updateTimeTableCellElementsMeta(
  timeTableElementsMeta, groupOrientation, groups, allDayPanelExists, viewCellsData, currentView,
);

const getAllDayElementsMetaComputed = ({
  allDayElementsMeta, timeTableElementsMeta, groupOrientation, groups,
  allDayPanelExists, viewCellsData, currentView,
}: Getters) => updateAllDayCellElementsMeta(
  allDayElementsMeta, timeTableElementsMeta, groupOrientation, groups,
  allDayPanelExists, viewCellsData, currentView,
);

const getTimeCellsDataComputed = ({
  viewCellsData, timeCellsData,  currentView,
  groups, resourcesToGroupBy, groupOrientation,
}: Getters) => timeCellsData
  && updateTimeCellsData(
    viewCellsData,
    timeCellsData,
    groups,
    resourcesToGroupBy,
    groupOrientation(currentView.name),
  );

const IntegratedGroupingBase: React.FunctionComponent<IntegratedGroupingProps> = React.memo(() => (
  <Plugin
    name="IntegratedGrouping"
    dependencies={pluginDependencies}
  >
    <Getter name="groupByDate" computed={getGroupByDateComputed} />
    <Getter name="grouping" computed={getGroupingComputed} />
    <Getter name="resourcesToGroupBy" computed={getResourcesToGroupByComputed} />
    <Getter name="groups" computed={getGroupsComputed} />

    <Getter name="viewCellsData" computed={getViewCellsDataComputed} />
    <Getter name="allDayCellsData" computed={getAllDayCellsDataComputed} />
    <Getter name="timeCellsData" computed={getTimeCellsDataComputed} />

    <Getter name="timeTableAppointments" computed={getTimeTableAppointmentsComputed} />
    <Getter name="allDayAppointments" computed={getAllDayAppointmentsComputed} />

    <Getter name="allDayElementsMeta" computed={getAllDayElementsMetaComputed} />
    <Getter name="timeTableElementsMeta" computed={getTimeTableElementsMetaComputed} />
  </Plugin>
));

/** A plugin that implements grouping. */
export const IntegratedGrouping: React.ComponentType<
  IntegratedGroupingProps
> = IntegratedGroupingBase;
