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
  getMessagesFormatter,
} from '@devexpress/dx-grid-core';
import { TableView } from './table-view';
import { DataTypeProvider } from './data-type-provider';
import { pluginDepsToComponents, getComputedState } from './test-utils';

jest.mock('@devexpress/dx-grid-core', () => ({
  tableColumnsWithDataRows: jest.fn(),
  tableRowsWithDataRows: jest.fn(),
  isNoDataTableRow: jest.fn(),
  isDataTableCell: jest.fn(),
  isHeaderStubTableCell: jest.fn(),
  isDataTableRow: jest.fn(),
  getMessagesFormatter: jest.fn(),
}));

const defaultDeps = {
  getter: {
    columns: [{ name: 'field' }],
    rows: [{ field: 1 }],
    getRowId: () => {},
    getCellValue: () => {},
  },
  template: {
    body: undefined,
  },
};

const defaultProps = {
  tableLayoutComponent: () => null,
  getTableCellComponent: () => () => null,
  tableRowComponent: () => null,
  tableStubCellComponent: () => null,
  tableStubHeaderCellComponent: () => null,
  tableNoDataCellComponent: () => null,
  tableNoDataRowComponent: () => null,
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
    getMessagesFormatter.mockImplementation(messages => key => (messages[key] || key));
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('table layout getters', () => {
    it('should provide tableBodyRows', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <TableView
            {...defaultProps}
          />
        </PluginHost>
      ));

      expect(tableRowsWithDataRows)
        .toBeCalledWith(defaultDeps.getter.rows, defaultDeps.getter.getRowId);
      expect(getComputedState(tree).getters.tableBodyRows)
        .toBe('tableRowsWithDataRows');
    });

    it('should extend tableColumns', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <TableView
            {...defaultProps}
          />
        </PluginHost>
      ));

      expect(tableColumnsWithDataRows)
        .toBeCalledWith(defaultDeps.getter.columns);
      expect(getComputedState(tree).getters.tableColumns)
        .toBe('tableColumnsWithDataRows');
    });
  });

  it('should render data cell on user-defined column and row intersection', () => {
    isDataTableCell.mockImplementation(() => true);
    const tableCellComponent = jest.fn(() => null);
    const getTableCellComponent = jest.fn(() => tableCellComponent);
    const tableCellArgs = {
      tableRow: { row: 'row' },
      tableColumn: { column: { name: 'a' } },
      style: {},
      value: undefined,
    };

    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableView
          {...defaultProps}
          tableLayoutComponent={({ cellComponent: Cell }) => <Cell {...tableCellArgs} />}
          getTableCellComponent={getTableCellComponent}
        />
      </PluginHost>
    ));

    expect(isDataTableCell)
      .toBeCalledWith(tableCellArgs.tableRow, tableCellArgs.tableColumn);
    expect(getTableCellComponent)
      .toBeCalledWith(tableCellArgs.tableColumn.column.name);
    expect(tree.find(tableCellComponent).props())
      .toMatchObject({
        ...tableCellArgs,
        row: tableCellArgs.tableRow.row,
        column: tableCellArgs.tableColumn.column,
      });
  });

  it('can render custom formatted data in table cell', () => {
    isDataTableCell.mockImplementation(() => true);
    const tableCellComponent = jest.fn(() => null);
    const getTableCellComponent = jest.fn(() => tableCellComponent);
    const valueFormatter = jest.fn(() => <span />);
    const tableCellArgs = {
      tableRow: { row: 'row' },
      tableColumn: { column: { name: 'column', dataType: 'column' } },
      style: {},
      value: undefined,
    };

    const tree = mount((
      <PluginHost>
        <DataTypeProvider
          type="column"
          formatterTemplate={valueFormatter}
        />
        {pluginDepsToComponents(defaultDeps)}
        <TableView
          {...defaultProps}
          tableLayoutComponent={({ cellComponent: Cell }) => <Cell {...tableCellArgs} />}
          getTableCellComponent={getTableCellComponent}
        />
      </PluginHost>
    ));

    expect(valueFormatter)
      .toHaveBeenCalledWith({
        column: tableCellArgs.tableColumn.column,
        row: tableCellArgs.tableRow.row,
        value: tableCellArgs.value,
      });
    expect(tree.find(tableCellComponent).props().children)
      .toBeDefined();
  });

  it('should render stub cell on plugin-defined column and row intersection', () => {
    const tableCellArgs = { tableRow: { row: 'row' }, tableColumn: { column: 'column' }, style: {} };

    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableView
          {...defaultProps}
          tableLayoutComponent={({ cellComponent: Cell }) => <Cell {...tableCellArgs} />}
        />
      </PluginHost>
    ));

    expect(tree.find(defaultProps.tableStubCellComponent).props())
      .toMatchObject(tableCellArgs);
  });

  it('should render stub header cell on plugin-defined column and row intersection', () => {
    isHeaderStubTableCell.mockImplementation(() => true);
    const tableCellArgs = { tableRow: { row: 'row' }, tableColumn: { column: 'column' }, style: {} };

    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableView
          {...defaultProps}
          tableLayoutComponent={({ cellComponent: Cell }) => <Cell {...tableCellArgs} />}
        />
      </PluginHost>
    ));

    expect(isHeaderStubTableCell)
      .toBeCalledWith(tableCellArgs.tableRow, getComputedState(tree).getters.tableHeaderRows);
    expect(tree.find(defaultProps.tableStubHeaderCellComponent).props())
      .toMatchObject(tableCellArgs);
  });

  it('should render no data cell if rows are empty', () => {
    isNoDataTableRow.mockImplementation(() => true);
    const tableCellArgs = {
      tableRow: { row: 'row' }, tableColumn: { column: 'column' }, style: {}, colSpan: 4,
    };

    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableView
          {...defaultProps}
          messages={{ noData: 'No data' }}
          tableLayoutComponent={({ cellComponent: Cell }) => <Cell {...tableCellArgs} />}
        />

      </PluginHost>
    ));

    expect(isNoDataTableRow)
      .toBeCalledWith(tableCellArgs.tableRow);
    expect(tree.find(defaultProps.tableNoDataCellComponent).props())
      .toMatchObject(tableCellArgs);
    expect(tree.find(defaultProps.tableNoDataCellComponent).props().getMessage('noData'))
      .toBe('No data');
  });

  it('should render row by using tableRowComponent', () => {
    isDataTableRow.mockImplementation(() => true);
    const tableRowArgs = {
      tableRow: { row: 'row', type: 'data' },
      style: {},
      children: null,
    };

    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableView
          {...defaultProps}
          tableLayoutComponent={({ rowComponent }) => rowComponent(tableRowArgs)}
        />
      </PluginHost>
    ));

    expect(isDataTableRow).toBeCalledWith(tableRowArgs.tableRow);
    expect(tree.find(defaultProps.tableRowComponent).props())
      .toMatchObject({
        ...tableRowArgs,
        row: tableRowArgs.tableRow.row,
      });
  });

  it('should render empty row by using tableNoDataRowComponent', () => {
    isNoDataTableRow.mockImplementation(() => true);
    const tableRowArgs = {
      tableRow: { row: 'row', type: 'nodata' },
      style: {},
      children: null,
    };

    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableView
          {...defaultProps}
          tableLayoutComponent={({ rowComponent }) => rowComponent(tableRowArgs)}
        />
      </PluginHost>
    ));

    expect(isNoDataTableRow).toBeCalledWith(tableRowArgs.tableRow);
    expect(tree.find(defaultProps.tableNoDataRowComponent).props())
      .toMatchObject(tableRowArgs);
  });
});
