import { TABLE_DATA_TYPE } from '../table/constants';

export const isEmptyMessageShow = tableColumns =>
  !tableColumns.some(column => column.type === TABLE_DATA_TYPE);
