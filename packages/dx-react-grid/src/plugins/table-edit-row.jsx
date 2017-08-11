import React from 'react';
import PropTypes from 'prop-types';
import { Getter, Template, PluginContainer } from '@devexpress/dx-react-core';
import {
  getRowChange,
  tableRowsWithEditing,
  isEditNewTableCell,
  isEditExistingTableCell,
} from '@devexpress/dx-grid-core';

export class TableEditRow extends React.PureComponent {
  render() {
    const { editCellTemplate, rowHeight } = this.props;
    return (
      <PluginContainer>
        <Getter
          name="tableBodyRows"
          pureComputed={tableRowsWithEditing}
          connectArgs={getter => [
            getter('tableBodyRows'),
            getter('editingRows'),
            getter('addedRows'),
            rowHeight,
          ]}
        />
        <Template
          name="tableViewCell"
          predicate={({ tableRow, tableColumn }) => isEditExistingTableCell(tableRow, tableColumn)}
          connectGetters={(getter, { tableColumn: { column }, tableRow: { rowId, row } }) => {
            const change = getRowChange(getter('changedRows'), rowId);
            const getCellData = getter('getCellData');

            return {
              value: getCellData(change, column.name) || getCellData(row, column.name),
              setCellData: getter('setCellData'),
            };
          }}
          connectActions={action => ({
            changeRow: ({ rowId, change }) => action('changeRow')({ rowId, change }),
          })}
        >
          {({
            value,
            changeRow,
            setCellData,
            ...restParams
          }) =>
            editCellTemplate({
              row: restParams.tableRow.row,
              column: restParams.tableColumn.column,
              value,
              onValueChange: newValue =>
                changeRow({
                  rowId: restParams.tableRow.rowId,
                  change: setCellData(
                    restParams.tableRow.row,
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
          connectGetters={getter => ({
            getCellData: getter('getCellData'),
            setCellData: getter('setCellData'),
          })}
          connectActions={action => ({
            changeAddedRow: ({ rowId, change }) => action('changeAddedRow')({ rowId, change }),
          })}
        >
          {({
            value,
            changeAddedRow,
            getCellData,
            setCellData,
            ...restParams
          }) =>
            editCellTemplate({
              row: restParams.tableRow.row,
              column: restParams.tableColumn.column,
              value: getCellData(restParams.tableRow.row, restParams.tableColumn.column.name),
              onValueChange: newValue => changeAddedRow({
                rowId: restParams.tableRow.rowId,
                change: setCellData(
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
