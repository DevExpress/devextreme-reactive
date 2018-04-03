const UNSET_COLUMN_WIDTH_ERROR = [
  'The "$1" column\'s width is not specified.',
  'The TableColumnResizing plugin requires that all columns have the specified width.',
].join('\n');

const specifyWidths = (tableColumns, widths, onAbsence) => {
  if (!widths.length) return tableColumns;
  return tableColumns
    .reduce((acc, tableColumn) => {
      if (tableColumn.type === 'data') {
        const columnName = tableColumn.column.name;
        const column = widths.find(el => el.columnName === columnName);
        const width = column && column.width;
        if (width === undefined) {
          onAbsence(columnName);
          acc.push(tableColumn);
        } else {
          acc.push({ ...tableColumn, width });
        }
      } else {
        acc.push(tableColumn);
      }
      return acc;
    }, []);
};

export const tableColumnsWithWidths = (tableColumns, columnWidths) =>
  specifyWidths(tableColumns, columnWidths, (columnName) => {
    throw new Error(UNSET_COLUMN_WIDTH_ERROR.replace('$1', columnName));
  });

export const tableColumnsWithDraftWidths = (tableColumns, draftColumnWidths) =>
  specifyWidths(tableColumns, draftColumnWidths, () => {});
