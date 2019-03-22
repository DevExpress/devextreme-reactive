import { PureReducer, slice } from '@devexpress/dx-core';
import { ColumnOrder, ChangeColumnOrderPayload } from '../../types';

export const changeColumnOrder: PureReducer<ColumnOrder, ChangeColumnOrderPayload> = (
  order, { sourceColumnName, targetColumnName },
) => {
  const sourceColumnIndex = order.indexOf(sourceColumnName);
  const targetColumnIndex = order.indexOf(targetColumnName);
  const newOrder = slice(order);

  newOrder.splice(sourceColumnIndex, 1);
  newOrder.splice(targetColumnIndex, 0, sourceColumnName);
  return newOrder;
};
