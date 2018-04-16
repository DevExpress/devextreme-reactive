import * as React from 'react';
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
import { Table } from './table';
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
  tableComponent: () => null,
  headComponent: () => null,
  bodyComponent: () => null,
  containerComponent: () => null,
  layoutComponent: () => null,
  cellComponent: () => null,
  rowComponent: () => null,
  stubCellComponent: () => null,
  stubHeaderCellComponent: () => null,
  noDataCellComponent: () => null,
  noDataRowComponent: () => null,
};

describe('Table', () => {
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
          <Table
            {...defaultProps}
            tableComponent={() => null}
          />
        </PluginHost>
      ));

      expect(tableRowsWithDataRows)
        .toBeCalledWith(defaultDeps.getter.rows, defaultDeps.getter.getRowId);
      expect(getComputedState(tree).tableBodyRows)
        .toBe('tableRowsWithDataRows');
    });

    it('should extend tableColumns', () => {
      const columnExtensions = [{ columnName: 'field', width: 100 }];

      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <Table
            {...defaultProps}
            tableComponent={() => null}
            columnExtensions={columnExtensions}
          />
        </PluginHost>
      ));

      expect(tableColumnsWithDataRows)
        .toBeCalledWith(defaultDeps.getter.columns, columnExtensions);
      expect(getComputedState(tree).tableColumns)
        .toBe('tableColumnsWithDataRows');
    });
  });

  it('should render data cell on user-defined column and row intersection', () => {
    isDataTableCell.mockImplementation(() => true);
    const tableCellArgs = {
      tableRow: { row: 'row' },
      tableColumn: { column: { name: 'a' } },
      style: {},
    };

    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <Table
          {...defaultProps}
          layoutComponent={({ cellComponent: Cell }) => <Cell {...tableCellArgs} />}
        />
      </PluginHost>
    ));

    expect(isDataTableCell)
      .toBeCalledWith(tableCellArgs.tableRow, tableCellArgs.tableColumn);
    expect(tree.find(defaultProps.cellComponent).props())
      .toMatchObject({
        ...tableCellArgs,
        row: tableCellArgs.tableRow.row,
        column: tableCellArgs.tableColumn.column,
      });
  });

  it('can render custom formatted data in table cell', () => {
    isDataTableCell.mockImplementation(() => true);
    const tableCellArgs = {
      tableRow: { row: 'row' },
      tableColumn: { column: { name: 'column', dataType: 'column' } },
      style: {},
    };

    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <Table
          {...defaultProps}
          layoutComponent={({ cellComponent: Cell }) => <Cell {...tableCellArgs} />}
        />
      </PluginHost>
    ));

    const valueFormatterTemplatePlaceholder = tree
      .find('TemplatePlaceholder')
      .findWhere(node => node.prop('name') === 'valueFormatter');

    expect(valueFormatterTemplatePlaceholder.prop('params'))
      .toMatchObject({
        column: tableCellArgs.tableColumn.column,
        row: tableCellArgs.tableRow.row,
        value: tableCellArgs.value,
      });
    expect(tree.find(defaultProps.cellComponent).props().children)
      .toBeDefined();
  });

  it('should render stub cell on plugin-defined column and row intersection', () => {
    const tableCellArgs = { tableRow: { row: 'row' }, tableColumn: { column: 'column' }, style: {} };

    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <Table
          {...defaultProps}
          layoutComponent={({ cellComponent: Cell }) => <Cell {...tableCellArgs} />}
        />
      </PluginHost>
    ));

    expect(tree.find(defaultProps.stubCellComponent).props())
      .toMatchObject(tableCellArgs);
  });

  it('should render stub header cell on plugin-defined column and row intersection', () => {
    isHeaderStubTableCell.mockImplementation(() => true);
    const tableCellArgs = { tableRow: { row: 'row' }, tableColumn: { column: 'column' }, style: {} };

    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <Table
          {...defaultProps}
          layoutComponent={({ cellComponent: Cell }) => <Cell {...tableCellArgs} />}
        />
      </PluginHost>
    ));

    expect(isHeaderStubTableCell)
      .toBeCalledWith(tableCellArgs.tableRow, getComputedState(tree).tableHeaderRows);
    expect(tree.find(defaultProps.stubHeaderCellComponent).props())
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
        <Table
          {...defaultProps}
          messages={{ noData: 'No data' }}
          layoutComponent={({ cellComponent: Cell }) => <Cell {...tableCellArgs} />}
        />

      </PluginHost>
    ));

    expect(isNoDataTableRow)
      .toBeCalledWith(tableCellArgs.tableRow);
    expect(tree.find(defaultProps.noDataCellComponent).props())
      .toMatchObject(tableCellArgs);
    expect(tree.find(defaultProps.noDataCellComponent).props().getMessage('noData'))
      .toBe('No data');
  });

  it('should render row by using rowComponent', () => {
    isDataTableRow.mockImplementation(() => true);
    const tableRowArgs = {
      tableRow: { row: 'row', type: 'data' },
      style: {},
      children: null,
    };

    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <Table
          {...defaultProps}
          layoutComponent={({ rowComponent }) => rowComponent(tableRowArgs)}
        />
      </PluginHost>
    ));

    expect(isDataTableRow).toBeCalledWith(tableRowArgs.tableRow);
    expect(tree.find(defaultProps.rowComponent).props())
      .toMatchObject({
        ...tableRowArgs,
        row: tableRowArgs.tableRow.row,
      });
  });

  it('should render empty row by using noDataRowComponent', () => {
    isNoDataTableRow.mockImplementation(() => true);
    const tableRowArgs = {
      tableRow: { row: 'row', type: 'nodata' },
      style: {},
      children: null,
    };

    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <Table
          {...defaultProps}
          layoutComponent={({ rowComponent }) => rowComponent(tableRowArgs)}
        />
      </PluginHost>
    ));

    expect(isNoDataTableRow).toBeCalledWith(tableRowArgs.tableRow);
    expect(tree.find(defaultProps.noDataRowComponent).props())
      .toMatchObject(tableRowArgs);
  });
});
