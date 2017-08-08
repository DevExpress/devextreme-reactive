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
            return {
              value: column.name in change ? change[column.name] : row[column.name],
            };
          }}
          connectActions={action => ({
            changeRow: ({ rowId, change }) => action('changeRow')({ rowId, change }),
          })}
        >
          {({
            value,
            changeRow,
            ...restParams
          }) =>
            editCellTemplate({
              row: restParams.tableRow.row,
              column: restParams.tableColumn.column,
              value,
              onValueChange: newValue => changeRow({
                rowId: restParams.tableRow.rowId,
                change: {
                  [restParams.tableColumn.column.name]: newValue,
                },
              }),
              ...restParams,
            })}
        </Template>
        <Template
          name="tableViewCell"
          predicate={({ tableRow, tableColumn }) => isEditNewTableCell(tableRow, tableColumn)}
          connectActions={action => ({
            changeAddedRow: ({ rowId, change }) => action('changeAddedRow')({ rowId, change }),
          })}
        >
          {({
            value,
            changeAddedRow,
            ...restParams
          }) =>
            editCellTemplate({
              row: restParams.tableRow.row,
              column: restParams.tableColumn.column,
              value: restParams.tableRow.row[restParams.tableColumn.column.name],
              onValueChange: newValue => changeAddedRow({
                rowId: restParams.tableRow.rowId,
                change: {
                  [restParams.tableColumn.column.name]: newValue,
                },
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
