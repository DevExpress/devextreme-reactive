import React from 'react';
import PropTypes from 'prop-types';
import {
  Getter, Template, PluginContainer,
  TemplateConnector, TemplateRenderer,
} from '@devexpress/dx-react-core';
import {
  tableColumnsWithEditing,
  isHeadingEditCommandsTableCell,
  isEditCommandsTableCell,
  isAddedTableRow,
  isEditTableRow,
} from '@devexpress/dx-grid-core';

const getMessageFn = messages => name => messages[name];

const getHeadingEditCommandsTableCellTemplateArgs = (
  { messages, ...params },
  getters,
  { addRow },
) => ({
  ...params,
  getMessage: getMessageFn(messages),
  addRow: () => addRow(),
});

const getEditCommandsTableCellTemplateArgs = (
  { messages, ...params },
  getters,
  {
    startEditRows, stopEditRows, cancelChangedRows, commitChangedRows,
    deleteRows, commitDeletedRows, cancelAddedRows, commitAddedRows,
  },
) => {
  const isEdit = isEditTableRow(params.tableRow);
  const isNew = isAddedTableRow(params.tableRow);
  const rowIds = [params.tableRow.rowId];
  return {
    ...params,
    row: params.tableRow.row,
    isEditing: isEdit || isNew,
    startEditing: () => startEditRows({ rowIds: [params.tableRow.rowId] }),
    getMessage: getMessageFn(messages),
    deleteRow: () => {
      deleteRows({ rowIds });
      commitDeletedRows({ rowIds });
    },
    cancelEditing: () => {
      if (isNew) {
        cancelAddedRows({ rowIds });
      } else {
        stopEditRows({ rowIds });
        cancelChangedRows({ rowIds });
      }
    },
    commitChanges: () => {
      if (isNew) {
        commitAddedRows({ rowIds });
      } else {
        stopEditRows({ rowIds });
        commitChangedRows({ rowIds });
      }
    },
  };
};

const pluginDependencies = [
  { pluginName: 'EditingState' },
  { pluginName: 'TableView' },
];

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
      messages,
    } = this.props;

    const tableColumnsComputed = ({ tableColumns }) => tableColumnsWithEditing(tableColumns, width);

    return (
      <PluginContainer
        pluginName="TableEditColumn"
        dependencies={pluginDependencies}
      >
        <Getter name="tableColumns" computed={tableColumnsComputed} />

        <Template
          name="tableViewCell"
          predicate={({ tableRow, tableColumn }) =>
            isHeadingEditCommandsTableCell(tableRow, tableColumn)}
        >
          {params => (
            <TemplateConnector>
              {(getters, actions) => (
                <TemplateRenderer
                  template={headingCellTemplate}
                  params={getHeadingEditCommandsTableCellTemplateArgs(
                    { allowAdding, commandTemplate, messages, ...params },
                    getters,
                    actions,
                  )}
                />
              )}
            </TemplateConnector>
          )}
        </Template>
        <Template
          name="tableViewCell"
          predicate={({ tableRow, tableColumn }) =>
            isEditCommandsTableCell(tableRow, tableColumn)}
        >
          {params => (
            <TemplateConnector>
              {(getters, actions) => (
                <TemplateRenderer
                  template={cellTemplate}
                  params={getEditCommandsTableCellTemplateArgs(
                    {
                      allowEditing,
                      allowDeleting,
                      commandTemplate,
                      messages,
                      ...params,
                    },
                    getters,
                    actions,
                  )}
                />
              )}
            </TemplateConnector>
          )}
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
  messages: PropTypes.shape({
    addCommand: PropTypes.string,
    editCommand: PropTypes.string,
    deleteCommand: PropTypes.string,
    commitCommand: PropTypes.string,
    cancelCommand: PropTypes.string,
  }),
};
TableEditColumn.defaultProps = {
  allowAdding: false,
  allowEditing: false,
  allowDeleting: false,
  width: 140,
  messages: {},
};
