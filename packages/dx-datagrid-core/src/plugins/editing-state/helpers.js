export const getRowChange = (changedRows, rowId) => changedRows[rowId];

export const newRowsAsChangeSet = newRows => newRows
  .map(row => ({ type: 'create', row }));

export const changedRowsAsChangeSet = changedRows => Object.keys(changedRows)
  .map(rowId => ({ type: 'update', rowId, change: changedRows[rowId] }));

export const deletedRowsAsChangeSet = deletedRows => deletedRows
  .map(rowId => ({ type: 'delete', rowId }));
