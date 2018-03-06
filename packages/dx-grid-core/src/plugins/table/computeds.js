import { TABLE_DATA_TYPE, TABLE_NODATA_TYPE } from './constants';
import { getColumnExtension } from '../../utils/column-extension';

export const tableColumnsWithDataRows = (columns, columnExtensions, bandColumns) => {
  debugger;
  if (bandColumns !== undefined) {
    return bandColumns.map((column) => {
      const { title } = column;
      const columnExtension = getColumnExtension(columnExtensions, title);
      const isDataTableColumn = columns.map(el => el.name).indexOf(column.name);
      return {
        key: `${TABLE_DATA_TYPE}_${title}`,
        type: isDataTableColumn !== -1 ? TABLE_DATA_TYPE : 'band',
        width: columnExtension.width,
        align: columnExtension.align,
        column,
      };
    });
  }

  return columns.map((column) => {
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
};

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
