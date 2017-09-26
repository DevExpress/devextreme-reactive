
import { TABLE_DATA_TYPE, TABLE_NODATA_TYPE, TABLE_UNKNOWN_TYPE } from './constants';

export const tableColumnsWithDataRows = columns =>
  columns.map(column => ({
    key: `${TABLE_DATA_TYPE}_${column.name}`,
    type: TABLE_DATA_TYPE,
    width: column.width,
    column,
  }));

export const tableRowsWithDataRows = (rows, getRowId) => (
  !rows.length
    ? [{ key: TABLE_NODATA_TYPE, type: TABLE_NODATA_TYPE, colSpanStart: 0 }]
    : rows.map((row, index) => {
      if (row.type) {
        return {
          row,
          type: TABLE_UNKNOWN_TYPE,
          key: `${TABLE_UNKNOWN_TYPE}_${index}`,
        };
      }
      const rowId = getRowId(row);
      return {
        row,
        rowData: row.rowData,
        rowId,
        type: TABLE_DATA_TYPE,
        key: `${TABLE_DATA_TYPE}_${rowId}`,
      };
    }));
