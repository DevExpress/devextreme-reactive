import * as React from 'react';
import {
  Template,
  TemplatePlaceholder,
  TemplateConnector,
  Plugin,
} from '@devexpress/dx-react-core';
import {
  getRowChange,
  isInlineEditTableCell,
  TABLE_HEADING_TYPE,
} from '@devexpress/dx-grid-core';
import { TableInlineCellEditingProps, TableCellProps } from '../types';

const pluginDependencies = [
  { name: 'EditingState' },
  { name: 'Table' },
  { name: 'DataTypeProvider', optional: true },
];

// tslint:disable-next-line: max-line-length
const TableInlineCellEditingBase: React.SFC<TableInlineCellEditingProps> & {components: {cellComponent: string}} = (props) => {
  const { cellComponent: EditCell } = props;

  return(
    <Plugin name="TableInlineCellEditing" dependencies={pluginDependencies}>
      <Template
        name="tableCell"
        predicate={({ tableRow }: any) => tableRow.type !== TABLE_HEADING_TYPE}
      >
        {(params: TableCellProps & (() => {})) => (
          <TemplateConnector>
            {({ editingCells,
                getCellValue,
                createRowChange,
                rowChanges,
                isColumnEditingEnabled,
            }, {
              changeRow,
              startEditCells,
              stopEditCells,
              commitChangedRows,
              cancelChangedRows,
            }) => {
              const { tableRow, tableColumn } = params;
              const { rowId, row } = tableRow;
              const { column } = tableColumn;
              const { name: columnName } = column!;

              if (isInlineEditTableCell(tableRow, tableColumn, editingCells)) {
                const changedRow = {
                  ...row, ...getRowChange(rowChanges, rowId!),
                };

                const value = getCellValue(changedRow, columnName);
                const onValueChange = (newValue: any) => {
                  const changeArgs = {
                    rowId,
                    change: createRowChange(changedRow, newValue, columnName),
                  };
                  changeRow(changeArgs);
                };
                const editingEnabled = isColumnEditingEnabled(columnName);

                return(
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
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            commitChangedRows({ rowIds: [rowId] });
                            stopEditCells({ editingCells: [{ rowId, columnName }] });
                          } else if (e.key === 'Escape') {
                            cancelChangedRows({ rowIds: [rowId] });
                            stopEditCells({ editingCells: [{ rowId, columnName }] });
                          }
                        }}
                        onBlur={() => {
                          commitChangedRows({ rowIds: [rowId] });
                          stopEditCells({ editingCells: [{ rowId, columnName }] });
                        }}
                      >
                        {content}
                      </EditCell>
                    )}
                  </TemplatePlaceholder>
                );
              }

              return (
                <TemplatePlaceholder
                  params={{
                    ...params,
                    onClick: () => startEditCells({ editingCells: [{ rowId, columnName }] }),
                  }}
                />
              );
            }}
          </TemplateConnector>
        )}
      </Template>
    </Plugin>
  );
};

TableInlineCellEditingBase.components = {
  cellComponent: 'Cell',
};

// tslint:disable-next-line: max-line-length
export const TableInlineCellEditing: React.ComponentType<TableInlineCellEditingProps> = TableInlineCellEditingBase;
