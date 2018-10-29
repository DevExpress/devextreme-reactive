import { TABLE_DATA_TYPE } from '../table/constants';
import {
  FIXED_COLUMN_LEFT_SIDE, FIXED_COLUMN_RIGHT_SIDE, TABLE_FIXED_TYPE,
} from './constants';

export const getFixedColumnKeys = (tableColumns, fixedNames) => tableColumns
  .filter(tableColumn => (
    (tableColumn.type === TABLE_DATA_TYPE && fixedNames.indexOf(tableColumn.column.name) !== -1)
    || fixedNames.indexOf(tableColumn.type) !== -1
  ))
  .map(({ key }) => key);

export const isFixedTableRow = tableRow => tableRow.type === TABLE_FIXED_TYPE;

const calculatePosition = (array, index, tableColumnDimensions) => (
  index === 0
    ? 0
    : array
      .slice(0, index)
      .reduce((acc, target) => acc + tableColumnDimensions[target] || 0, 0)
);

export const calculateFixedColumnProps = (
  { tableColumn },
  { leftColumns, rightColumns },
  tableColumns,
  tableColumnDimensions,
) => {
  const { fixed: side } = tableColumn;
  const targetArray = side === FIXED_COLUMN_LEFT_SIDE
    ? getFixedColumnKeys(tableColumns, leftColumns)
    : getFixedColumnKeys(tableColumns, rightColumns).reverse();

  const fixedIndex = targetArray.indexOf(tableColumn.key);
  const index = tableColumns.findIndex(({ key }) => key === tableColumn.key);

  const isBoundary = fixedSide => (
    fixedIndex === targetArray.length - 1 && fixedSide === side
  );
  const isStandAlone = (shift) => {
    const neighborTableColumn = tableColumns[index + shift];
    return neighborTableColumn && targetArray.indexOf(neighborTableColumn.key) === -1;
  };

  const showRightDivider = isBoundary(FIXED_COLUMN_LEFT_SIDE)
    || (index !== tableColumns.length - 1 && isStandAlone(1));
  const showLeftDivider = isBoundary(FIXED_COLUMN_RIGHT_SIDE)
    || (index !== 0 && isStandAlone(-1));

  const position = calculatePosition(targetArray, fixedIndex, tableColumnDimensions);

  return {
    showRightDivider,
    showLeftDivider,
    position,
    side,
  };
};
