import { mount } from '@vue/test-utils';
import { setupConsole } from '@devexpress/dx-testing';
import { DxPluginHost } from '@devexpress/dx-vue-core';
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
import { DxEditingState } from './editing-state';

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

describe('DxEditingState', () => {
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
            <DxPluginHost>
              <DxEditingState
                createRowChange={createRowChange}
                columnExtensions={columnExtensions}
              />
              <PluginDepsToComponents deps={defaultDeps} />
            </DxPluginHost>
          );
        },
      });

      expect(createRowChangeGetter)
        .toBeCalledWith(createRowChange, columnExtensions);
      expect(getComputedState(tree).createRowChange)
        .toEqual(createRowChangeGetter());
    });

    it('should provide editingRowIds', () => {
      const editingRowIds = [1, 2, 3];
      const tree = mount({
        render() {
          return (
            <DxPluginHost>
              <DxEditingState
                editingRowIds={editingRowIds}
              />
              <PluginDepsToComponents deps={defaultDeps} />
            </DxPluginHost>
          );
        },
      });

      expect(getComputedState(tree).editingRowIds)
        .toEqual(editingRowIds);
    });

    it('should provide rowChanges', () => {
      const rowChanges = { test: '123' };
      const tree = mount({
        render() {
          return (
            <DxPluginHost>
              <DxEditingState
                rowChanges={rowChanges}
              />
              <PluginDepsToComponents deps={defaultDeps} />
            </DxPluginHost>
          );
        },
      });

      expect(getComputedState(tree).rowChanges)
        .toEqual(rowChanges);
    });

    it('should provide addedRows', () => {
      const addedRows = [{ name: '2', city: '3' }];
      const tree = mount({
        render() {
          return (
            <DxPluginHost>
              <DxEditingState
                addedRows={addedRows}
              />
              <PluginDepsToComponents deps={defaultDeps} />
            </DxPluginHost>
          );
        },
      });

      expect(getComputedState(tree).addedRows)
        .toEqual(addedRows);
    });

    it('should provide deletedRowIds', () => {
      const deletedRowIds = [1, 2, 3];
      const tree = mount({
        render() {
          return (
            <DxPluginHost>
              <DxEditingState
                deletedRowIds={deletedRowIds}
              />
              <PluginDepsToComponents deps={defaultDeps} />
            </DxPluginHost>
          );
        },
      });

      expect(getComputedState(tree).deletedRowIds)
        .toEqual(deletedRowIds);
    });
  });

  describe('actions', () => {
    it('should call startEditRows', () => {
      const editingRowIds = [1, 2, 3];
      const payload = { rowIds: 4 };
      const nextEditingRowIds = [1, 2, 3, 4];
      startEditRows.mockImplementation(() => nextEditingRowIds);
      const tree = mount({
        render() {
          return (
            <DxPluginHost>
              <PluginDepsToComponents deps={defaultDeps} />
              <DxEditingState
                editingRowIds={editingRowIds}
              />
            </DxPluginHost>
          );
        },
      });

      executeComputedAction(tree, (actions) => {
        actions.startEditRows(payload);
      });
      expect(tree.find(DxEditingState).emitted()['update:editingRowIds'][0][0]).toBe(nextEditingRowIds);

      expect(startEditRows.mock.calls[0][0])
        .toEqual(editingRowIds);
      expect(startEditRows.mock.calls[0][1])
        .toEqual(payload);
    });

    it('should call stopEditRows', () => {
      const editingRowIds = [1, 2, 3];
      const payload = { rowIds: 4 };
      const nextEditingRowIds = [1, 2, 3, 4];
      stopEditRows.mockImplementation(() => nextEditingRowIds);
      const tree = mount({
        render() {
          return (
            <DxPluginHost>
              <PluginDepsToComponents deps={defaultDeps} />
              <DxEditingState
                editingRowIds={editingRowIds}
              />
            </DxPluginHost>
          );
        },
      });

      executeComputedAction(tree, (actions) => {
        actions.stopEditRows(payload);
      });
      expect(tree.find(DxEditingState).emitted()['update:editingRowIds'][0][0]).toBe(nextEditingRowIds);

      expect(stopEditRows.mock.calls[0][0])
        .toEqual(editingRowIds);
      expect(stopEditRows.mock.calls[0][1])
        .toEqual(payload);
    });

    it('should call changeRow', () => {
      const rowChanges = { test: 123 };
      const payload = { rowIds: 4 };
      const nextRowChanges = [1, 2, 3, 4];
      changeRow.mockImplementation(() => nextRowChanges);
      const tree = mount({
        render() {
          return (
            <DxPluginHost>
              <PluginDepsToComponents deps={defaultDeps} />
              <DxEditingState
                rowChanges={rowChanges}
              />
            </DxPluginHost>
          );
        },
      });

      executeComputedAction(tree, (actions) => {
        actions.changeRow(payload);
      });
      expect(tree.find(DxEditingState).emitted()['update:rowChanges'][0][0]).toBe(nextRowChanges);

      expect(changeRow.mock.calls[0][0])
        .toEqual(rowChanges);
      expect(changeRow.mock.calls[0][1])
        .toEqual(payload);
    });

    it('should call cancelChangedRows', () => {
      const rowChanges = { test: 123 };
      const payload = { rowIds: 4 };
      const nextRowChanges = [1, 2, 3, 4];
      cancelChanges.mockImplementation(() => nextRowChanges);
      const tree = mount({
        render() {
          return (
            <DxPluginHost>
              <PluginDepsToComponents deps={defaultDeps} />
              <DxEditingState
                rowChanges={rowChanges}
              />
            </DxPluginHost>
          );
        },
      });

      executeComputedAction(tree, (actions) => {
        actions.cancelChangedRows(payload);
      });
      expect(tree.find(DxEditingState).emitted()['update:rowChanges'][0][0]).toBe(nextRowChanges);

      expect(cancelChanges.mock.calls[0][0])
        .toEqual(rowChanges);
      expect(cancelChanges.mock.calls[0][1])
        .toEqual(payload);
    });

    it('should call commitChangedRows', () => {
      const rowChanges = { test: 123 };
      const payload = { rowIds: 4 };
      const nextRowChanges = [1, 2, 3, 4];
      changedRowsByIds.mockImplementation(() => nextRowChanges);
      cancelChanges.mockImplementation(() => nextRowChanges);
      const tree = mount({
        render() {
          return (
            <DxPluginHost>
              <PluginDepsToComponents deps={defaultDeps} />
              <DxEditingState
                rowChanges={rowChanges}
              />
            </DxPluginHost>
          );
        },
      });

      executeComputedAction(tree, (actions) => {
        actions.commitChangedRows(payload);
      });
      expect(tree.find(DxEditingState).emitted().commitChanges[0][0])
        .toEqual({ changed: nextRowChanges });

      expect(changedRowsByIds.mock.calls[0][0])
        .toEqual(rowChanges);
      expect(changedRowsByIds.mock.calls[0][1])
        .toEqual(payload.rowIds);

      expect(cancelChanges.mock.calls[0][0])
        .toEqual(rowChanges);
      expect(cancelChanges.mock.calls[0][1])
        .toEqual(payload);
    });

    it('should call addRow', () => {
      const addedRows = [{ test: 123 }];
      const payload = { rowIds: 4 };
      const nextAddedRows = [1, 2, 3, 4];
      addRow.mockImplementation(() => nextAddedRows);
      const tree = mount({
        render() {
          return (
            <DxPluginHost>
              <PluginDepsToComponents deps={defaultDeps} />
              <DxEditingState
                addedRows={addedRows}
              />
            </DxPluginHost>
          );
        },
      });

      executeComputedAction(tree, (actions) => {
        actions.addRow(payload);
      });
      expect(tree.find(DxEditingState).emitted()['update:addedRows'][0][0]).toBe(nextAddedRows);

      expect(addRow.mock.calls[0][0])
        .toEqual(addedRows);
      expect(addRow.mock.calls[0][1])
        .toEqual(payload);
    });

    it('should call changeAddedRow', () => {
      const addedRows = [{ test: 123 }];
      const payload = { rowIds: 4 };
      const nextAddedRows = [1, 2, 3, 4];
      changeAddedRow.mockImplementation(() => nextAddedRows);
      const tree = mount({
        render() {
          return (
            <DxPluginHost>
              <PluginDepsToComponents deps={defaultDeps} />
              <DxEditingState
                addedRows={addedRows}
              />
            </DxPluginHost>
          );
        },
      });

      executeComputedAction(tree, (actions) => {
        actions.changeAddedRow(payload);
      });
      expect(tree.find(DxEditingState).emitted()['update:addedRows'][0][0]).toBe(nextAddedRows);

      expect(changeAddedRow.mock.calls[0][0])
        .toEqual(addedRows);
      expect(changeAddedRow.mock.calls[0][1])
        .toEqual(payload);
    });

    it('should call cancelAddedRows', () => {
      const addedRows = [{ test: 123 }];
      const payload = { rowIds: 4 };
      const nextAddedRows = [1, 2, 3, 4];
      cancelAddedRows.mockImplementation(() => nextAddedRows);
      const tree = mount({
        render() {
          return (
            <DxPluginHost>
              <PluginDepsToComponents deps={defaultDeps} />
              <DxEditingState
                addedRows={addedRows}
              />
            </DxPluginHost>
          );
        },
      });

      executeComputedAction(tree, (actions) => {
        actions.cancelAddedRows(payload);
      });
      expect(tree.find(DxEditingState).emitted()['update:addedRows'][0][0]).toBe(nextAddedRows);

      expect(cancelAddedRows.mock.calls[0][0])
        .toEqual(addedRows);
      expect(cancelAddedRows.mock.calls[0][1])
        .toEqual(payload);
    });

    it('should call commitAddedRows', () => {
      const addedRows = [{ test: 123 }];
      const payload = { rowIds: 4 };
      const nextAddedRows = [1, 2, 3, 4];
      addedRowsByIds.mockImplementation(() => nextAddedRows);
      cancelAddedRows.mockImplementation(() => nextAddedRows);
      const tree = mount({
        render() {
          return (
            <DxPluginHost>
              <PluginDepsToComponents deps={defaultDeps} />
              <DxEditingState
                addedRows={addedRows}
              />
            </DxPluginHost>
          );
        },
      });

      executeComputedAction(tree, (actions) => {
        actions.commitAddedRows(payload);
      });
      expect(tree.find(DxEditingState).emitted().commitChanges[0][0])
        .toEqual({ added: nextAddedRows });

      expect(addedRowsByIds.mock.calls[0][0])
        .toEqual(addedRows);
      expect(addedRowsByIds.mock.calls[0][1])
        .toEqual(payload.rowIds);

      expect(cancelAddedRows.mock.calls[0][0])
        .toEqual(addedRows);
      expect(cancelAddedRows.mock.calls[0][1])
        .toEqual(payload);
    });

    it('should call deleteRows', () => {
      const deletedRowIds = [{ test: 123 }];
      const payload = { rowIds: 4 };
      const nextDeletedRowIds = [1, 2, 3, 4];
      deleteRows.mockImplementation(() => nextDeletedRowIds);
      const tree = mount({
        render() {
          return (
            <DxPluginHost>
              <PluginDepsToComponents deps={defaultDeps} />
              <DxEditingState
                deletedRowIds={deletedRowIds}
              />
            </DxPluginHost>
          );
        },
      });

      executeComputedAction(tree, (actions) => {
        actions.deleteRows(payload);
      });
      expect(tree.find(DxEditingState).emitted()['update:deletedRowIds'][0][0]).toBe(nextDeletedRowIds);

      expect(deleteRows.mock.calls[0][0])
        .toEqual(deletedRowIds);
      expect(deleteRows.mock.calls[0][1])
        .toEqual(payload);
    });

    it('should call cancelDeletedRows', () => {
      const deletedRowIds = [{ test: 123 }];
      const payload = { rowIds: 4 };
      const nextDeletedRowIds = [1, 2, 3, 4];
      cancelDeletedRows.mockImplementation(() => nextDeletedRowIds);
      const tree = mount({
        render() {
          return (
            <DxPluginHost>
              <PluginDepsToComponents deps={defaultDeps} />
              <DxEditingState
                deletedRowIds={deletedRowIds}
              />
            </DxPluginHost>
          );
        },
      });

      executeComputedAction(tree, (actions) => {
        actions.cancelDeletedRows(payload);
      });
      expect(tree.find(DxEditingState).emitted()['update:deletedRowIds'][0][0]).toBe(nextDeletedRowIds);

      expect(cancelDeletedRows.mock.calls[0][0])
        .toEqual(deletedRowIds);
      expect(cancelDeletedRows.mock.calls[0][1])
        .toEqual(payload);
    });

    it('should call commitDeletedRows', () => {
      const deletedRowIds = [1, 2, 3];
      const payload = { rowIds: [4, 5, 6] };
      const nextDeletedRows = [1, 2, 3, 4];
      cancelDeletedRows.mockImplementation(() => nextDeletedRows);
      const tree = mount({
        render() {
          return (
            <DxPluginHost>
              <PluginDepsToComponents deps={defaultDeps} />
              <DxEditingState
                deletedRowIds={deletedRowIds}
              />
            </DxPluginHost>
          );
        },
      });

      executeComputedAction(tree, (actions) => {
        actions.commitDeletedRows(payload);
      });
      expect(tree.find(DxEditingState).emitted().commitChanges[0][0])
        .toEqual({ deleted: payload.rowIds });

      expect(cancelDeletedRows.mock.calls[0][0])
        .toEqual(deletedRowIds);
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
            <DxPluginHost>
              <DxEditingState
                columnEditingEnabled={false}
                columnExtensions={columnExtensions}
              />
              <PluginDepsToComponents deps={defaultDeps} />
            </DxPluginHost>
          );
        },
      });

      expect(getColumnExtensionValueGetter)
        .toBeCalledWith(columnExtensions, 'editingEnabled', false);
    });
  });
});
