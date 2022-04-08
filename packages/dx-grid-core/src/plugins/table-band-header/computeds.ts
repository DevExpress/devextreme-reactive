import { PureComputed } from '@devexpress/dx-core';
import { TABLE_BAND_TYPE } from './constants';
import { TABLE_DATA_TYPE } from '../table/constants';
import { TABLE_GROUP_TYPE } from '../table-group-row/constants';
import { getColumnMeta } from './helpers';
import { splitHeaderColumnChains, generateSimpleChains } from '../table-header-row/helpers';
import {
  ColumnBands, GetHeaderColumnChainsFn, ShouldSplitChainFn,
  GetMaxNestedLevelFn, TableRow, TableColumn, HeaderColumnChainRows,
  BandLevels, BandColumnChainExtension, HeaderColumnChain, VisibleBoundary, GridViewport,
} from '../../types';
import { intervalUtil } from '../virtual-table-state/utils';

export const tableRowsWithBands: PureComputed<
  [TableRow[], ColumnBands[], TableColumn[]]
> = (
  tableHeaderRows, columnBands, tableColumns,
) => {
  const tableDataColumns = tableColumns.filter(column => column.type === TABLE_DATA_TYPE);
  const getMaxNestedLevel: GetMaxNestedLevelFn = (bands, level = 0, result = null) => (
    bands.reduce((acc, column) => {
      if (column.children !== undefined) {
        return getMaxNestedLevel(column.children, level + 1, acc);
      }
      const isDataColumn = tableDataColumns.findIndex(
        dataColumn => !!dataColumn.column && dataColumn.column.name === column.columnName,
      ) > -1;
      if (level > acc.level && isDataColumn) {
        return { ...acc, level };
      }
      return acc;
    }, result || { level: 0 })
  );

  const tableBandHeaders = Array.from({
    length: getMaxNestedLevel(columnBands as ColumnBands[], 0).level,
  })
    .map((row, index) => ({
      key: `${TABLE_BAND_TYPE.toString()}_${index}`,
      type: TABLE_BAND_TYPE,
      level: index,
    }));
  return [...tableBandHeaders, ...tableHeaderRows];
};

export const tableHeaderColumnChainsWithBands: GetHeaderColumnChainsFn<
  TableRow[], TableColumn[], ColumnBands[]
> = (
  tableHeaderRows, tableColumns, bands,
) => {
  const chains = generateSimpleChains(tableHeaderRows, tableColumns);
  const maxBandRowIndex = tableHeaderRows
    .filter(row => row.type === TABLE_BAND_TYPE)
    .length;
  const rawBandChains = chains.slice(0, maxBandRowIndex);

  let currentBand: any = null;
  const shouldSplitChain: ShouldSplitChainFn = (chain, column, rowIndex) => {
    if (rowIndex > maxBandRowIndex) return false;

    const columnName = column.column && column.column.name || '';
    currentBand = getColumnMeta(columnName, bands, rowIndex);
    return !chain
      || chain.key !== currentBand.key
      || chain.columns[0].type === TABLE_GROUP_TYPE;
  };
  const extendChainProps = () => ({
    bandTitle: currentBand?.title,
    key: currentBand?.key,
  });

  const bandChains = splitHeaderColumnChains(
    rawBandChains,
    tableColumns,
    shouldSplitChain,
    extendChainProps,
  );

  return [...bandChains, ...chains.slice(maxBandRowIndex)];
};

const getBandLevel: PureComputed<[ColumnBands[], string, number?], number> = (
  bands, bandTitle, level = 0,
) => {
  for (const band of bands) {
    if (band.title === bandTitle) {
      return level;
    }
    if (band.children !== undefined) {
      const result = getBandLevel(band.children, bandTitle, level + 1);
      if (result >= 0) return result;
    }
  }
  return -1;
};

const getBandLevels = (columnsBands: readonly ColumnBands[], levels = {}, level = 0) => {
  columnsBands.forEach((band) => {
    if (band.title) {
      levels[band.title] = level;
    }
    if (band.children) {
      getBandLevels(band.children, levels, level + 1);
    }
  });
  return levels;
};

export const columnBandLevels: PureComputed<[ColumnBands[]], BandLevels> = columnsBands => (
  getBandLevels(columnsBands)
);

export const bandLevelsVisibility: PureComputed<
  [VisibleBoundary[], HeaderColumnChainRows<BandColumnChainExtension>, BandLevels],
  boolean[]
> = (columnIntervals, tableHeaderColumnChains, bandLevels) => {
  const rowsWithBands = tableHeaderColumnChains
    .filter(r => r.filter(ch => !!ch.bandTitle).length);

  const visibleIntervals = columnIntervals.map(([start, end]) => ({ start, end }));

  const isBandChainVisible = (chain: HeaderColumnChain) => (
    visibleIntervals.some(interval => (
      intervalUtil.intersect(
        interval,
        { start: chain.start, end: chain.start + chain.columns.length - 1 },
      ) !== intervalUtil.empty
    ),
  ));

  const getVisibleBandsByLevel = (level: number) => (
    // Note: a visible band level always matches with it's row
    rowsWithBands[level]
    ? rowsWithBands[level].filter(chain => (
        bandLevels[chain.bandTitle] === level && isBandChainVisible(chain)
      ))
    : []
  );

  return rowsWithBands.reduce((acc, _, index) => {
    const rowBands = getVisibleBandsByLevel(index);
    return [...acc, !!rowBands.length];
  }, [] as boolean[]);
};

export const columnVisibleIntervals: PureComputed<
  [GridViewport, TableColumn[]],
  VisibleBoundary[]
> = (
  viewport, tableColumns,
) => (
  viewport ? viewport.columns : [[0, tableColumns.length]]
);
