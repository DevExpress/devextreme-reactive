import { TABLE_DATA_TYPE, TABLE_NODATA_TYPE } from './constants';

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
  : rows.map((row) => {
    const rowId = getRowId(row);
    return {
      key: `${TABLE_DATA_TYPE}_${rowId}`,
      type: TABLE_DATA_TYPE,
      rowId,
      row,
    };
  }));
