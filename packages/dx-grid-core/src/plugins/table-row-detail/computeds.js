import { TABLE_DETAIL_TYPE } from './constants';
import { TABLE_DATA_TYPE } from '../table/constants';

export const tableRowsWithExpandedDetail = (tableRows, expandedDetailRowIds, rowHeight) => {
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
          key: `${TABLE_DETAIL_TYPE.toString()}_${rowId}`,
          type: TABLE_DETAIL_TYPE,
          rowId,
          row,
          height: rowHeight,
        },
        ...result.slice(insertIndex),
      ];
    });
  return result;
};

export const tableColumnsWithDetail = (tableColumns, toggleColumnWidth) => [
  { key: TABLE_DETAIL_TYPE.toString(), type: TABLE_DETAIL_TYPE, width: toggleColumnWidth },
  ...tableColumns,
];

export const tableDetailCellColSpanGetter = getTableCellColSpan => (params) => {
  const { tableRow, tableColumns, tableColumn } = params;
  if (tableRow.type === TABLE_DETAIL_TYPE && tableColumns.indexOf(tableColumn) === 0) {
    return tableColumns.length;
  }
  return getTableCellColSpan(params);
};
