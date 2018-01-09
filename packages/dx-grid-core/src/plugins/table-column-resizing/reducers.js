const MIN_SIZE = 40;

export const changeTableColumnWidth = (state, { columnName, shift }) => {
  const { columnWidths } = state;
  const nextColumnWidth = columnWidths.slice();
  const index = nextColumnWidth.findIndex(elem => elem.columnName === columnName);
  const updatedColumn = nextColumnWidth[index];
  const size = Math.max(MIN_SIZE, updatedColumn.width + shift);
  nextColumnWidth.splice(index, 1, { columnName, width: size });

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
