import React from 'react';
import PropTypes from 'prop-types';
import {
  Getter,
  Template,
  TemplatePlaceholder,
  TemplateConnector,
  TemplateRenderer,
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

const getTableLayoutTemplateArgs = (
  { allowColumnReordering, rowTemplate, cellTemplate },
  { tableHeaderRows, tableBodyRows, tableColumns },
  { setColumnOrder },
) => ({
  headerRows: tableHeaderRows,
  bodyRows: tableBodyRows,
  columns: tableColumns,
  allowColumnReordering,
  rowTemplate,
  cellTemplate,
  setColumnOrder,
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

const cellTemplate = params =>
  <TemplatePlaceholder name="tableViewCell" params={params} />;
const rowTemplate = params =>
  <TemplatePlaceholder name="tableViewRow" params={params} />;

export class TableView extends React.PureComponent {
  render() {
    const {
      tableLayoutTemplate,
      tableCellTemplate,
      tableRowTemplate,
      tableNoDataRowTemplate,
      tableNoDataCellTemplate,
      tableStubCellTemplate,
      tableStubHeaderCellTemplate,
      allowColumnReordering,
      messages,
    } = this.props;

    const getMessage = getMessagesFormatter(messages);

    return (
      <PluginContainer
        pluginName="TableView"
        dependencies={[
          { pluginName: 'ColumnOrderState', optional: !allowColumnReordering },
          { pluginName: 'DragDropContext', optional: !allowColumnReordering },
          { pluginName: 'DataTypeProvider', optional: true },
        ]}
      >
        <Getter name="tableHeaderRows" value={tableHeaderRows} />
        <Getter name="tableBodyRows" computed={tableBodyRowsComputed} />
        <Getter name="tableColumns" computed={tableColumnsComputed} />

        <Template name="body">
          <TemplatePlaceholder name="tableView" />
        </Template>
        <Template name="tableView">
          <TemplateConnector>
            {(getters, actions) => (
              <TemplateRenderer
                template={tableLayoutTemplate}
                params={getTableLayoutTemplateArgs(
                  { allowColumnReordering, rowTemplate, cellTemplate },
                  getters,
                  actions,
                )}
              />
            )}
          </TemplateConnector>
        </Template>
        <Template name="tableViewCell">
          {params => (
            <TemplateConnector>
              {({ tableHeaderRows: headerRows }) =>
                (isHeaderStubTableCell(params.tableRow, headerRows) ? (
                  <TemplateRenderer
                    template={tableStubHeaderCellTemplate}
                    params={params}
                  />
                ) : (
                  <TemplateRenderer
                    template={tableStubCellTemplate}
                    params={params}
                  />
                )
                )}
            </TemplateConnector>
          )}
        </Template>
        <Template
          name="tableViewCell"
          predicate={({ tableRow, tableColumn }) => isDataTableCell(tableRow, tableColumn)}
        >
          {params => (
            <TemplateConnector>
              {(getters) => {
                const templateArgs = getDataTableCellTemplateArgs(params, getters);
                return (
                  <TemplatePlaceholder
                    name="valueFormatter"
                    params={getValueFormatterArgs(templateArgs)}
                  >
                    {content => (
                      <TemplateRenderer
                        template={tableCellTemplate}
                        params={templateArgs}
                      >
                        {content}
                      </TemplateRenderer>
                    )}
                  </TemplatePlaceholder>
                );
              }}
            </TemplateConnector>
          )}
        </Template>
        <Template
          name="tableViewCell"
          predicate={({ tableRow }) => isNoDataTableRow(tableRow)}
        >
          {params => (
            <TemplateRenderer
              template={tableNoDataCellTemplate}
              params={{
                getMessage,
                ...params,
              }}
            />
          )}
        </Template>
        <Template
          name="tableViewRow"
          predicate={({ tableRow }) => isDataTableRow(tableRow)}
        >
          {params => (
            <TemplateConnector>
              {() => (
                <TemplateRenderer
                  template={tableRowTemplate}
                  params={getDataTableRowTemplateArgs(params)}
                />
              )}
            </TemplateConnector>
          )}
        </Template>
        <Template
          name="tableViewRow"
          predicate={({ tableRow }) => isNoDataTableRow(tableRow)}
        >
          {params => (
            <TemplateRenderer
              template={tableNoDataRowTemplate}
              params={params}
            />
          )}
        </Template>
      </PluginContainer>
    );
  }
}

TableView.propTypes = {
  tableLayoutTemplate: PropTypes.func.isRequired,
  tableCellTemplate: PropTypes.func.isRequired,
  tableRowTemplate: PropTypes.func.isRequired,
  tableNoDataCellTemplate: PropTypes.func.isRequired,
  tableNoDataRowTemplate: PropTypes.func.isRequired,
  tableStubCellTemplate: PropTypes.func.isRequired,
  tableStubHeaderCellTemplate: PropTypes.func.isRequired,
  allowColumnReordering: PropTypes.bool,
  messages: PropTypes.object,
};

TableView.defaultProps = {
  allowColumnReordering: false,
  messages: {},
};
