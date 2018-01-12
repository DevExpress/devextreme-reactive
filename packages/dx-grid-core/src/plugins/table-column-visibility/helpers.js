import { TABLE_DATA_TYPE } from '../table/constants';

export const isEmptyMessageShown = tableColumns =>
  !tableColumns.some(column => column.type === TABLE_DATA_TYPE);
