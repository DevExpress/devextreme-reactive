import React from 'react';
import { Getter, Template } from '@devexpress/dx-react-core';
import {
  getRowChange,
  rowsWithEditing,
} from '@devexpress/dx-datagrid-core';

export class TableEditRow extends React.PureComponent {
  render() {
    return (
      <div>
        <Getter
          name="tableBodyRows"
          pureComputed={rowsWithEditing}
          connectArgs={getter => [
            getter('tableBodyRows'),
            getter('editingRows'),
            getter('newRows'),
            getter('getRowId'),
          ]}
        />
        <Template
          name="tableViewCell"
          predicate={({ column, row }) => row.type === 'edit' && !row.isNew && !column.type}
          connectGetters={(getter, { column, row }) => {
            const originalRow = row._originalRow;
            const rowId = getter('getRowId')(row);
            const change = getRowChange(getter('changedRows'), rowId);
            const changedRow = Object.assign({}, originalRow, change);
            return {
              rowId,
              row: changedRow,
              originalRow,
              value: changedRow[column.name],
              change,
            };
          }}
          connectActions={action => ({
            changeRow: ({ rowId, change }) => action('changeRow')({ rowId, change }),
          })}
        >
          {({ rowId, row, column, value, originalRow, change, changeRow }) =>
            this.props.editCellTemplate({
              row,
              originalRow,
              column,
              value,
              change,
              onValueChange: newValue => changeRow({
                rowId,
                change: {
                  [column.name]: newValue,
                },
              }),
            })}
        </Template>
        <Template
          name="tableViewCell"
          predicate={({ column, row }) => row.type === 'edit' && row.isNew && !column.type}
          connectGetters={(_, { column, row }) => {
            const originalRow = row._originalRow;
            return {
              row: originalRow,
              rowId: row.index,
              value: originalRow[column.name],
            };
          }}
          connectActions={action => ({
            changeNewRow: ({ rowId, change }) => action('changeNewRow')({ rowId, change }),
          })}
        >
          {({ row, rowId, column, value, changeNewRow }) =>
            this.props.editCellTemplate({
              row,
              column,
              value,
              onValueChange: newValue => changeNewRow({
                rowId,
                change: {
                  [column.name]: newValue,
                },
              }),
              isNew: true,
            })}
        </Template>
      </div>
    );
  }
}
TableEditRow.propTypes = {
  editCellTemplate: React.PropTypes.func.isRequired,
};

