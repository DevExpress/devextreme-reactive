import { TABLE_DATA_TYPE } from '../table/constants';
import { TableColumn } from '../../types';

export const tableDataColumnsExist = (tableColumns: TableColumn[]) => tableColumns.some(
  column => column.type === TABLE_DATA_TYPE,
);
