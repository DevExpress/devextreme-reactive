import React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { PluginHost } from '@devexpress/dx-react-core';
import {
  toggleSelection,
} from '@devexpress/dx-grid-core';
import { pluginDepsToComponents, getComputedState, executeComputedAction } from './test-utils';
import { SelectionState } from './selection-state';

jest.mock('@devexpress/dx-grid-core', () => ({
  toggleSelection: jest.fn(),
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

    expect(getComputedState(tree).selection)
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

    expect(getComputedState(tree).selection)
      .toEqual(new Set(selection));
  });

  it('should call toggleSelection in action', () => {
    const selection = [1, 2, 3];
    const mockSetRowsSelection = toggleSelection;

    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <SelectionState
          selection={selection}
        />
      </PluginHost>
    ));

    executeComputedAction(tree, actions => actions.toggleSelection({ rowIds: [0, 1, 2] }));
    expect(mockSetRowsSelection)
      .toHaveBeenCalled();
  });

  describe('action sequence in batch', () => {
    it('should correctly work with the several action calls in the uncontrolled mode', () => {
      const defaultSelection = [1];
      const transitionalSelection = [2];
      const newSelection = [3];
      const payload = {};

      const selectionChange = jest.fn();
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <SelectionState
            defaultSelection={defaultSelection}
            onSelectionChange={selectionChange}
          />
        </PluginHost>
      ));

      toggleSelection.mockReturnValueOnce(transitionalSelection);
      toggleSelection.mockReturnValueOnce(newSelection);
      executeComputedAction(tree, (actions) => {
        actions.toggleSelection(payload);
        actions.toggleSelection(payload);
      });

      expect(toggleSelection)
        .lastCalledWith(transitionalSelection, payload);

      expect(selectionChange)
        .toHaveBeenCalledTimes(1);
    });

    it('should correctly work with the several action calls in the controlled mode', () => {
      const selection = [1];
      const transitionalSelection = [2];
      const newSelection = [3];
      const payload = {};

      const selectionChange = jest.fn();
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <SelectionState
            selection={selection}
            onSelectionChange={selectionChange}
          />
        </PluginHost>
      ));

      toggleSelection.mockReturnValueOnce(transitionalSelection);
      toggleSelection.mockReturnValueOnce(newSelection);
      executeComputedAction(tree, (actions) => {
        actions.toggleSelection(payload);
        actions.toggleSelection(payload);
      });

      expect(toggleSelection)
        .lastCalledWith(transitionalSelection, payload);

      expect(selectionChange)
        .toHaveBeenCalledTimes(1);
    });
  });
});
