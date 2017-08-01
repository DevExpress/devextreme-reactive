import React from 'react';
import PropTypes from 'prop-types';
import { Getter, Template, PluginContainer } from '@devexpress/dx-react-core';
import {
  tableColumnsWithEditing,
  isHeadingEditCommandsTableCell,
  isDataEditCommandsTableCell,
  isEditNewRowCommandsTableCell,
  isEditExistingRowCommandsTableCell,
} from '@devexpress/dx-grid-core';

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
          pureComputed={tableColumnsWithEditing}
          connectArgs={getter => [
            getter('tableColumns'),
            width,
          ]}
        />
        <Template
          name="tableViewCell"
          predicate={({ tableRow, tableColumn }) =>
            isHeadingEditCommandsTableCell(tableRow, tableColumn)}
          connectActions={action => ({
            addRow: () => action('addRow')(),
          })}
        >
          {({ addRow, ...restParams }) =>
            headingCellTemplate({
              addRow: () => addRow(),
              commandTemplate,
              allowAdding,
              ...restParams,
            })}
        </Template>
        <Template
          name="tableViewCell"
          predicate={({ tableRow, tableColumn }) =>
            isDataEditCommandsTableCell(tableRow, tableColumn)}
          connectActions={action => ({
            startEditRows: ({ rowIds }) => action('startEditRows')({ rowIds }),
            deleteRows: ({ rowIds }) => {
              action('deleteRows')({ rowIds });
              action('commitDeletedRows')({ rowIds });
            },
          })}
        >
          {({ startEditRows, deleteRows, ...restParams }) =>
            cellTemplate({
              row: restParams.tableRow.row,
              startEditing: () => startEditRows({ rowIds: [restParams.tableRow.id] }),
              deleteRow: () => deleteRows({ rowIds: [restParams.tableRow.id] }),
              commandTemplate,
              allowEditing,
              allowDeleting,
              isEditing: false,
              ...restParams,
            })}
        </Template>
        <Template
          name="tableViewCell"
          predicate={({ tableRow, tableColumn }) =>
            isEditNewRowCommandsTableCell(tableRow, tableColumn)}
          connectActions={action => ({
            cancelAddedRows: ({ rowIds }) => action('cancelAddedRows')({ rowIds }),
            commitAddedRows: ({ rowIds }) => action('commitAddedRows')({ rowIds }),
          })}
        >
          {({ cancelAddedRows, commitAddedRows, ...restParams }) =>
            cellTemplate({
              row: restParams.tableRow.row,
              cancelEditing: () => {
                cancelAddedRows({ rowIds: [restParams.tableRow.id] });
              },
              commitChanges: () => {
                commitAddedRows({ rowIds: [restParams.tableRow.id] });
              },
              isEditing: true,
              commandTemplate,
              ...restParams,
            })}
        </Template>
        <Template
          name="tableViewCell"
          predicate={({ tableRow, tableColumn }) =>
            isEditExistingRowCommandsTableCell(tableRow, tableColumn)}
          connectActions={action => ({
            stopEditRows: ({ rowIds }) => action('stopEditRows')({ rowIds }),
            cancelChangedRows: ({ rowIds }) => action('cancelChangedRows')({ rowIds }),
            commitChangedRows: ({ rowIds }) => action('commitChangedRows')({ rowIds }),
          })}
        >
          {({
            stopEditRows,
            cancelChangedRows,
            commitChangedRows,
            ...restParams
          }) =>
          cellTemplate({
            row: restParams.tableRow.row,
            column: restParams.tableColumn.column,
            cancelEditing: () => {
              stopEditRows({ rowIds: [restParams.tableRow.id] });
              cancelChangedRows({ rowIds: [restParams.tableRow.id] });
            },
            commitChanges: () => {
              stopEditRows({ rowIds: [restParams.tableRow.id] });
              commitChangedRows({ rowIds: [restParams.tableRow.id] });
            },
            isEditing: true,
            commandTemplate,
            ...restParams,
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
