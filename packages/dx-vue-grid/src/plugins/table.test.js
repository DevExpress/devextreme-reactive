import { mount } from '@vue/test-utils';
import { setupConsole } from '@devexpress/dx-testing';
import { PluginHost } from '@devexpress/dx-vue-core';
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
import { PluginDepsToComponents, getComputedState } from './test-utils';

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
  tableComponent: { render() { return null; } },
  headComponent: { render() { return null; } },
  bodyComponent: { render() { return null; } },
  containerComponent: { render() { return null; } },
  layoutComponent: { render() { return null; } },
  cellComponent: { name: 'Cell', render() { return null; } },
  rowComponent: { name: 'Row', render() { return null; } },
  stubCellComponent: { name: 'StubCell', render() { return null; } },
  stubHeaderCellComponent: { name: 'HeaderStubCell', render() { return null; } },
  noDataCellComponent: { name: 'NoDataCell', render() { return null; } },
  noDataRowComponent: { name: 'NoDataRow', render() { return null; } },
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
      const tree = mount({
        render() {
          return (
            <PluginHost>
              <PluginDepsToComponents deps={defaultDeps} />
              <Table
                {...{ attrs: { ...defaultProps } }}
              />
            </PluginHost>
          );
        },
      });

      expect(tableRowsWithDataRows)
        .toBeCalledWith(defaultDeps.getter.rows, defaultDeps.getter.getRowId);
      expect(getComputedState(tree).tableBodyRows)
        .toBe('tableRowsWithDataRows');
    });

    it('should extend tableColumns', () => {
      const columnExtensions = [{ columnName: 'field', width: 100 }];

      const tree = mount({
        render() {
          return (
            <PluginHost>
              <PluginDepsToComponents deps={defaultDeps} />
              <Table
                {...{ attrs: { ...defaultProps } }}
                columnExtensions={columnExtensions}
              />
            </PluginHost>
          );
        },
      });

      expect(tableColumnsWithDataRows)
        .toBeCalledWith(defaultDeps.getter.columns, columnExtensions);
      expect(getComputedState(tree).tableColumns)
        .toBe('tableColumnsWithDataRows');
    });
  });

  it('should render row by using rowComponent', () => {
    isDataTableRow.mockImplementation(() => true);
    const tableRowArgs = {
      tableRow: { row: 'row', type: 'data' },
      style: {},
      children: null,
    };

    const tree = mount({
      render() {
        return (
          <PluginHost>
            <PluginDepsToComponents deps={defaultDeps} />
            <Table
              {...{ attrs: { ...defaultProps } }}
              layoutComponent={{
                props: { rowComponent: {} },
                render() { return <this.rowComponent {...{ attrs: { ...tableRowArgs } }} />; },
              }}
            />
          </PluginHost>
        );
      },
    });

    expect(isDataTableRow).toBeCalledWith(tableRowArgs.tableRow);
    expect(tree.find(defaultProps.rowComponent).vm.$attrs)
      .toMatchObject({
        ...tableRowArgs,
        row: tableRowArgs.tableRow.row,
      });
  });

  it('should render data cell on user-defined column and row intersection', () => {
    isDataTableCell.mockImplementation(() => true);
    const tableCellArgs = {
      tableRow: { row: 'row' },
      tableColumn: { column: { name: 'a' } },
      style: {},
    };

    const tree = mount({
      render() {
        return (
          <PluginHost>
            <PluginDepsToComponents deps={defaultDeps} />
            <Table
              {...{ attrs: { ...defaultProps } }}
              layoutComponent={{
                props: { cellComponent: {} },
                render() { return <this.cellComponent {...{ attrs: { ...tableCellArgs } }} />; },
              }}
            />
          </PluginHost>
        );
      },
    });

    expect(isDataTableCell)
      .toBeCalledWith(tableCellArgs.tableRow, tableCellArgs.tableColumn);
    expect(tree.find(defaultProps.cellComponent).vm.$attrs)
      .toMatchObject({
        ...tableCellArgs,
        row: tableCellArgs.tableRow.row,
        column: tableCellArgs.tableColumn.column,
      });
  });

  it('should render stub cell on plugin-defined column and row intersection', () => {
    const tableCellArgs = { tableRow: { row: 'row' }, tableColumn: { column: 'column' }, style: {} };

    const tree = mount({
      render() {
        return (
          <PluginHost>
            <PluginDepsToComponents deps={defaultDeps} />
            <Table
              {...{ attrs: { ...defaultProps } }}
              layoutComponent={{
                props: { cellComponent: {} },
                render() { return <this.cellComponent {...{ attrs: { ...tableCellArgs } }} />; },
              }}
            />
          </PluginHost>
        );
      },
    });

    expect(tree.find(defaultProps.stubCellComponent).vm.$attrs)
      .toMatchObject(tableCellArgs);
  });

  it('should render stub header cell on plugin-defined column and row intersection', () => {
    isHeaderStubTableCell.mockImplementation(() => true);
    const tableCellArgs = { tableRow: { row: 'row' }, tableColumn: { column: 'column' }, style: {} };

    const tree = mount({
      render() {
        return (
          <PluginHost>
            <PluginDepsToComponents deps={defaultDeps} />
            <Table
              {...{ attrs: { ...defaultProps } }}
              layoutComponent={{
                props: { cellComponent: {} },
                render() { return <this.cellComponent {...{ attrs: { ...tableCellArgs } }} />; },
              }}
            />
          </PluginHost>
        );
      },
    });

    expect(isHeaderStubTableCell)
      .toBeCalledWith(tableCellArgs.tableRow, getComputedState(tree).tableHeaderRows);
    expect(tree.find(defaultProps.stubHeaderCellComponent).vm.$attrs)
      .toMatchObject(tableCellArgs);
  });

  it('should render no data cell if rows are empty', () => {
    isNoDataTableRow.mockImplementation(() => true);
    const tableCellArgs = {
      tableRow: { row: 'row' }, tableColumn: { column: 'column' }, style: {}, colSpan: 4,
    };

    const tree = mount({
      render() {
        return (
          <PluginHost>
            <PluginDepsToComponents deps={defaultDeps} />
            <Table
              {...{ attrs: { ...defaultProps } }}
              messages={{ noData: 'No data' }}
              layoutComponent={{
                props: { cellComponent: {} },
                render() { return <this.cellComponent {...{ attrs: { ...tableCellArgs } }} />; },
              }}
            />
          </PluginHost>
        );
      },
    });

    expect(isNoDataTableRow)
      .toBeCalledWith(tableCellArgs.tableRow);
    expect(tree.find(defaultProps.noDataCellComponent).vm.$attrs)
      .toMatchObject(tableCellArgs);
    expect(tree.find(defaultProps.noDataCellComponent).vm.$attrs.getMessage('noData'))
      .toBe('No data');
  });

  it('should render empty row by using noDataRowComponent', () => {
    isNoDataTableRow.mockImplementation(() => true);
    const tableRowArgs = {
      tableRow: { row: 'row', type: 'nodata' },
      style: {},
      children: null,
    };

    const tree = mount({
      render() {
        return (
          <PluginHost>
            <PluginDepsToComponents deps={defaultDeps} />
            <Table
              {...{ attrs: { ...defaultProps } }}
              layoutComponent={{
                props: { rowComponent: {} },
                render() { return <this.rowComponent {...{ attrs: { ...tableRowArgs } }} />; },
              }}
            />
          </PluginHost>
        );
      },
    });

    expect(isNoDataTableRow).toBeCalledWith(tableRowArgs.tableRow);
    expect(tree.find(defaultProps.noDataRowComponent).vm.$attrs)
      .toMatchObject(tableRowArgs);
  });
});
