export const startEditRows = (prevEditingRows, { rowIds }) =>
  [...prevEditingRows, ...rowIds];

export const stopEditRows = (prevEditingRows, { rowIds }) => {
  const rowIdSet = new Set(rowIds);
  return prevEditingRows.filter(id => !rowIdSet.has(id));
};

export const addNewRow = (newRows, { row }) => [row, ...newRows];

export const changeNewRow = (newRows, { rowId, change }) => {
  const result = newRows.slice();
  result[rowId] = Object.assign({}, result[rowId], change);
  return result;
};

export const cancelNewRows = (newRows, { rowIds }) => {
  const result = [];
  const indexSet = new Set(rowIds);
  newRows.forEach((row, index) => {
    if (!indexSet.has(index)) {
      result.push(row);
    }
  });
  return result;
};

export const changeRow = (prevChangedRows, { rowId, change }) => {
  const prevChange = prevChangedRows[rowId] || {};
  const result = Object.assign({}, prevChangedRows);
  result[rowId] = Object.assign(prevChange, change);
  return result;
};

export const cancelChanges = (prevChangedRows, { rowIds }) => {
  const result = Object.assign({}, prevChangedRows);
  rowIds.forEach((rowId) => {
    delete result[rowId];
  });
  return result;
};

export const deleteRows = (deletedRows, { rowIds }) => [...deletedRows, ...rowIds];

export const cancelDeletedRows = (deletedRows, { rowIds }) => {
  const rowIdSet = new Set(rowIds);
  return deletedRows.filter(rowId => !rowIdSet.has(rowId));
};
