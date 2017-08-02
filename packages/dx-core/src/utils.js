const compare = (a, b) => {
  const aPosition = a.position();
  const bPosition = b.position();
  for (let i = 0; i < Math.min(aPosition.length, bPosition.length); i += 1) {
    if (aPosition[i] < bPosition[i]) return -1;
    if (aPosition[i] > bPosition[i]) return 1;
  }
  return aPosition.length - bPosition.length;
};

export const insertPlugin = (array, newItem) => {
  const result = array.slice();
  const targetIndex = array.findIndex(item => compare(newItem, item) < 0);
  result.splice(targetIndex < 0 ? array.length : targetIndex, 0, newItem);
  return result;
};
