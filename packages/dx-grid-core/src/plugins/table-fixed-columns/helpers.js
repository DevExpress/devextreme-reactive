import { TABLE_FIXED_TYPE } from './constants';

export const getFixedColumnKeys = (tableColumns, fixedNames, fixedTypes) => tableColumns
  .filter(tableColumn => (
    (tableColumn.column && fixedNames.indexOf(tableColumn.column.name) !== -1)
    || fixedTypes.indexOf(tableColumn.type) !== -1
  ))
  .map(({ key }) => key);

export const isFixedTableRow = tableRow => tableRow.type === TABLE_FIXED_TYPE;
