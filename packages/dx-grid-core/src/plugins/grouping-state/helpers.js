export const getFirstChangedGropingIndex = (prevGrouping, nextGrouping) => {
  if (prevGrouping.length <= nextGrouping.length) {
    return -1;
  }

  return prevGrouping
    .findIndex((group, index) =>
      !nextGrouping[index] || group.columnName !== nextGrouping[index].columnName);
};
