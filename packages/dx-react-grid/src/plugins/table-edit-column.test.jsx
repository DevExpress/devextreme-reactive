import React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { PluginHost } from '@devexpress/dx-react-core';
import {
  tableColumnsWithEditing,
  isHeadingEditCommandsTableCell,
  isDataEditCommandsTableCell,
  isEditCommandsTableCell,
  isAddedTableRow,
  isEditTableRow,
  getMessagesFormatter,
} from '@devexpress/dx-grid-core';
import { TableEditColumn } from './table-edit-column';
import { pluginDepsToComponents, getComputedState } from './test-utils';

jest.mock('@devexpress/dx-grid-core', () => ({
  tableColumnsWithEditing: jest.fn(),
  isHeadingEditCommandsTableCell: jest.fn(),
  isDataEditCommandsTableCell: jest.fn(),
  isEditCommandsTableCell: jest.fn(),
  isAddedTableRow: jest.fn(),
  isEditTableRow: jest.fn(),
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

      expect(getComputedState(tree).getters.tableColumns)
        .toBe('tableColumnsWithEditing');
      expect(tableColumnsWithEditing)
        .toBeCalledWith(defaultDeps.getter.tableColumns, 120);
    });
  });

  describe('headerCell', () => {
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
      expect(tree.find(defaultProps.commandComponent).filterWhere(wrapper => wrapper.prop('id') === 'add').exists())
        .toBeFalsy();
    });

    it('should render add command when allowAdding is true', () => {
      isHeadingEditCommandsTableCell.mockImplementation(() => true);

      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <TableEditColumn
            {...defaultProps}
            allowAdding
          />
        </PluginHost>
      ));

      expect(tree.find(defaultProps.commandComponent).filterWhere(wrapper => wrapper.prop('id') === 'add').props())
        .toMatchObject({ text: 'addCommand' });

      const { onExecute } = tree.find(defaultProps.commandComponent).filterWhere(wrapper => wrapper.prop('id') === 'add').props();
      onExecute();
      expect(defaultDeps.action.addRow)
        .toBeCalled();
    });
  });

  describe('cell', () => {
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
      expect(tree.find(defaultProps.commandComponent).filterWhere(wrapper => wrapper.prop('id') === 'edit').exists())
        .toBeFalsy();
      expect(tree.find(defaultProps.commandComponent).filterWhere(wrapper => wrapper.prop('id') === 'delete').exists())
        .toBeFalsy();
      expect(tree.find(defaultProps.commandComponent).filterWhere(wrapper => wrapper.prop('id') === 'commit').exists())
        .toBeFalsy();
      expect(tree.find(defaultProps.commandComponent).filterWhere(wrapper => wrapper.prop('id') === 'cancel').exists())
        .toBeFalsy();
    });

    it('should render edit command when allowEditing is true', () => {
      isEditCommandsTableCell.mockImplementation(() => true);

      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <TableEditColumn
            {...defaultProps}
            allowEditing
          />
        </PluginHost>
      ));

      expect(tree.find(defaultProps.commandComponent).filterWhere(wrapper => wrapper.prop('id') === 'edit').props())
        .toMatchObject({ text: 'editCommand' });

      const { onExecute } = tree.find(defaultProps.commandComponent).filterWhere(wrapper => wrapper.prop('id') === 'edit').props();
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
            allowEditing
          />
        </PluginHost>
      ));

      expect(tree.find(defaultProps.commandComponent).filterWhere(wrapper => wrapper.prop('id') === 'edit').exists())
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
            allowEditing
          />
        </PluginHost>
      ));

      expect(tree.find(defaultProps.commandComponent).filterWhere(wrapper => wrapper.prop('id') === 'edit').exists())
        .toBeFalsy();
    });

    it('should render delete command when allowDeleting is true', () => {
      isEditCommandsTableCell.mockImplementation(() => true);

      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <TableEditColumn
            {...defaultProps}
            allowDeleting
          />
        </PluginHost>
      ));

      expect(tree.find(defaultProps.commandComponent).filterWhere(wrapper => wrapper.prop('id') === 'delete').props())
        .toMatchObject({ text: 'deleteCommand' });

      const { onExecute } = tree.find(defaultProps.commandComponent).filterWhere(wrapper => wrapper.prop('id') === 'delete').props();
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
            allowDeleting
          />
        </PluginHost>
      ));

      expect(tree.find(defaultProps.commandComponent).filterWhere(wrapper => wrapper.prop('id') === 'edit').exists())
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
            allowDeleting
          />
        </PluginHost>
      ));

      expect(tree.find(defaultProps.commandComponent).filterWhere(wrapper => wrapper.prop('id') === 'edit').exists())
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

      expect(tree.find(defaultProps.commandComponent).filterWhere(wrapper => wrapper.prop('id') === 'commit').props())
        .toMatchObject({ text: 'commitCommand' });

      const { onExecute } = tree.find(defaultProps.commandComponent).filterWhere(wrapper => wrapper.prop('id') === 'commit').props();
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

      expect(tree.find(defaultProps.commandComponent).filterWhere(wrapper => wrapper.prop('id') === 'commit').props())
        .toMatchObject({ text: 'commitCommand' });

      const { onExecute } = tree.find(defaultProps.commandComponent).filterWhere(wrapper => wrapper.prop('id') === 'commit').props();
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

      expect(tree.find(defaultProps.commandComponent).filterWhere(wrapper => wrapper.prop('id') === 'cancel').props())
        .toMatchObject({ text: 'cancelCommand' });

      const { onExecute } = tree.find(defaultProps.commandComponent).filterWhere(wrapper => wrapper.prop('id') === 'cancel').props();
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

      expect(tree.find(defaultProps.commandComponent).filterWhere(wrapper => wrapper.prop('id') === 'cancel').props())
        .toMatchObject({ text: 'cancelCommand' });

      const { onExecute } = tree.find(defaultProps.commandComponent).filterWhere(wrapper => wrapper.prop('id') === 'cancel').props();
      onExecute();
      expect(defaultDeps.action.cancelAddedRows.mock.calls[0][0])
        .toEqual({ rowIds: [defaultDeps.template.tableCell.tableRow.rowId] });
    });
  });
});
