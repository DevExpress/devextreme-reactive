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
  const nextItemIndex = array.findIndex(item => compare(newItem, item) <= 0);
  const targetIndex = nextItemIndex < 0 ? array.length : nextItemIndex;
  const alreadyExists = (targetIndex >= 0 && targetIndex < array.length)
    && compare(newItem, array[targetIndex]) === 0;
  result.splice(targetIndex, alreadyExists ? 1 : 0, newItem);
  return result;
};
