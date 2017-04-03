export const getAvaliableToSelect = rows =>
  rows.filter(row => !row.type).map(row => row.id);

export const getAvaliableSelection = (selection, avaliableToSelect) => {
  const avaliableToSelectSet = new Set(avaliableToSelect);
  return selection.filter(selected => avaliableToSelectSet.has(selected));
};
