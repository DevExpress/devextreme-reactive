import extendWithEventListener from '../../utils/extend-with-event-listener';

export const tableColumnsWithSelection = columns =>
  [{ type: 'select', name: 'select', width: 30 }, ...columns];

export const tableBodyRowsWithSelection = (bodyRows, selection, getRowId) => {
  const selectionSet = new Set(selection);
  return bodyRows
    .map((row) => {
      if (!selectionSet.has(getRowId(row))) return row;
      return Object.assign({ selected: true, _originalRow: row }, row);
    });
};

export const tableExtraProps = (
    extraProps,
    availableToSelect,
    setRowSelection,
    getRowId,
  ) => extendWithEventListener(extraProps, 'onClick', ({ row }) => {
    const rowId = getRowId(row);
    if (availableToSelect.indexOf(rowId) === -1) return;
    setRowSelection({ rowId });
  });
