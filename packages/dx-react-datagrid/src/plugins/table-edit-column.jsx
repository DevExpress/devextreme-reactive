import React from 'react';
import PropTypes from 'prop-types';
import { Getter, Template, PluginContainer } from '@devexpress/dx-react-core';

const withEditColumn = (tableColumns, width) => [{ type: 'edit', width }, ...tableColumns];

export class TableEditColumn extends React.PureComponent {
  render() {
    const {
      cellTemplate,
      headingCellTemplate,
      commandTemplate,
      allowAdding,
      allowEditing,
      allowDeleting,
      width,
    } = this.props;
    return (
      <PluginContainer>
        <Getter
          name="tableColumns"
          pureComputed={withEditColumn}
          connectArgs={getter => [
            getter('tableColumns'),
            width,
          ]}
        />
        <Template
          name="tableViewCell"
          predicate={({ column, row }) => row.type === 'heading' && column.type === 'edit'}
          connectActions={action => ({
            addRow: () => action('addRow')(),
          })}
        >
          {({ row, column, addRow, style }) =>
            headingCellTemplate({
              row,
              column,
              addRow: () => addRow(),
              commandTemplate,
              allowAdding,
              style,
            })}
        </Template>
        <Template
          name="tableViewCell"
          predicate={({ column, row }) => row.type === 'edit' && !row.isNew && column.type === 'edit'}
          connectGetters={(getter, { row }) => {
            const originalRow = row._originalRow;
            const rowId = getter('getRowId')(row);
            return {
              rowId,
              row: originalRow,
            };
          }}
          connectActions={action => ({
            stopEditRows: ({ rowIds }) => action('stopEditRows')({ rowIds }),
            cancelChangedRows: ({ rowIds }) => action('cancelChangedRows')({ rowIds }),
            commitChangedRows: ({ rowIds }) => action('commitChangedRows')({ rowIds }),
          })}
        >
          {({
              rowId,
              row,
              column,
              stopEditRows,
              cancelChangedRows,
              commitChangedRows,
              style,
            }) =>
            cellTemplate({
              row,
              column,
              cancelEditing: () => {
                stopEditRows({ rowIds: [rowId] });
                cancelChangedRows({ rowIds: [rowId] });
              },
              commitChanges: () => {
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
            rowId: row.index,
            row: row._originalRow,
          })}
          connectActions={action => ({
            cancelAddedRows: ({ rowIds }) => action('cancelAddedRows')({ rowIds }),
            commitAddedRows: ({ rowIds }) => action('commitAddedRows')({ rowIds }),
          })}
        >
          {({ rowId, row, column, cancelAddedRows, commitAddedRows, style }) =>
            cellTemplate({
              row,
              column,
              cancelEditing: () => {
                cancelAddedRows({ rowIds: [rowId] });
              },
              commitChanges: () => {
                commitAddedRows({ rowIds: [rowId] });
              },
              isEditing: true,
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
              startEditing: () => startEditRows({ rowIds: [rowId] }),
              deleteRow: () => deleteRows({ rowIds: [rowId] }),
              commandTemplate,
              allowEditing,
              allowDeleting,
              isEditing: false,
              style,
            })}
        </Template>
      </PluginContainer>
    );
  }
}
TableEditColumn.propTypes = {
  cellTemplate: PropTypes.func.isRequired,
  headingCellTemplate: PropTypes.func.isRequired,
  commandTemplate: PropTypes.func.isRequired,
  allowAdding: PropTypes.bool,
  allowEditing: PropTypes.bool,
  allowDeleting: PropTypes.bool,
  width: PropTypes.number,
};
TableEditColumn.defaultProps = {
  allowAdding: false,
  allowEditing: false,
  allowDeleting: false,
  width: 140,
};
