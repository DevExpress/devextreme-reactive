import React from 'react';
import PropTypes from 'prop-types';
import {
  Getter, Template, PluginContainer,
  TemplatePlaceholder, TemplateConnector, TemplateRenderer,
} from '@devexpress/dx-react-core';
import {
  tableColumnsWithDataRows,
  tableRowsWithDataRows,
  isNoDataTableRow,
  isDataTableCell,
  isHeaderStubTableCell,
} from '@devexpress/dx-grid-core';

const getTableLayoutTemplateArgs = (
  { allowColumnReordering, rowTemplate, cellTemplate },
  { tableHeaderRows, tableBodyRows, tableColumns, getRowId, tableExtraProps },
  { setColumnOrder },
) => ({
  headerRows: tableHeaderRows,
  bodyRows: tableBodyRows,
  columns: tableColumns,
  getRowId,
  ...tableExtraProps,
  allowColumnReordering,
  rowTemplate,
  cellTemplate,
  setColumnOrder,
});

const getDataTableCellTemplateArgs = (
  params,
  { getCellData },
) => ({
  ...params,
  row: params.tableRow.row,
  column: params.tableColumn.column,
  value: getCellData(params.tableRow.row, params.tableColumn.column.name),
});

const tableHeaderRows = [];
const tableBodyRowsComputed = ({ rows, getRowId }) => tableRowsWithDataRows(rows, getRowId);
const tableColumnsComputed = ({ columns }) => tableColumnsWithDataRows(columns);
const tableExtraProps = {};

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
      tableNoDataCellTemplate,
      tableStubCellTemplate,
      tableStubHeaderCellTemplate,
      allowColumnReordering,
    } = this.props;

    return (
      <PluginContainer
        pluginName="TableView"
        dependencies={[
          { pluginName: 'ColumnOrderState', optional: !allowColumnReordering },
          { pluginName: 'DragDropContext', optional: !allowColumnReordering },
        ]}
      >
        <Getter name="tableHeaderRows" value={tableHeaderRows} />
        <Getter name="tableBodyRows" computed={tableBodyRowsComputed} />
        <Getter name="tableColumns" computed={tableColumnsComputed} />
        <Getter name="tableExtraProps" value={tableExtraProps} />

        <Template name="body">
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

        <Template name="tableViewRow">
          {params => tableRowTemplate(params)}
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
              {getters => (
                <TemplateRenderer
                  template={tableCellTemplate}
                  params={getDataTableCellTemplateArgs(params, getters)}
                />
              )}
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
  tableStubCellTemplate: PropTypes.func.isRequired,
  tableStubHeaderCellTemplate: PropTypes.func.isRequired,
  allowColumnReordering: PropTypes.bool,
};

TableView.defaultProps = {
  allowColumnReordering: false,
};
