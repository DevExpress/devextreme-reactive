import React from 'react';
import PropTypes from 'prop-types';
import {
  Getter,
  Template,
  TemplatePlaceholder,
  TemplateConnector,
  TemplateRenderer,
  PluginContainer,
} from '@devexpress/dx-react-core';
import {
  getRowChange,
  tableRowsWithEditing,
  isEditTableRow,
  isAddedTableRow,
  isEditTableCell,
} from '@devexpress/dx-grid-core';

const getEditTableCellTemplateArgs = (
  params,
  getters,
  { changeRow, changeAddedRow },
) => {
  const { getCellValue, createRowChange } = getters;
  const isNew = isAddedTableRow(params.tableRow);
  const { rowId, row } = params.tableRow;
  const { column } = params.tableColumn;
  const changedRow = isNew
    ? row
    : { ...row, ...getRowChange(getters.changedRows, rowId) };
  return {
    ...params,
    row,
    column,
    value: getCellValue(changedRow, column.name),
    onValueChange: (newValue) => {
      const changeArgs = {
        rowId,
        change: createRowChange(changedRow, column.name, newValue),
      };
      if (isNew) {
        changeAddedRow(changeArgs);
      } else {
        changeRow(changeArgs);
      }
    },
  };
};

const getValueEditorArgs = params => ({
  column: params.column,
  row: params.row,
  value: params.value,
  onValueChange: params.onValueChange,
});

const getEditTableRowTemplateArgs = params => ({
  ...params,
  row: params.tableRow.row,
});

const pluginDependencies = [
  { pluginName: 'EditingState' },
  { pluginName: 'TableView' },
  { pluginName: 'DataTypeProvider', optional: true },
];

export class TableEditRow extends React.PureComponent {
  render() {
    const { editCellTemplate, editRowTemplate, rowHeight } = this.props;

    const tableBodyRowsComputed = ({ tableBodyRows, editingRows, addedRows }) =>
      tableRowsWithEditing(tableBodyRows, editingRows, addedRows, rowHeight);

    return (
      <PluginContainer
        pluginName="TableEditRow"
        dependencies={pluginDependencies}
      >
        <Getter name="tableBodyRows" computed={tableBodyRowsComputed} />
        <Template
          name="tableViewCell"
          predicate={({ tableRow, tableColumn }) => isEditTableCell(tableRow, tableColumn)}
        >
          {params => (
            <TemplateConnector>
              {(getters, actions) => {
                const templateArgs = getEditTableCellTemplateArgs(params, getters, actions);
                return (
                  <TemplatePlaceholder
                    name="valueEditor"
                    params={getValueEditorArgs(templateArgs)}
                  >
                    {content => (
                      <TemplateRenderer
                        template={editCellTemplate}
                        params={templateArgs}
                      >
                        {content}
                      </TemplateRenderer>
                    )}
                  </TemplatePlaceholder>
                );
              }}
            </TemplateConnector>
          )}
        </Template>
        <Template
          name="tableViewRow"
          predicate={({ tableRow }) => (isEditTableRow(tableRow) || isAddedTableRow(tableRow))}
        >
          {params => (
            <TemplateConnector>
              {() => (
                <TemplateRenderer
                  template={editRowTemplate}
                  params={getEditTableRowTemplateArgs(params)}
                />
              )}
            </TemplateConnector>
          )}
        </Template>
      </PluginContainer>
    );
  }
}

TableEditRow.propTypes = {
  rowHeight: PropTypes.any,
  editCellTemplate: PropTypes.func.isRequired,
  editRowTemplate: PropTypes.func.isRequired,
};

TableEditRow.defaultProps = {
  rowHeight: undefined,
};
