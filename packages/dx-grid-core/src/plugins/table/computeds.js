import { TABLE_DATA_TYPE, TABLE_NODATA_TYPE } from './constants';
import { getColumnExtension } from '../../utils/column-extension';

export const tableColumnsWithDataRows = (columns, columnExtensions) =>
  columns.map((column) => {
    const { name } = column;
    const columnExtension = getColumnExtension(columnExtensions, name);
    return {
      key: `${TABLE_DATA_TYPE}_${name}`,
      type: TABLE_DATA_TYPE,
      width: columnExtension.width,
      align: columnExtension.align,
      column,
    };
  });

export const tableRowsWithDataRows = (rows, getRowId) => (
  !rows.length
    ? [{ key: TABLE_NODATA_TYPE, type: TABLE_NODATA_TYPE, colSpanStart: 0 }]
    : rows.map((row) => {
      const rowId = getRowId(row);
      return {
        row,
        rowId,
        type: TABLE_DATA_TYPE,
        key: `${TABLE_DATA_TYPE}_${rowId}`,
      };
    }));
