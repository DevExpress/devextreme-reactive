import {
  TABLE_BAND_TYPE, BAND_GROUP_CELL, BAND_HEADER_CELL, BAND_EMPTY_CELL, BAND_DUPLICATE_RENDER,
} from './constants';
import { TABLE_HEADING_TYPE } from '../table-header-row/constants';
import { TABLE_DATA_TYPE } from '../table/constants';
import { TABLE_STUB_TYPE } from '../../utils/virtual-table';

export const isBandedTableRow = tableRow => (tableRow.type === TABLE_BAND_TYPE);
export const isBandedOrHeaderRow = tableRow => isBandedTableRow(tableRow)
  || tableRow.type === TABLE_HEADING_TYPE;
export const isNoDataColumn = columnType => columnType !== TABLE_DATA_TYPE;

export const getColumnBandInfo = (
  columnName, bands, tableRowLevel,
  level = 0, title = null, result = null,
) => bands.reduce((acc, column) => {
  if (column.columnName === columnName) {
    acc.title = title;
    acc.level = level;
    return acc;
  }
  if (column.children !== undefined) {
    return getColumnBandInfo(
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

export const getCurrentColumnBandInfo = (
  { currentColumnIndex, currentTableColumn, currentRowLevel },
  { tableColumns, columnBands },
) => {
  const currentRealTableColumn = tableColumns[currentColumnIndex];
  return currentTableColumn.type === TABLE_DATA_TYPE || currentTableColumn.type === TABLE_STUB_TYPE
    ? getColumnBandInfo(currentRealTableColumn.column.name, columnBands, currentRowLevel)
    : { level: 0, title: '' };
};

const getColumnIndex = (currentTableColumn, tableColumns) => (
  currentTableColumn.type === TABLE_STUB_TYPE
    ? currentTableColumn.rightColumnIndex
    : tableColumns.findIndex(column => column.key === currentTableColumn.key)
);

const bandCellWillBeMerged = (
  {
    currentTableColumn, currentColumnIndex,
    currentColumnBand, currentRowLevel,
    previousTableColumn, isCurrentColumnFixed,
  },
  columnBands,
) => {
  if (currentColumnIndex <= 0 || previousTableColumn.type !== TABLE_DATA_TYPE) return false;

  const isPrevColumnFixed = !!previousTableColumn.fixed;
  const prevColumnBand = getColumnBandInfo(
    previousTableColumn.column.name,
    columnBands,
    currentRowLevel,
  );

  return (prevColumnBand.title === currentColumnBand.title
    && !currentTableColumn.rightColumnIndex
    && (!isPrevColumnFixed || (isPrevColumnFixed && isCurrentColumnFixed)));
};

const columnRenderedInOtherRow = ({ currentColumnBand, currentRowLevel }) => (
  currentColumnBand.level < currentRowLevel
);

const columnBelongsToCurrentRow = ({ currentColumnBand, currentRowLevel }) => (
  currentColumnBand.level === currentRowLevel
);

const beforeBorderVisible = ({ currentColumnIndex, currentTableColumn, previousTableColumn }) => (
  currentColumnIndex > 0
  && currentTableColumn.type === TABLE_DATA_TYPE
  && isNoDataColumn(previousTableColumn.type)
);

const getCurrentColumnInfo = (tableInfo, currentTableColumn, tableRow) => {
  const currentColumnInfo = { currentTableColumn, tableRow };
  currentColumnInfo.currentRowLevel = tableRow.level === undefined
    ? tableInfo.maxLevel - 1 : tableRow.level;
  currentColumnInfo.currentColumnIndex = getColumnIndex(currentTableColumn, tableInfo.tableColumns);
  currentColumnInfo.currentColumnBand = getCurrentColumnBandInfo(currentColumnInfo, tableInfo);
  currentColumnInfo.isCurrentColumnFixed = !!currentTableColumn.fixed;

  return currentColumnInfo;
};

const calculateMaxLevel = tableHeaderRows => (
  tableHeaderRows
    .filter(column => column.type === TABLE_BAND_TYPE)
    .length + 1
);
const getTableHeaderInfo = (tableColumns, tableHeaderRows, columnBands) => (
  {
    tableColumns, tableHeaderRows, columnBands, maxLevel: calculateMaxLevel(tableHeaderRows),
  }
);

export const getColSpan = (
  {
    currentColumnIndex, currentRowLevel, currentColumnBand, isCurrentColumnFixed,
  },
  { tableColumns, columnBands },
) => {
  let isOneChain = true;
  return tableColumns
    .slice(currentColumnIndex + 1)
    .reduce((acc, tableColumn) => {
      if (tableColumn.type !== TABLE_DATA_TYPE) return acc;

      const columnMeta = getColumnBandInfo(tableColumn.column.name, columnBands, currentRowLevel);
      if (isCurrentColumnFixed && !tableColumn.fixed) {
        isOneChain = false;
      }
      if (isOneChain && columnMeta.title === currentColumnBand.title) {
        return acc + 1;
      }
      isOneChain = false;
      return acc;
    }, 1);
};

const createBandHeaderCell = ({ currentRowLevel, beforeBorder }, { tableHeaderRows, maxLevel }) => (
  {
    type: BAND_HEADER_CELL,
    payload: {
      tableRow: tableHeaderRows.find(row => row.type === TABLE_HEADING_TYPE),
      rowSpan: maxLevel - currentRowLevel,
      ...beforeBorder && { beforeBorder },
    },
  }
);

const createBandGroupCell = (currentColumnInfo, tableHeaderInfo) => {
  const { beforeBorder } = currentColumnInfo;
  return {
    type: BAND_GROUP_CELL,
    payload: {
      colSpan: getColSpan(
        currentColumnInfo,
        tableHeaderInfo,
      ),
      value: currentColumnInfo.currentColumnBand.title,
      column: currentColumnInfo.currentColumnBand,
      ...beforeBorder && { beforeBorder },
    },
  };
};

export const getBandComponent = (
  { tableColumn: currentTableColumn, tableRow, rowSpan },
  tableHeaderRows, tableColumns, columnBands,
) => {
  if (rowSpan) {
    return { type: BAND_DUPLICATE_RENDER, payload: null };
  }

  const tableHeaderInfo = getTableHeaderInfo(tableColumns, tableHeaderRows, columnBands);
  const currentColumnInfo = getCurrentColumnInfo(tableHeaderInfo, currentTableColumn, tableRow);
  if (columnRenderedInOtherRow(currentColumnInfo)) {
    return { type: BAND_EMPTY_CELL, payload: null };
  }

  currentColumnInfo.previousTableColumn = tableColumns[currentColumnInfo.currentColumnIndex - 1];
  currentColumnInfo.beforeBorder = beforeBorderVisible(currentColumnInfo);
  if (columnBelongsToCurrentRow(currentColumnInfo)) {
    return createBandHeaderCell(currentColumnInfo, tableHeaderInfo);
  }

  if (bandCellWillBeMerged(currentColumnInfo, columnBands)) {
    return { type: null, payload: null };
  }

  return createBandGroupCell(currentColumnInfo, tableHeaderInfo);
};
