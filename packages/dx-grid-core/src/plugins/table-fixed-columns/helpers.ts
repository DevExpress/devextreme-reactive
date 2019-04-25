import { slice } from '@devexpress/dx-core';
import { TABLE_DATA_TYPE } from '../table/constants';
import {
  FIXED_COLUMN_LEFT_SIDE, TABLE_FIXED_TYPE,
} from './constants';
import { findChainByColumnIndex } from '../table-header-row/helpers';
import {
  GetFixedColumnKeysFn, IsSpecificRowFn, CalculatePositionFn, CalculateFixedColumnPropsFn,
} from '../../types';

export const getFixedColumnKeys: GetFixedColumnKeysFn = (tableColumns, fixedNames) => tableColumns
  .filter(tableColumn => (
    (tableColumn.type === TABLE_DATA_TYPE && fixedNames.indexOf(tableColumn.column!.name) !== -1)
    || fixedNames.indexOf(tableColumn.type) !== -1
  ))
  .map(({ key }) => key);

export const isFixedTableRow: IsSpecificRowFn = tableRow => tableRow.type === TABLE_FIXED_TYPE;

const calculatePosition: CalculatePositionFn = (array, index, tableColumnDimensions) => (
  index === 0
    ? 0
    : array
      .slice(0, index)
      .reduce((acc, target) => acc + tableColumnDimensions[target] || 0, 0)
);

export const calculateFixedColumnProps: CalculateFixedColumnPropsFn = (
  { tableColumn },
  { leftColumns, rightColumns },
  tableColumns,
  tableColumnDimensions,
  tableHeaderColumnChains,
) => {
  const side = tableColumn.fixed!;
  const targetArray = side === FIXED_COLUMN_LEFT_SIDE
    ? getFixedColumnKeys(tableColumns, leftColumns)
    : slice(getFixedColumnKeys(tableColumns, rightColumns)).reverse();

  const index = tableColumns.findIndex(({ key }) => key === tableColumn.key);
  const fixedIndex = targetArray.indexOf(tableColumn.key);
  const columnChain = findChainByColumnIndex(tableHeaderColumnChains[0], index)!;

  const showLeftDivider = columnChain.start === index && index !== 0;
  const showRightDivider = columnChain.start + columnChain.columns.length - 1 === index
    && index < tableColumns.length - 1;

  const position = calculatePosition(targetArray, fixedIndex, tableColumnDimensions);

  return {
    showRightDivider,
    showLeftDivider,
    position,
    side,
  };
};
