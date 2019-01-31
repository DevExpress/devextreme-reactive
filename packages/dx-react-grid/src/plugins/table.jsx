import * as React from 'react';
import * as PropTypes from 'prop-types';
import { memoize, getMessagesFormatter } from '@devexpress/dx-core';
import {
  Getter,
  Template,
  TemplatePlaceholder,
  TemplateConnector,
  Plugin,
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
} from '@devexpress/dx-grid-core';

const RowPlaceholder = props => <TemplatePlaceholder name="tableRow" params={props} />;
const CellPlaceholder = props => <TemplatePlaceholder name="tableCell" params={props} />;

const tableHeaderRows = [];
const tableBodyRowsComputed = ({ rows, getRowId }) => tableRowsWithDataRows(rows, getRowId);
const isRtlComputed = ({ isRtl }) => isRtl;
const tableFooterRows = [];

const defaultMessages = {
  noData: 'No data',
};

export class Table extends React.PureComponent {
  constructor(props) {
    super(props);

    this.tableColumnsComputed = memoize(
      columnExtensions => ({
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
    const tableColumnsComputed = this.tableColumnsComputed(columnExtensions);

    return (
      <Plugin
        name="Table"
      >
        <Getter name="isRtl" computed={isRtlComputed} />
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
              isRtl,
              tableHeaderRows: headerRows,
              tableBodyRows: bodyRows,
              tableFooterRows: footerRows,
              tableColumns: columns,
              getTableCellColSpan,
            }) => (
              <Layout
                isRtl={isRtl}
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
          {params => (
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
          predicate={({ tableRow, tableColumn }) => isDataTableCell(tableRow, tableColumn)}
        >
          {params => (
            <TemplateConnector>
              {({ getCellValue }) => {
                const columnName = params.tableColumn.column.name;
                const value = getCellValue(params.tableRow.row, columnName);
                return (
                  <TemplatePlaceholder
                    name="valueFormatter"
                    params={{
                      row: params.tableRow.row,
                      column: params.tableColumn.column,
                      value,
                    }}
                  >
                    {content => (
                      <Cell
                        {...params}
                        row={params.tableRow.row}
                        column={params.tableColumn.column}
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
          predicate={({ tableRow }) => isNoDataTableRow(tableRow)}
        >
          {params => (
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
          {params => (
            <StubRow {...params} />
          )}
        </Template>
        <Template
          name="tableRow"
          predicate={({ tableRow }) => isDataTableRow(tableRow)}
        >
          {params => (
            <Row
              {...params}
              row={params.tableRow.row}
            />
          )}
        </Template>
        <Template
          name="tableRow"
          predicate={({ tableRow }) => isNoDataTableRow(tableRow)}
        >
          {params => <NoDataRow {...params} />}
        </Template>
      </Plugin>
    );
  }
}

Table.COLUMN_TYPE = TABLE_DATA_TYPE;
Table.ROW_TYPE = TABLE_DATA_TYPE;
Table.NODATA_ROW_TYPE = TABLE_NODATA_TYPE;

Table.propTypes = {
  layoutComponent: PropTypes.func.isRequired,
  tableComponent: PropTypes.func.isRequired,
  headComponent: PropTypes.func.isRequired,
  bodyComponent: PropTypes.func.isRequired,
  footerComponent: PropTypes.func.isRequired,
  containerComponent: PropTypes.func.isRequired,
  cellComponent: PropTypes.func.isRequired,
  rowComponent: PropTypes.func.isRequired,
  noDataCellComponent: PropTypes.func.isRequired,
  noDataRowComponent: PropTypes.func.isRequired,
  stubRowComponent: PropTypes.func.isRequired,
  stubCellComponent: PropTypes.func.isRequired,
  stubHeaderCellComponent: PropTypes.func.isRequired,
  columnExtensions: PropTypes.array,
  messages: PropTypes.shape({
    noData: PropTypes.string,
  }),
};

Table.defaultProps = {
  columnExtensions: undefined,
  messages: {},
};

Table.components = {
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
