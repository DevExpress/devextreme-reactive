import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { pluginDepsToComponents, getComputedState } from '@devexpress/dx-testing';
import {
  getGroupingItemsFromResources, expandViewCellsDataWithGroups,
  sortFilteredResources, filterResourcesByGrouping,
} from '@devexpress/dx-scheduler-core';
import { IntegratedGrouping } from './integrated-grouping';

jest.mock('@devexpress/dx-scheduler-core', () => ({
  getGroupingItemsFromResources: jest.fn(),
  expandViewCellsDataWithGroups: jest.fn(),
  sortFilteredResources: jest.fn(),
  filterResourcesByGrouping: jest.fn(),
}));

describe('IntegratedGrouping', () => {
  const defaultDeps = {
    plugins: ['Resources', 'GroupingState'],
    getter: {
      viewCellsData: 'viewCellsData',
      resources: 'resources',
      grouping: 'grouping',
    },
  };
  beforeEach(() => {
    filterResourcesByGrouping.mockImplementation(() => 'filteredResources');
    sortFilteredResources.mockImplementation(() => 'resourcesToGroupBy');
    getGroupingItemsFromResources.mockImplementation(() => 'groupingItems');
    expandViewCellsDataWithGroups.mockImplementation(() => 'groupedViewCellsData');
  });

  it('should provide resourcesToGroupBy getter', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <IntegratedGrouping />
      </PluginHost>
    ));

    expect(filterResourcesByGrouping)
      .toHaveBeenCalledWith('resources', 'grouping');
    expect(sortFilteredResources)
      .toHaveBeenCalledWith('filteredResources', 'grouping');
    expect(getComputedState(tree).resourcesToGroupBy)
      .toBe('resourcesToGroupBy');
  });

  it('should provide groupingItems getter', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <IntegratedGrouping />
      </PluginHost>
    ));

    expect(getGroupingItemsFromResources)
      .toHaveBeenCalledWith('resourcesToGroupBy');
    expect(getComputedState(tree).groupingItems)
      .toBe('groupingItems');
  });

  it('should provide viewCellsData getter', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <IntegratedGrouping />
      </PluginHost>
    ));

    expect(expandViewCellsDataWithGroups)
      .toHaveBeenCalledWith('viewCellsData', 'groupingItems', 'resourcesToGroupBy');
    expect(getComputedState(tree).viewCellsData)
      .toBe('groupedViewCellsData');
  });
});
