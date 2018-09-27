import {
  TABLE_BAND_TYPE, BAND_GROUP_CELL, BAND_HEADER_CELL, BAND_EMPTY_CELL, BAND_DUPLICATE_RENDER,
} from './constants';
import { TABLE_DATA_TYPE } from '../table/constants';
import { TABLE_HEADING_TYPE } from '../table-header-row/constants';
import { TABLE_EDIT_COMMAND_TYPE } from '../table-edit-column/constants';
import { TABLE_DETAIL_TYPE } from '../table-row-detail/constants';
import { TABLE_SELECT_TYPE } from '../table-selection/constants';

export const isBandedTableRow = tableRow => (tableRow.type === TABLE_BAND_TYPE);
export const isBandedOrHeaderRow = tableRow => isBandedTableRow(tableRow)
|| tableRow.type === TABLE_HEADING_TYPE;
export const isCommandColumn = columnType => (
  columnType === TABLE_EDIT_COMMAND_TYPE
  || columnType === TABLE_SELECT_TYPE
  || columnType === TABLE_DETAIL_TYPE
);

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

export const getColSpan = (
  currentColumnIndex, tableColumns, columnBands,
  currentRowLevel, currentColumnTitle, isCurrentColumnFixed,
) => {
  let isOneChain = true;
  return tableColumns.slice(currentColumnIndex + 1)
    .reduce((acc, tableColumn) => {
      if (tableColumn.type !== TABLE_DATA_TYPE) return acc;
      const columnMeta = getColumnMeta(tableColumn.column.name, columnBands, currentRowLevel);
      if (isCurrentColumnFixed && !tableColumn.fixed) {
        isOneChain = false;
      }
      if (isOneChain && columnMeta.title === currentColumnTitle) {
        return acc + 1;
      }
      isOneChain = false;
      return acc;
    }, 1);
};

export const getBandComponent = (
  { tableColumn: currentTableColumn, tableRow, rowSpan },
  tableHeaderRows, tableColumns, columnBands,
) => {
  if (rowSpan) return { type: BAND_DUPLICATE_RENDER, payload: null };

  const maxLevel = tableHeaderRows.filter(column => column.type === TABLE_BAND_TYPE).length + 1;
  const currentRowLevel = tableRow.level === undefined
    ? maxLevel - 1 : tableRow.level;
  const currentColumnMeta = currentTableColumn.type === TABLE_DATA_TYPE
    ? getColumnMeta(currentTableColumn.column.name, columnBands, currentRowLevel)
    : { level: 0, title: '' };

  if (currentColumnMeta.level < currentRowLevel) return { type: BAND_EMPTY_CELL, payload: null };
  const currentColumnIndex = tableColumns
    .findIndex(column => column.key === currentTableColumn.key);
  const previousTableColumn = tableColumns[currentColumnIndex - 1];
  let leftBorder = false;
  if (currentColumnIndex > 0 && currentTableColumn.type === TABLE_DATA_TYPE
    && isCommandColumn(previousTableColumn.type)) {
    leftBorder = true;
  }
  if (currentColumnMeta.level === currentRowLevel) {
    return {
      type: BAND_HEADER_CELL,
      payload: {
        tableRow: tableHeaderRows.find(row => row.type === TABLE_HEADING_TYPE),
        rowSpan: maxLevel - currentRowLevel,
        ...leftBorder && { leftBorder },
      },
    };
  }

  const isCurrentColumnFixed = !!currentTableColumn.fixed;
  if (currentColumnIndex > 0 && previousTableColumn.type === TABLE_DATA_TYPE) {
    const isPrevColumnFixed = !!previousTableColumn.fixed;
    const prevColumnMeta = getColumnMeta(
      previousTableColumn.column.name,
      columnBands,
      currentRowLevel,
    );
    if (prevColumnMeta.title === currentColumnMeta.title
      && (!isPrevColumnFixed || (isPrevColumnFixed && isCurrentColumnFixed))) {
      return { type: null, payload: null };
    }
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
        isCurrentColumnFixed,
      ),
      value: currentColumnMeta.title,
      column: currentColumnMeta,
      ...leftBorder && { leftBorder },
    },
  };
};
