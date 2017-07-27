import { TABLE_DATA_TYPE, TABLE_NODATA_TYPE } from './constants';

export const tableColumnsWithDataRows = columns =>
  columns.map(column => ({
    type: TABLE_DATA_TYPE,
    id: column.name,
    width: column.width, // TODO: remove it?
    original: column,
  }));

export const tableRowsWithDataRows = (rows, getRowId) => (
  !rows.length
  ? [{
    type: TABLE_NODATA_TYPE,
    id: 0,
    colspan: 0,
  }]
  : rows.map(row => ({
    type: TABLE_DATA_TYPE,
    id: getRowId(row),
    original: row,
  })));
