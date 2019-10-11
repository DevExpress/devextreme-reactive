import { PureReducer } from '@devexpress/dx-core';
import { RowId, Row, RowIdsPayload, RowPayload, RowChangePayload,
  RowChanges, EditingCell, EditingCellsPayload,
} from '../../types';

export const startEditRows: PureReducer<RowId[], RowIdsPayload> = (
  prevEditingRowIds, { rowIds },
) => [...prevEditingRowIds, ...rowIds];

export const stopEditRows: PureReducer<RowId[], RowIdsPayload> = (
  prevEditingRowIds, { rowIds },
) => {
  const rowIdSet = new Set(rowIds);
  return prevEditingRowIds.filter(id => !rowIdSet.has(id));
};

export const startEditCells: PureReducer<EditingCell[], EditingCellsPayload> = (
  prevEditingCells, { editingCells },
) => [...prevEditingCells, ...editingCells];

export const stopEditCells: PureReducer<EditingCell[], EditingCellsPayload> = (
  prevEditingCells, { editingCells },
) => {
  return prevEditingCells.filter(({ rowId, columnName }) => (
    !editingCells.some(({ rowId: currentRowId, columnName: currentColumnName }) => (
      currentRowId === rowId && currentColumnName === columnName
    ))
  ));
};

export const addRow: PureReducer<Row[], RowPayload> = (
  addedRows, { row } = { row: {} },
) => [...addedRows, row];

export const changeAddedRow: PureReducer<Row[], RowChangePayload> = (
  addedRows, { rowId, change },
) => {
  const result = addedRows.slice();
  result[rowId] = { ...result[rowId], ...change };
  return result;
};

export const cancelAddedRows: PureReducer<Row[], RowIdsPayload> = (addedRows, { rowIds }) => {
  const result: Row[] = [];
  const indexSet = new Set(rowIds);
  addedRows.forEach((row, index) => {
    if (!indexSet.has(index)) {
      result.push(row);
    }
  });
  return result;
};

export const changeRow: PureReducer<RowChanges, RowChangePayload> = (
  prevRowChanges, { rowId, change },
) => {
  const prevChange = prevRowChanges[rowId] || {};
  return {
    ...prevRowChanges,
    [rowId]: {
      ...prevChange,
      ...change,
    },
  };
};

export const cancelChanges: PureReducer<RowChanges, RowIdsPayload> = (
  prevRowChanges, { rowIds },
) => {
  const result = { ...prevRowChanges };
  rowIds.forEach((rowId) => {
    delete result[rowId];
  });
  return result;
};

export const deleteRows: PureReducer<RowId[], RowIdsPayload> = (deletedRowIds, { rowIds }) => [
  ...deletedRowIds, ...rowIds,
];

export const cancelDeletedRows: PureReducer<RowId[], RowIdsPayload> = (
  deletedRowIds, { rowIds },
) => {
  const rowIdSet = new Set(rowIds);
  return deletedRowIds.filter(rowId => !rowIdSet.has(rowId));
};
