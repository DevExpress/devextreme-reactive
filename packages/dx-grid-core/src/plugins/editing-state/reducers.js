export const startEditRows = (prevEditingRows, { rowIds }) =>
  [...prevEditingRows, ...rowIds];

export const stopEditRows = (prevEditingRows, { rowIds }) => {
  const rowIdSet = new Set(rowIds);
  return prevEditingRows.filter(id => !rowIdSet.has(id));
};

export const addRow = (addedRows, { row }) => [...addedRows, row];

export const changeAddedRow = (addedRows, { rowId, change }) => {
  const result = Array.from(addedRows);
  result[rowId] = { ...result[rowId], ...change };
  return result;
};

export const cancelAddedRows = (addedRows, { rowIds }) => {
  const result = [];
  const indexSet = new Set(rowIds);
  addedRows.forEach((row, index) => {
    if (!indexSet.has(index)) {
      result.push(row);
    }
  });
  return result;
};

export const changeRow = (prevChangedRows, { rowId, change }) => {
  const prevChange = prevChangedRows[rowId] || {};
  return {
    ...prevChangedRows,
    [rowId]: {
      ...prevChange,
      ...change,
    },
  };
};

export const cancelChanges = (prevChangedRows, { rowIds }) => {
  const result = { ...prevChangedRows };
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
