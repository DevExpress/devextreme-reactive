import * as React from 'react';
import { memoize, getMessagesFormatter, Memoized } from '@devexpress/dx-core';
import {
  Getter,
  Template,
  TemplatePlaceholder,
  TemplateConnector,
  Plugin,
  Getters,
  PluginComponents,
} from '@devexpress/dx-react-core';
import {
  tableColumnsWithDataRows,
  tableRowsWithDataRows,
  tableCellColSpanGetter,
  isNoDataTableRow,
  isNoDataTableCell,
  isDataTableCell,
  isHeaderStubTableCell,
  isDataTableRow,
  TABLE_DATA_TYPE,
  TABLE_NODATA_TYPE,
  GridColumnExtension,
} from '@devexpress/dx-grid-core';
import { TableProps, Table as TableNS } from '../types';

const RowPlaceholder = props => <TemplatePlaceholder name="tableRow" params={props} />;
const CellPlaceholder = props => <TemplatePlaceholder name="tableCell" params={props} />;

const tableHeaderRows = [];
const tableBodyRowsComputed = ({ rows, getRowId }: Getters) => (
  tableRowsWithDataRows(rows, getRowId)
);
const tableFooterRows = [];

const defaultMessages = {
  noData: 'No data',
};

class TableBase extends React.PureComponent<TableProps> {
  static defaultProps = {
    columnExtensions: undefined,
    messages: {},
  };
  static COLUMN_TYPE = TABLE_DATA_TYPE;
  static ROW_TYPE = TABLE_DATA_TYPE;
  static NODATA_ROW_TYPE = TABLE_NODATA_TYPE;
  static components: PluginComponents;

  tableColumnsComputed: Memoized<GridColumnExtension[], typeof tableColumnsWithDataRows>;

  constructor(props) {
    super(props);

    this.tableColumnsComputed = memoize(
      (columnExtensions: GridColumnExtension[]) => ({
        columns,
      }) => tableColumnsWithDataRows(columns, columnExtensions),
    );
  }

  render() {
    const {
      layoutComponent: Layout,
      cellComponent: Cell,
      rowComponent: Row,
      noDataRowComponent: NoDataRow,
      noDataCellComponent: NoDataCell,
      stubRowComponent: StubRow,
      stubCellComponent: StubCell,
      stubHeaderCellComponent: StubHeaderCell,
      columnExtensions,
      messages,
      containerComponent,
      tableComponent,
      headComponent,
      bodyComponent,
      footerComponent,
    } = this.props;

    const getMessage = getMessagesFormatter({ ...defaultMessages, ...messages });
    const tableColumnsComputed = this.tableColumnsComputed(columnExtensions!);

    return (
      <Plugin
        name="Table"
      >
        <Getter name="tableHeaderRows" value={tableHeaderRows} />
        <Getter name="tableBodyRows" computed={tableBodyRowsComputed} />
        <Getter name="tableFooterRows" value={tableFooterRows} />
        <Getter name="tableColumns" computed={tableColumnsComputed} />
        <Getter name="getTableCellColSpan" value={tableCellColSpanGetter} />

        <Template name="body">
          <TemplatePlaceholder name="table" />
        </Template>
        <Template name="table">
          <TemplateConnector>
            {({
              tableHeaderRows: headerRows,
              tableBodyRows: bodyRows,
              tableFooterRows: footerRows,
              tableColumns: columns,
              getTableCellColSpan,
            }) => (
              <Layout
                tableComponent={tableComponent}
                headComponent={headComponent}
                bodyComponent={bodyComponent}
                footerComponent={footerComponent}
                containerComponent={containerComponent}
                headerRows={headerRows}
                bodyRows={bodyRows}
                footerRows={footerRows}
                columns={columns}
                rowComponent={RowPlaceholder}
                cellComponent={CellPlaceholder}
                getCellColSpan={getTableCellColSpan}
              />
            )}
          </TemplateConnector>
        </Template>
        <Template name="tableCell">
          {(params: TableNS.CellProps) => (
            <TemplateConnector>
              {(
                { tableHeaderRows: headerRows },
              ) => (isHeaderStubTableCell(params.tableRow, headerRows)
                ? <StubHeaderCell {...params} />
                : <StubCell {...params} />
              )}
            </TemplateConnector>
          )}
        </Template>
        <Template
          name="tableCell"
          predicate={({ tableRow, tableColumn }: any) => isDataTableCell(tableRow, tableColumn)}
        >
          {(params: TableNS.CellProps) => (
            <TemplateConnector>
              {({ getCellValue }) => {
                const columnName = params.tableColumn.column!.name;
                const value = getCellValue(params.tableRow.row, columnName);
                return (
                  <TemplatePlaceholder
                    name="valueFormatter"
                    params={{
                      value,
                      row: params.tableRow.row,
                      column: params.tableColumn.column,
                    }}
                  >
                    {content => (
                      <Cell
                        {...params}
                        row={params.tableRow.row}
                        column={params.tableColumn.column!}
                        value={value}
                      >
                        {content}
                      </Cell>
                    )}
                  </TemplatePlaceholder>
                );
              }}
            </TemplateConnector>
          )}
        </Template>
        <Template
          name="tableCell"
          predicate={({ tableRow }: any) => !!isNoDataTableRow(tableRow)}
        >
          {(params: TableNS.CellProps) => (
            <TemplateConnector>
              {({ tableColumns }) => {
                if (isNoDataTableCell(params.tableColumn, tableColumns)) {
                  return (
                    <NoDataCell
                      {...params}
                      getMessage={getMessage}
                    />
                  );
                }
                return null;
              }}
            </TemplateConnector>
          )}
        </Template>
        <Template name="tableRow">
          {(params: TableNS.RowProps) => (
            <StubRow {...params} />
          )}
        </Template>
        <Template
          name="tableRow"
          predicate={({ tableRow }: any) => !!isDataTableRow(tableRow)}
        >
          {(params: TableNS.RowProps) => (
            <Row
              {...params}
              row={params.tableRow.row}
            />
          )}
        </Template>
        <Template
          name="tableRow"
          predicate={({ tableRow }: any) => !!isNoDataTableRow(tableRow)}
        >
          {(params: TableNS.RowProps) => <NoDataRow {...params} />}
        </Template>
      </Plugin>
    );
  }
}

TableBase.components = {
  tableComponent: 'Table',
  headComponent: 'TableHead',
  bodyComponent: 'TableBody',
  footerComponent: 'TableFooter',
  containerComponent: 'Container',
  layoutComponent: 'Layout',
  rowComponent: 'Row',
  cellComponent: 'Cell',
  noDataRowComponent: 'NoDataRow',
  noDataCellComponent: 'NoDataCell',
  stubRowComponent: 'StubRow',
  stubCellComponent: 'StubCell',
  stubHeaderCellComponent: 'StubHeaderCell',
};

export const Table: React.ComponentType<TableProps> = TableBase;
