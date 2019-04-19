export const objectsAreEqual = (prev: any, next: any) => {
  for (const key in prev) {
    if (!(key in next) || prev[key] !== next[key]) {
      return false;
    }
  }
  for (const key in next) {
    if (!(key in prev) || prev[key] !== next[key]) {
      return false;
    }
  }
  return true;
};

export const datesAreEqual = (prevDate: any, nextDate: any) => {
  if (!!prevDate && !!nextDate && prevDate.getTime() === nextDate.getTime()) {
    return true;
  }
  return false;
};
