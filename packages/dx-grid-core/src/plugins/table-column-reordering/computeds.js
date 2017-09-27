export const orderedColumns = (tableColumns, order) => {
  const result = Array.from(tableColumns);

  result.sort((a, b) => {
    const aPos = order.indexOf(a.column.name);
    const bPos = order.indexOf(b.column.name);
    return aPos - bPos;
  });

  return result;
};
