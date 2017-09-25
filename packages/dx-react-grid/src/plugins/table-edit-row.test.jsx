import React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { PluginHost } from '@devexpress/dx-react-core';
import {
  getRowChange,
  tableRowsWithEditing,
  isEditTableCell,
  isEditTableRow,
  isAddedTableRow,
} from '@devexpress/dx-grid-core';
import { DataTypeProvider } from './data-type-provider';
import { TableEditRow } from './table-edit-row';
import { pluginDepsToComponents, getComputedState } from './test-utils';

jest.mock('@devexpress/dx-grid-core', () => ({
  getRowChange: jest.fn(),
  tableRowsWithEditing: jest.fn(),
  isEditTableCell: jest.fn(),
  isEditTableRow: jest.fn(),
  isAddedTableRow: jest.fn(),
}));

const defaultDeps = {
  getter: {
    tableBodyRows: [{ type: 'undefined', rowId: 1 }],
    editingRows: [1, 2],
    addedRows: [{ a: 'text' }, {}],
    changedRows: [{ 1: { a: 'text' } }],
    getCellValue: jest.fn(),
    createRowChange: jest.fn(),
  },
  action: {
    changeAddRow: jest.fn(),
    changeRow: jest.fn(),
  },
  template: {
    tableViewCell: {
      tableRow: { type: 'undefined', rowId: 1, rowData: { a: 'a' } },
      tableColumn: { type: 'undefined', column: 'column' },
      style: {},
    },
    tableViewRow: {
      tableRow: { type: 'undefined', rowId: 1, rowData: { a: 'a' } },
      style: {},
    },
  },
  plugins: ['EditingState', 'TableView'],
};

const defaultProps = {
  editCellTemplate: () => null,
  editRowTemplate: () => null,
};

describe('TableEditRow', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });
  afterAll(() => {
    resetConsole();
  });

  beforeEach(() => {
    getRowChange.mockImplementation(() => ({}));
    tableRowsWithEditing.mockImplementation(() => 'tableRowsWithEditing');
    isEditTableCell.mockImplementation(() => false);
    isAddedTableRow.mockImplementation(() => false);
    isEditTableRow.mockImplementation(() => false);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('table layout getters', () => {
    it('should extend tableBodyRows', () => {
      const tree = mount(
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <TableEditRow
            {...defaultProps}
            rowHeight={120}
          />
        </PluginHost>,
      );

      expect(getComputedState(tree).getters.tableBodyRows)
        .toBe('tableRowsWithEditing');
      expect(tableRowsWithEditing)
        .toBeCalledWith(
          defaultDeps.getter.tableBodyRows,
          defaultDeps.getter.editingRows,
          defaultDeps.getter.addedRows,
          120,
        );
    });
  });

  it('should render edit cell on user-defined column and edit row intersection', () => {
    isEditTableCell.mockImplementation(() => true);
    const editCellTemplate = jest.fn(() => null);

    mount(
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableEditRow
          {...defaultProps}
          editCellTemplate={editCellTemplate}
        />
      </PluginHost>,
    );

    expect(defaultDeps.getter.getCellValue).toBeCalledWith(
      { ...defaultDeps.template.tableViewCell.tableRow.rowData },
      defaultDeps.template.tableViewCell.tableColumn.column.name,
    );
    expect(isEditTableCell)
      .toBeCalledWith(
        defaultDeps.template.tableViewCell.tableRow,
        defaultDeps.template.tableViewCell.tableColumn,
      );
    expect(editCellTemplate)
      .toBeCalledWith(expect.objectContaining({
        ...defaultDeps.template.tableViewCell,
        rowData: defaultDeps.template.tableViewCell.tableRow.rowData,
        column: defaultDeps.template.tableViewCell.tableColumn.column,
      }));
  });

  it('should render edit row by using editRowTemplate', () => {
    isEditTableRow.mockImplementation(() => true);
    const editRowTemplate = jest.fn(() => null);

    mount(
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableEditRow
          {...defaultProps}
          editRowTemplate={editRowTemplate}
        />
      </PluginHost>,
    );

    expect(isEditTableRow).toBeCalledWith(defaultDeps.template.tableViewRow.tableRow);
    expect(editRowTemplate).toBeCalledWith(expect.objectContaining({
      ...defaultDeps.template.tableViewRow,
      rowData: defaultDeps.template.tableViewRow.tableRow.rowData,
    }));
  });

  it('should render new row by using editRowTemplate', () => {
    isAddedTableRow.mockImplementation(() => true);
    const editRowTemplate = jest.fn(() => null);

    mount(
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableEditRow
          {...defaultProps}
          editRowTemplate={editRowTemplate}
        />
      </PluginHost>,
    );

    expect(isAddedTableRow).toBeCalledWith(defaultDeps.template.tableViewRow.tableRow);
    expect(editRowTemplate).toBeCalledWith(expect.objectContaining({
      ...defaultDeps.template.tableViewRow,
      rowData: defaultDeps.template.tableViewRow.tableRow.rowData,
    }));
  });

  it('should handle edit cell onValueChange event', () => {
    isEditTableCell.mockImplementation(() => true);
    getRowChange.mockImplementation(() => ({ a: undefined }));
    const deps = {
      template: {
        tableViewCell: {
          tableRow: { rowData: { a: 'a1', b: 'b1' } },
          tableColumn: { column: { name: 'column' } },
        },
      },
    };
    const editCellTemplate = jest.fn(() => null);

    mount(
      <PluginHost>
        {pluginDepsToComponents(defaultDeps, deps)}
        <TableEditRow
          {...defaultProps}
          editCellTemplate={editCellTemplate}
        />
      </PluginHost>,
    );

    const onValueChange = editCellTemplate.mock.calls[0][0].onValueChange;
    onValueChange('test');

    expect(defaultDeps.getter.createRowChange)
      .toBeCalledWith({
        a: undefined,
        b: 'b1',
      }, 'column', 'test');
  });

  it('can render custom editors', () => {
    isEditTableCell.mockImplementation(() => true);
    const deps = {
      getter: {
        getCellValue: jest.fn(() => 'a2'),
      },
      template: {
        tableViewCell: {
          tableRow: { rowData: { a: 'a1', b: 'b1' } },
          tableColumn: { column: { name: 'column', dataType: 'column' } },
        },
      },
    };
    const editCellTemplate = jest.fn(() => null);
    const valueEditor = jest.fn(() => <input />);

    mount(
      <PluginHost>
        <DataTypeProvider
          type="column"
          editorTemplate={valueEditor}
        />
        {pluginDepsToComponents(defaultDeps, deps)}
        <TableEditRow
          {...defaultProps}
          editCellTemplate={editCellTemplate}
        />
      </PluginHost>,
    );

    expect(valueEditor)
      .toHaveBeenCalledWith({
        column: deps.template.tableViewCell.tableColumn.column,
        rowData: deps.template.tableViewCell.tableRow.rowData,
        value: deps.getter.getCellValue(),
        onValueChange: expect.any(Function),
      });
    expect(editCellTemplate.mock.calls[0][0])
      .toHaveProperty('children');
  });
});
