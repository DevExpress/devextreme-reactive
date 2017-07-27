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
            getter('getRowId'),
            rowHeight,
          ]}
        />
        <Template
          name="tableViewCell"
          predicate={({ column, row }) => isEditExistingTableCell(row, column)}
          connectGetters={(getter, { column, row }) => {
            const rowId = row.id;
            const change = getRowChange(getter('changedRows'), rowId);
            return {
              rowId,
              value: change[column.name] || row.original[column.name],
            };
          }}
          connectActions={action => ({
            changeRow: ({ rowId, change }) => action('changeRow')({ rowId, change }),
          })}
        >
          {({
            rowId,
            row: { original: row },
            column: { original: column },
            value,
            changeRow,
            ...restParams
          }) =>
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
              ...restParams,
            })}
        </Template>
        <Template
          name="tableViewCell"
          predicate={({ column, row }) => isEditNewTableCell(row, column)}
          connectGetters={(_, { column, row }) => ({
            rowId: row.index,
            value: row.original[column.name],
          })}
          connectActions={action => ({
            changeAddedRow: ({ rowId, change }) => action('changeAddedRow')({ rowId, change }),
          })}
        >
          {({
            row: { original: row },
            rowId,
            column: { original: column },
            value,
            changeAddedRow,
            ...restParams
          }) =>
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
