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
  { rowTemplate, cellTemplate },
  { tableHeaderRows, tableBodyRows, tableColumns },
) => ({
  headerRows: tableHeaderRows,
  bodyRows: tableBodyRows,
  columns: tableColumns,
  rowTemplate,
  cellTemplate,
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
  <TemplatePlaceholder name="tableCell" params={params} />;
const rowTemplate = params =>
  <TemplatePlaceholder name="tableRow" params={params} />;

export class Table extends React.PureComponent {
  render() {
    const {
      tableLayoutTemplate,
      tableCellTemplate,
      tableRowTemplate,
      tableNoDataRowTemplate,
      tableNoDataCellTemplate,
      tableStubCellTemplate,
      tableStubHeaderCellTemplate,
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
              <TemplateRenderer
                template={tableLayoutTemplate}
                params={getTableLayoutTemplateArgs(
                  { rowTemplate, cellTemplate },
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
                ))
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
          name="tableCell"
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
          name="tableRow"
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
          name="tableRow"
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

Table.propTypes = {
  tableLayoutTemplate: PropTypes.func.isRequired,
  tableCellTemplate: PropTypes.func.isRequired,
  tableRowTemplate: PropTypes.func.isRequired,
  tableNoDataCellTemplate: PropTypes.func.isRequired,
  tableNoDataRowTemplate: PropTypes.func.isRequired,
  tableStubCellTemplate: PropTypes.func.isRequired,
  tableStubHeaderCellTemplate: PropTypes.func.isRequired,
  messages: PropTypes.object,
};

Table.defaultProps = {
  messages: {},
};
