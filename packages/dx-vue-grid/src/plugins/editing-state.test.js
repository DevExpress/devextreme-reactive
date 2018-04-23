import { mount } from '@vue/test-utils';
import { setupConsole } from '@devexpress/dx-testing';
import { PluginHost } from '@devexpress/dx-vue-core';
import {
  createRowChangeGetter,
  getColumnExtensionValueGetter,
  startEditRows, stopEditRows,
  deleteRows, cancelDeletedRows,
  changeRow, cancelChanges,
  addRow, changeAddedRow, cancelAddedRows,
  changedRowsByIds, addedRowsByIds,
} from '@devexpress/dx-grid-core';
import { PluginDepsToComponents, getComputedState, executeComputedAction } from './test-utils';
import { EditingState } from './editing-state';

jest.mock('@devexpress/dx-grid-core', () => ({
  ...require.requireActual('@devexpress/dx-grid-core'),
  startEditRows: jest.fn(),
  stopEditRows: jest.fn(),
  deleteRows: jest.fn(),
  cancelDeletedRows: jest.fn(),
  createRowChangeGetter: jest.fn(),
  getColumnExtensionValueGetter: jest.fn(),
  changeRow: jest.fn(),
  cancelChanges: jest.fn(),
  addRow: jest.fn(),
  changeAddedRow: jest.fn(),
  cancelAddedRows: jest.fn(),
  changedRowsByIds: jest.fn(),
  addedRowsByIds: jest.fn(),
}));

const defaultDeps = {};

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
    getColumnExtensionValueGetter.mockImplementation(() => ((() => { })));
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getters', () => {
    it('should provide createRowChange', () => {
      const columnExtensions = [];
      const createRowChange = () => { };

      const tree = mount({
        render() {
          return (
            <PluginHost>
              <EditingState
                createRowChange={createRowChange}
                columnExtensions={columnExtensions}
              />
              <PluginDepsToComponents deps={defaultDeps} />
            </PluginHost>
          );
        },
      });

      expect(createRowChangeGetter)
        .toBeCalledWith(createRowChange, columnExtensions);
      expect(getComputedState(tree).createRowChange)
        .toEqual(createRowChangeGetter());
    });

    it('should provide editingRowIds', () => {
      const defaultEditingRowIds = [1, 2, 3];
      const tree = mount({
        render() {
          return (
            <PluginHost>
              <EditingState
                editingRowIds={defaultEditingRowIds}
              />
              <PluginDepsToComponents deps={defaultDeps} />
            </PluginHost>
          );
        },
      });

      expect(getComputedState(tree).editingRowIds)
        .toEqual(defaultEditingRowIds);
    });

    it('should provide rowChanges', () => {
      const defaultRowChanges = { test: '123' };
      const tree = mount({
        render() {
          return (
            <PluginHost>
              <EditingState
                rowChanges={defaultRowChanges}
              />
              <PluginDepsToComponents deps={defaultDeps} />
            </PluginHost>
          );
        },
      });

      expect(getComputedState(tree).rowChanges)
        .toEqual(defaultRowChanges);
    });

    it('should provide addedRows', () => {
      const defaultAddedRows = [{ name: '2', city: '3' }];
      const tree = mount({
        render() {
          return (
            <PluginHost>
              <EditingState
                addedRows={defaultAddedRows}
              />
              <PluginDepsToComponents deps={defaultDeps} />
            </PluginHost>
          );
        },
      });

      expect(getComputedState(tree).addedRows)
        .toEqual(defaultAddedRows);
    });

    it('should provide deletedRowIds', () => {
      const defaultDeletedRowIds = [1, 2, 3];
      const tree = mount({
        render() {
          return (
            <PluginHost>
              <EditingState
                deletedRowIds={defaultDeletedRowIds}
              />
              <PluginDepsToComponents deps={defaultDeps} />
            </PluginHost>
          );
        },
      });

      expect(getComputedState(tree).deletedRowIds)
        .toEqual(defaultDeletedRowIds);
    });
  });

  describe('actions', () => {
    it('should call startEditRows', () => {
      const defaultEditingRowIds = [1, 2, 3];
      const payload = { rowIds: 4 };
      const nextEditingRowIds = [1, 2, 3, 4];
      startEditRows.mockImplementation(() => nextEditingRowIds);
      const tree = mount({
        render() {
          return (
            <PluginHost>
              <PluginDepsToComponents deps={defaultDeps} />
              <EditingState
                editingRowIds={defaultEditingRowIds}
              />
            </PluginHost>
          );
        },
      });

      executeComputedAction(tree, (actions) => {
        actions.startEditRows(payload);
      });
      expect(tree.find(EditingState).emitted()['update:editingRowIds'][0][0]).toBe(nextEditingRowIds);

      expect(startEditRows.mock.calls[0][0])
        .toEqual(defaultEditingRowIds);
      expect(startEditRows.mock.calls[0][1])
        .toEqual(payload);
    });

    it('should call stopEditRows', () => {
      const defaultEditingRowIds = [1, 2, 3];
      const payload = { rowIds: 4 };
      const nextEditingRowIds = [1, 2, 3, 4];
      stopEditRows.mockImplementation(() => nextEditingRowIds);
      const tree = mount({
        render() {
          return (
            <PluginHost>
              <PluginDepsToComponents deps={defaultDeps} />
              <EditingState
                editingRowIds={defaultEditingRowIds}
              />
            </PluginHost>
          );
        },
      });

      executeComputedAction(tree, (actions) => {
        actions.stopEditRows(payload);
      });
      expect(tree.find(EditingState).emitted()['update:editingRowIds'][0][0]).toBe(nextEditingRowIds);

      expect(stopEditRows.mock.calls[0][0])
        .toEqual(defaultEditingRowIds);
      expect(stopEditRows.mock.calls[0][1])
        .toEqual(payload);
    });

    it('should call changeRow', () => {
      const defaultRowChanges = { test: 123 };
      const payload = { rowIds: 4 };
      const nextRowChanges = [1, 2, 3, 4];
      changeRow.mockImplementation(() => nextRowChanges);
      const tree = mount({
        render() {
          return (
            <PluginHost>
              <PluginDepsToComponents deps={defaultDeps} />
              <EditingState
                rowChanges={defaultRowChanges}
              />
            </PluginHost>
          );
        },
      });

      executeComputedAction(tree, (actions) => {
        actions.changeRow(payload);
      });
      expect(tree.find(EditingState).emitted()['update:rowChanges'][0][0]).toBe(nextRowChanges);

      expect(changeRow.mock.calls[0][0])
        .toEqual(defaultRowChanges);
      expect(changeRow.mock.calls[0][1])
        .toEqual(payload);
    });

    it('should call cancelChangedRows', () => {
      const defaultRowChanges = { test: 123 };
      const payload = { rowIds: 4 };
      const nextRowChanges = [1, 2, 3, 4];
      cancelChanges.mockImplementation(() => nextRowChanges);
      const tree = mount({
        render() {
          return (
            <PluginHost>
              <PluginDepsToComponents deps={defaultDeps} />
              <EditingState
                rowChanges={defaultRowChanges}
              />
            </PluginHost>
          );
        },
      });

      executeComputedAction(tree, (actions) => {
        actions.cancelChangedRows(payload);
      });
      expect(tree.find(EditingState).emitted()['update:rowChanges'][0][0]).toBe(nextRowChanges);

      expect(cancelChanges.mock.calls[0][0])
        .toEqual(defaultRowChanges);
      expect(cancelChanges.mock.calls[0][1])
        .toEqual(payload);
    });

    it('should call commitChangedRows', () => {
      const defaultRowChanges = { test: 123 };
      const payload = { rowIds: 4 };
      const nextRowChanges = [1, 2, 3, 4];
      changedRowsByIds.mockImplementation(() => nextRowChanges);
      cancelChanges.mockImplementation(() => nextRowChanges);
      const tree = mount({
        render() {
          return (
            <PluginHost>
              <PluginDepsToComponents deps={defaultDeps} />
              <EditingState
                rowChanges={defaultRowChanges}
              />
            </PluginHost>
          );
        },
      });

      executeComputedAction(tree, (actions) => {
        actions.commitChangedRows(payload);
      });
      expect(tree.find(EditingState).emitted().commitChanges[0][0])
        .toEqual({ changed: nextRowChanges });

      expect(changedRowsByIds.mock.calls[0][0])
        .toEqual(defaultRowChanges);
      expect(changedRowsByIds.mock.calls[0][1])
        .toEqual(payload.rowIds);

      expect(cancelChanges.mock.calls[0][0])
        .toEqual(defaultRowChanges);
      expect(cancelChanges.mock.calls[0][1])
        .toEqual(payload);
    });

    it('should call addRow', () => {
      const defaultAddedRows = [{ test: 123 }];
      const payload = { rowIds: 4 };
      const nextAddedRows = [1, 2, 3, 4];
      addRow.mockImplementation(() => nextAddedRows);
      const tree = mount({
        render() {
          return (
            <PluginHost>
              <PluginDepsToComponents deps={defaultDeps} />
              <EditingState
                addedRows={defaultAddedRows}
              />
            </PluginHost>
          );
        },
      });

      executeComputedAction(tree, (actions) => {
        actions.addRow(payload);
      });
      expect(tree.find(EditingState).emitted()['update:addedRows'][0][0]).toBe(nextAddedRows);

      expect(addRow.mock.calls[0][0])
        .toEqual(defaultAddedRows);
      expect(addRow.mock.calls[0][1])
        .toEqual(payload);
    });

    it('should call changeAddedRow', () => {
      const defaultAddedRows = [{ test: 123 }];
      const payload = { rowIds: 4 };
      const nextAddedRows = [1, 2, 3, 4];
      changeAddedRow.mockImplementation(() => nextAddedRows);
      const tree = mount({
        render() {
          return (
            <PluginHost>
              <PluginDepsToComponents deps={defaultDeps} />
              <EditingState
                addedRows={defaultAddedRows}
              />
            </PluginHost>
          );
        },
      });

      executeComputedAction(tree, (actions) => {
        actions.changeAddedRow(payload);
      });
      expect(tree.find(EditingState).emitted()['update:addedRows'][0][0]).toBe(nextAddedRows);

      expect(changeAddedRow.mock.calls[0][0])
        .toEqual(defaultAddedRows);
      expect(changeAddedRow.mock.calls[0][1])
        .toEqual(payload);
    });

    it('should call cancelAddedRows', () => {
      const defaultAddedRows = [{ test: 123 }];
      const payload = { rowIds: 4 };
      const nextAddedRows = [1, 2, 3, 4];
      cancelAddedRows.mockImplementation(() => nextAddedRows);
      const tree = mount({
        render() {
          return (
            <PluginHost>
              <PluginDepsToComponents deps={defaultDeps} />
              <EditingState
                addedRows={defaultAddedRows}
              />
            </PluginHost>
          );
        },
      });

      executeComputedAction(tree, (actions) => {
        actions.cancelAddedRows(payload);
      });
      expect(tree.find(EditingState).emitted()['update:addedRows'][0][0]).toBe(nextAddedRows);

      expect(cancelAddedRows.mock.calls[0][0])
        .toEqual(defaultAddedRows);
      expect(cancelAddedRows.mock.calls[0][1])
        .toEqual(payload);
    });

    it('should call commitAddedRows', () => {
      const defaultAddedRows = [{ test: 123 }];
      const payload = { rowIds: 4 };
      const nextAddedRows = [1, 2, 3, 4];
      addedRowsByIds.mockImplementation(() => nextAddedRows);
      cancelAddedRows.mockImplementation(() => nextAddedRows);
      const tree = mount({
        render() {
          return (
            <PluginHost>
              <PluginDepsToComponents deps={defaultDeps} />
              <EditingState
                addedRows={defaultAddedRows}
              />
            </PluginHost>
          );
        },
      });

      executeComputedAction(tree, (actions) => {
        actions.commitAddedRows(payload);
      });
      expect(tree.find(EditingState).emitted().commitChanges[0][0])
        .toEqual({ added: nextAddedRows });

      expect(addedRowsByIds.mock.calls[0][0])
        .toEqual(defaultAddedRows);
      expect(addedRowsByIds.mock.calls[0][1])
        .toEqual(payload.rowIds);

      expect(cancelAddedRows.mock.calls[0][0])
        .toEqual(defaultAddedRows);
      expect(cancelAddedRows.mock.calls[0][1])
        .toEqual(payload);
    });

    it('should call deleteRows', () => {
      const defaultDeletedRowIds = [{ test: 123 }];
      const payload = { rowIds: 4 };
      const nextDeletedRowIds = [1, 2, 3, 4];
      deleteRows.mockImplementation(() => nextDeletedRowIds);
      const tree = mount({
        render() {
          return (
            <PluginHost>
              <PluginDepsToComponents deps={defaultDeps} />
              <EditingState
                deletedRowIds={defaultDeletedRowIds}
              />
            </PluginHost>
          );
        },
      });

      executeComputedAction(tree, (actions) => {
        actions.deleteRows(payload);
      });
      expect(tree.find(EditingState).emitted()['update:deletedRowIds'][0][0]).toBe(nextDeletedRowIds);

      expect(deleteRows.mock.calls[0][0])
        .toEqual(defaultDeletedRowIds);
      expect(deleteRows.mock.calls[0][1])
        .toEqual(payload);
    });

    it('should call cancelDeletedRows', () => {
      const defaultDeletedRowIds = [{ test: 123 }];
      const payload = { rowIds: 4 };
      const nextDeletedRowIds = [1, 2, 3, 4];
      cancelDeletedRows.mockImplementation(() => nextDeletedRowIds);
      const tree = mount({
        render() {
          return (
            <PluginHost>
              <PluginDepsToComponents deps={defaultDeps} />
              <EditingState
                deletedRowIds={defaultDeletedRowIds}
              />
            </PluginHost>
          );
        },
      });

      executeComputedAction(tree, (actions) => {
        actions.cancelDeletedRows(payload);
      });
      expect(tree.find(EditingState).emitted()['update:deletedRowIds'][0][0]).toBe(nextDeletedRowIds);

      expect(cancelDeletedRows.mock.calls[0][0])
        .toEqual(defaultDeletedRowIds);
      expect(cancelDeletedRows.mock.calls[0][1])
        .toEqual(payload);
    });

    it('should call commitDeletedRows', () => {
      const defaultDeletedRowIds = [1, 2, 3];
      const payload = { rowIds: [4, 5, 6] };
      const nextDeletedRows = [1, 2, 3, 4];
      cancelDeletedRows.mockImplementation(() => nextDeletedRows);
      const tree = mount({
        render() {
          return (
            <PluginHost>
              <PluginDepsToComponents deps={defaultDeps} />
              <EditingState
                deletedRowIds={defaultDeletedRowIds}
              />
            </PluginHost>
          );
        },
      });

      executeComputedAction(tree, (actions) => {
        actions.commitDeletedRows(payload);
      });
      expect(tree.find(EditingState).emitted().commitChanges[0][0])
        .toEqual({ deleted: payload.rowIds });

      expect(cancelDeletedRows.mock.calls[0][0])
        .toEqual(defaultDeletedRowIds);
      expect(cancelDeletedRows.mock.calls[0][1])
        .toEqual(payload);
    });
  });

  describe('column extensions', () => {
    it('should correctly call getColumnExtensionValueGetter', () => {
      const columnExtensions = [{ columnName: 'a', editingEnabled: true }];
      mount({
        render() {
          return (
            <PluginHost>
              <EditingState
                columnEditingEnabled={false}
                columnExtensions={columnExtensions}
              />
              <PluginDepsToComponents deps={defaultDeps} />
            </PluginHost>
          );
        },
      });

      expect(getColumnExtensionValueGetter)
        .toBeCalledWith(columnExtensions, 'editingEnabled', false);
    });
  });
});
