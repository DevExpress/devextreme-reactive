import React from 'react';
import PropTypes from 'prop-types';
import { Property, Template, PluginContainer } from '@devexpress/dx-react-core';
import {
  getRowChange,
  tableRowsWithEditing,
  isEditNewTableCell,
  isEditExistingTableCell,
} from '@devexpress/dx-grid-core';

const pluginDependencies = [
  { pluginName: 'EditingState' },
  { pluginName: 'TableView' },
];

export class TableEditRow extends React.PureComponent {
  render() {
    const { editCellTemplate, rowHeight } = this.props;

    const tableBodyRowsComputed = ({ tableBodyRows, editingRows, addedRows }) =>
      tableRowsWithEditing(tableBodyRows, editingRows, addedRows, rowHeight);

    return (
      <PluginContainer
        pluginName="TableEditRow"
        dependencies={pluginDependencies}
      >
        <Property name="tableBodyRows" computed={tableBodyRowsComputed} />
        <Template
          name="tableViewCell"
          predicate={({ tableRow, tableColumn }) => isEditExistingTableCell(tableRow, tableColumn)}
          connectProperties={(property, { tableColumn: { column }, tableRow: { rowId, row } }) => {
            const change = getRowChange(property('changedRows'), rowId);
            const changedRow = { ...row, ...change };
            const getCellData = property('getCellData');
            const value = getCellData(changedRow, column.name);

            return {
              createRowChange: property('createRowChange'),
              value,
              changedRow,
            };
          }}
          connectActions={action => ({
            changeRow: ({ rowId, change }) => action('changeRow')({ rowId, change }),
          })}
        >
          {({
            value,
            changeRow,
            createRowChange,
            changedRow,
            ...restParams
          }) =>
            editCellTemplate({
              row: restParams.tableRow.row,
              column: restParams.tableColumn.column,
              value,
              onValueChange: newValue =>
                changeRow({
                  rowId: restParams.tableRow.rowId,
                  change: createRowChange(
                    changedRow,
                    restParams.tableColumn.column.name,
                    newValue,
                  ),
                }),
              ...restParams,
            })}
        </Template>
        <Template
          name="tableViewCell"
          predicate={({ tableRow, tableColumn }) => isEditNewTableCell(tableRow, tableColumn)}
          connectProperties={property => ({
            getCellData: property('getCellData'),
            createRowChange: property('createRowChange'),
          })}
          connectActions={action => ({
            changeAddedRow: ({ rowId, change }) => action('changeAddedRow')({ rowId, change }),
          })}
        >
          {({
            value,
            changeAddedRow,
            getCellData,
            createRowChange,
            ...restParams
          }) =>
            editCellTemplate({
              row: restParams.tableRow.row,
              column: restParams.tableColumn.column,
              value: getCellData(restParams.tableRow.row, restParams.tableColumn.column.name),
              onValueChange: newValue => changeAddedRow({
                rowId: restParams.tableRow.rowId,
                change: createRowChange(
                  restParams.tableRow.row,
                  restParams.tableColumn.column.name,
                  newValue,
                ),
              }),
              ...restParams,
            })}
        </Template>
      </PluginContainer>
    );
  }
}
TableEditRow.propTypes = {
  rowHeight: PropTypes.any,
  editCellTemplate: PropTypes.func.isRequired,
};
TableEditRow.defaultProps = {
  rowHeight: undefined,
};
