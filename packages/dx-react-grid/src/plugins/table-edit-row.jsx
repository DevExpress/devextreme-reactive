import React from 'react';
import PropTypes from 'prop-types';
import {
  Getter, Template, TemplatePlaceholder, TemplateConnector, PluginContainer,
} from '@devexpress/dx-react-core';
import {
  getRowChange,
  tableRowsWithEditing,
  isEditTableRow,
  isAddedTableRow,
  isEditTableCell,
} from '@devexpress/dx-grid-core';

const getEditTableCellProps = (
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

const getEditTableRowProps = params => ({
  ...params,
  row: params.tableRow.row,
});

const pluginDependencies = [
  { pluginName: 'EditingState' },
  { pluginName: 'Table' },
  { pluginName: 'DataTypeProvider', optional: true },
];

export class TableEditRow extends React.PureComponent {
  render() {
    const {
      getCellComponent,
      rowComponent: EditRow,
      rowHeight,
    } = this.props;

    const tableBodyRowsComputed = ({ tableBodyRows, editingRows, addedRows }) =>
      tableRowsWithEditing(tableBodyRows, editingRows, addedRows, rowHeight);

    return (
      <PluginContainer
        pluginName="TableEditRow"
        dependencies={pluginDependencies}
      >
        <Getter name="tableBodyRows" computed={tableBodyRowsComputed} />
        <Template
          name="tableCell"
          predicate={({ tableRow, tableColumn }) => isEditTableCell(tableRow, tableColumn)}
        >
          {params => (
            <TemplateConnector>
              {(getters, actions) => {
                const EditCell = getCellComponent(params.tableColumn.column.name);
                const templateArgs = getEditTableCellProps(params, getters, actions);
                return (
                  <TemplatePlaceholder
                    name="valueEditor"
                    params={getValueEditorArgs(templateArgs)}
                  >
                    {content => (
                      <EditCell {...templateArgs}>
                        {content}
                      </EditCell>
                    )}
                  </TemplatePlaceholder>
                );
              }}
            </TemplateConnector>
          )}
        </Template>
        <Template
          name="tableRow"
          predicate={({ tableRow }) => (isEditTableRow(tableRow) || isAddedTableRow(tableRow))}
        >
          {params => (
            <EditRow {...getEditTableRowProps(params)} />
          )}
        </Template>
      </PluginContainer>
    );
  }
}

TableEditRow.propTypes = {
  rowHeight: PropTypes.any,
  getCellComponent: PropTypes.func.isRequired,
  rowComponent: PropTypes.func.isRequired,
};

TableEditRow.defaultProps = {
  rowHeight: undefined,
};
