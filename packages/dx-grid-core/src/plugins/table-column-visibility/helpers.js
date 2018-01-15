import { TABLE_DATA_TYPE } from '../table/constants';

export const tableDataColumnsExist = tableColumns =>
  tableColumns.some(column => column.type === TABLE_DATA_TYPE);
