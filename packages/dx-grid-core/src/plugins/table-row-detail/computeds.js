import { TABLE_DETAIL_TYPE } from './constants';

// TODO: remove getRowId
export const tableRowsWithExpandedDetail = (tableRows, expandedRows, getRowId, rowHeight) => {
  let result = tableRows;
  expandedRows
    .forEach((expandedRowId) => {
      const index = result.findIndex(row => getRowId(row.row) === expandedRowId);
      if (index !== -1) {
        const rowIndex = result.findIndex(row => getRowId(row.row) === expandedRowId);
        const insertIndex = rowIndex + 1;
        const row = result[rowIndex];
        result = [
          ...result.slice(0, insertIndex),
          {
            type: TABLE_DETAIL_TYPE,
            id: getRowId(row.row),
            row: row.row,
            colspan: 0,
            height: rowHeight,
          },
          ...result.slice(insertIndex),
        ];
      }
    });
  return result;
};

export const tableColumnsWithDetail = (tableColumns, detailToggleCellWidth) =>
  [{ type: TABLE_DETAIL_TYPE, width: detailToggleCellWidth }, ...tableColumns];
