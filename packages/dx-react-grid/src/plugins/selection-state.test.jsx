import React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { PluginHost } from '@devexpress/dx-react-core';
import {
  setRowsSelection,
} from '@devexpress/dx-grid-core';
import { pluginDepsToComponents, getComputedState } from './test-utils';
import { SelectionState } from './selection-state';

jest.mock('@devexpress/dx-grid-core', () => ({
  setRowsSelection: jest.fn(),
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
  afterEach(() => {
    jest.resetAllMocks();
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
      .toEqual(new Set(defaultSelection));
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
      .toEqual(new Set(selection));
  });

  it('should call setRowsSelection in action', () => {
    const selection = [1, 2, 3];
    const mockSetRowsSelection = setRowsSelection;

    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <SelectionState
          selection={selection}
        />
      </PluginHost>
    ));

    getComputedState(tree).actions.toggleSelection({ rowIds: [0, 1, 2] });
    expect(mockSetRowsSelection)
      .toHaveBeenCalled();
  });
});
