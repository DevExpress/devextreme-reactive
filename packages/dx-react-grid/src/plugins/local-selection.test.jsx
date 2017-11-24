import React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { PluginHost } from '@devexpress/dx-react-core';
import {
  getAvailableToSelect,
  isSomeSelected,
  isAllSelected,
} from '@devexpress/dx-grid-core';
import { pluginDepsToComponents, getComputedState } from './test-utils';
import { LocalSelection } from './local-selection';

jest.mock('@devexpress/dx-grid-core', () => ({
  isSomeSelected: jest.fn(),
  isAllSelected: jest.fn(),
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

describe('LocalSelection', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole();
  });
  afterAll(() => {
    resetConsole();
  });
  beforeEach(() => {
    isSomeSelected.mockImplementation(() => 'someSelected');
    isAllSelected.mockImplementation(() => 'allSelected');
    getAvailableToSelect.mockImplementation(() => [0, 1, 2]);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should call availableToSelect on the start', () => {
    mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <LocalSelection />
      </PluginHost>
    ));

    expect(getAvailableToSelect)
      .toHaveBeenCalledWith(
        defaultDeps.getter.rows,
        defaultDeps.getter.getRowId,
        defaultDeps.getter.isGroupRow,
      );
  });

  it('should call getter allSelected', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <LocalSelection />
      </PluginHost>
    ));

    expect(getComputedState(tree).getters.allSelected)
      .toBe('allSelected');
  });
  it('should call getter someSelected', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <LocalSelection />
      </PluginHost>
    ));

    expect(getComputedState(tree).getters.someSelected)
      .toBe('someSelected');
  });
  it('should call getter selectAllAvailable', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <LocalSelection />
      </PluginHost>
    ));

    expect(getComputedState(tree).getters.selectAllAvailable)
      .toBe(!!defaultDeps.getter.rows.length);
  });
  it('should call getter allSelected', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <LocalSelection />
      </PluginHost>
    ));

    getComputedState(tree).actions.toggleSelectAll();
    expect(defaultDeps.action.toggleSelection.mock.calls.length).toBe(1);
  });
});
