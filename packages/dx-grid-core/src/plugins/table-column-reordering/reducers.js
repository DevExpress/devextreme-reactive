export const changeColumnOrder = (order, { sourceColumnName, targetColumnName }) => {
  const sourceColumnIndex = order.indexOf(sourceColumnName);
  const targetColumnIndex = order.indexOf(targetColumnName);
  const newOrder = order.slice();

  newOrder.splice(sourceColumnIndex, 1);
  newOrder.splice(targetColumnIndex, 0, sourceColumnName);
  return newOrder;
};
