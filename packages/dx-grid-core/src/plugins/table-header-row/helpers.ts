import { TABLE_HEADING_TYPE } from './constants';
import { TABLE_DATA_TYPE } from '../table/constants';
import {
  IsSpecificCellFn, IsSpecificRowFn, HeaderColumnChain,
  SplitHeaderColumnChainsFn, FindChainByColumnIndexFn,
  GenerateChainsFn,
  LastColumnNameFn,
  NextColumnNameFn,
  GetNextColumnNameFn,
} from '../../types';

export const isHeadingTableCell: IsSpecificCellFn = (
  tableRow, tableColumn,
) => tableRow.type === TABLE_HEADING_TYPE && tableColumn.type === TABLE_DATA_TYPE;

export const isHeadingTableRow: IsSpecificRowFn = tableRow => (
  tableRow.type === TABLE_HEADING_TYPE
);

export const findChainByColumnIndex: FindChainByColumnIndexFn = (chains, columnIndex) => (
  chains.find(chain => (
    chain.start <= columnIndex && columnIndex < chain.start + chain.columns.length
  ))!
);

export const splitHeaderColumnChains: SplitHeaderColumnChainsFn = (
  tableColumnChains, tableColumns, shouldSplitChain, extendChainProps,
) => (
  tableColumnChains.map((row, rowIndex) => row
    .reduce((acc, chain) => {
      let currentChain: any = null;
      chain.columns.forEach((col) => {
        const column = tableColumns.find(c => c.key === col.key);
        const isNewGroup = shouldSplitChain(currentChain, column!, rowIndex);

        if (isNewGroup) {
          const start = currentChain
            ? (currentChain.start + currentChain.columns.length)
            : chain.start;

          acc.push({
            ...chain,
            ...extendChainProps(column!),
            start,
            columns: [],
          });
          currentChain = acc[acc.length - 1];
        }

        currentChain.columns.push(column);
      });

      return acc;
    }, [] as HeaderColumnChain[]))
);

export const generateSimpleChains: GenerateChainsFn = (rows, columns) => (
  rows.map(() => ([{
    columns,
    start: 0,
  }]))
);

export const getLastColumnName: LastColumnNameFn = (tableColumns) => {
  const index = tableColumns.length - 1;
  return index >= 0 && tableColumns[index].type === TABLE_DATA_TYPE
    ? tableColumns[index].column!.name
    : undefined;
};

const nextColumnName: NextColumnNameFn = (tableColumns , index) => {
  const haveNextColumn = index >= 0 && index < tableColumns.length - 1;
  return haveNextColumn && tableColumns[index + 1].type === TABLE_DATA_TYPE
    ? tableColumns[index + 1].column!.name
    : undefined;
};

export const getNextColumnName: GetNextColumnNameFn = (tableColumns, columnName) => {
  const index = tableColumns.findIndex(elem =>
      elem.type === TABLE_DATA_TYPE && elem.column!.name === columnName,
    );
  return nextColumnName(tableColumns, index);
};
