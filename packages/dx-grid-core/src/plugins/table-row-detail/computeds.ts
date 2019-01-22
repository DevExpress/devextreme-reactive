import { PureComputed } from '@devexpress/dx-core';
import { TABLE_DETAIL_TYPE } from './constants';
import { TABLE_DATA_TYPE } from '../table/constants';
import { TableRow, TableColumn, CellColSpanGetter } from '../../types';

export const tableRowsWithExpandedDetail: PureComputed<[TableRow[], number[], number]> = (
  tableRows, expandedDetailRowIds, rowHeight,
) => {
  let result = tableRows;
  expandedDetailRowIds
    .forEach((expandedRowId) => {
      const rowIndex = result.findIndex(
        tableRow => tableRow.type === TABLE_DATA_TYPE && tableRow.rowId === expandedRowId,
      );
      if (rowIndex === -1) return;
      const insertIndex = rowIndex + 1;
      const { row, rowId } = result[rowIndex];
      result = [
        ...result.slice(0, insertIndex),
        {
          rowId,
          row,
          key: `${TABLE_DETAIL_TYPE.toString()}_${rowId}`,
          type: TABLE_DETAIL_TYPE,
          height: rowHeight,
        },
        ...result.slice(insertIndex),
      ];
    });
  return result;
};

export const tableColumnsWithDetail: PureComputed<[TableColumn[], number]> = (
  tableColumns, toggleColumnWidth,
) => [
  { key: TABLE_DETAIL_TYPE.toString(), type: TABLE_DETAIL_TYPE, width: toggleColumnWidth },
  ...tableColumns,
];

export const tableDetailCellColSpanGetter: CellColSpanGetter = getTableCellColSpan => (params) => {
  const { tableRow, tableColumns, tableColumn } = params;
  if (tableRow.type === TABLE_DETAIL_TYPE && tableColumns.indexOf(tableColumn) === 0) {
    return tableColumns.length;
  }
  return getTableCellColSpan(params);
};
