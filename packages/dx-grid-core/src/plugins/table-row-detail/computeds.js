import { DETAIL_TYPE } from './constants';

// TODO: remove getRowId
export const tableRowsWithExpandedDetail = (sourceRows, expandedRows, getRowId, rowHeight) => {
  let rows = sourceRows;
  expandedRows
    .forEach((expandedRowId) => {
      const index = rows.findIndex(row => getRowId(row.original) === expandedRowId);
      if (index !== -1) {
        const rowIndex = rows.findIndex(row => getRowId(row.original) === expandedRowId);
        const insertIndex = rowIndex + 1;
        const row = rows[rowIndex];
        rows = [
          ...rows.slice(0, insertIndex),
          {
            type: DETAIL_TYPE,
            id: getRowId(row.original),
            original: row.original,
            colspan: 0,
            height: rowHeight,
          },
          ...rows.slice(insertIndex),
        ];
      }
    });
  return rows;
};

export const tableColumnsWithDetail = (columns, detailToggleCellWidth) =>
  [{ type: DETAIL_TYPE, width: detailToggleCellWidth }, ...columns];
