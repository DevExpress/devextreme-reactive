import React from 'react';
import PropTypes from 'prop-types';
import {
  Getter, Template, PluginContainer, TemplateConnector,
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
  { pluginName: 'EditingState' },
  { pluginName: 'Table' },
];

export class TableEditColumn extends React.PureComponent {
  render() {
    const {
      cellComponent: Cell,
      headerCellComponent: HeaderCell,
      getCommandComponent,
      allowAdding,
      allowEditing,
      allowDeleting,
      width,
      messages,
    } = this.props;
    const AddCommand = getCommandComponent('add');
    const EditCommand = getCommandComponent('edit');
    const DeleteCommand = getCommandComponent('delete');
    const CommitCommand = getCommandComponent('commit');
    const CancelCommand = getCommandComponent('cancel');
    const getMessage = getMessagesFormatter(messages);
    const tableColumnsComputed = ({ tableColumns }) => tableColumnsWithEditing(tableColumns, width);

    return (
      <PluginContainer
        pluginName="TableEditColumn"
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
                  {allowAdding && (
                    <AddCommand
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
                    {allowEditing && !isEditing && (
                      <EditCommand
                        text={getMessage('editCommand')}
                        onExecute={() => actions.startEditRows({ rowIds })}
                      />
                    )}
                    {allowDeleting && !isEditing && (
                      <DeleteCommand
                        text={getMessage('deleteCommand')}
                        onExecute={() => {
                          actions.deleteRows({ rowIds });
                          actions.commitDeletedRows({ rowIds });
                        }}
                      />
                    )}
                    {isEditing && (
                      <CommitCommand
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
                      <CancelCommand
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
      </PluginContainer>
    );
  }
}
TableEditColumn.propTypes = {
  cellComponent: PropTypes.func.isRequired,
  headerCellComponent: PropTypes.func.isRequired,
  getCommandComponent: PropTypes.func.isRequired,
  allowAdding: PropTypes.bool,
  allowEditing: PropTypes.bool,
  allowDeleting: PropTypes.bool,
  width: PropTypes.number,
  messages: PropTypes.object,
};
TableEditColumn.defaultProps = {
  allowAdding: false,
  allowEditing: false,
  allowDeleting: false,
  width: 140,
  messages: {},
};
