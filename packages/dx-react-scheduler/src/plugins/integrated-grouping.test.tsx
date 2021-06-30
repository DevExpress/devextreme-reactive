import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { pluginDepsToComponents, getComputedState } from '@devexpress/dx-testing';
import {
  getGroupsFromResources,
  expandViewCellsDataWithGroups,
  sortFilteredResources,
  filterResourcesByGrouping,
  updateGroupingWithMainResource,
  expandGroups,
  updateAllDayCellElementsMeta,
  updateTimeTableCellElementsMeta,
  updateTimeCellsData,
} from '@devexpress/dx-scheduler-core';
import { IntegratedGrouping } from './integrated-grouping';

jest.mock('@devexpress/dx-scheduler-core', () => ({
  ...jest.requireActual('@devexpress/dx-scheduler-core'),
  getGroupsFromResources: jest.fn(),
  expandViewCellsDataWithGroups: jest.fn(),
  sortFilteredResources: jest.fn(),
  filterResourcesByGrouping: jest.fn(),
  updateGroupingWithMainResource: jest.fn(),
  expandGroups: jest.fn(),
  updateTimeTableCellElementsMeta: jest.fn(),
  updateAllDayCellElementsMeta: jest.fn(),
  updateTimeCellsData: jest.fn(),
}));

describe('IntegratedGrouping', () => {
  const defaultDeps = {
    plugins: ['Resources', 'GroupingState'],
    getter: {
      timeTableAppointments: 'timeTableAppointments',
      allDayAppointments: 'allDayAppointments',
      viewCellsData: 'viewCellsData',
      allDayCellsData: 'allDayCellsData',
      resources: 'resources',
      grouping: 'grouping',
      currentView: { name: 'currentView' },
      groupByDate: () => true,
      excludedDays: 'excludedDays',
      groupOrientation: () => 'groupOrientation',
      allDayElementsMeta: 'allDayElementsMeta',
      timeTableElementsMeta: 'timeTableElementsMeta',
      allDayPanelExists: 'allDayPanelExists',
      timeCellsData: 'timeCellsData',
    },
  };
  beforeEach(() => {
    filterResourcesByGrouping.mockImplementation(() => 'filteredResources');
    sortFilteredResources.mockImplementation(() => 'resourcesToGroupBy');
    getGroupsFromResources.mockImplementation(() => 'groups');
    expandViewCellsDataWithGroups.mockImplementation(() => 'groupedViewCellsData');
    updateGroupingWithMainResource.mockImplementation(() => 'groupingComputed');
    expandGroups.mockImplementation(() => 'expandGroups');
    updateTimeTableCellElementsMeta.mockImplementation(() => 'timeTableElementsMeta updated');
    updateAllDayCellElementsMeta.mockImplementation(() => 'allDayElementsMeta updated');
    updateTimeCellsData.mockImplementation(() => 'timeCellsData updated');
  });
  afterEach(jest.resetAllMocks);

  it('should provide grouping getter', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <IntegratedGrouping />
      </PluginHost>
    ));

    expect(updateGroupingWithMainResource)
      .toHaveBeenCalledWith('grouping', 'resources');
    expect(getComputedState(tree).grouping)
      .toBe('groupingComputed');
  });

  it('should provide resourcesToGroupBy getter', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <IntegratedGrouping />
      </PluginHost>
    ));

    expect(filterResourcesByGrouping)
      .toHaveBeenCalledWith('resources', 'groupingComputed');
    expect(sortFilteredResources)
      .toHaveBeenCalledWith('filteredResources', 'groupingComputed');
    expect(getComputedState(tree).resourcesToGroupBy)
      .toBe('resourcesToGroupBy');
  });

  it('should provide groups getter', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <IntegratedGrouping />
      </PluginHost>
    ));

    expect(getGroupsFromResources)
      .toHaveBeenCalledWith('resourcesToGroupBy');
    expect(getComputedState(tree).groups)
      .toBe('groups');
  });

  it('should provide viewCellsData getter', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <IntegratedGrouping />
      </PluginHost>
    ));

    expect(expandViewCellsDataWithGroups)
      .toHaveBeenCalledWith('viewCellsData', 'groups', 'resourcesToGroupBy', true, 'groupOrientation');
    expect(getComputedState(tree).viewCellsData)
      .toBe('groupedViewCellsData');
  });

  it('should provide allDayCellsData getter', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <IntegratedGrouping />
      </PluginHost>
    ));

    expect(expandViewCellsDataWithGroups)
      .toHaveBeenCalledWith('allDayCellsData', 'groups', 'resourcesToGroupBy', true, 'groupOrientation');
    expect(getComputedState(tree).allDayCellsData)
      .toBe('groupedViewCellsData');
  });

  it('should provide timeCellsData getter', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <IntegratedGrouping />
      </PluginHost>
    ));

    expect(updateTimeCellsData)
      .toHaveBeenCalledWith('groupedViewCellsData', 'timeCellsData', 'groups', 'resourcesToGroupBy', 'groupOrientation');
    expect(getComputedState(tree).timeCellsData)
      .toBe('timeCellsData updated');
  });

  it('should not update timeCellsData getter if it is undefined', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps, {
          getter: {
            timeCellsData: undefined,
          },
        })}
        <IntegratedGrouping />
      </PluginHost>
    ));

    expect(updateTimeCellsData)
      .toHaveBeenCalledTimes(0);
    expect(getComputedState(tree).timeCellsData)
      .toBe(undefined);
  });

  it('should provide timeTableAppointments getter', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <IntegratedGrouping />
      </PluginHost>
    ));

    expect(expandGroups)
      .toHaveBeenCalledWith('timeTableAppointments', 'groupingComputed', 'resourcesToGroupBy', 'groups', 'excludedDays', false);
    expect(getComputedState(tree).timeTableAppointments)
      .toBe('expandGroups');
  });

  it('should provide allDayAppointments getter', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <IntegratedGrouping />
      </PluginHost>
    ));

    expect(expandGroups)
      .toHaveBeenCalledWith(
        'allDayAppointments', 'groupingComputed',
        'resourcesToGroupBy', 'groups', 'excludedDays', true,
      );
    expect(getComputedState(tree).allDayAppointments)
      .toBe('expandGroups');
  });

  it('should provide allDayElementsMeta getter', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <IntegratedGrouping />
      </PluginHost>
    ));

    expect(updateAllDayCellElementsMeta)
      .toHaveBeenCalledWith(
        'allDayElementsMeta', 'timeTableElementsMeta',
        defaultDeps.getter.groupOrientation,
        'groups', 'allDayPanelExists', 'groupedViewCellsData',
        defaultDeps.getter.currentView,
      );
    expect(getComputedState(tree).allDayElementsMeta)
      .toBe('allDayElementsMeta updated');
  });

  it('should provide timeTableElementsMeta getter', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <IntegratedGrouping />
      </PluginHost>
    ));

    expect(updateTimeTableCellElementsMeta)
      .toHaveBeenCalledWith(
        'timeTableElementsMeta',
        defaultDeps.getter.groupOrientation,
        'groups', 'allDayPanelExists', 'groupedViewCellsData',
        defaultDeps.getter.currentView,
      );
    expect(getComputedState(tree).timeTableElementsMeta)
      .toBe('timeTableElementsMeta updated');
  });
});
