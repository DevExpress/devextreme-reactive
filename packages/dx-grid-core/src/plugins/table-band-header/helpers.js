import { TABLE_BAND_TYPE, BAND_GROUP_CELL, BAND_HEADER_CELL, BAND_EMPTY_CELL, BAND_DUPLICATE_RENDER } from './constants';
import { TABLE_DATA_TYPE } from '../table/constants';
import { TABLE_HEADING_TYPE } from '../table-header-row/constants';

export const isBandedTableRow = tableRow => (tableRow.type === TABLE_BAND_TYPE);
export const isBandedOrHeaderRow = tableRow =>
  isBandedTableRow(tableRow) || tableRow.type === TABLE_HEADING_TYPE;

export const getColumnMeta = (
  columnName, bands, tableRowLevel,
  level = 0, title = null, result = null,
) => bands.reduce((acc, column) => {
  if (column.columnName === columnName) {
    acc.title = title;
    acc.level = level;
    return acc;
  }
  if (column.children !== undefined) {
    return getColumnMeta(
      columnName,
      column.children,
      tableRowLevel,
      level + 1,
      level > tableRowLevel ? title : column.title,
      acc,
    );
  }
  return acc;
}, result || { level, title });

export const getColSpan =
  (currentColumnIndex, tableColumns, columnBands, currentRowLevel, currentColumnTitle) => {
    let isOneChain = true;
    return tableColumns.reduce((acc, tableColumn, index) => {
      if (tableColumn.type !== TABLE_DATA_TYPE || index <= currentColumnIndex) return acc;
      const columnMeta = getColumnMeta(tableColumn.column.name, columnBands, currentRowLevel);
      if (isOneChain && columnMeta.title === currentColumnTitle) {
        return acc + 1;
      }
      isOneChain = false;
      return acc;
    }, 1);
  };

export const getBandComponent = (params, tableHeaderRows, tableColumns, columnBands) => {
  if (params.rowSpan) return { type: BAND_DUPLICATE_RENDER, payload: null };

  const maxLevel = tableHeaderRows.filter(column => column.type === TABLE_BAND_TYPE).length + 1;
  const currentRowLevel = params.tableRow.level === undefined
    ? maxLevel - 1 : params.tableRow.level;
  const currentColumnMeta = params.tableColumn.type === TABLE_DATA_TYPE
    ? getColumnMeta(params.tableColumn.column.name, columnBands, currentRowLevel)
    : { level: 0, title: '' };

  if (currentColumnMeta.level < currentRowLevel) return { type: BAND_EMPTY_CELL, payload: null };
  if (currentColumnMeta.level === currentRowLevel) {
    return {
      type: BAND_HEADER_CELL,
      payload: {
        tableRow: tableHeaderRows.find(row => row.type === TABLE_HEADING_TYPE),
        rowSpan: maxLevel - currentRowLevel,
      },
    };
  }

  const currentColumnIndex = tableColumns.findIndex(tableColumn =>
    tableColumn.key === params.tableColumn.key);
  if (currentColumnIndex > 0 && tableColumns[currentColumnIndex - 1].type === TABLE_DATA_TYPE) {
    const prevColumnMeta = getColumnMeta(
      tableColumns[currentColumnIndex - 1].column.name,
      columnBands,
      currentRowLevel,
    );
    if (prevColumnMeta.title === currentColumnMeta.title) return { type: null, payload: null };
  }

  return {
    type: BAND_GROUP_CELL,
    payload: {
      colSpan: getColSpan(
        currentColumnIndex,
        tableColumns,
        columnBands,
        currentRowLevel,
        currentColumnMeta.title,
      ),
      value: currentColumnMeta.title,
      column: currentColumnMeta,
    },
  };
};
