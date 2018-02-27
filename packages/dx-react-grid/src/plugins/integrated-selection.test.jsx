import React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { PluginHost } from '@devexpress/dx-react-core';
import {
  rowsWithAlailableToSelect,
  someSelected,
  allSelected,
  unwrapSelecetedRows,
} from '@devexpress/dx-grid-core';
import { pluginDepsToComponents, getComputedState, executeComputedAction } from './test-utils';
import { IntegratedSelection } from './integrated-selection';

jest.mock('@devexpress/dx-grid-core', () => ({
  someSelected: jest.fn(),
  allSelected: jest.fn(),
  rowsWithAlailableToSelect: jest.fn(),
  unwrapSelecetedRows: jest.fn(),
}));

const defaultDeps = {
  getter: {
    selection: [0, 1, 2],
    rows: [{ id: 0 }, { id: 1 }, { id: 2 }],
    getRowId: row => row.id,
    isGroupRow: false,
  },
  action: {
    toggleSelection: jest.fn(),
  },
  plugins: ['SelectionState'],
};

describe('IntegratedSelection', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole();
  });
  afterAll(() => {
    resetConsole();
  });
  beforeEach(() => {
    someSelected.mockImplementation(() => 'someSelected');
    allSelected.mockImplementation(() => 'allSelected');
    rowsWithAlailableToSelect.mockImplementation(() => ({ availableToSelect: [0, 1, 2] }));
    unwrapSelecetedRows.mockImplementation(() => 'unwrapSelecetedRows');
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should call availableToSelect after component render', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <IntegratedSelection />
      </PluginHost>
    ));

    expect(rowsWithAlailableToSelect)
      .toHaveBeenCalledWith(
        defaultDeps.getter.rows,
        defaultDeps.getter.getRowId,
        defaultDeps.getter.isGroupRow,
      );
    expect(unwrapSelecetedRows)
      .toBeCalledWith(rowsWithAlailableToSelect());
    expect(getComputedState(tree).rows)
      .toBe(unwrapSelecetedRows());
  });

  it('should provide allSelected getter', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <IntegratedSelection />
      </PluginHost>
    ));

    expect(getComputedState(tree).allSelected)
      .toBe('allSelected');

    expect(allSelected)
      .toHaveBeenCalledWith(
        rowsWithAlailableToSelect(),
        defaultDeps.getter.selection,
      );
  });
  it('should provide someSelected getter', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <IntegratedSelection />
      </PluginHost>
    ));

    expect(getComputedState(tree).someSelected)
      .toBe('someSelected');

    expect(someSelected)
      .toHaveBeenCalledWith(
        rowsWithAlailableToSelect(),
        defaultDeps.getter.selection,
      );
  });
  it('should provide selectAllAvailable getter', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <IntegratedSelection />
      </PluginHost>
    ));

    expect(getComputedState(tree).selectAllAvailable)
      .toBe(!!defaultDeps.getter.rows.length);
  });
  it('should provide toggleSelection action', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <IntegratedSelection />
      </PluginHost>
    ));

    executeComputedAction(tree, actions => actions.toggleSelectAll());
    expect(defaultDeps.action.toggleSelection.mock.calls.length).toBe(1);
  });
});
