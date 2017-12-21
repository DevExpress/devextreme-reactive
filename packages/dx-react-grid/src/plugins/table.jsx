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

const RowPlaceholder = props =>
  <TemplatePlaceholder name="tableRow" params={props} />;
const CellPlaceholder = props =>
  <TemplatePlaceholder name="tableCell" params={props} />;

const tableHeaderRows = [];
const tableBodyRowsComputed = ({ rows, getRowId }) =>
  tableRowsWithDataRows(rows, getRowId);

const pluginDependencies = [
  { pluginName: 'DataTypeProvider', optional: true },
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
      messages,
    } = this.props;

    const getMessage = getMessagesFormatter(messages);
    const tableColumnsComputed = ({ columns }) =>
      tableColumnsWithDataRows(columns, columnExtensions);

    return (
      <PluginContainer
        pluginName="Table"
        dependencies={pluginDependencies}
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
              <Layout
                headerRows={headerRows}
                bodyRows={bodyRows}
                columns={columns}
                rowComponent={RowPlaceholder}
                cellComponent={CellPlaceholder}
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
          {params => <NoDataCell {...{ getMessage, ...params }} />}
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
      </PluginContainer>
    );
  }
}

Table.propTypes = {
  layoutComponent: PropTypes.func.isRequired,
  cellComponent: PropTypes.func.isRequired,
  rowComponent: PropTypes.func.isRequired,
  noDataCellComponent: PropTypes.func.isRequired,
  noDataRowComponent: PropTypes.func.isRequired,
  stubCellComponent: PropTypes.func.isRequired,
  stubHeaderCellComponent: PropTypes.func.isRequired,
  columnExtensions: PropTypes.array,
  messages: PropTypes.object,
};

Table.defaultProps = {
  columnExtensions: undefined,
  messages: {},
};
