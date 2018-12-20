import { TABLE_HEADING_TYPE } from './constants';
import { TABLE_DATA_TYPE } from '../table/constants';

export const isHeadingTableCell = (
  tableRow, tableColumn,
) => tableRow.type === TABLE_HEADING_TYPE && tableColumn.type === TABLE_DATA_TYPE;

export const isHeadingTableRow = tableRow => (tableRow.type === TABLE_HEADING_TYPE);

export const findChainByColumnIndex = (chains, columnIndex) => (
  chains.find(chain => (
    chain.start <= columnIndex && columnIndex < chain.start + chain.columns.length
  ))
);

export const splitHeaderColumnChains = (
  tableColumnChains, tableColumns, shouldSplitChain, extendChainProps,
) => (
  tableColumnChains.map((row, rowIndex) => row
    .reduce((acc, chain) => {
      let currentChain = null;
      chain.columns.forEach((col) => {
        const column = tableColumns.find(c => c.key === col.key);
        const isNewGroup = shouldSplitChain(currentChain, column, rowIndex);

        if (isNewGroup) {
          const start = currentChain
            ? (currentChain.start + currentChain.columns.length)
            : chain.start;

          acc.push({
            ...chain,
            ...extendChainProps(column),
            start,
            columns: [],
          });
          currentChain = acc[acc.length - 1];
        }

        currentChain.columns.push(column);
      });

      return acc;
    }, []))
);

export const generateSimpleChains = (rows, columns) => (
  rows.map(() => ([{
    start: 0,
    columns,
  }]))
);
