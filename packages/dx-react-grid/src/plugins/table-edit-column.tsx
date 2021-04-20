import * as React from 'react';
import { getMessagesFormatter } from '@devexpress/dx-core';
import {
  Getter, Template, Plugin, TemplateConnector, Getters,
} from '@devexpress/dx-react-core';
import {
  TABLE_EDIT_COMMAND_TYPE,
  tableColumnsWithEditing,
  isHeadingEditCommandsTableCell,
  isEditCommandsTableCell,
  isAddedTableRow,
  isEditTableRow,
} from '@devexpress/dx-grid-core';
import { TableEditColumnProps, TableCellProps } from '../types';

const pluginDependencies = [
  { name: 'EditingState' },
  { name: 'Table' },
];

const defaultMessages = {
  addCommand: 'New',
  editCommand: 'Edit',
  deleteCommand: 'Delete',
  commitCommand: 'Save',
  cancelCommand: 'Cancel',
};

class TableEditColumnBase extends React.PureComponent<TableEditColumnProps> {
  static COLUMN_TYPE = TABLE_EDIT_COMMAND_TYPE;
  static defaultProps = {
    showAddCommand: false,
    showEditCommand: false,
    showDeleteCommand: false,
    width: 140,
    messages: {},
  };
  static components = {
    cellComponent: 'Cell',
    headerCellComponent: 'HeaderCell',
    commandComponent: 'Command',
  };

  render() {
    const {
      cellComponent: Cell,
      headerCellComponent: HeaderCell,
      commandComponent: Command,
      showAddCommand,
      showEditCommand,
      showDeleteCommand,
      width,
      messages,
    } = this.props;
    const getMessage = getMessagesFormatter({ ...defaultMessages, ...messages });
    const tableColumnsComputed = (
      { tableColumns }: Getters,
    ) => tableColumnsWithEditing(tableColumns, width!);

    return (
      <Plugin
        name="TableEditColumn"
        dependencies={pluginDependencies}
      >
        <Getter name="tableColumns" computed={tableColumnsComputed} />

        <Template
          name="tableCell"
          predicate={(
            { tableRow, tableColumn }: any,
          ) => isHeadingEditCommandsTableCell(tableRow, tableColumn)}
        >
          {(params: TableCellProps) => (
            <TemplateConnector>
              {(getters, actions) => (
                <HeaderCell {...params} tabIndex={-1} setRefKeyboardNavigation={getters.setRefKeyboardNavigation}>
                  {showAddCommand && (
                    <Command
                      id="add"
                      text={getMessage('addCommand')}
                      onExecute={() => actions.addRow()}
                    />
                  )}
                </HeaderCell>
              )}
            </TemplateConnector>
          )}
        </Template>
        <Template
          name="tableCell"
          predicate={(
            { tableRow, tableColumn }: any,
          ) => isEditCommandsTableCell(tableRow, tableColumn)}
        >
          {(params: TableCellProps) => (
            <TemplateConnector>
              {(getters, actions) => {
                const isEdit = isEditTableRow(params.tableRow);
                const isNew = isAddedTableRow(params.tableRow);
                const isEditing = isEdit || isNew;
                const rowIds = [params.tableRow.rowId];
                const tabIndex = -1;
                return (
                  <Cell
                    {...params}
                    row={params.tableRow.row}
                    tabIndex={tabIndex}
                    setRefKeyboardNavigation={getters.setRefKeyboardNavigation}
                  >
                    {showEditCommand && !isEditing && (
                      <Command
                        id="edit"
                        text={getMessage('editCommand')}
                        onExecute={() => actions.startEditRows({ rowIds })}
                      />
                    )}
                    {showDeleteCommand && !isEditing && (
                      <Command
                        id="delete"
                        text={getMessage('deleteCommand')}
                        onExecute={() => {
                          actions.deleteRows({ rowIds });
                          actions.commitDeletedRows({ rowIds });
                        }}
                      />
                    )}
                    {isEditing && (
                      <Command
                        id="commit"
                        text={getMessage('commitCommand')}
                        onExecute={() => {
                          if (isNew) {
                            actions.commitAddedRows({ rowIds });
                          } else {
                            actions.stopEditRows({ rowIds });
                            actions.commitChangedRows({ rowIds });
                          }
                        }}
                      />
                    )}
                    {isEditing && (
                      <Command
                        id="cancel"
                        text={getMessage('cancelCommand')}
                        onExecute={() => {
                          if (isNew) {
                            actions.cancelAddedRows({ rowIds });
                          } else {
                            actions.stopEditRows({ rowIds });
                            actions.cancelChangedRows({ rowIds });
                          }
                        }}
                      />
                    )}
                  </Cell>
                );
              }}
            </TemplateConnector>
          )}
        </Template>
      </Plugin>
    );
  }
}

/***
 * A plugin that renders a command column. This column contains controls used for row editing,
 * creating, or deleting and committing/canceling changes.
 * */
export const TableEditColumn: React.ComponentType<TableEditColumnProps> & {
  /** The edit column type's identifier. */
  COLUMN_TYPE: symbol;
} = TableEditColumnBase;
