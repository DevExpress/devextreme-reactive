import * as React from 'react';
import { getMessagesFormatter } from '@devexpress/dx-core';
import {
  Getter,
  Template,
  TemplatePlaceholder,
  TemplateConnector,
  Plugin,
  Getters,
} from '@devexpress/dx-react-core';
import {
  tableRowsWithDataRows,
  tableCellColSpanGetter,
  isNoDataTableRow,
  isNoDataTableCell,
  isDataTableCell,
  isHeaderStubTableCell,
  isDataTableRow,
  TABLE_DATA_TYPE,
  TABLE_NODATA_TYPE,
} from '@devexpress/dx-grid-core';
import { TableProps, Table as TableNS, TableLayoutProps } from '../types';
import { TableColumnsWithDataRowsGetter } from './internal/table-columns-getter';

const RowPlaceholder = props => <TemplatePlaceholder name="tableRow" params={props} />;
const CellPlaceholder = props => <TemplatePlaceholder name="tableCell" params={props} />;

const tableHeaderRows = [];
const tableBodyRowsComputed = ({ rows, getRowId, isDataLoading }: Getters) => (
  tableRowsWithDataRows(rows, getRowId, isDataLoading)
);
const tableFooterRows = [];

const defaultMessages = {
  noData: 'No data',
};

class TableBase extends React.PureComponent<TableProps> {
  static COLUMN_TYPE = TABLE_DATA_TYPE;
  static ROW_TYPE = TABLE_DATA_TYPE;
  static NODATA_ROW_TYPE = TABLE_NODATA_TYPE;
  static defaultProps = {
    messages: {},
  };
  static components = {
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

    return (
      <Plugin
        name="Table"
      >
        <Getter name="tableHeaderRows" value={tableHeaderRows} />
        <Getter name="tableBodyRows" computed={tableBodyRowsComputed} />
        <Getter name="tableFooterRows" value={tableFooterRows} />
        <TableColumnsWithDataRowsGetter columnExtensions={columnExtensions} />
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
              <TemplatePlaceholder
                name="tableLayout"
                params={{
                  tableComponent,
                  headComponent,
                  bodyComponent,
                  footerComponent,
                  containerComponent,
                  headerRows,
                  bodyRows,
                  footerRows,
                  columns,
                  rowComponent: RowPlaceholder,
                  cellComponent: CellPlaceholder,
                  getCellColSpan: getTableCellColSpan,
                }}
              />
            )}
          </TemplateConnector>
        </Template>
        <Template name="tableLayout">
          {(params: TableLayoutProps) => (
            <Layout {...params} />
          )}
        </Template>
        <Template name="tableCell">
          {(params: TableNS.CellProps) => (
            <TemplateConnector>
              {(
                { tableHeaderRows: headerRows },
              ) => (isHeaderStubTableCell(params.tableRow, headerRows)
                ? <StubHeaderCell
                  {...params}
                />
                : <StubCell
                  {...params}
                />
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

/***
 * A plugin that renders Grid data as a table. This plugin enables you to customize
 * table rows and columns, and contains the Table Row and Table Cell components
 * that can be extended by other plugins
 * */
export const Table: React.ComponentType<TableProps> & {
  /** The data column type's indentifier. */
  COLUMN_TYPE: symbol;
  /** The data row type's indentifier. */
  ROW_TYPE: symbol;
  /** The nodata row type's indentifier. */
  NODATA_ROW_TYPE: symbol;
} = TableBase;
