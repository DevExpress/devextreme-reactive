import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Getter, Template, Plugin, TemplateConnector,
} from '@devexpress/dx-react-core';
import {
  tableColumnsWithEditing,
  isHeadingEditCommandsTableCell,
  isEditCommandsTableCell,
  isAddedTableRow,
  isEditTableRow,
  getMessagesFormatter,
} from '@devexpress/dx-grid-core';

const pluginDependencies = [
  { name: 'EditingState' },
  { name: 'Table' },
];

export class TableEditColumn extends React.PureComponent {
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
    const getMessage = getMessagesFormatter(messages);
    const tableColumnsComputed = ({ tableColumns }) => tableColumnsWithEditing(tableColumns, width);

    return (
      <Plugin
        name="TableEditColumn"
        dependencies={pluginDependencies}
      >
        <Getter name="tableColumns" computed={tableColumnsComputed} />

        <Template
          name="tableCell"
          predicate={({ tableRow, tableColumn }) =>
            isHeadingEditCommandsTableCell(tableRow, tableColumn)}
        >
          {params => (
            <TemplateConnector>
              {(getters, actions) => (
                <HeaderCell {...params}>
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
          predicate={({ tableRow, tableColumn }) =>
            isEditCommandsTableCell(tableRow, tableColumn)}
        >
          {params => (
            <TemplateConnector>
              {(getters, actions) => {
                const isEdit = isEditTableRow(params.tableRow);
                const isNew = isAddedTableRow(params.tableRow);
                const isEditing = isEdit || isNew;
                const rowIds = [params.tableRow.rowId];
                return (
                  <Cell
                    {...params}
                    row={params.tableRow.row}
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
TableEditColumn.propTypes = {
  cellComponent: PropTypes.func.isRequired,
  headerCellComponent: PropTypes.func.isRequired,
  commandComponent: PropTypes.func.isRequired,
  showAddCommand: PropTypes.bool,
  showEditCommand: PropTypes.bool,
  showDeleteCommand: PropTypes.bool,
  width: PropTypes.number,
  messages: PropTypes.object,
};
TableEditColumn.defaultProps = {
  showAddCommand: false,
  showEditCommand: false,
  showDeleteCommand: false,
  width: 140,
  messages: {},
};
