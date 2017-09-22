import React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { PluginHost } from '@devexpress/dx-react-core';
import {
  tableColumnsWithDataRows,
  tableRowsWithDataRows,
  isNoDataTableRow,
  isDataTableCell,
  isHeaderStubTableCell,
  isDataTableRow,
} from '@devexpress/dx-grid-core';
import { TableView } from './table-view';
import { pluginDepsToComponents, getComputedState } from './test-utils';

jest.mock('@devexpress/dx-grid-core', () => ({
  tableColumnsWithDataRows: jest.fn(),
  tableRowsWithDataRows: jest.fn(),
  isNoDataTableRow: jest.fn(),
  isDataTableCell: jest.fn(),
  isHeaderStubTableCell: jest.fn(),
  isDataTableRow: jest.fn(),
}));

const defaultDeps = {
  getter: {
    columns: [{ name: 'field' }],
    rows: [{ field: 1 }],
    getRowId: () => {},
    getCellValue: () => {},
  },
  action: {
    setColumnOrder: jest.fn(),
  },
  template: {
    body: undefined,
  },
};

const defaultProps = {
  tableLayoutTemplate: () => null,
  tableCellTemplate: () => null,
  tableRowTemplate: () => null,
  tableStubCellTemplate: () => null,
  tableStubHeaderCellTemplate: () => null,
  tableNoDataCellTemplate: () => null,
  tableNoDataRowTemplate: () => null,
};

describe('TableView', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });
  afterAll(() => {
    resetConsole();
  });

  beforeEach(() => {
    tableColumnsWithDataRows.mockImplementation(() => 'tableColumnsWithDataRows');
    tableRowsWithDataRows.mockImplementation(() => 'tableRowsWithDataRows');
    isNoDataTableRow.mockImplementation(() => false);
    isDataTableCell.mockImplementation(() => false);
    isHeaderStubTableCell.mockImplementation(() => false);
    isDataTableRow.mockImplementation(() => false);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('table layout getters', () => {
    it('should provide tableBodyRows', () => {
      const tree = mount(
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <TableView
            {...defaultProps}
          />
        </PluginHost>,
      );

      expect(tableRowsWithDataRows)
        .toBeCalledWith(defaultDeps.getter.rows, defaultDeps.getter.getRowId);
      expect(getComputedState(tree).getters.tableBodyRows)
        .toBe('tableRowsWithDataRows');
    });

    it('should extend tableColumns', () => {
      const tree = mount(
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <TableView
            {...defaultProps}
          />
        </PluginHost>,
      );

      expect(tableColumnsWithDataRows)
        .toBeCalledWith(defaultDeps.getter.columns);
      expect(getComputedState(tree).getters.tableColumns)
        .toBe('tableColumnsWithDataRows');
    });
  });

  it('should render data cell on user-defined column and row intersection', () => {
    isDataTableCell.mockImplementation(() => true);
    const tableCellTemplate = jest.fn(() => null);
    const tableCellArgs = {
      tableRow: { row: 'row' },
      tableColumn: { column: 'column' },
      style: {},
      value: undefined,
    };

    mount(
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableView
          {...defaultProps}
          tableLayoutTemplate={({ cellTemplate }) => cellTemplate(tableCellArgs)}
          tableCellTemplate={tableCellTemplate}
        />
      </PluginHost>,
    );

    expect(isDataTableCell)
      .toBeCalledWith(tableCellArgs.tableRow, tableCellArgs.tableColumn);
    expect(tableCellTemplate)
      .toBeCalledWith({
        ...tableCellArgs,
        row: tableCellArgs.tableRow.row,
        column: tableCellArgs.tableColumn.column,
      });
  });

  it('should render stub cell on plugin-defined column and row intersection', () => {
    const tableStubCellTemplate = jest.fn(() => null);
    const tableCellArgs = { tableRow: { row: 'row' }, tableColumn: { column: 'column' }, style: {} };

    mount(
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableView
          {...defaultProps}
          tableLayoutTemplate={({ cellTemplate }) => cellTemplate(tableCellArgs)}
          tableStubCellTemplate={tableStubCellTemplate}
        />
      </PluginHost>,
    );

    expect(tableStubCellTemplate)
      .toBeCalledWith(tableCellArgs);
  });

  it('should render stub header cell on plugin-defined column and row intersection', () => {
    isHeaderStubTableCell.mockImplementation(() => true);
    const tableStubHeaderCellTemplate = jest.fn(() => null);
    const tableCellArgs = { tableRow: { row: 'row' }, tableColumn: { column: 'column' }, style: {} };

    const tree = mount(
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableView
          {...defaultProps}
          tableLayoutTemplate={({ cellTemplate }) => cellTemplate(tableCellArgs)}
          tableStubHeaderCellTemplate={tableStubHeaderCellTemplate}
        />
      </PluginHost>,
    );

    expect(isHeaderStubTableCell)
      .toBeCalledWith(tableCellArgs.tableRow, getComputedState(tree).getters.tableHeaderRows);
    expect(tableStubHeaderCellTemplate)
      .toBeCalledWith(tableCellArgs);
  });

  it('should render no data cell if rows are empty', () => {
    isNoDataTableRow.mockImplementation(() => true);
    const tableNoDataCellTemplate = jest.fn(() => null);
    const tableCellArgs = { tableRow: { row: 'row' }, tableColumn: { column: 'column' }, style: {}, colSpan: 4 };

    mount(
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableView
          {...defaultProps}
          tableLayoutTemplate={({ cellTemplate }) => cellTemplate(tableCellArgs)}
          tableNoDataCellTemplate={tableNoDataCellTemplate}
        />
      </PluginHost>,
    );

    expect(isNoDataTableRow)
      .toBeCalledWith(tableCellArgs.tableRow);
    expect(tableNoDataCellTemplate)
      .toBeCalledWith(tableCellArgs);
  });

  it('should render row by using tableRowTemplate', () => {
    isDataTableRow.mockImplementation(() => true);
    const tableRowTemplate = jest.fn(() => null);
    const tableRowArgs = {
      tableRow: { row: 'row', type: 'data' },
      style: {},
      children: null,
    };

    mount(
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableView
          {...defaultProps}
          tableLayoutTemplate={({ rowTemplate }) => rowTemplate(tableRowArgs)}
          tableRowTemplate={tableRowTemplate}
        />
      </PluginHost>,
    );

    expect(isDataTableRow).toBeCalledWith(tableRowArgs.tableRow);
    expect(tableRowTemplate).toBeCalledWith(expect.objectContaining({
      ...tableRowArgs,
      row: tableRowArgs.tableRow.row,
    }));
  });
  it('should render empty row by using tableNoDataRowTemplate', () => {
    isNoDataTableRow.mockImplementation(() => true);
    const tableNoDataRowTemplate = jest.fn(() => null);
    const tableRowArgs = {
      tableRow: { row: 'row', type: 'nodata' },
      style: {},
      children: null,
    };

    mount(
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableView
          {...defaultProps}
          tableLayoutTemplate={({ rowTemplate }) => rowTemplate(tableRowArgs)}
          tableNoDataRowTemplate={tableNoDataRowTemplate}
        />
      </PluginHost>,
    );

    expect(isNoDataTableRow).toBeCalledWith(tableRowArgs.tableRow);
    expect(tableNoDataRowTemplate).toBeCalledWith(tableRowArgs);
  });
});
