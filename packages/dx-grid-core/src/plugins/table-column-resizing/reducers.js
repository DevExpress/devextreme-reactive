const MIN_SIZE = 40;

export const changeTableColumnWidths = (state, { shifts }) => {
  const { columnWidths } = state;
  const updatedColumnWidths = Object.keys(shifts)
    .reduce((acc, columnName) => {
      const size = Math.max(MIN_SIZE, columnWidths[columnName] + shifts[columnName]);
      return Object.assign(acc, { [columnName]: size });
    }, {});
  return {
    ...state,
    columnWidths: { ...columnWidths, ...updatedColumnWidths },
    draftColumnWidths: {},
  };
};

export const changeDraftTableColumnWidths = (state, { shifts }) => {
  const { columnWidths, draftColumnWidths } = state;
  const updatedDraftColumnWidths = Object.keys(shifts)
    .reduce((acc, columnName) => {
      if (shifts[columnName] === null) {
        delete acc[columnName];
        return acc;
      }
      const size = Math.max(MIN_SIZE, columnWidths[columnName] + shifts[columnName]);
      return Object.assign(acc, { [columnName]: size });
    }, Object.assign({}, draftColumnWidths));
  return {
    ...state,
    draftColumnWidths: updatedDraftColumnWidths,
  };
};
