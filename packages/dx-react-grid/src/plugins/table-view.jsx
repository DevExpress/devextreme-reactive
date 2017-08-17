import React from 'react';
import PropTypes from 'prop-types';
import { Getter, Template, TemplatePlaceholder, PluginContainer } from '@devexpress/dx-react-core';
import {
  tableColumnsWithDataRows,
  tableRowsWithDataRows,
  isNoDataTableRow,
  isDataTableCell,
  isHeaderStubTableCell,
} from '@devexpress/dx-grid-core';

const tableHeaderRows = [];
const tableBodyRowsComputed = ({ rows, getRowId }) => tableRowsWithDataRows(rows, getRowId);
const tableColumnsComputed = ({ columns }) => tableColumnsWithDataRows(columns);
const tableExtraProps = {};
const cellTemplate = params =>
  <TemplatePlaceholder name="tableViewCell" params={params} />;

export class TableView extends React.PureComponent {
  render() {
    const {
      tableTemplate,
      tableCellTemplate,
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

        <Template
          name="body"
          connectGetters={getter => ({
            headerRows: getter('tableHeaderRows'),
            bodyRows: getter('tableBodyRows'),
            columns: getter('tableColumns'),
            getRowId: getter('getRowId'),
            cellTemplate,
            allowColumnReordering,
            ...getter('tableExtraProps'),
          })}
          connectActions={action => ({
            setColumnOrder: action('setColumnOrder'),
          })}
        >
          {tableTemplate}
        </Template>
        <Template
          name="tableViewCell"
          connectGetters={getter => ({
            headerRows: getter('tableHeaderRows'),
          })}
        >
          {({ headerRows, ...restParams }) => (
            isHeaderStubTableCell(restParams.tableRow, headerRows)
              ? tableStubHeaderCellTemplate(restParams)
              : tableStubCellTemplate(restParams)
          )}
        </Template>
        <Template
          name="tableViewCell"
          predicate={({ tableRow, tableColumn }) => isDataTableCell(tableRow, tableColumn)}
        >
          {params => tableCellTemplate({
            ...params,
            row: params.tableRow.row,
            column: params.tableColumn.column,
          })}
        </Template>
        <Template
          name="tableViewCell"
          predicate={({ tableRow }) => isNoDataTableRow(tableRow)}
        >
          {params => tableNoDataCellTemplate(params)}
        </Template>
      </PluginContainer>
    );
  }
}

TableView.propTypes = {
  tableTemplate: PropTypes.func.isRequired,
  tableCellTemplate: PropTypes.func.isRequired,
  tableNoDataCellTemplate: PropTypes.func.isRequired,
  tableStubCellTemplate: PropTypes.func.isRequired,
  tableStubHeaderCellTemplate: PropTypes.func.isRequired,
  allowColumnReordering: PropTypes.bool,
};

TableView.defaultProps = {
  allowColumnReordering: false,
};
