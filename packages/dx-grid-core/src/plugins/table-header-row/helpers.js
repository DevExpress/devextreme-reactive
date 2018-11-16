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
  tableColumnChains.map((chain, rowIndex) => chain
    .reduce((acc, group) => {
      let currentGroup = null;
      group.columns.forEach((col) => {
        const column = tableColumns.find(c => c.key === col.key);
        const isNewGroup = shouldSplitChain(currentGroup, column, rowIndex);

        if (isNewGroup) {
          const start = currentGroup
            ? (currentGroup.start + currentGroup.columns.length)
            : group.start;

          acc.push({
            ...group,
            ...extendChainProps(column),
            start,
            columns: [],
          });
          currentGroup = acc[acc.length - 1];
        }

        currentGroup.columns.push(column);
      });

      return acc;
    }, []))
);
