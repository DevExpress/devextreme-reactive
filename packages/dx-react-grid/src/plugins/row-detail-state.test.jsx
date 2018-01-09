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

  it('should provide expandedRows defined in defaultExpandedRows property', () => {
    const defaultExpandedRows = [{ columnName: 'a', value: 'a' }];

    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <RowDetailState
          defaultExpandedRows={defaultExpandedRows}
        />
      </PluginHost>
    ));

    expect(getComputedState(tree).expandedRows)
      .toBe(defaultExpandedRows);
  });

  it('should provide expandedRows defined in expandedRows property', () => {
    const expandedRows = [{ columnName: 'a', value: 'a' }];

    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <RowDetailState
          expandedRows={expandedRows}
        />
      </PluginHost>
    ));

    expect(getComputedState(tree).expandedRows)
      .toBe(expandedRows);
  });

  it('should fire the "onExpandedRowsChange" callback and should change expandedRows in uncontrolled mode after the "toggleDetailRowExpanded" action is fired', () => {
    const defaultExpandedRows = [{ columnName: 'a', value: 'a' }];
    const newExpandedRows = [{ columnName: 'b', value: 'a' }];

    const expandedRowsChange = jest.fn();
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <RowDetailState
          defaultExpandedRows={defaultExpandedRows}
          onExpandedRowsChange={expandedRowsChange}
        />
      </PluginHost>
    ));

    const payload = {};
    toggleDetailRowExpanded.mockReturnValue(newExpandedRows);
    executeComputedAction(tree, actions => actions.toggleDetailRowExpanded(payload));

    expect(toggleDetailRowExpanded)
      .toBeCalledWith(defaultExpandedRows, payload);

    expect(getComputedState(tree).expandedRows)
      .toBe(newExpandedRows);

    expect(expandedRowsChange)
      .toBeCalledWith(newExpandedRows);
  });

  it('should fire the "onExpandedRowsChange" callback and should change expandedRows in controlled mode after the "toggleDetailRowExpanded" action is fired', () => {
    const expandedRows = [{ columnName: 'a', value: 'a' }];
    const newExpandedRows = [{ columnName: 'b', value: 'a' }];

    const expandedRowsChange = jest.fn();
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <RowDetailState
          expandedRows={expandedRows}
          onExpandedRowsChange={expandedRowsChange}
        />
      </PluginHost>
    ));

    const payload = {};
    toggleDetailRowExpanded.mockReturnValue(newExpandedRows);
    executeComputedAction(tree, actions => actions.toggleDetailRowExpanded(payload));

    expect(toggleDetailRowExpanded)
      .toBeCalledWith(expandedRows, payload);

    expect(getComputedState(tree).expandedRows)
      .toBe(expandedRows);

    expect(expandedRowsChange)
      .toBeCalledWith(newExpandedRows);
  });

  describe('action sequence in batch', () => {
    it('should correctly work with the several action calls in the uncontrolled mode', () => {
      const defaultExpandedRows = [1];
      const transitionalExpandedRows = [2];
      const newExpandedRows = [3];
      const payload = {};

      const expandedRowsChange = jest.fn();
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <RowDetailState
            defaultExpandedRows={defaultExpandedRows}
            onExpandedRowsChange={expandedRowsChange}
          />
        </PluginHost>
      ));

      toggleDetailRowExpanded.mockReturnValueOnce(transitionalExpandedRows);
      toggleDetailRowExpanded.mockReturnValueOnce(newExpandedRows);
      executeComputedAction(tree, (actions) => {
        actions.toggleDetailRowExpanded(payload);
        actions.toggleDetailRowExpanded(payload);
      });

      expect(toggleDetailRowExpanded)
        .lastCalledWith(transitionalExpandedRows, payload);

      expect(expandedRowsChange)
        .toHaveBeenCalledTimes(1);
    });

    it('should correctly work with the several action calls in the controlled mode', () => {
      const expandedRows = [1];
      const transitionalExpandedRows = [2];
      const newExpandedRows = [3];
      const payload = {};

      const expandedRowsChange = jest.fn();
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <RowDetailState
            expandedRows={expandedRows}
            onExpandedRowsChange={expandedRowsChange}
          />
        </PluginHost>
      ));

      toggleDetailRowExpanded.mockReturnValueOnce(transitionalExpandedRows);
      toggleDetailRowExpanded.mockReturnValueOnce(newExpandedRows);
      executeComputedAction(tree, (actions) => {
        actions.toggleDetailRowExpanded(payload);
        actions.toggleDetailRowExpanded(payload);
      });

      expect(toggleDetailRowExpanded)
        .lastCalledWith(transitionalExpandedRows, payload);

      expect(expandedRowsChange)
        .toHaveBeenCalledTimes(1);
    });
  });
});
