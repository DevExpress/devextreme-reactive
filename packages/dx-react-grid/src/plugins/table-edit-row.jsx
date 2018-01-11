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

const pluginDependencies = [
  { pluginName: 'EditingState' },
  { pluginName: 'Table' },
  { pluginName: 'DataTypeProvider', optional: true },
];

export class TableEditRow extends React.PureComponent {
  render() {
    const {
      cellComponent: EditCell,
      rowComponent: EditRow,
      rowHeight,
    } = this.props;

    const tableBodyRowsComputed = ({ tableBodyRows, editingRowIds, addedRows }) =>
      tableRowsWithEditing(tableBodyRows, editingRowIds, addedRows, rowHeight);

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
              {({ getCellValue, createRowChange, changedRows }, { changeAddedRow, changeRow }) => {
                const { rowId, row } = params.tableRow;
                const { name: columnName } = params.tableColumn.column;

                const isNew = isAddedTableRow(params.tableRow);
                const changedRow = isNew
                  ? row
                  : { ...row, ...getRowChange(changedRows, rowId) };

                const value = getCellValue(changedRow, columnName);
                const onValueChange = (newValue) => {
                  const changeArgs = {
                    rowId,
                    change: createRowChange(changedRow, newValue, columnName),
                  };
                  if (isNew) {
                    changeAddedRow(changeArgs);
                  } else {
                    changeRow(changeArgs);
                  }
                };
                return (
                  <TemplatePlaceholder
                    name="valueEditor"
                    params={{
                      column: params.tableColumn.column,
                      row,
                      value,
                      onValueChange,
                    }}
                  >
                    {content => (
                      <EditCell
                        {...params}
                        row={row}
                        column={params.tableColumn.column}
                        value={value}
                        onValueChange={onValueChange}
                      >
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
            <EditRow
              {...params}
              row={params.tableRow.row}
            />
          )}
        </Template>
      </PluginContainer>
    );
  }
}

TableEditRow.propTypes = {
  rowHeight: PropTypes.any,
  cellComponent: PropTypes.func.isRequired,
  rowComponent: PropTypes.func.isRequired,
};

TableEditRow.defaultProps = {
  rowHeight: undefined,
};
