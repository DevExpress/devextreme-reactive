import * as React from 'react';
import { mount } from 'enzyme';
import {
  pluginDepsToComponents, getComputedState, testStatePluginField, setupConsole,
} from '@devexpress/dx-testing';
import { PluginHost } from '@devexpress/dx-react-core';
import {
  createRowChangeGetter,
  getColumnExtensionValueGetter,
  startEditRows, stopEditRows,
  startEditCells, stopEditCells,
  deleteRows, cancelDeletedRows,
  changeRow, cancelChanges,
  addRow, changeAddedRow, cancelAddedRows,
} from '@devexpress/dx-grid-core';
import { EditingState } from './editing-state';

jest.mock('@devexpress/dx-grid-core', () => ({
  ...jest.requireActual('@devexpress/dx-grid-core'),
  startEditRows: jest.fn(),
  stopEditRows: jest.fn(),
  startEditCells: jest.fn(),
  stopEditCells: jest.fn(),
  deleteRows: jest.fn(),
  cancelDeletedRows: jest.fn(),
  createRowChangeGetter: jest.fn(),
  getColumnExtensionValueGetter: jest.fn(),
  changeRow: jest.fn(),
  cancelChanges: jest.fn(),
  addRow: jest.fn(),
  changeAddedRow: jest.fn(),
  cancelAddedRows: jest.fn(),
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
    getColumnExtensionValueGetter.mockImplementation(() => ((() => {})));
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

  testStatePluginField({
    defaultDeps,
    defaultProps,
    Plugin: EditingState,
    propertyName: 'editingRowIds',
    values: [
      [0],
      [1],
      [2],
    ],
    actions: [{
      actionName: 'startEditRows',
      reducer: startEditRows,
    }, {
      actionName: 'stopEditRows',
      reducer: stopEditRows,
    }],
  });

  testStatePluginField({
    defaultDeps,
    defaultProps,
    Plugin: EditingState,
    propertyName: 'editingCells',
    values: [
      [{ rowId: 0, columnName: 'a' }],
      [{ rowId: 1, columnName: 'a' }],
      [{ rowId: 2, columnName: 'a' }],
    ],
    actions: [{
      actionName: 'startEditCells',
      reducer: startEditCells,
    }, {
      actionName: 'stopEditCells',
      reducer: stopEditCells,
    }],
  });

  testStatePluginField({
    defaultDeps,
    defaultProps,
    Plugin: EditingState,
    propertyName: 'deletedRowIds',
    values: [
      [0],
      [1],
      [2],
    ],
    actions: [{
      actionName: 'deleteRows',
      reducer: deleteRows,
    }, {
      actionName: 'cancelDeletedRows',
      reducer: cancelDeletedRows,
    }],
  });

  testStatePluginField({
    defaultDeps,
    defaultProps,
    Plugin: EditingState,
    propertyName: 'rowChanges',
    values: [
      { 1: { a: 0 } },
      { 1: { a: 1 } },
      { 1: { a: 2 } },
    ],
    actions: [{
      actionName: 'changeRow',
      reducer: changeRow,
    }, {
      actionName: 'cancelChangedRows',
      reducer: cancelChanges,
    }],
  });

  testStatePluginField({
    defaultDeps,
    defaultProps,
    Plugin: EditingState,
    propertyName: 'addedRows',
    values: [
      [{ a: 0 }],
      [{ a: 1 }],
      [{ a: 2 }],
    ],
    actions: [{
      actionName: 'addRow',
      reducer: addRow,
    }, {
      actionName: 'changeAddedRow',
      reducer: changeAddedRow,
    }, {
      actionName: 'cancelAddedRows',
      reducer: cancelAddedRows,
    }],
  });

  describe('column extensions', () => {
    it('should correctly call getColumnExtensionValueGetter', () => {
      const columnExtensions = [{ columnName: 'a', editingEnabled: true }];
      mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <EditingState
            {...defaultProps}
            columnEditingEnabled={false}
            columnExtensions={columnExtensions}
          />
        </PluginHost>
      ));
      expect(getColumnExtensionValueGetter)
        .toBeCalledWith(columnExtensions, 'editingEnabled', false);
    });
  });
});
