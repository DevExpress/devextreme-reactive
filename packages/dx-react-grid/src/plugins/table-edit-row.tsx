import * as React from 'react';
import {
  Getter, Template, TemplatePlaceholder, TemplateConnector, Plugin, Getters,
} from '@devexpress/dx-react-core';
import {
  getRowChange,
  tableRowsWithEditing,
  isEditTableRow,
  isAddedTableRow,
  isEditTableCell,
  TABLE_EDIT_TYPE,
  TABLE_ADDED_TYPE,
} from '@devexpress/dx-grid-core';
import { TableEditRowProps, TableCellProps, TableRowProps } from '../types';

const pluginDependencies = [
  { name: 'EditingState' },
  { name: 'Table' },
  { name: 'DataTypeProvider', optional: true },
];

class TableEditRowBase extends React.PureComponent<TableEditRowProps> {
  static ADDED_ROW_TYPE = TABLE_ADDED_TYPE;
  static EDIT_ROW_TYPE = TABLE_EDIT_TYPE;
  static components = {
    rowComponent: 'Row',
    cellComponent: 'Cell',
  };

  render() {
    const {
      cellComponent: EditCell,
      rowComponent: EditRow,
      rowHeight,
    } = this.props;

    const tableBodyRowsComputed = (
      { tableBodyRows, editingRowIds, addedRows }: Getters,
    ) => tableRowsWithEditing(tableBodyRows, editingRowIds, addedRows, rowHeight);

    return (
      <Plugin
        name="TableEditRow"
        dependencies={pluginDependencies}
      >
        <Getter name="tableBodyRows" computed={tableBodyRowsComputed} />
        <Template
          name="tableCell"
          predicate={({ tableRow, tableColumn }: any) => isEditTableCell(tableRow, tableColumn)}
        >
          {(params: TableCellProps) => (
            <TemplateConnector>
              {({
                getCellValue,
                createRowChange,
                rowChanges,
                isColumnEditingEnabled,
              }, {
                changeAddedRow,
                changeRow,
              }) => {
                const { rowId, row } = params.tableRow;
                const { column } = params.tableColumn;
                const { name: columnName } = column!;

                const isNew = isAddedTableRow(params.tableRow);
                const changedRow = isNew
                  ? row
                  : { ...row, ...getRowChange(rowChanges, rowId!) };

                const value = getCellValue(changedRow, columnName);
                const onValueChange = (newValue: any) => {
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
                const editingEnabled = isColumnEditingEnabled(columnName);
                return (
                  <TemplatePlaceholder
                    name="valueEditor"
                    params={{
                      column,
                      row,
                      value,
                      onValueChange,
                      disabled: !editingEnabled,
                    }}
                  >
                    {content => (
                      <EditCell
                        {...params}
                        row={row}
                        column={column!}
                        value={value}
                        editingEnabled={editingEnabled}
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
          predicate={(
            { tableRow }: any,
          ) => !!(isEditTableRow(tableRow) || isAddedTableRow(tableRow))}
        >
          {(params: TableRowProps) => (
            <EditRow
              {...params}
              row={params.tableRow.row}
            />
          )}
        </Template>
      </Plugin>
    );
  }
}

/** A plugin that renders a row being edited. */
export const TableEditRow: React.ComponentType<TableEditRowProps> & {
  /** The added row type's identifier. */
  ADDED_ROW_TYPE: symbol;
  /** The edit row type's identifier. */
  EDIT_ROW_TYPE: symbol;
} = TableEditRowBase;
