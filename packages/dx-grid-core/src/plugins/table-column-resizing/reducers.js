const MIN_SIZE = 40;

export const changeTableColumnWidths = (state, { shifts }) => {
  const { columnWidths } = state;
  const nextColumnWidth = columnWidths.slice();
  const index = nextColumnWidth.findIndex(elem => !!shifts[elem.columnName]);
  const updatedColumn = nextColumnWidth[index];
  const size = Math.max(MIN_SIZE, updatedColumn.width + shifts[updatedColumn.columnName]);
  nextColumnWidth.splice(index, 1, { columnName: updatedColumn.columnName, width: size });

  return {
    ...state,
    columnWidths: nextColumnWidth,
    draftColumnWidths: [],
  };
};

export const changeDraftTableColumnWidths = (state, { shifts }) => {
  const { columnWidths } = state;
  const updatedColumn = columnWidths.find(elem => !!shifts[elem.columnName]);
  if (!updatedColumn) {
    return { ...state, draftColumnWidths: [] };
  }
  const size = Math.max(MIN_SIZE, updatedColumn.width + shifts[updatedColumn.columnName]);

  return {
    ...state,
    draftColumnWidths: [{ columnName: updatedColumn.columnName, width: size }],
  };
};
