import { Getter, Template, TemplatePlaceholder, TemplateConnector, Plugin } from '@devexpress/dx-vue-core';
import {
  getRowChange,
  tableRowsWithEditing,
  isEditTableRow,
  isAddedTableRow,
  isEditTableCell,
} from '@devexpress/dx-grid-core';

const pluginDependencies = [
  { name: 'EditingState' },
  { name: 'Table' },
  { name: 'DataTypeProvider', optional: true },
];

export const TableEditRow = {
  name: 'TableEditRow',
  props: {
    rowHeight: {
      type: Number,
    },
    cellComponent: {
      type: Object,
      required: true,
    },
    rowComponent: {
      type: Object,
      required: true,
    },
  },
  render() {
    const {
      cellComponent: EditCell,
      rowComponent: EditRow,
      rowHeight,
    } = this;

    const tableBodyRowsComputed = ({ tableBodyRows, editingRowIds, addedRows }) =>
      tableRowsWithEditing(tableBodyRows, editingRowIds, addedRows, rowHeight);

    return (
      <Plugin
        name="TableEditRow"
        dependencies={pluginDependencies}
      >
        <Getter name="tableBodyRows" computed={tableBodyRowsComputed} />
        <Template
          name="tableCell"
          predicate={({ tableRow, tableColumn }) => isEditTableCell(tableRow, tableColumn)}
        >
          {params => (
            <TemplateConnector>
              {({
                getters: {
                  getCellValue,
                  createRowChange,
                  rowChanges,
                  isColumnEditingEnabled,
                },
                actions: {
                  changeAddedRow,
                  changeRow,
                },
              }) => {
                const { rowId, row } = params.tableRow;
                const { column } = params.tableColumn;
                const { name: columnName } = column;

                const isNew = isAddedTableRow(params.tableRow);
                const changedRow = isNew
                  ? row
                  : { ...row, ...getRowChange(rowChanges, rowId) };

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
                      column,
                      row,
                      value,
                      onValueChange,
                    }}
                  >
                    {content => (
                      <EditCell
                        {...{ attrs: { ...params } }}
                        row={row}
                        column={column}
                        value={value}
                        editingEnabled={isColumnEditingEnabled(columnName)}
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
              {...{ attrs: { ...params } }}
              row={params.tableRow.row}
            />
          )}
        </Template>
      </Plugin>
    );
  },
};
