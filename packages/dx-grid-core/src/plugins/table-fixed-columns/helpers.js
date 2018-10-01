import { TABLE_DATA_TYPE } from '../table/constants';
import { TABLE_FIXED_TYPE } from './constants';

export const getFixedColumnKeys = (tableColumns, fixedNames) => tableColumns
  .filter(tableColumn => (
    (tableColumn.type === TABLE_DATA_TYPE && fixedNames.indexOf(tableColumn.column.name) !== -1)
    || fixedNames.indexOf(tableColumn.type) !== -1
  ))
  .map(({ key }) => key);

export const isFixedTableRow = tableRow => tableRow.type === TABLE_FIXED_TYPE;
