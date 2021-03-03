import * as React from 'react';
import { mount } from 'enzyme';
import { pluginDepsToComponents, getComputedState, setupConsole } from '@devexpress/dx-testing';
import { PluginHost } from '@devexpress/dx-react-core';
import {
  tableColumnsWithEditing,
  isHeadingEditCommandsTableCell,
  isDataEditCommandsTableCell,
  isEditCommandsTableCell,
  isAddedTableRow,
  isEditTableRow,
} from '@devexpress/dx-grid-core';
import { getMessagesFormatter } from '@devexpress/dx-core';
import { TableEditColumn } from './table-edit-column';

jest.mock('@devexpress/dx-grid-core', () => ({
  tableColumnsWithEditing: jest.fn(),
  isHeadingEditCommandsTableCell: jest.fn(),
  isDataEditCommandsTableCell: jest.fn(),
  isEditCommandsTableCell: jest.fn(),
  isAddedTableRow: jest.fn(),
  isEditTableRow: jest.fn(),
}));

jest.mock('@devexpress/dx-core', () => ({
  ...jest.requireActual('@devexpress/dx-core'),
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
  plugins: ['EditingState', 'Table'],
};

const defaultProps = {
  cellComponent: ({ children }) => children,
  headerCellComponent: ({ children }) => children,
  commandComponent: () => null,
};

const findCommandWithId = (tree, id) => tree
  .find(defaultProps.commandComponent)
  .filterWhere(wrapper => wrapper.prop('id') === id);

describe('TableEditColumn', () => {
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
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <TableEditColumn
            {...defaultProps}
            width={120}
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).tableColumns)
        .toBe('tableColumnsWithEditing');
      expect(tableColumnsWithEditing)
        .toBeCalledWith(defaultDeps.getter.tableColumns, 120);
    });
  });

  describe('headerCell', () => {
    // tslint:disable-next-line: max-line-length
    it('should render edit commands cell on edit-commands column and header row intersection', () => {
      isHeadingEditCommandsTableCell.mockImplementation(() => true);

      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <TableEditColumn
            {...defaultProps}
          />
        </PluginHost>
      ));

      expect(isHeadingEditCommandsTableCell)
        .toBeCalledWith(
          defaultDeps.template.tableCell.tableRow,
          defaultDeps.template.tableCell.tableColumn,
        );
      expect(tree.find(defaultProps.headerCellComponent).props())
        .toMatchObject({
          ...defaultDeps.template.tableCell,
        });
      expect(findCommandWithId(tree, 'add').exists())
        .toBeFalsy();
    });

    it('should render add command when showAddCommand is true', () => {
      isHeadingEditCommandsTableCell.mockImplementation(() => true);

      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <TableEditColumn
            {...defaultProps}
            showAddCommand
          />
        </PluginHost>
      ));

      expect(findCommandWithId(tree, 'add').props())
        .toMatchObject({ text: 'New' });

      const { onExecute } = findCommandWithId(tree, 'add').props();
      onExecute();
      expect(defaultDeps.action.addRow)
        .toBeCalled();
    });
  });

  describe('cell', () => {
    // tslint:disable-next-line: max-line-length
    it('should render edit commands cell on edit-commands column and added row intersection', () => {
      isEditCommandsTableCell.mockImplementation(() => true);

      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <TableEditColumn
            {...defaultProps}
          />
        </PluginHost>
      ));

      expect(isEditCommandsTableCell)
        .toBeCalledWith(
          defaultDeps.template.tableCell.tableRow,
          defaultDeps.template.tableCell.tableColumn,
        );
      expect(tree.find(defaultProps.cellComponent).props())
        .toMatchObject({
          ...defaultDeps.template.tableCell,
          row: defaultDeps.template.tableCell.tableRow.row,
        });
      expect(findCommandWithId(tree, 'edit').exists())
        .toBeFalsy();
      expect(findCommandWithId(tree, 'delete').exists())
        .toBeFalsy();
      expect(findCommandWithId(tree, 'commit').exists())
        .toBeFalsy();
      expect(findCommandWithId(tree, 'cancel').exists())
        .toBeFalsy();
    });

    it('should render edit command when showEditCommand is true', () => {
      isEditCommandsTableCell.mockImplementation(() => true);

      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <TableEditColumn
            {...defaultProps}
            showEditCommand
          />
        </PluginHost>
      ));

      expect(findCommandWithId(tree, 'edit').props())
        .toMatchObject({ text: 'Edit' });

      const { onExecute } = findCommandWithId(tree, 'edit').props();
      onExecute();
      expect(defaultDeps.action.startEditRows.mock.calls[0][0])
        .toEqual({ rowIds: [defaultDeps.template.tableCell.tableRow.rowId] });
    });

    it('should not render edit command when row is editing', () => {
      isEditCommandsTableCell.mockImplementation(() => true);
      isEditTableRow.mockImplementation(() => true);

      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <TableEditColumn
            {...defaultProps}
            showEditCommand
          />
        </PluginHost>
      ));

      expect(findCommandWithId(tree, 'edit').exists())
        .toBeFalsy();
    });

    it('should not render edit command when row is added', () => {
      isEditCommandsTableCell.mockImplementation(() => true);
      isAddedTableRow.mockImplementation(() => true);

      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <TableEditColumn
            {...defaultProps}
            showEditCommand
          />
        </PluginHost>
      ));

      expect(findCommandWithId(tree, 'edit').exists())
        .toBeFalsy();
    });

    it('should render delete command when showDeleteCommand is true', () => {
      isEditCommandsTableCell.mockImplementation(() => true);

      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <TableEditColumn
            {...defaultProps}
            showDeleteCommand
          />
        </PluginHost>
      ));

      expect(findCommandWithId(tree, 'delete').props())
        .toMatchObject({ text: 'Delete' });

      const { onExecute } = findCommandWithId(tree, 'delete').props();
      onExecute();
      expect(defaultDeps.action.deleteRows.mock.calls[0][0])
        .toEqual({ rowIds: [defaultDeps.template.tableCell.tableRow.rowId] });
      expect(defaultDeps.action.commitDeletedRows.mock.calls[0][0])
        .toEqual({ rowIds: [defaultDeps.template.tableCell.tableRow.rowId] });
    });

    it('should not render delete command when row is editing', () => {
      isEditCommandsTableCell.mockImplementation(() => true);
      isEditTableRow.mockImplementation(() => true);

      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <TableEditColumn
            {...defaultProps}
            showDeleteCommand
          />
        </PluginHost>
      ));

      expect(findCommandWithId(tree, 'edit').exists())
        .toBeFalsy();
    });

    it('should not render delete command when row is added', () => {
      isEditCommandsTableCell.mockImplementation(() => true);
      isAddedTableRow.mockImplementation(() => true);

      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <TableEditColumn
            {...defaultProps}
            showDeleteCommand
          />
        </PluginHost>
      ));

      expect(findCommandWithId(tree, 'edit').exists())
        .toBeFalsy();
    });

    it('should render commit command when row is editing', () => {
      isEditCommandsTableCell.mockImplementation(() => true);
      isEditTableRow.mockImplementation(() => true);

      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <TableEditColumn
            {...defaultProps}
          />
        </PluginHost>
      ));

      expect(findCommandWithId(tree, 'commit').props())
        .toMatchObject({ text: 'Save' });

      const { onExecute } = findCommandWithId(tree, 'commit').props();
      onExecute();
      expect(defaultDeps.action.stopEditRows.mock.calls[0][0])
        .toEqual({ rowIds: [defaultDeps.template.tableCell.tableRow.rowId] });
      expect(defaultDeps.action.commitChangedRows.mock.calls[0][0])
        .toEqual({ rowIds: [defaultDeps.template.tableCell.tableRow.rowId] });
    });

    it('should render commit command when row is added', () => {
      isEditCommandsTableCell.mockImplementation(() => true);
      isAddedTableRow.mockImplementation(() => true);

      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <TableEditColumn
            {...defaultProps}
          />
        </PluginHost>
      ));

      expect(findCommandWithId(tree, 'commit').props())
        .toMatchObject({ text: 'Save' });

      const { onExecute } = findCommandWithId(tree, 'commit').props();
      onExecute();
      expect(defaultDeps.action.commitAddedRows.mock.calls[0][0])
        .toEqual({ rowIds: [defaultDeps.template.tableCell.tableRow.rowId] });
    });

    it('should render cancel command when row is editing', () => {
      isEditCommandsTableCell.mockImplementation(() => true);
      isEditTableRow.mockImplementation(() => true);

      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <TableEditColumn
            {...defaultProps}
          />
        </PluginHost>
      ));

      expect(findCommandWithId(tree, 'cancel').props())
        .toMatchObject({ text: 'Cancel' });

      const { onExecute } = findCommandWithId(tree, 'cancel').props();
      onExecute();
      expect(defaultDeps.action.stopEditRows.mock.calls[0][0])
        .toEqual({ rowIds: [defaultDeps.template.tableCell.tableRow.rowId] });
      expect(defaultDeps.action.cancelChangedRows.mock.calls[0][0])
        .toEqual({ rowIds: [defaultDeps.template.tableCell.tableRow.rowId] });
    });

    it('should render cancel command when row is added', () => {
      isEditCommandsTableCell.mockImplementation(() => true);
      isAddedTableRow.mockImplementation(() => true);

      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <TableEditColumn
            {...defaultProps}
          />
        </PluginHost>
      ));

      expect(findCommandWithId(tree, 'cancel').props())
        .toMatchObject({ text: 'Cancel' });

      const { onExecute } = findCommandWithId(tree, 'cancel').props();
      onExecute();
      expect(defaultDeps.action.cancelAddedRows.mock.calls[0][0])
        .toEqual({ rowIds: [defaultDeps.template.tableCell.tableRow.rowId] });
    });
  });
});
