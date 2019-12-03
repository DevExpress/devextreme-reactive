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
    sortFilteredResources.mockImplementation(() => 'sortedResources');
    getGroupingItemsFromResources.mockImplementation(() => 'groupingItems');
    expandViewCellsDataWithGroups.mockImplementation(() => 'groupedViewCellsData');
  });

  it('should provide sortedResources getter', () => {
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
    expect(getComputedState(tree).sortedResources)
      .toBe('sortedResources');
  });

  it('should provide groupingItems getter', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <IntegratedGrouping />
      </PluginHost>
    ));

    expect(getGroupingItemsFromResources)
      .toHaveBeenCalledWith('sortedResources');
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
      .toHaveBeenCalledWith('viewCellsData', 'groupingItems', 'sortedResources');
    expect(getComputedState(tree).viewCellsData)
      .toBe('groupedViewCellsData');
  });
});
