import * as React from 'react';
import { mount } from 'enzyme';
import { pluginDepsToComponents, getComputedState, setupConsole } from '@devexpress/dx-testing';
import { PluginHost } from '@devexpress/dx-react-core';
import {
  tableColumnsWithDataRows,
  tableRowsWithDataRows,
  tableCellColSpanGetter,
  isNoDataTableRow,
  isNoDataTableCell,
  isDataTableCell,
  isHeaderStubTableCell,
  isDataTableRow,
} from '@devexpress/dx-grid-core';
import { Table } from './table';

jest.mock('@devexpress/dx-grid-core', () => ({
  tableColumnsWithDataRows: jest.fn(),
  tableRowsWithDataRows: jest.fn(),
  tableCellColSpanGetter: jest.fn(),
  isNoDataTableRow: jest.fn(),
  isNoDataTableCell: jest.fn(),
  isDataTableCell: jest.fn(),
  isHeaderStubTableCell: jest.fn(),
  isDataTableRow: jest.fn(),
  checkTableColumnExtensions: jest.fn(),
}));

const defaultDeps = {
  getter: {
    columns: [{ name: 'field' }],
    rows: [{ field: 1 }],
    getRowId: () => {},
    getCellValue: () => {},
    isDataLoading: false,
  },
  template: {
    body: undefined,
  },
};

const defaultProps = {
  tableComponent: () => null,
  headComponent: () => null,
  bodyComponent: () => null,
  footerComponent: () => null,
  containerComponent: () => null,
  layoutComponent: () => null,
  cellComponent: () => null,
  rowComponent: () => null,
  stubRowComponent: () => null,
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
    tableCellColSpanGetter.mockImplementation(() => 'tableCellColSpanGetter');
    isNoDataTableRow.mockImplementation(() => false);
    isNoDataTableCell.mockImplementation(() => false);
    isDataTableCell.mockImplementation(() => false);
    isHeaderStubTableCell.mockImplementation(() => false);
    isDataTableRow.mockImplementation(() => false);
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
          />
        </PluginHost>
      ));

      expect(tableRowsWithDataRows)
        .toBeCalledWith(
          defaultDeps.getter.rows,
          defaultDeps.getter.getRowId,
          defaultDeps.getter.isDataLoading,
        );
      expect(getComputedState(tree).tableBodyRows)
        .toBe('tableRowsWithDataRows');
    });

    it('should provide getTableCellColSpan', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <Table
            {...defaultProps}
            tableComponent={() => null}
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).getTableCellColSpan)
        .toBe(tableCellColSpanGetter);
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
      .find('TemplatePlaceholderBase')
      .findWhere(node => node.prop('name') === 'valueFormatter').last();

    expect(valueFormatterTemplatePlaceholder.prop('params'))
      .toMatchObject({
        column: tableCellArgs.tableColumn.column,
        row: tableCellArgs.tableRow.row,
        value: tableCellArgs.value,
      });
    expect(tree.find(defaultProps.cellComponent).props().children)
      .toBeDefined();
  });

  it('should render stub row on plugin-defined row', () => {
    const tableRowArgs = { tableRow: { row: 'row' } };

    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <Table
          {...defaultProps}
          layoutComponent={({ rowComponent: Row }) => <Row {...tableRowArgs} />}
        />
      </PluginHost>
    ));

    expect(tree.find(defaultProps.stubRowComponent).props())
      .toMatchObject(tableRowArgs);
  });

  it('should render stub cell on plugin-defined column and row intersection', () => {
    const tableCellArgs = {
      tableRow: { row: 'row' },
      tableColumn: { column: 'column' },
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

    expect(tree.find(defaultProps.stubCellComponent).props())
      .toMatchObject(tableCellArgs);
  });

  it('should render stub header cell on plugin-defined column and row intersection', () => {
    isHeaderStubTableCell.mockImplementation(() => true);
    const tableCellArgs = {
      tableRow: { row: 'row' },
      tableColumn: { column: 'column' },
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

    expect(isHeaderStubTableCell)
      .toBeCalledWith(tableCellArgs.tableRow, getComputedState(tree).tableHeaderRows);
    expect(tree.find(defaultProps.stubHeaderCellComponent).props())
      .toMatchObject(tableCellArgs);
  });

  it('should render no data cell if rows are empty', () => {
    isNoDataTableRow.mockImplementation(() => true);
    isNoDataTableCell.mockImplementation(() => true);
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
          layoutComponent={({ rowComponent: Row }) => <Row {...tableRowArgs} />}
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
          layoutComponent={({ rowComponent: Row }) => <Row {...tableRowArgs} />}
        />
      </PluginHost>
    ));

    expect(isNoDataTableRow).toBeCalledWith(tableRowArgs.tableRow);
    expect(tree.find(defaultProps.noDataRowComponent).props())
      .toMatchObject(tableRowArgs);
  });
});
