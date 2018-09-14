import { mount } from '@vue/test-utils';
import { setupConsole } from '@devexpress/dx-testing';
import { DxPluginHost, DxTemplatePlaceholder } from '@devexpress/dx-vue-core';
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
import { DxTable } from './table';
import { PluginDepsToComponents, getComputedState } from './test-utils';

jest.mock('@devexpress/dx-grid-core', () => ({
  tableColumnsWithDataRows: jest.fn(),
  tableRowsWithDataRows: jest.fn(),
  tableCellColSpanGetter: jest.fn(),
  isNoDataTableRow: jest.fn(),
  isNoDataTableCell: jest.fn(),
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
  stubRowComponent: { name: 'StubRow', render() { return null; } },
  stubCellComponent: { name: 'StubCell', render() { return null; } },
  stubHeaderCellComponent: { name: 'HeaderStubCell', render() { return null; } },
  noDataCellComponent: { name: 'NoDataCell', render() { return null; } },
  noDataRowComponent: { name: 'NoDataRow', render() { return null; } },
};

describe('DxTable', () => {
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
      const tree = mount({
        render() {
          return (
            <DxPluginHost>
              <PluginDepsToComponents deps={defaultDeps} />
              <DxTable
                {...{ attrs: { ...defaultProps } }}
              />
            </DxPluginHost>
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
            <DxPluginHost>
              <PluginDepsToComponents deps={defaultDeps} />
              <DxTable
                {...{ attrs: { ...defaultProps } }}
                columnExtensions={columnExtensions}
              />
            </DxPluginHost>
          );
        },
      });

      expect(tableColumnsWithDataRows)
        .toBeCalledWith(defaultDeps.getter.columns, columnExtensions);
      expect(getComputedState(tree).tableColumns)
        .toBe('tableColumnsWithDataRows');
    });

    it('should provide getTableCellColSpan', () => {
      const tree = mount({
        render() {
          return (
            <DxPluginHost>
              <PluginDepsToComponents deps={defaultDeps} />
              <DxTable
                {...{ attrs: { ...defaultProps } }}
              />
            </DxPluginHost>
          );
        },
      });

      expect(getComputedState(tree).getTableCellColSpan)
        .toBe(tableCellColSpanGetter);
    });
  });

  describe('Table Layout', () => {
    it('should pass cell placeholder props to cell component attrs', () => {
      isDataTableCell.mockImplementation(() => true);
      const tableCellArgs = {
        tableRow: { row: 'row', type: 'data' },
        tableColumn: { column: 'row' },
        colSpan: 4,
        rowSpan: 2,
      };

      const wrapper = mount({
        render() {
          return (
            <DxPluginHost>
              <PluginDepsToComponents deps={defaultDeps} />
              <DxTable
                {...{ attrs: { ...defaultProps } }}
                layoutComponent={{
                  props: {
                    cellComponent: {
                      type: Object,
                    },
                  },
                  render() {
                    return (
                      <this.cellComponent
                        class="cell-component"
                        {...{ props: { ...tableCellArgs } }}
                      />
                    );
                  },
                }}
              />
            </DxPluginHost>
          );
        },
      });

      expect(wrapper.find(defaultProps.cellComponent).vm.$attrs)
        .toMatchObject(tableCellArgs);
    });
  });

  it('should render row by using rowComponent', () => {
    isDataTableRow.mockImplementation(() => true);
    const tableRowArgs = {
      tableRow: { row: 'row', type: 'data' },
      height: 40,
    };

    const tree = mount({
      render() {
        return (
          <DxPluginHost>
            <PluginDepsToComponents deps={defaultDeps} />
            <DxTable
              {...{ attrs: { ...defaultProps } }}
              layoutComponent={{
                props: {
                  rowComponent: {
                    type: Object,
                  },
                },
                render() { return <this.rowComponent {...{ attrs: { ...tableRowArgs } }} />; },
              }}
            />
          </DxPluginHost>
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
      colSpan: 1,
    };

    const tree = mount({
      render() {
        return (
          <DxPluginHost>
            <PluginDepsToComponents deps={defaultDeps} />
            <DxTable
              {...{ attrs: { ...defaultProps } }}
              layoutComponent={{
                props: {
                  cellComponent: {
                    type: Object,
                  },
                },
                render() { return <this.cellComponent {...{ props: { ...tableCellArgs } }} />; },
              }}
            />
          </DxPluginHost>
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

  it('can render custom formatted data in table cell', () => {
    isDataTableCell.mockImplementation(() => true);
    const tableCellArgs = {
      tableRow: { row: 'row' },
      tableColumn: { column: { name: 'column', dataType: 'column' } },
      colSpan: 1,
    };
    const tree = mount({
      render() {
        return (
          <DxPluginHost>
            <PluginDepsToComponents deps={defaultDeps} />
            <DxTable
              {...{ attrs: { ...defaultProps } }}
              layoutComponent={{
                props: {
                  cellComponent: {
                    type: Object,
                  },
                },
                render() { return <this.cellComponent {...{ props: { ...tableCellArgs } }} />; },
              }}
            />
          </DxPluginHost>
        );
      },
    });

    const valueFormatterTemplatePlaceholder = tree
      .findAll(DxTemplatePlaceholder)
      .wrappers
      .filter(wrapper => wrapper.props().name === 'valueFormatter')[0];

    expect(valueFormatterTemplatePlaceholder.vm.$attrs)
      .toMatchObject({
        column: tableCellArgs.tableColumn.column,
        row: tableCellArgs.tableRow.row,
        value: tableCellArgs.value,
      });
  });

  it('should render stub row on plugin-defined row', () => {
    const tableRowArgs = { tableRow: { row: 'row' } };

    const tree = mount({
      render() {
        return (
          <DxPluginHost>
            <PluginDepsToComponents deps={defaultDeps} />
            <DxTable
              {...{ attrs: { ...defaultProps } }}
              layoutComponent={{
                props: {
                  rowComponent: {
                    type: Object,
                  },
                },
                render() { return <this.rowComponent {...{ attrs: { ...tableRowArgs } }} />; },
              }}
            />
          </DxPluginHost>
        );
      },
    });

    expect(tree.find(defaultProps.stubRowComponent).vm.$attrs)
      .toMatchObject(tableRowArgs);
  });

  it('should render stub cell on plugin-defined column and row intersection', () => {
    const tableCellArgs = {
      tableRow: { row: 'row' },
      tableColumn: { column: 'column' },
      colSpan: 1,
    };

    const tree = mount({
      render() {
        return (
          <DxPluginHost>
            <PluginDepsToComponents deps={defaultDeps} />
            <DxTable
              {...{ attrs: { ...defaultProps } }}
              layoutComponent={{
                props: {
                  cellComponent: {
                    type: Object,
                  },
                },
                render() { return <this.cellComponent {...{ props: { ...tableCellArgs } }} />; },
              }}
            />
          </DxPluginHost>
        );
      },
    });

    expect(tree.find(defaultProps.stubCellComponent).vm.$attrs)
      .toMatchObject(tableCellArgs);
  });

  it('should render stub header cell on plugin-defined column and row intersection', () => {
    isHeaderStubTableCell.mockImplementation(() => true);
    const tableCellArgs = {
      tableRow: { row: 'row' },
      tableColumn: { column: 'column' },
      colSpan: 1,
    };

    const tree = mount({
      render() {
        return (
          <DxPluginHost>
            <PluginDepsToComponents deps={defaultDeps} />
            <DxTable
              {...{ attrs: { ...defaultProps } }}
              layoutComponent={{
                props: {
                  cellComponent: {
                    type: Object,
                  },
                },
                render() { return <this.cellComponent {...{ props: { ...tableCellArgs } }} />; },
              }}
            />
          </DxPluginHost>
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
    isNoDataTableCell.mockImplementation(() => true);
    const tableCellArgs = {
      tableRow: { row: 'row' }, tableColumn: { column: 'column' }, colSpan: 4,
    };

    const tree = mount({
      render() {
        return (
          <DxPluginHost>
            <PluginDepsToComponents deps={defaultDeps} />
            <DxTable
              {...{ attrs: { ...defaultProps } }}
              messages={{ noData: 'No data' }}
              layoutComponent={{
                props: {
                  cellComponent: {
                    type: Object,
                  },
                },
                render() { return <this.cellComponent {...{ props: { ...tableCellArgs } }} />; },
              }}
            />
          </DxPluginHost>
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
    };

    const tree = mount({
      render() {
        return (
          <DxPluginHost>
            <PluginDepsToComponents deps={defaultDeps} />
            <DxTable
              {...{ attrs: { ...defaultProps } }}
              layoutComponent={{
                props: {
                  rowComponent: {
                    type: Object,
                  },
                },
                render() { return <this.rowComponent {...{ attrs: { ...tableRowArgs } }} />; },
              }}
            />
          </DxPluginHost>
        );
      },
    });

    expect(isNoDataTableRow).toBeCalledWith(tableRowArgs.tableRow);
    expect(tree.find(defaultProps.noDataRowComponent).vm.$attrs)
      .toMatchObject(tableRowArgs);
  });
});
