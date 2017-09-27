import { TABLE_DATA_TYPE, TABLE_NODATA_TYPE, TABLE_UNKNOWN_TYPE } from './constants';

export const tableColumnsWithDataRows = columns =>
  columns.map(column => ({
    key: `${TABLE_DATA_TYPE}_${column.name}`,
    type: TABLE_DATA_TYPE,
    width: column.width,
    column,
  }));

export const tableRowsWithDataRows = (gridRows, getGridRowId) => (
  !gridRows.length
    ? [{ key: TABLE_NODATA_TYPE, type: TABLE_NODATA_TYPE, colSpanStart: 0 }]
    : gridRows.map((gridRow, index) => {
      if (gridRow.type) {
        return {
          gridRow,
          type: TABLE_UNKNOWN_TYPE,
          key: `${TABLE_UNKNOWN_TYPE}_${index}`,
        };
      }
      const rowId = getGridRowId(gridRow);
      return {
        gridRow,
        row: gridRow.row,
        rowId,
        type: TABLE_DATA_TYPE,
        key: `${TABLE_DATA_TYPE}_${rowId}`,
      };
    }));
