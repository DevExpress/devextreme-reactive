import * as React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { PluginHost } from '@devexpress/dx-react-core';
import { toggleRowExpanded } from '@devexpress/dx-grid-core';
import { pluginDepsToComponents, getComputedState, executeComputedAction } from './test-utils';
import { TreeDataState } from './tree-data-state';

jest.mock('@devexpress/dx-grid-core', () => ({
  toggleRowExpanded: jest.fn(),
}));

const defaultDeps = {
  getter: {
    rows: [{ id: 1 }],
  },
};

describe('TreeDataState', () => {
  let resetConsole;

  beforeAll(() => {
    resetConsole = setupConsole();
  });
  afterAll(() => {
    resetConsole();
  });

  beforeEach(() => {
    toggleRowExpanded.mockImplementation(() => []);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should provide expandedRowIds defined in defaultExpandedRowIds property', () => {
    const defaultExpandedRowIds = [{ columnName: 'a', value: 'a' }];

    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TreeDataState
          defaultExpandedRowIds={defaultExpandedRowIds}
        />
      </PluginHost>
    ));

    expect(getComputedState(tree).expandedRowIds)
      .toBe(defaultExpandedRowIds);
  });

  it('should provide expandedRowIds defined in expandedRowIds property', () => {
    const expandedRowIds = [{ columnName: 'a', value: 'a' }];

    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TreeDataState
          expandedRowIds={expandedRowIds}
        />
      </PluginHost>
    ));

    expect(getComputedState(tree).expandedRowIds)
      .toBe(expandedRowIds);
  });

  it('should fire the "onExpandedRowIdsChange" callback and should change expandedRowIds in uncontrolled mode after the "toggleRowExpanded" action is fired', () => {
    const defaultExpandedRowIds = [{ columnName: 'a', value: 'a' }];
    const newExpandedRowIds = [{ columnName: 'b', value: 'a' }];

    const expandedRowIdsChange = jest.fn();
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TreeDataState
          defaultExpandedRowIds={defaultExpandedRowIds}
          onExpandedRowIdsChange={expandedRowIdsChange}
        />
      </PluginHost>
    ));

    const payload = {};
    toggleRowExpanded.mockReturnValue(newExpandedRowIds);
    executeComputedAction(tree, actions => actions.toggleRowExpanded(payload));

    expect(toggleRowExpanded)
      .toBeCalledWith(defaultExpandedRowIds, payload);

    expect(getComputedState(tree).expandedRowIds)
      .toBe(newExpandedRowIds);

    expect(expandedRowIdsChange)
      .toBeCalledWith(newExpandedRowIds);
  });

  it('should fire the "onExpandedRowIdsChange" callback and should change expandedRowIds in controlled mode after the "toggleRowExpanded" action is fired', () => {
    const expandedRowIds = [{ columnName: 'a', value: 'a' }];
    const newExpandedRowIds = [{ columnName: 'b', value: 'a' }];

    const expandedRowIdsChange = jest.fn();
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TreeDataState
          expandedRowIds={expandedRowIds}
          onExpandedRowIdsChange={expandedRowIdsChange}
        />
      </PluginHost>
    ));

    const payload = {};
    toggleRowExpanded.mockReturnValue(newExpandedRowIds);
    executeComputedAction(tree, actions => actions.toggleRowExpanded(payload));

    expect(toggleRowExpanded)
      .toBeCalledWith(expandedRowIds, payload);

    expect(getComputedState(tree).expandedRowIds)
      .toBe(expandedRowIds);

    expect(expandedRowIdsChange)
      .toBeCalledWith(newExpandedRowIds);
  });

  describe('action sequence in batch', () => {
    it('should correctly work with the several action calls in the uncontrolled mode', () => {
      const defaultExpandedRowIds = [1];
      const transitionalExpandedRowIds = [2];
      const newExpandedRowIds = [3];
      const payload = {};

      const expandedRowIdsChange = jest.fn();
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <TreeDataState
            defaultExpandedRowIds={defaultExpandedRowIds}
            onExpandedRowIdsChange={expandedRowIdsChange}
          />
        </PluginHost>
      ));

      toggleRowExpanded.mockReturnValueOnce(transitionalExpandedRowIds);
      toggleRowExpanded.mockReturnValueOnce(newExpandedRowIds);
      executeComputedAction(tree, (actions) => {
        actions.toggleRowExpanded(payload);
        actions.toggleRowExpanded(payload);
      });

      expect(toggleRowExpanded)
        .lastCalledWith(transitionalExpandedRowIds, payload);

      expect(expandedRowIdsChange)
        .toHaveBeenCalledTimes(1);
    });

    it('should correctly work with the several action calls in the controlled mode', () => {
      const expandedRowIds = [1];
      const transitionalExpandedRowIds = [2];
      const newExpandedRowIds = [3];
      const payload = {};

      const expandedRowIdsChange = jest.fn();
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <TreeDataState
            expandedRowIds={expandedRowIds}
            onExpandedRowIdsChange={expandedRowIdsChange}
          />
        </PluginHost>
      ));

      toggleRowExpanded.mockReturnValueOnce(transitionalExpandedRowIds);
      toggleRowExpanded.mockReturnValueOnce(newExpandedRowIds);
      executeComputedAction(tree, (actions) => {
        actions.toggleRowExpanded(payload);
        actions.toggleRowExpanded(payload);
      });

      expect(toggleRowExpanded)
        .lastCalledWith(transitionalExpandedRowIds, payload);

      expect(expandedRowIdsChange)
        .toHaveBeenCalledTimes(1);
    });
  });
});
