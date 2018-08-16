import {
  DxGetter, DxTemplate, DxTemplatePlaceholder, DxTemplateConnector, DxPlugin,
} from '@devexpress/dx-vue-core';
import {
  getRowChange,
  tableRowsWithEditing,
  isEditTableRow,
  isAddedTableRow,
  isEditTableCell,
} from '@devexpress/dx-grid-core';

const pluginDependencies = [
  { name: 'DxEditingState' },
  { name: 'DxTable' },
  { name: 'DxDataTypeProvider', optional: true },
];

export const DxTableEditRow = {
  name: 'DxTableEditRow',
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

    const tableBodyRowsComputed = (
      { tableBodyRows, editingRowIds, addedRows },
    ) => tableRowsWithEditing(tableBodyRows, editingRowIds, addedRows, rowHeight);

    return (
      <DxPlugin
        name="DxTableEditRow"
        dependencies={pluginDependencies}
      >
        <DxGetter name="tableBodyRows" computed={tableBodyRowsComputed} />
        <DxTemplate
          name="tableCell"
          predicate={(
            { attrs: { tableRow, tableColumn } },
          ) => isEditTableCell(tableRow, tableColumn)}
        >
          {({ attrs, listeners }) => (
            <DxTemplateConnector>
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
                const { rowId, row } = attrs.tableRow;
                const { column } = attrs.tableColumn;
                const { name: columnName } = column;

                const isNew = isAddedTableRow(attrs.tableRow);
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
                  <DxTemplatePlaceholder
                    name="valueEditor"
                    column={column}
                    row={row}
                    value={value}
                    onValueChange={onValueChange}
                  >
                    {content => (
                      <EditCell
                        {...{ attrs: { ...attrs }, on: { ...listeners } }}
                        row={row}
                        column={column}
                        value={value}
                        editingEnabled={isColumnEditingEnabled(columnName)}
                        onValueChange={onValueChange}
                      >
                        {content}
                      </EditCell>
                    )}
                  </DxTemplatePlaceholder>
                );
              }}
            </DxTemplateConnector>
          )}
        </DxTemplate>
        <DxTemplate
          name="tableRow"
          predicate={(
            { attrs: { tableRow } },
          ) => (isEditTableRow(tableRow) || isAddedTableRow(tableRow))}
        >
          {({ attrs, listeners, slots }) => (
            <EditRow
              {...{ attrs: { ...attrs }, on: { ...listeners } }}
              row={attrs.tableRow.row}
            >
              {slots.default}
            </EditRow>
          )}
        </DxTemplate>
      </DxPlugin>
    );
  },
};
