import {
  TABLE_BAND_TYPE, BAND_GROUP_CELL, BAND_HEADER_CELL, BAND_EMPTY_CELL,
  BAND_DUPLICATE_RENDER, BAND_FILL_LEVEL_CELL,
} from './constants';
import { TABLE_HEADING_TYPE } from '../table-header-row/constants';
import { TABLE_DATA_TYPE } from '../table/constants';
import { findChainByColumnIndex } from '../table-header-row/helpers';
import {
  IsSpecificRowFn, GetColumnBandMetaFn, GetBandComponentFn,
} from '../../types';
import { TABLE_STUB_TYPE } from '../../utils/virtual-table';

export const isBandedTableRow: IsSpecificRowFn = tableRow => (tableRow.type === TABLE_BAND_TYPE);
export const isBandedOrHeaderRow: IsSpecificRowFn = tableRow => isBandedTableRow(tableRow)
  || tableRow.type === TABLE_HEADING_TYPE;
export const isNoDataColumn = (columnType: symbol) => columnType !== TABLE_DATA_TYPE;

export const getColumnMeta: GetColumnBandMetaFn = (
  columnName, bands, tableRowLevel,
  level = 0, title = null, result = null,
) => bands.reduce((acc, column) => {
  if (column.columnName === columnName) {
    return { ...acc, title, level };
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

// TODO: refactor
export const getBandComponent: GetBandComponentFn = (
  { tableColumn: currentTableColumn, tableRow, rowSpan },
  tableHeaderRows, tableColumns, columnBands, tableHeaderColumnChains,
  columnVisibleIntervals, bandLevelsVisibility,
) => {
  if (rowSpan) return { type: BAND_DUPLICATE_RENDER, payload: null };

  const maxLevel = tableHeaderRows.filter(column => column.type === TABLE_BAND_TYPE).length + 1;
  const { level } = tableRow;
  const currentRowLevel = level === undefined
    ? maxLevel - 1 : level;
  const currentColumnMeta = currentTableColumn.type === TABLE_DATA_TYPE
    ? getColumnMeta(currentTableColumn.column!.name, columnBands, currentRowLevel)
    : { level: 0, title: '' };

  const currentColumnIndex = tableColumns
    .findIndex(column => column.key === currentTableColumn.key);

  const levelsCount = bandLevelsVisibility.length;
  const visibleLevelsCount = bandLevelsVisibility.filter(Boolean).length;

  if (currentColumnMeta.level < currentRowLevel) {
    const shouldFillLevel = currentRowLevel > 0 && visibleLevelsCount < levelsCount
      && !bandLevelsVisibility[currentRowLevel] && currentTableColumn.type === TABLE_STUB_TYPE;

    if (shouldFillLevel) {
      return { type: BAND_FILL_LEVEL_CELL, payload: null };
    }
    return { type: BAND_EMPTY_CELL, payload: null };
  }

  const previousTableColumn = tableColumns[currentColumnIndex - 1];
  let beforeBorder = false;
  if (currentColumnIndex > 0 && currentTableColumn.type === TABLE_DATA_TYPE
    && isNoDataColumn(previousTableColumn.type)) {
    beforeBorder = true;
  }

  if (currentColumnMeta.level === currentRowLevel) {
    if (currentTableColumn.type === TABLE_STUB_TYPE) {
      const cellRowSpan = visibleLevelsCount < levelsCount
        ? visibleLevelsCount || 1
        : maxLevel;

      return {
        type: BAND_FILL_LEVEL_CELL,
        payload: {
          rowSpan: cellRowSpan,
        },
      };
    }

    return {
      type: BAND_HEADER_CELL,
      payload: {
        tableRow: tableHeaderRows.find(row => row.type === TABLE_HEADING_TYPE),
        rowSpan: maxLevel - currentRowLevel,
        ...beforeBorder && { beforeBorder },
      },
    };
  }

  const currentColumnChain = findChainByColumnIndex(
    tableHeaderColumnChains[currentRowLevel],
    currentColumnIndex,
  );

  const columnVisibleBoundary = columnVisibleIntervals.find(([start, end]) => (
    start <= currentColumnIndex && currentColumnIndex <= end
  ))!;
  const bandStart = Math.max(columnVisibleBoundary[0], currentColumnChain.start);
  if (bandStart < currentColumnIndex) {
    return { type: null, payload: null };
  }

  const bandEnd = Math.min(
    columnVisibleBoundary[1] + 1,
    currentColumnChain.start + currentColumnChain.columns.length,
  );

  return {
    type: BAND_GROUP_CELL,
    payload: {
      colSpan: bandEnd - bandStart,
      value: currentColumnMeta.title!,
      column: currentColumnMeta,
      ...beforeBorder && { beforeBorder },
    },
  };
};
