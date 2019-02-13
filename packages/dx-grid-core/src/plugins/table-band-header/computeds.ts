import { PureComputed } from '@devexpress/dx-core';
import { TABLE_BAND_TYPE } from './constants';
import { TABLE_DATA_TYPE } from '../table/constants';
import { getColumnMeta } from './helpers';
import { splitHeaderColumnChains, generateSimpleChains } from '../table-header-row/helpers';
import {
  ColumnBands, GetHeaderColumnChainsFn, ShouldSplitChainFn,
  GetMaxNestedLevelFn, TableRow, TableColumn,
} from '../../types';

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
        acc.level = level;
        return acc;
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
      || (chain as any).bandTitle !== currentBand.title;
  };
  const extendChainProps = () => ({
    bandTitle: (currentBand || {}).title,
  });

  const bandChains = splitHeaderColumnChains(
    rawBandChains,
    tableColumns,
    shouldSplitChain,
    extendChainProps,
  );

  return [...bandChains, ...chains.slice(maxBandRowIndex)];
};
