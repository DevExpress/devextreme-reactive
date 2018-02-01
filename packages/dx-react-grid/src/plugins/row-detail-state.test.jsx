import React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { PluginHost } from '@devexpress/dx-react-core';
import { toggleDetailRowExpanded } from '@devexpress/dx-grid-core';
import { pluginDepsToComponents, getComputedState, executeComputedAction } from './test-utils';
import { RowDetailState } from './row-detail-state';

jest.mock('@devexpress/dx-grid-core', () => ({
  toggleDetailRowExpanded: jest.fn(),
}));

const defaultDeps = {
  getter: {
    rows: [{ id: 1 }],
  },
};

describe('RowDetailState', () => {
  let resetConsole;

  beforeAll(() => {
    resetConsole = setupConsole();
  });
  afterAll(() => {
    resetConsole();
  });

  beforeEach(() => {
    toggleDetailRowExpanded.mockImplementation(() => []);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should provide expandedDetailRowIds defined in defaultExpandedRowIds property', () => {
    const defaultExpandedRowIds = [{ columnName: 'a', value: 'a' }];

    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <RowDetailState
          defaultExpandedRowIds={defaultExpandedRowIds}
        />
      </PluginHost>
    ));

    expect(getComputedState(tree).expandedDetailRowIds)
      .toBe(defaultExpandedRowIds);
  });

  it('should provide expandedDetailRowIds defined in expandedRowIds property', () => {
    const expandedRowIds = [{ columnName: 'a', value: 'a' }];

    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <RowDetailState
          expandedRowIds={expandedRowIds}
        />
      </PluginHost>
    ));

    expect(getComputedState(tree).expandedDetailRowIds)
      .toBe(expandedRowIds);
  });

  it('should fire the "onExpandedRowIdsChange" callback and should change expandedDetailRowIds in uncontrolled mode after the "toggleDetailRowExpanded" action is fired', () => {
    const defaultExpandedRowIds = [{ columnName: 'a', value: 'a' }];
    const newExpandedRowIds = [{ columnName: 'b', value: 'a' }];

    const expandedRowIdsChange = jest.fn();
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <RowDetailState
          defaultExpandedRowIds={defaultExpandedRowIds}
          onExpandedRowIdsChange={expandedRowIdsChange}
        />
      </PluginHost>
    ));

    const payload = {};
    toggleDetailRowExpanded.mockReturnValue(newExpandedRowIds);
    executeComputedAction(tree, actions => actions.toggleDetailRowExpanded(payload));

    expect(toggleDetailRowExpanded)
      .toBeCalledWith(defaultExpandedRowIds, payload);

    expect(getComputedState(tree).expandedDetailRowIds)
      .toBe(newExpandedRowIds);

    expect(expandedRowIdsChange)
      .toBeCalledWith(newExpandedRowIds);
  });

  it('should fire the "onExpandedRowIdsChange" callback and should change expandedDetailRowIds in controlled mode after the "toggleDetailRowExpanded" action is fired', () => {
    const expandedRowIds = [{ columnName: 'a', value: 'a' }];
    const newExpandedRowIds = [{ columnName: 'b', value: 'a' }];

    const expandedRowIdsChange = jest.fn();
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <RowDetailState
          expandedRowIds={expandedRowIds}
          onExpandedRowIdsChange={expandedRowIdsChange}
        />
      </PluginHost>
    ));

    const payload = {};
    toggleDetailRowExpanded.mockReturnValue(newExpandedRowIds);
    executeComputedAction(tree, actions => actions.toggleDetailRowExpanded(payload));

    expect(toggleDetailRowExpanded)
      .toBeCalledWith(expandedRowIds, payload);

    expect(getComputedState(tree).expandedDetailRowIds)
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
          <RowDetailState
            defaultExpandedRowIds={defaultExpandedRowIds}
            onExpandedRowIdsChange={expandedRowIdsChange}
          />
        </PluginHost>
      ));

      toggleDetailRowExpanded.mockReturnValueOnce(transitionalExpandedRowIds);
      toggleDetailRowExpanded.mockReturnValueOnce(newExpandedRowIds);
      executeComputedAction(tree, (actions) => {
        actions.toggleDetailRowExpanded(payload);
        actions.toggleDetailRowExpanded(payload);
      });

      expect(toggleDetailRowExpanded)
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
          <RowDetailState
            expandedRowIds={expandedRowIds}
            onExpandedRowIdsChange={expandedRowIdsChange}
          />
        </PluginHost>
      ));

      toggleDetailRowExpanded.mockReturnValueOnce(transitionalExpandedRowIds);
      toggleDetailRowExpanded.mockReturnValueOnce(newExpandedRowIds);
      executeComputedAction(tree, (actions) => {
        actions.toggleDetailRowExpanded(payload);
        actions.toggleDetailRowExpanded(payload);
      });

      expect(toggleDetailRowExpanded)
        .lastCalledWith(transitionalExpandedRowIds, payload);

      expect(expandedRowIdsChange)
        .toHaveBeenCalledTimes(1);
    });
  });
});
