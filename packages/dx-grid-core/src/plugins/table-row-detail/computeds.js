import { TABLE_DETAIL_TYPE } from './constants';
import { TABLE_DATA_TYPE } from '../table-view/constants';

export const tableRowsWithExpandedDetail = (tableRows, expandedRows, rowHeight) => {
  let result = tableRows;
  expandedRows
    .forEach((expandedRowId) => {
      const rowIndex = result.findIndex(tableRow =>
        tableRow.type === TABLE_DATA_TYPE && tableRow.id === expandedRowId);
      if (rowIndex === -1) return;
      const insertIndex = rowIndex + 1;
      const tableRow = result[rowIndex];
      result = [
        ...result.slice(0, insertIndex),
        {
          type: TABLE_DETAIL_TYPE,
          id: tableRow.id,
          row: tableRow.row,
          colSpanStart: 0,
          height: rowHeight,
        },
        ...result.slice(insertIndex),
      ];
    });
  return result;
};

export const tableColumnsWithDetail = (tableColumns, detailToggleCellWidth) =>
  [{ type: TABLE_DETAIL_TYPE, width: detailToggleCellWidth }, ...tableColumns];
