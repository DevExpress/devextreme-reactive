const creatMultipleHandler = () => {
  const handlers = [];
  const multipleHandler = (e) => {
    handlers.forEach(handler => handler(e));
  };

  multipleHandler.addHandler = handler => handlers.unshift(handler);
  return multipleHandler;
};

const extendWithEventListener = (extraProps, name, handler) => {
  const extendedExtraProps = Object.assign({}, extraProps);
  if (!extendedExtraProps[name]) {
    extendedExtraProps[name] = creatMultipleHandler();
  }

  extendedExtraProps[name].addHandler(handler);
  return extendedExtraProps;
};

export const tableColumnsWidthSelect = columns =>
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
