import { DxGetter, DxTemplate, DxPlugin, DxTemplateConnector } from '@devexpress/dx-vue-core';
import {
  tableColumnsWithEditing,
  isHeadingEditCommandsTableCell,
  isEditCommandsTableCell,
  isAddedTableRow,
  isEditTableRow,
  getMessagesFormatter,
} from '@devexpress/dx-grid-core';

const pluginDependencies = [
  { name: 'DxEditingState' },
  { name: 'DxTable' },
];

export const DxTableEditColumn = {
  name: 'DxTableEditColumn',
  props: {
    cellComponent: {
      type: Object,
      required: true,
    },
    headerCellComponent: {
      type: Object,
      required: true,
    },
    commandComponent: {
      type: Object,
      required: true,
    },
    showAddCommand: {
      type: Boolean,
    },
    showEditCommand: {
      type: Boolean,
    },
    showDeleteCommand: {
      type: Boolean,
    },
    width: {
      type: Number,
      default: 140,
    },
    messages: {
      type: Object,
      default: () => {},
    },
  },
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
    } = this;
    const getMessage = getMessagesFormatter(messages);
    const tableColumnsComputed = ({ tableColumns }) => tableColumnsWithEditing(tableColumns, width);

    return (
      <DxPlugin
        name="DxTableEditColumn"
        dependencies={pluginDependencies}
      >
        <DxGetter name="tableColumns" computed={tableColumnsComputed} />

        <DxTemplate
          name="tableCell"
          predicate={({ tableRow, tableColumn }) =>
            isHeadingEditCommandsTableCell(tableRow, tableColumn)}
        >
          {params => (
            <DxTemplateConnector>
              {({ actions: { addRow } }) => (
                <HeaderCell
                  {...{ attrs: { ...params } }}
                >
                  {showAddCommand && (
                    <Command
                      id="add"
                      text={getMessage('addCommand')}
                      onExecute={() => addRow()}
                    />
                  )}
                </HeaderCell>
              )
            }
            </DxTemplateConnector>
          )}
        </DxTemplate>
        <DxTemplate
          name="tableCell"
          predicate={({ tableRow, tableColumn }) =>
            isEditCommandsTableCell(tableRow, tableColumn)}
        >
          {params => (
            <DxTemplateConnector>
              {({
                actions: {
                  startEditRows,
                  commitDeletedRows,
                  commitAddedRows,
                  commitChangedRows,
                  deleteRows,
                  stopEditRows,
                  cancelAddedRows,
                  cancelChangedRows,
                },
              }) => {
                const isEdit = isEditTableRow(params.tableRow);
                const isNew = isAddedTableRow(params.tableRow);
                const isEditing = isEdit || isNew;
                const rowIds = [params.tableRow.rowId];
                return (
                  <Cell
                    {...{ attrs: { ...params } }}
                    row={params.tableRow.row}
                  >
                    {showEditCommand && !isEditing && (
                      <Command
                        id="edit"
                        text={getMessage('editCommand')}
                        onExecute={() => startEditRows({ rowIds })}
                      />
                    )}
                    {showDeleteCommand && !isEditing && (
                      <Command
                        id="delete"
                        text={getMessage('deleteCommand')}
                        onExecute={() => {
                          deleteRows({ rowIds });
                          commitDeletedRows({ rowIds });
                        }}
                      />
                    )}
                    {isEditing && (
                      <Command
                        id="commit"
                        text={getMessage('commitCommand')}
                        onExecute={() => {
                          if (isNew) {
                            commitAddedRows({ rowIds });
                          } else {
                            stopEditRows({ rowIds });
                            commitChangedRows({ rowIds });
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
                            cancelAddedRows({ rowIds });
                          } else {
                            stopEditRows({ rowIds });
                            cancelChangedRows({ rowIds });
                          }
                        }}
                      />
                    )}
                  </Cell>
                );
              }}
            </DxTemplateConnector>
          )}
        </DxTemplate>
      </DxPlugin>
    );
  },
};
