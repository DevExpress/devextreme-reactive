import { TABLE_DATA_TYPE } from '../table/constants';
import { IsSpecificCellFn, TableRow, TableColumn } from '../../types';

export const isTreeTableCell: IsSpecificCellFn<TableRow, TableColumn, string> = (
  tableRow, tableColumn, forColumnName,
) => tableRow.type === TABLE_DATA_TYPE && tableColumn.type === TABLE_DATA_TYPE
  && tableColumn.column!.name === forColumnName;
