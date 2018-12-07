import { TABLE_DATA_TYPE } from '../table/constants';
import { FIXED_COLUMN_LEFT_SIDE, FIXED_COLUMN_RIGHT_SIDE, TABLE_FIXED_TYPE } from './constants';
import { splitHeaderColumnChains, generateSimpleChains } from '../table-header-row/helpers';

export const tableColumnsWithFixed = (
  tableColumns, leftColumns, rightColumns,
) => tableColumns
  .map((tableColumn) => {
    let fixed;
    if ((tableColumn.type === TABLE_DATA_TYPE
      && leftColumns.indexOf(tableColumn.column.name) !== -1)
      || leftColumns.indexOf(tableColumn.type) !== -1) {
      fixed = FIXED_COLUMN_LEFT_SIDE;
    }
    if ((tableColumn.type === TABLE_DATA_TYPE
      && rightColumns.indexOf(tableColumn.column.name) !== -1)
      || rightColumns.indexOf(tableColumn.type) !== -1) {
      fixed = FIXED_COLUMN_RIGHT_SIDE;
    }
    return fixed ? { ...tableColumn, fixed } : tableColumn;
  });

export const tableHeaderRowsWithFixed = tableHeaderRows => [
  ...tableHeaderRows,
  { key: TABLE_FIXED_TYPE.toString(), type: TABLE_FIXED_TYPE, height: 0 },
];

export const tableHeaderColumnChainsWithFixed = (
  tableHeaderColumnChains, tableHeaderRows, tableColumns,
) => {
  const chains = tableHeaderColumnChains
    || generateSimpleChains(tableHeaderRows, tableColumns);

  const shouldSplitChain = (currentGroup, column) => (
    !currentGroup || currentGroup.fixed !== column.fixed
  );
  const extendChainProps = column => ({
    fixed: column.fixed,
  });
  return splitHeaderColumnChains(
    chains,
    tableColumns,
    shouldSplitChain,
    extendChainProps,
  );
};
