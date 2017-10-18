import React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { PluginHost } from '@devexpress/dx-react-core';
import {
  setRowsSelection,
  getAvailableSelection,
  getAvailableToSelect,
} from '@devexpress/dx-grid-core';
import { pluginDepsToComponents, getComputedState } from './test-utils';
import { SelectionState } from './selection-state';

jest.mock('@devexpress/dx-grid-core', () => ({
  setRowsSelection: jest.fn(),
  getAvailableSelection: jest.fn(),
  getAvailableToSelect: jest.fn(),
}));

const defaultDeps = {
  getter: {
    rows: [{ id: 1 }],
    getRowId: row => row.id,
  },
};

describe('SelectionState', () => {
  let resetConsole;

  beforeAll(() => {
    resetConsole = setupConsole();
  });
  afterAll(() => {
    resetConsole();
  });

  beforeEach(() => {
    setRowsSelection.mockImplementation(() => ({}));
    getAvailableSelection.mockImplementation(() => 'avaliableSelection');
    getAvailableToSelect.mockImplementation(() => 'availableToSelect');
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should provide avaliableToSelect', () => {
    const deps = {
      getter: {
        isGroupRow: () => false,
      },
      plugins: ['LocalGrouping'],
    };

    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps, deps)}
        <SelectionState />
      </PluginHost>
    ));

    expect(getComputedState(tree).getters.availableToSelect)
      .toBe(getAvailableToSelect());

    expect(getAvailableToSelect)
      .toHaveBeenCalledWith(
        defaultDeps.getter.rows,
        defaultDeps.getter.getRowId,
        deps.getter.isGroupRow,
      );
  });

  it('should provide selection defined in defaultSelection', () => {
    const defaultSelection = [1, 2, 3];

    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <SelectionState
          defaultSelection={defaultSelection}
        />
      </PluginHost>
    ));

    expect(getComputedState(tree).getters.selection)
      .toBe(getAvailableSelection());

    expect(getAvailableSelection)
      .toHaveBeenCalledWith(defaultSelection, getAvailableToSelect());
  });

  it('should provide selection defined in selection', () => {
    const selection = [1, 2, 3];

    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <SelectionState
          selection={selection}
        />
      </PluginHost>
    ));

    expect(getComputedState(tree).getters.selection)
      .toBe(getAvailableSelection());

    expect(getAvailableSelection)
      .toHaveBeenCalledWith(selection, getAvailableToSelect());
  });
});
