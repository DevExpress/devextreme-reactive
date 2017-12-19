import React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { PluginHost } from '@devexpress/dx-react-core';
import { pluginDepsToComponents, getComputedState, executeComputedAction } from './test-utils';

import { EditingState } from './editing-state';

const defaultDeps = {
  getter: {
    columns: [],
  },
};
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

  describe('EditingState', () => {
    it('should create a row change by using a custom function', () => {
      const createRowChangeMock = jest.fn();
      const row = { a: 1 };
      const column = { name: 'a' };

      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <EditingState
            {...defaultProps}
            createRowChange={createRowChangeMock}
          />
        </PluginHost>
      ));

      getComputedState(tree).createRowChange(row, column.name, 3);

      expect(createRowChangeMock)
        .toBeCalledWith(row, column.name, 3);
    });
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
  });
});
