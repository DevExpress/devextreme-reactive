import React from 'react';
import PropTypes from 'prop-types';
import { Getter, Template, PluginContainer } from '@devexpress/dx-react-core';
import {
  getRowChange,
  rowsWithEditing,
} from '@devexpress/dx-grid-core';

export class TableEditRow extends React.PureComponent {
  render() {
    const { editCellTemplate, rowHeight } = this.props;
    return (
      <PluginContainer>
        <Getter
          name="tableBodyRows"
          pureComputed={rowsWithEditing}
          connectArgs={getter => [
            getter('tableBodyRows'),
            getter('editingRows'),
            getter('addedRows'),
            getter('getRowId'),
            rowHeight,
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
              row: originalRow,
              value: changedRow[column.name],
            };
          }}
          connectActions={action => ({
            changeRow: ({ rowId, change }) => action('changeRow')({ rowId, change }),
          })}
        >
          {({ rowId, row, column, value, changeRow }) =>
            editCellTemplate({
              row,
              column,
              value,
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
            changeAddedRow: ({ rowId, change }) => action('changeAddedRow')({ rowId, change }),
          })}
        >
          {({ row, rowId, column, value, changeAddedRow }) =>
            editCellTemplate({
              row,
              column,
              value,
              onValueChange: newValue => changeAddedRow({
                rowId,
                change: {
                  [column.name]: newValue,
                },
              }),
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
