import { mount } from '@vue/test-utils';
import { setupConsole } from '@devexpress/dx-testing';
import { DxPluginHost } from '@devexpress/dx-vue-core';
import { getMessagesFormatter } from '@devexpress/dx-core';
import {
  tableColumnsWithEditing,
  isHeadingEditCommandsTableCell,
  isDataEditCommandsTableCell,
  isEditCommandsTableCell,
  isAddedTableRow,
  isEditTableRow,
} from '@devexpress/dx-grid-core';
import { DxTableEditColumn } from './table-edit-column';
import { PluginDepsToComponents, getComputedState } from './test-utils';

jest.mock('@devexpress/dx-grid-core', () => ({
  tableColumnsWithEditing: jest.fn(),
  isHeadingEditCommandsTableCell: jest.fn(),
  isDataEditCommandsTableCell: jest.fn(),
  isEditCommandsTableCell: jest.fn(),
  isAddedTableRow: jest.fn(),
  isEditTableRow: jest.fn(),
}));

jest.mock('@devexpress/dx-core', () => ({
  ...require.requireActual('@devexpress/dx-core'),
  getMessagesFormatter: jest.fn(),
}));

const defaultDeps = {
  getter: {
    tableColumns: [{ type: 'undefined' }],
  },
  action: {
    addRow: jest.fn(),
    cancelAddedRows: jest.fn(),
    commitAddedRows: jest.fn(),
    startEditRows: jest.fn(),
    stopEditRows: jest.fn(),
    cancelChangedRows: jest.fn(),
    commitChangedRows: jest.fn(),
    deleteRows: jest.fn(),
    commitDeletedRows: jest.fn(),
  },
  template: {
    tableCell: {
      tableRow: { type: 'undefined', rowId: 1, row: 'row' },
      tableColumn: { type: 'undefined', column: 'column' },
      style: {},
    },
  },
  plugins: ['DxEditingState', 'DxTable'],
};

const defaultProps = {
  cellComponent: { name: 'Cell', render() { return (<div>{this.$slots.default}</div>); } },
  headerCellComponent: { name: 'HeaderCell', render() { return (<div>{this.$slots.default}</div>); } },
  commandComponent: { name: 'Command', render() { return null; } },
};

const findCommandWithId = (
  tree, id,
) => tree.findAll(defaultProps.commandComponent).filter(wrapper => wrapper.vm.$attrs.id === id);

describe('DxTableEditColumn', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });
  afterAll(() => {
    resetConsole();
  });

  beforeEach(() => {
    tableColumnsWithEditing.mockImplementation(() => 'tableColumnsWithEditing');
    isHeadingEditCommandsTableCell.mockImplementation(() => false);
    isDataEditCommandsTableCell.mockImplementation(() => false);
    isEditCommandsTableCell.mockImplementation(() => false);
    isAddedTableRow.mockImplementation(() => false);
    isEditTableRow.mockImplementation(() => false);
    getMessagesFormatter.mockImplementation(messages => key => (messages[key] || key));
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('table layout getters', () => {
    it('should extend tableColumns', () => {
      const tree = mount({
        render() {
          return (
            <DxPluginHost>
              <PluginDepsToComponents deps={defaultDeps} />
              <DxTableEditColumn
                {...{ attrs: { ...defaultProps } }}
                width={120}
              />
            </DxPluginHost>
          );
        },
      });

      expect(getComputedState(tree).tableColumns)
        .toBe('tableColumnsWithEditing');
      expect(tableColumnsWithEditing)
        .toBeCalledWith(defaultDeps.getter.tableColumns, 120);
    });
  });

  describe('headerCell', () => {
    it('should render edit commands cell on edit-commands column and header row intersection', () => {
      isHeadingEditCommandsTableCell.mockImplementation(() => true);

      const tree = mount({
        render() {
          return (
            <DxPluginHost>
              <PluginDepsToComponents deps={defaultDeps} />
              <DxTableEditColumn
                {...{ attrs: { ...defaultProps } }}
              />
            </DxPluginHost>
          );
        },
      });

      expect(isHeadingEditCommandsTableCell)
        .toBeCalledWith(
          defaultDeps.template.tableCell.tableRow,
          defaultDeps.template.tableCell.tableColumn,
        );
      expect(tree.find(defaultProps.headerCellComponent).vm.$attrs)
        .toMatchObject({
          ...defaultDeps.template.tableCell,
        });
      expect(tree.findAll(defaultProps.commandComponent).length)
        .toEqual(0);
    });

    it('should render add command when showAddCommand is true', () => {
      isHeadingEditCommandsTableCell.mockImplementation(() => true);

      const tree = mount({
        render() {
          return (
            <DxPluginHost>
              <PluginDepsToComponents deps={defaultDeps} />
              <DxTableEditColumn
                {...{ attrs: { ...defaultProps } }}
                showAddCommand
                messages={{ addCommand: 'addCommand' }}
              />
            </DxPluginHost>
          );
        },
      });

      const commandComponent = tree.find(defaultProps.commandComponent);
      expect(commandComponent.vm.$attrs)
        .toMatchObject({ text: 'addCommand' });

      commandComponent.vm.$emit('execute');
      expect(defaultDeps.action.addRow)
        .toBeCalled();
    });
  });

  describe('cell', () => {
    it('should render edit commands cell on edit-commands column and added row intersection', () => {
      isEditCommandsTableCell.mockImplementation(() => true);

      const tree = mount({
        render() {
          return (
            <DxPluginHost>
              <PluginDepsToComponents deps={defaultDeps} />
              <DxTableEditColumn
                {...{ attrs: { ...defaultProps } }}
                messages={{ addCommand: 'addCommand' }}
              />
            </DxPluginHost>
          );
        },
      });

      expect(isEditCommandsTableCell)
        .toBeCalledWith(
          defaultDeps.template.tableCell.tableRow,
          defaultDeps.template.tableCell.tableColumn,
        );
      expect(tree.find(defaultProps.cellComponent).vm.$attrs)
        .toMatchObject({
          ...defaultDeps.template.tableCell,
          row: defaultDeps.template.tableCell.tableRow.row,
        });
      expect(tree.findAll(defaultProps.commandComponent).length)
        .toEqual(0);
    });

    it('should render edit command when showEditCommand is true', () => {
      isEditCommandsTableCell.mockImplementation(() => true);

      const tree = mount({
        render() {
          return (
            <DxPluginHost>
              <PluginDepsToComponents deps={defaultDeps} />
              <DxTableEditColumn
                {...{ attrs: { ...defaultProps } }}
                messages={{}}
                showEditCommand
              />
            </DxPluginHost>
          );
        },
      });

      const commandComponent = tree.find(defaultProps.commandComponent);
      expect(commandComponent.vm.$attrs)
        .toMatchObject({ text: 'editCommand' });

      commandComponent.vm.$emit('execute');
      expect(defaultDeps.action.startEditRows.mock.calls[0][0])
        .toEqual({ rowIds: [defaultDeps.template.tableCell.tableRow.rowId] });
    });

    it('should not render edit command when row is editing', () => {
      isEditCommandsTableCell.mockImplementation(() => true);
      isEditTableRow.mockImplementation(() => true);

      const tree = mount({
        render() {
          return (
            <DxPluginHost>
              <PluginDepsToComponents deps={defaultDeps} />
              <DxTableEditColumn
                {...{ attrs: { ...defaultProps } }}
                messages={{}}
                showEditCommand
              />
            </DxPluginHost>
          );
        },
      });

      expect(findCommandWithId(tree, 'edit').exists())
        .toBeFalsy();
    });

    it('should not render edit command when row is added', () => {
      isEditCommandsTableCell.mockImplementation(() => true);
      isAddedTableRow.mockImplementation(() => true);

      const tree = mount({
        render() {
          return (
            <DxPluginHost>
              <PluginDepsToComponents deps={defaultDeps} />
              <DxTableEditColumn
                {...{ attrs: { ...defaultProps } }}
                messages={{}}
                showEditCommand
              />
            </DxPluginHost>
          );
        },
      });

      expect(findCommandWithId(tree, 'edit').exists())
        .toBeFalsy();
    });

    it('should render delete command when showDeleteCommand is true', () => {
      isEditCommandsTableCell.mockImplementation(() => true);

      const tree = mount({
        render() {
          return (
            <DxPluginHost>
              <PluginDepsToComponents deps={defaultDeps} />
              <DxTableEditColumn
                {...{ attrs: { ...defaultProps } }}
                messages={{}}
                showDeleteCommand
              />
            </DxPluginHost>
          );
        },
      });

      const deleteComponent = findCommandWithId(tree, 'delete').at(0);
      expect(deleteComponent.vm.$attrs)
        .toMatchObject({ text: 'deleteCommand' });

      deleteComponent.vm.$emit('execute');
      expect(defaultDeps.action.deleteRows.mock.calls[0][0])
        .toEqual({ rowIds: [defaultDeps.template.tableCell.tableRow.rowId] });
      expect(defaultDeps.action.commitDeletedRows.mock.calls[0][0])
        .toEqual({ rowIds: [defaultDeps.template.tableCell.tableRow.rowId] });
    });

    it('should not render delete command when row is editing', () => {
      isEditCommandsTableCell.mockImplementation(() => true);
      isEditTableRow.mockImplementation(() => true);

      const tree = mount({
        render() {
          return (
            <DxPluginHost>
              <PluginDepsToComponents deps={defaultDeps} />
              <DxTableEditColumn
                {...{ attrs: { ...defaultProps } }}
                messages={{}}
                showDeleteCommand
              />
            </DxPluginHost>
          );
        },
      });

      expect(findCommandWithId(tree, 'edit').exists())
        .toBeFalsy();
    });

    it('should not render delete command when row is added', () => {
      isEditCommandsTableCell.mockImplementation(() => true);
      isAddedTableRow.mockImplementation(() => true);

      const tree = mount({
        render() {
          return (
            <DxPluginHost>
              <PluginDepsToComponents deps={defaultDeps} />
              <DxTableEditColumn
                {...{ attrs: { ...defaultProps } }}
                messages={{}}
                showDeleteCommand
              />
            </DxPluginHost>
          );
        },
      });

      expect(findCommandWithId(tree, 'edit').exists())
        .toBeFalsy();
    });

    it('should render commit command when row is editing', () => {
      isEditCommandsTableCell.mockImplementation(() => true);
      isEditTableRow.mockImplementation(() => true);

      const tree = mount({
        render() {
          return (
            <DxPluginHost>
              <PluginDepsToComponents deps={defaultDeps} />
              <DxTableEditColumn
                {...{ attrs: { ...defaultProps } }}
                messages={{}}
              />
            </DxPluginHost>
          );
        },
      });

      const commitComponent = findCommandWithId(tree, 'commit').at(0);
      expect(commitComponent.vm.$attrs)
        .toMatchObject({ text: 'commitCommand' });

      commitComponent.vm.$emit('execute');
      expect(defaultDeps.action.stopEditRows.mock.calls[0][0])
        .toEqual({ rowIds: [defaultDeps.template.tableCell.tableRow.rowId] });
      expect(defaultDeps.action.commitChangedRows.mock.calls[0][0])
        .toEqual({ rowIds: [defaultDeps.template.tableCell.tableRow.rowId] });
    });

    it('should render commit command when row is added', () => {
      isEditCommandsTableCell.mockImplementation(() => true);
      isAddedTableRow.mockImplementation(() => true);

      const tree = mount({
        render() {
          return (
            <DxPluginHost>
              <PluginDepsToComponents deps={defaultDeps} />
              <DxTableEditColumn
                {...{ attrs: { ...defaultProps } }}
                messages={{}}
              />
            </DxPluginHost>
          );
        },
      });

      const commitComponent = findCommandWithId(tree, 'commit').at(0);
      expect(commitComponent.vm.$attrs)
        .toMatchObject({ text: 'commitCommand' });

      commitComponent.vm.$emit('execute');
      expect(defaultDeps.action.commitAddedRows.mock.calls[0][0])
        .toEqual({ rowIds: [defaultDeps.template.tableCell.tableRow.rowId] });
    });

    it('should render cancel command when row is editing', () => {
      isEditCommandsTableCell.mockImplementation(() => true);
      isEditTableRow.mockImplementation(() => true);

      const tree = mount({
        render() {
          return (
            <DxPluginHost>
              <PluginDepsToComponents deps={defaultDeps} />
              <DxTableEditColumn
                {...{ attrs: { ...defaultProps } }}
                messages={{}}
              />
            </DxPluginHost>
          );
        },
      });

      const cancelComponent = findCommandWithId(tree, 'cancel').at(0);
      expect(cancelComponent.vm.$attrs)
        .toMatchObject({ text: 'cancelCommand' });

      cancelComponent.vm.$emit('execute');
      expect(defaultDeps.action.stopEditRows.mock.calls[0][0])
        .toEqual({ rowIds: [defaultDeps.template.tableCell.tableRow.rowId] });
      expect(defaultDeps.action.cancelChangedRows.mock.calls[0][0])
        .toEqual({ rowIds: [defaultDeps.template.tableCell.tableRow.rowId] });
    });

    it('should render cancel command when row is added', () => {
      isEditCommandsTableCell.mockImplementation(() => true);
      isAddedTableRow.mockImplementation(() => true);

      const tree = mount({
        render() {
          return (
            <DxPluginHost>
              <PluginDepsToComponents deps={defaultDeps} />
              <DxTableEditColumn
                {...{ attrs: { ...defaultProps } }}
                messages={{}}
              />
            </DxPluginHost>
          );
        },
      });

      const cancelComponent = findCommandWithId(tree, 'cancel').at(0);
      expect(cancelComponent.vm.$attrs)
        .toMatchObject({ text: 'cancelCommand' });

      cancelComponent.vm.$emit('execute');
      expect(defaultDeps.action.cancelAddedRows.mock.calls[0][0])
        .toEqual({ rowIds: [defaultDeps.template.tableCell.tableRow.rowId] });
    });
  });
});
