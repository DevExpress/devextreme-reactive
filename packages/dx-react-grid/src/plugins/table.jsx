import * as React from 'react';
import * as PropTypes from 'prop-types';
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
  isNoDataTableRow,
  isNoDataTableCell,
  isDataTableCell,
  isHeaderStubTableCell,
  isDataTableRow,
  getMessagesFormatter,
} from '@devexpress/dx-grid-core';

const RowPlaceholder = props =>
  <TemplatePlaceholder name="tableRow" params={props} />;
const CellPlaceholder = props =>
  <TemplatePlaceholder name="tableCell" params={props} />;

const tableHeaderRows = [];
const tableBodyRowsComputed = ({ rows, getRowId }) =>
  tableRowsWithDataRows(rows, getRowId);

const pluginDependencies = [
  { name: 'DataTypeProvider', optional: true },
];

export class Table extends React.PureComponent {
  render() {
    const {
      layoutComponent: Layout,
      cellComponent: Cell,
      rowComponent: Row,
      noDataRowComponent: NoDataRow,
      noDataCellComponent: NoDataCell,
      stubCellComponent: StubCell,
      stubHeaderCellComponent: StubHeaderCell,
      columnExtensions,
      messages, containerComponent,
      tableComponent, headComponent, bodyComponent, fixedHeaderComponent,
    } = this.props;

    const getMessage = getMessagesFormatter(messages);
    const tableColumnsComputed = ({ columns }) =>
      tableColumnsWithDataRows(columns, columnExtensions);

    return (
      <Plugin
        name="Table"
        dependencies={pluginDependencies}
      >
        <Getter name="tableHeaderRows" value={tableHeaderRows} />
        <Getter name="tableBodyRows" computed={tableBodyRowsComputed} />
        <Getter name="tableColumns" computed={tableColumnsComputed} />
        <Getter
          name="getCellColSpan"
          value={({ tableRow, tableColumn, tableColumns }) => {
            if (tableRow.type === 'nodata' && tableColumns.indexOf(tableColumn) === 0) {
              return tableColumns.length;
            }
            return 1;
          }}
        />

        <Template name="body">
          <TemplatePlaceholder name="table" />
        </Template>
        <Template name="table">
          <TemplateConnector>
            {({
              tableHeaderRows: headerRows,
              tableBodyRows: bodyRows,
              tableColumns: columns,
              getCellColSpan,
            }) => (
              <Layout
                headTableComponent={fixedHeaderComponent}
                tableComponent={tableComponent}
                headComponent={headComponent}
                bodyComponent={bodyComponent}
                containerComponent={containerComponent}
                headerRows={headerRows}
                rows={bodyRows}
                columns={columns}
                rowComponent={RowPlaceholder}
                cellComponent={CellPlaceholder}
                getCellColSpan={(tableRow, tableColumn) =>
                  getCellColSpan({ tableRow, tableColumn, tableColumns: columns })}
              />
            )}
          </TemplateConnector>
        </Template>
        <Template name="tableCell">
          {params => (
            <TemplateConnector>
              {({ tableHeaderRows: headerRows }) =>
                (isHeaderStubTableCell(params.tableRow, headerRows)
                  ? <StubHeaderCell {...params} />
                  : <StubCell {...params} />
                )
              }
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
                  return <NoDataCell {...{ getMessage, ...params }} />;
                }
                return null;
              }}
            </TemplateConnector>
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

Table.propTypes = {
  layoutComponent: PropTypes.func.isRequired,
  tableComponent: PropTypes.func.isRequired,
  headComponent: PropTypes.func.isRequired,
  bodyComponent: PropTypes.func.isRequired,
  containerComponent: PropTypes.func.isRequired,
  cellComponent: PropTypes.func.isRequired,
  rowComponent: PropTypes.func.isRequired,
  noDataCellComponent: PropTypes.func.isRequired,
  noDataRowComponent: PropTypes.func.isRequired,
  stubCellComponent: PropTypes.func.isRequired,
  stubHeaderCellComponent: PropTypes.func.isRequired,
  columnExtensions: PropTypes.array,
  messages: PropTypes.object,
  fixedHeaderComponent: PropTypes.func,
};

Table.defaultProps = {
  fixedHeaderComponent: undefined,
  columnExtensions: undefined,
  messages: {},
};
