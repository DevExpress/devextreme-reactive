import { PureComputed, slice } from '@devexpress/dx-core';
import mergeSort from '../../utils/merge-sort';
import { TABLE_DATA_TYPE } from '../table/constants';
import { TABLE_REORDERING_TYPE } from './constants';
import { OrderedColumnsComputed, DraftOrderComputed, TableRow } from '../../types';

export const orderedColumns: OrderedColumnsComputed = (
  tableColumns = [], order,
) => mergeSort(tableColumns, (a, b) => {
  if (a.type !== TABLE_DATA_TYPE || b.type !== TABLE_DATA_TYPE) return 0;

  const aPos = order.indexOf(a.column.name);
  const bPos = order.indexOf(b.column.name);
  return aPos - bPos;
});

export const tableHeaderRowsWithReordering: PureComputed<[TableRow[]]> = tableHeaderRows => [
  ...tableHeaderRows,
  {
    key: TABLE_REORDERING_TYPE.toString(),
    type: TABLE_REORDERING_TYPE,
    height: 0,
  },
];

export const draftOrder: DraftOrderComputed = (order, sourceColumnIndex, targetColumnIndex) => {
  if (sourceColumnIndex === -1
    || targetColumnIndex === -1
    || sourceColumnIndex === targetColumnIndex) {
    return order;
  }

  const result = slice(order);
  const sourceColumn = order[sourceColumnIndex];
  result.splice(sourceColumnIndex, 1);
  result.splice(targetColumnIndex, 0, sourceColumn);

  return result;
};
