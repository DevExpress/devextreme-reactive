import React from 'react';
import PropTypes from 'prop-types';
import {
  Getter, Template, PluginContainer,
  TemplateConnector, TemplateRenderer,
} from '@devexpress/dx-react-core';
import {
  tableColumnsWithEditing,
  isHeadingEditCommandsTableCell,
  isDataEditCommandsTableCell,
  isEditNewRowCommandsTableCell,
  isEditExistingRowCommandsTableCell,
} from '@devexpress/dx-grid-core';

const getHeadingEditCommandsTableCellTemplateArgs = ({
  params,
  actions: { addRow },
  scope: { allowAdding, commandTemplate },
}) => ({
  ...params,
  addRow: () => addRow(),
  commandTemplate,
  allowAdding,
});

const getDataEditCommandsTableCellTemplateArgs = ({
  params,
  actions: { startEditRows, deleteRows, commitDeletedRows },
  scope: { allowEditing, allowDeleting, commandTemplate },
}) => ({
  ...params,
  row: params.tableRow.row,
  startEditing: () => startEditRows({ rowIds: [params.tableRow.rowId] }),
  deleteRow: () => {
    const rowIds = [params.tableRow.rowId];
    deleteRows({ rowIds });
    commitDeletedRows({ rowIds });
  },
  commandTemplate,
  allowEditing,
  allowDeleting,
  isEditing: false,
});

const getEditNewRowCommandsTableCellTemplateArgs = ({
  params,
  actions: { cancelAddedRows, commitAddedRows },
  scope: { commandTemplate },
}) => ({
  ...params,
  row: params.tableRow.row,
  cancelEditing: () => {
    cancelAddedRows({ rowIds: [params.tableRow.rowId] });
  },
  commitChanges: () => {
    commitAddedRows({ rowIds: [params.tableRow.rowId] });
  },
  isEditing: true,
  commandTemplate,
});

const getEditExistingRowCommandsTableCellTemplateArgs = ({
  params,
  actions: { stopEditRows, cancelChangedRows, commitChangedRows },
  scope: { commandTemplate },
}) => ({
  ...params,
  row: params.tableRow.row,
  cancelEditing: () => {
    const rowIds = [params.tableRow.rowId];
    stopEditRows({ rowIds });
    cancelChangedRows({ rowIds });
  },
  commitChanges: () => {
    const rowIds = [params.tableRow.rowId];
    stopEditRows({ rowIds });
    commitChangedRows({ rowIds });
  },
  isEditing: true,
  commandTemplate,
});

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
                  params={getHeadingEditCommandsTableCellTemplateArgs({
                    params,
                    actions,
                    scope: { allowAdding, commandTemplate },
                  })}
                />
              )}
            </TemplateConnector>
          )}
        </Template>
        <Template
          name="tableViewCell"
          predicate={({ tableRow, tableColumn }) =>
            isDataEditCommandsTableCell(tableRow, tableColumn)}
        >
          {params => (
            <TemplateConnector>
              {(getters, actions) => (
                <TemplateRenderer
                  template={cellTemplate}
                  params={getDataEditCommandsTableCellTemplateArgs({
                    params,
                    actions,
                    scope: { allowEditing, allowDeleting, commandTemplate },
                  })}
                />
              )}
            </TemplateConnector>
          )}
        </Template>
        <Template
          name="tableViewCell"
          predicate={({ tableRow, tableColumn }) =>
            isEditNewRowCommandsTableCell(tableRow, tableColumn)}
        >
          {params => (
            <TemplateConnector>
              {(getters, actions) => (
                <TemplateRenderer
                  template={cellTemplate}
                  params={getEditNewRowCommandsTableCellTemplateArgs({
                    params,
                    actions,
                    scope: { commandTemplate },
                  })}
                />
              )}
            </TemplateConnector>
          )}
        </Template>
        <Template
          name="tableViewCell"
          predicate={({ tableRow, tableColumn }) =>
            isEditExistingRowCommandsTableCell(tableRow, tableColumn)}
        >
          {params => (
            <TemplateConnector>
              {(getters, actions) => (
                <TemplateRenderer
                  template={cellTemplate}
                  params={getEditExistingRowCommandsTableCellTemplateArgs({
                    params,
                    actions,
                    scope: { commandTemplate },
                  })}
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
};
TableEditColumn.defaultProps = {
  allowAdding: false,
  allowEditing: false,
  allowDeleting: false,
  width: 140,
};
