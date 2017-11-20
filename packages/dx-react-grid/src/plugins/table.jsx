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

const getTableLayoutProps = (
  params,
  { tableHeaderRows, tableBodyRows, tableColumns },
) => ({
  headerRows: tableHeaderRows,
  bodyRows: tableBodyRows,
  columns: tableColumns,
  rowComponent: Row,
  cellComponent: Cell,
});

const getDataTableCellTemplateArgs = (
  params,
  { getCellValue },
) => ({
  ...params,
  row: params.tableRow.row,
  column: params.tableColumn.column,
  value: getCellValue(params.tableRow.row, params.tableColumn.column.name),
});

const getValueFormatterArgs = params => ({
  row: params.row,
  column: params.column,
  value: params.value,
});

const getDataTableRowTemplateArgs = params => ({
  ...params,
  row: params.tableRow.row,
});

const tableHeaderRows = [];
const tableBodyRowsComputed = ({ rows, getRowId }) =>
  tableRowsWithDataRows(rows, getRowId);
const tableColumnsComputed = ({ columns }) => tableColumnsWithDataRows(columns);

export class Table extends React.PureComponent {
  render() {
    const {
      tableLayoutComponent: TableLayout,
      getTableCellComponent,
      tableRowComponent: TableRow,
      tableNoDataRowComponent: TableNoDataRow,
      tableNoDataCellComponent: TableNoDataCell,
      tableStubCellComponent: TableStubCell,
      tableStubHeaderCellComponent: TableStubHeaderCell,
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
            {(getters, actions) => (
              <TableLayout
                {...getTableLayoutProps(
                  {},
                  getters,
                  actions,
                )}
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
              {(getters) => {
                const TableCell = getTableCellComponent(params.tableColumn.column.name);
                const templateArgs = getDataTableCellTemplateArgs(params, getters);
                return (
                  <TemplatePlaceholder
                    name="valueFormatter"
                    params={getValueFormatterArgs(templateArgs)}
                  >
                    {content => <TableCell {...templateArgs}>{content}</TableCell>}
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
          {params => <TableRow {...getDataTableRowTemplateArgs(params)} />}
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
  tableLayoutComponent: PropTypes.func.isRequired,
  getTableCellComponent: PropTypes.func.isRequired,
  tableRowComponent: PropTypes.func.isRequired,
  tableNoDataCellComponent: PropTypes.func.isRequired,
  tableNoDataRowComponent: PropTypes.func.isRequired,
  tableStubCellComponent: PropTypes.func.isRequired,
  tableStubHeaderCellComponent: PropTypes.func.isRequired,
  messages: PropTypes.object,
};

Table.defaultProps = {
  messages: {},
};
