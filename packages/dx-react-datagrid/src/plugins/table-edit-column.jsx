import React from 'react';
import { Template } from '@devexpress/dx-react-core';
import { getRowChange } from '@devexpress/dx-datagrid-core';

export class TableEditColumn extends React.PureComponent {
  render() {
    const {
      cellTemplate,
      headingCellTemplate,
      commandTemplate,
      allowCreating,
      allowEditing,
      allowDeleting,
    } = this.props;
    return (
      <div>
        <Template
          name="tableViewCell"
          predicate={({ column, row }) => row.type === 'heading' && column.type === 'edit'}
          connectActions={action => ({
            addNewRow: () => action('addNewRow')(),
          })}
        >
          {({ row, column, addNewRow, style }) =>
            headingCellTemplate({
              row,
              column,
              onAddNewRow: () => addNewRow(),
              commandTemplate,
              allowCreating,
              style,
            })}
        </Template>
        <Template
          name="tableViewCell"
          predicate={({ column, row }) => row.type === 'edit' && !row.isNew && column.type === 'edit'}
          connectGetters={(getter, { row }) => {
            const originalRow = row._originalRow;
            const rowId = getter('getRowId')(row);
            const change = getRowChange(getter('changedRows'), rowId);
            return {
              change,
              row: originalRow,
              rowId,
            };
          }}
          connectActions={action => ({
            stopEditRows: ({ rowIds }) => action('stopEditRows')({ rowIds }),
            cancelChangedRows: ({ rowIds }) => action('cancelChangedRows')({ rowIds }),
            commitChangedRows: ({ rowIds }) => action('commitChangedRows')({ rowIds }),
          })}
        >
          {({
              row,
              column,
              change,
              stopEditRows,
              cancelChangedRows,
              commitChangedRows,
              style,
              rowId,
            }) =>
            cellTemplate({
              row,
              column,
              change,
              onCancelEditing: () => {
                stopEditRows({ rowIds: [rowId] });
                cancelChangedRows({ rowIds: [rowId] });
              },
              onCommitChanges: () => {
                stopEditRows({ rowIds: [rowId] });
                commitChangedRows({ rowIds: [rowId] });
              },
              isEditing: true,
              commandTemplate,
              style,
            })}
        </Template>
        <Template
          name="tableViewCell"
          predicate={({ column, row }) => row.type === 'edit' && row.isNew && column.type === 'edit'}
          connectGetters={(_, { row }) => ({
            row: row._originalRow,
            rowId: row.index,
          })}
          connectActions={action => ({
            cancelNewRows: ({ rowIds }) => action('cancelNewRows')({ rowIds }),
            commitNewRows: ({ rowIds }) => action('commitNewRows')({ rowIds }),
          })}
        >
          {({ row, rowId, column, cancelNewRows, commitNewRows, style }) =>
            cellTemplate({
              row,
              column,
              onCancelEditing: () => {
                cancelNewRows({ rowIds: [rowId] });
              },
              onCommitChanges: () => {
                commitNewRows({ rowIds: [rowId] });
              },
              isEditing: true,
              isNew: true,
              commandTemplate,
              style,
            })}
        </Template>
        <Template
          name="tableViewCell"
          predicate={({ column, row }) => !row.type && column.type === 'edit'}
          connectGetters={(getter, { row }) => ({
            rowId: getter('getRowId')(row),
          })}
          connectActions={action => ({
            startEditRows: ({ rowIds }) => action('startEditRows')({ rowIds }),
            deleteRows: ({ rowIds }) => {
              action('deleteRows')({ rowIds });
              action('commitDeletedRows')({ rowIds });
            },
          })}
        >
          {({ rowId, row, column, startEditRows, deleteRows, style }) =>
            cellTemplate({
              row,
              column,
              onStartEditing: () => startEditRows({ rowIds: [rowId] }),
              onDelete: () => deleteRows({ rowIds: [rowId] }),
              commandTemplate,
              allowEditing,
              allowDeleting,
              style,
            })}
        </Template>
      </div>
    );
  }
}
TableEditColumn.propTypes = {
  cellTemplate: React.PropTypes.func.isRequired,
  headingCellTemplate: React.PropTypes.func.isRequired,
  commandTemplate: React.PropTypes.func.isRequired,
  allowCreating: React.PropTypes.bool,
  allowEditing: React.PropTypes.bool,
  allowDeleting: React.PropTypes.bool,
};
TableEditColumn.defaultProps = {
  allowCreating: false,
  allowEditing: false,
  allowDeleting: false,
};
