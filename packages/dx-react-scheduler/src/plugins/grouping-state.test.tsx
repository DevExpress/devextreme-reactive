import * as React from 'react';
import {
  testStatePluginField, pluginDepsToComponents, getComputedState, setupConsole,
} from '@devexpress/dx-testing';
import {
  toggleExpandedGroups,
} from '@devexpress/dx-scheduler-core';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { GroupingState } from './grouping-state';

jest.mock('@devexpress/dx-scheduler-core', () => ({
  ...require.requireActual('@devexpress/dx-scheduler-core'),
  toggleExpandedGroups: jest.fn(),
}));

const defaultDeps = {
  getter: {},
};

describe('GroupingState', () => {
  let resetConsole;

  beforeAll(() => {
    resetConsole = setupConsole();
  });
  afterAll(() => {
    resetConsole();
  });

  beforeEach(() => {
    toggleExpandedGroups.mockImplementation(() => {});
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  testStatePluginField({
    defaultDeps,
    Plugin: GroupingState,
    propertyName: 'expandedGroups',
    values: [
      ['A'],
      ['B'],
      ['C'],
    ],
    actions: [{
      actionName: 'toggleGroupExpanded',
      reducer: toggleExpandedGroups,
      fieldReducer: false,
    }],
  });
  it('should provide "grouping" getter', () => {
    const tree = mount((
      <PluginHost>
        <GroupingState
          grouping={[{
            resourceName: 'a',
          }]}
        />
        {pluginDepsToComponents({})}
      </PluginHost>
    ));

    expect(getComputedState(tree).grouping)
      .toEqual([{
        resourceName: 'a',
      }]);
  });
  it('should provide "groupByDate" getter', () => {
    const tree = mount((
      <PluginHost>
        <GroupingState
          groupByDate={viewName => viewName !== 'day'}
        />
        {pluginDepsToComponents({})}
      </PluginHost>
    ));

    expect(getComputedState(tree).groupByDate('day'))
      .toBeFalsy();
    expect(getComputedState(tree).groupByDate('week'))
      .toBeTruthy();
  });
});
