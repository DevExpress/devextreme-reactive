export const orderedColumns = (columns, order) => {
  const result = Array.from(columns);

  result.sort((a, b) => {
    const aPos = order.indexOf(a.name);
    const bPos = order.indexOf(b.name);
    return aPos - bPos;
  });

  return result;
};
