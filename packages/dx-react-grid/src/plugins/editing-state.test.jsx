import React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { PluginHost } from '@devexpress/dx-react-core';
import { createRowChangeGetter } from '@devexpress/dx-grid-core';
import { pluginDepsToComponents, getComputedState, executeComputedAction } from './test-utils';
import { EditingState } from './editing-state';

jest.mock('@devexpress/dx-grid-core', () => ({
  ...require.requireActual('@devexpress/dx-grid-core'),
  createRowChangeGetter: jest.fn(),
}));

const defaultDeps = {};
const defaultProps = {
  onCommitChanges: () => {},
};

describe('EditingState', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });
  afterAll(() => {
    resetConsole();
  });

  beforeEach(() => {
    createRowChangeGetter.mockImplementation(() => ({ a: 1 }));
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should provide createRowChange', () => {
    const columnExtensions = [];
    const createRowChange = () => {};

    const tree = mount((
      <PluginHost>
        <EditingState
          {...defaultProps}
          createRowChange={createRowChange}
          columnExtensions={columnExtensions}
        />
        {pluginDepsToComponents({})}
      </PluginHost>
    ));

    expect(createRowChangeGetter)
      .toBeCalledWith(createRowChange, columnExtensions);
    expect(getComputedState(tree).createRowChange)
      .toEqual(createRowChangeGetter());
  });

  describe('action sequence in batch', () => {
    it('should correctly work with the several action calls in the uncontrolled mode', () => {
      const addedRowsChange = jest.fn();
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <EditingState
            {...defaultProps}
            defaultAddedRows={[]}
            onAddedRowsChange={addedRowsChange}
          />
        </PluginHost>
      ));

      executeComputedAction(tree, (actions) => {
        actions.addRow();
        actions.addRow();
      });

      expect(addedRowsChange)
        .toBeCalledWith([{}, {}]);

      expect(addedRowsChange)
        .toHaveBeenCalledTimes(1);
    });

    it('should correctly work with the several action calls in the controlled mode', () => {
      const addedRowsChange = jest.fn();
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <EditingState
            {...defaultProps}
            addedRows={[]}
            onAddedRowsChange={addedRowsChange}
          />
        </PluginHost>
      ));

      executeComputedAction(tree, (actions) => {
        actions.addRow();
        actions.addRow();
      });

      expect(addedRowsChange)
        .toBeCalledWith([{}, {}]);

      expect(addedRowsChange)
        .toHaveBeenCalledTimes(1);
    });

    it('should correctly work with the several editing action calls in the controlled mode', () => {
      const changeEditingRowIds = jest.fn();
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <EditingState
            {...defaultProps}
            editingRowIds={[]}
            changedRows={{}}
            onEditingRowIdsChange={changeEditingRowIds}
          />
        </PluginHost>
      ));

      executeComputedAction(tree, (actions) => {
        actions.startEditRows({ rowIds: [0] });
        actions.stopEditRows({ rowIds: [0] });
        actions.changeRow({ rowIds: [0] });
      });

      expect(changeEditingRowIds)
        .toBeCalledWith([]);

      expect(changeEditingRowIds)
        .toHaveBeenCalledTimes(1);
    });
  });
});
