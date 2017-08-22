import React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { PluginHost } from '@devexpress/dx-react-core';
import {
  getRowChange,
  tableRowsWithEditing,
  isEditNewTableCell,
  isEditExistingTableCell,
} from '@devexpress/dx-grid-core';
import { TableEditRow } from './table-edit-row';
import { pluginDepsToComponents } from './test-utils';

jest.mock('@devexpress/dx-grid-core', () => ({
  getRowChange: jest.fn(),
  tableRowsWithEditing: jest.fn(),
  isEditNewTableCell: jest.fn(),
  isEditExistingTableCell: jest.fn(),
}));

const defaultDeps = {
  getter: {
    tableBodyRows: [{ type: 'undefined', rowId: 1 }],
    editingRows: [1, 2],
    addedRows: [{ a: 'text' }, {}],
    changedRows: [{ 1: { a: 'text' } }],
    getCellData: jest.fn(),
    createRowChange: jest.fn(),
  },
  action: {
    changeAddRow: jest.fn(),
    changeRow: jest.fn(),
  },
  template: {
    tableViewCell: {
      tableRow: { type: 'undefined', rowId: 1, row: { a: 'a' } },
      tableColumn: { type: 'undefined', column: 'column' },
      style: {},
    },
  },
  plugins: ['EditingState', 'TableView'],
};

const defaultProps = {
  editCellTemplate: () => null,
};

describe('TableHeaderRow', () => {
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
    isEditNewTableCell.mockImplementation(() => false);
    isEditExistingTableCell.mockImplementation(() => false);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('table layout getters', () => {
    it('should extend tableBodyRows', () => {
      const deps = {};
      mount(
        <PluginHost>
          {pluginDepsToComponents(defaultDeps, deps)}
          <TableEditRow
            {...defaultProps}
            rowHeight={120}
          />
        </PluginHost>,
      );

      expect(deps.computedGetter('tableBodyRows'))
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

  it('should render edit cell on user-defined column and added row intersection', () => {
    isEditNewTableCell.mockImplementation(() => true);
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

    expect(defaultDeps.getter.getCellData).toBeCalledWith(
      defaultDeps.template.tableViewCell.tableRow.row,
      defaultDeps.template.tableViewCell.tableColumn.column.name,
    );
    expect(isEditNewTableCell)
      .toBeCalledWith(
        defaultDeps.template.tableViewCell.tableRow,
        defaultDeps.template.tableViewCell.tableColumn,
      );
    expect(editCellTemplate)
      .toBeCalledWith(expect.objectContaining({
        ...defaultDeps.template.tableViewCell,
        row: defaultDeps.template.tableViewCell.tableRow.row,
        column: defaultDeps.template.tableViewCell.tableColumn.column,
      }));
  });

  it('should render edit cell on user-defined column and edit row intersection', () => {
    isEditExistingTableCell.mockImplementation(() => true);
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

    expect(defaultDeps.getter.getCellData).toBeCalledWith(
      { ...defaultDeps.template.tableViewCell.tableRow.row },
      defaultDeps.template.tableViewCell.tableColumn.column.name,
    );
    expect(isEditExistingTableCell)
      .toBeCalledWith(
        defaultDeps.template.tableViewCell.tableRow,
        defaultDeps.template.tableViewCell.tableColumn,
      );
    expect(editCellTemplate)
      .toBeCalledWith(expect.objectContaining({
        ...defaultDeps.template.tableViewCell,
        row: defaultDeps.template.tableViewCell.tableRow.row,
        column: defaultDeps.template.tableViewCell.tableColumn.column,
      }));
  });
  it('should handle edit cell onValueChange event', () => {
    isEditExistingTableCell.mockImplementation(() => true);
    getRowChange.mockImplementation(() => ({ a: undefined }));
    defaultDeps.template.tableViewCell.tableRow.row = { a: 'a1', b: 'b1' };
    defaultDeps.template.tableViewCell.tableColumn.column = { name: 'column' };
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

    const onValueChange = editCellTemplate.mock.calls[0][0].onValueChange;
    onValueChange('test');

    const createRowChangeArgs = defaultDeps.getter.createRowChange.mock.calls[0];

    expect(createRowChangeArgs[0]).toEqual({
      a: undefined,
      b: 'b1',
    });
    expect(createRowChangeArgs[1]).toBe('column');
    expect(createRowChangeArgs[2]).toBe('test');
  });
});
