import React from 'react';
import PropTypes from 'prop-types';
import {
  Getter,
  Template,
  TemplatePlaceholder,
  TemplateConnector,
  PluginContainer,
} from '@devexpress/dx-react-core';
import {
  tableColumnsWithDataRows,
  tableRowsWithDataRows,
  isNoDataTableRow,
  isDataTableCell,
  isHeaderStubTableCell,
  isDataTableRow,
  getMessagesFormatter,
} from '@devexpress/dx-grid-core';

const Row = props =>
  <TemplatePlaceholder name="tableRow" params={props} />;
const Cell = props =>
  <TemplatePlaceholder name="tableCell" params={props} />;

const tableHeaderRows = [];
const tableBodyRowsComputed = ({ rows, getRowId }) =>
  tableRowsWithDataRows(rows, getRowId);
const tableColumnsComputed = ({ columns }) => tableColumnsWithDataRows(columns);

export class Table extends React.PureComponent {
  render() {
    const {
      layoutComponent: TableLayout,
      getCellComponent,
      rowComponent: TableRow,
      noDataRowComponent: TableNoDataRow,
      noDataCellComponent: TableNoDataCell,
      stubCellComponent: TableStubCell,
      stubHeaderCellComponent: TableStubHeaderCell,
      messages,
    } = this.props;

    const getMessage = getMessagesFormatter(messages);

    return (
      <PluginContainer
        pluginName="Table"
        dependencies={[
          { pluginName: 'DataTypeProvider', optional: true },
        ]}
      >
        <Getter name="tableHeaderRows" value={tableHeaderRows} />
        <Getter name="tableBodyRows" computed={tableBodyRowsComputed} />
        <Getter name="tableColumns" computed={tableColumnsComputed} />

        <Template name="body">
          <TemplatePlaceholder name="table" />
        </Template>
        <Template name="table">
          <TemplateConnector>
            {({ tableHeaderRows: headerRows, tableBodyRows: bodyRows, tableColumns: columns }) => (
              <TableLayout
                headerRows={headerRows}
                bodyRows={bodyRows}
                columns={columns}
                rowComponent={Row}
                cellComponent={Cell}
              />
            )}
          </TemplateConnector>
        </Template>
        <Template name="tableCell">
          {params => (
            <TemplateConnector>
              {({ tableHeaderRows: headerRows }) =>
                (isHeaderStubTableCell(params.tableRow, headerRows)
                  ? <TableStubHeaderCell {...params} />
                  : <TableStubCell {...params} />
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
                const TableCell = getCellComponent(params.tableColumn.column.name);
                const value = getCellValue(params.tableRow.row, params.tableColumn.column.name);
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
                      <TableCell
                        {...params}
                        row={params.tableRow.row}
                        column={params.tableColumn.column}
                        value={value}
                      >
                        {content}
                      </TableCell>
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
          {params => <TableNoDataCell {...{ getMessage, ...params }} />}
        </Template>
        <Template
          name="tableRow"
          predicate={({ tableRow }) => isDataTableRow(tableRow)}
        >
          {params => (
            <TableRow
              {...params}
              row={params.tableRow.row}
            />
          )}
        </Template>
        <Template
          name="tableRow"
          predicate={({ tableRow }) => isNoDataTableRow(tableRow)}
        >
          {params => <TableNoDataRow {...params} />}
        </Template>
      </PluginContainer>
    );
  }
}

Table.propTypes = {
  layoutComponent: PropTypes.func.isRequired,
  getCellComponent: PropTypes.func.isRequired,
  rowComponent: PropTypes.func.isRequired,
  noDataCellComponent: PropTypes.func.isRequired,
  noDataRowComponent: PropTypes.func.isRequired,
  stubCellComponent: PropTypes.func.isRequired,
  stubHeaderCellComponent: PropTypes.func.isRequired,
  messages: PropTypes.object,
};

Table.defaultProps = {
  messages: {},
};
