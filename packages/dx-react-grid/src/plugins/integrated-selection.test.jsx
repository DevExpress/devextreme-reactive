import * as React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { PluginHost } from '@devexpress/dx-react-core';
import {
  getAvailableToSelect,
  someSelected,
  allSelected,
} from '@devexpress/dx-grid-core';
import { pluginDepsToComponents, getComputedState, executeComputedAction } from './test-utils';
import { IntegratedSelection } from './integrated-selection';

jest.mock('@devexpress/dx-grid-core', () => ({
  someSelected: jest.fn(),
  allSelected: jest.fn(),
  getAvailableToSelect: jest.fn(),
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
    getAvailableToSelect.mockImplementation(() => [0, 1, 2]);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should call availableToSelect after component render', () => {
    mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <IntegratedSelection />
      </PluginHost>
    ));

    expect(getAvailableToSelect)
      .toHaveBeenCalledWith(
        defaultDeps.getter.rows,
        defaultDeps.getter.getRowId,
        defaultDeps.getter.isGroupRow,
      );
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
      .toHaveBeenCalledWith({
        selection: defaultDeps.getter.selection,
        availableToSelect: [],
      });
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
      .toHaveBeenCalledWith({
        selection: defaultDeps.getter.selection,
        availableToSelect: [],
      });
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
