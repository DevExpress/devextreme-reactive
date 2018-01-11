const UNSET_COLUMN_WIDTH_ERROR = [
  'The "$1" column\'s width is not specified.',
  'The TableColumnResizing plugin requires that all columns have the specified width.',
].join('\n');

export const tableColumnsWithWidths = (tableColumns, columnWidths, draftColumnWidths) =>
  tableColumns
    .reduce((acc, tableColumn) => {
      if (tableColumn.type === 'data') {
        const columnName = tableColumn.column.name;
        const isCurrentColumn = elem => elem.columnName === columnName;
        const column = draftColumnWidths.find(isCurrentColumn)
          || columnWidths.find(isCurrentColumn);
        const width = column && column.width;
        if (width === undefined) {
          throw new Error(UNSET_COLUMN_WIDTH_ERROR.replace('$1', columnName));
        }
        acc.push({ ...tableColumn, width });
      } else {
        acc.push(tableColumn);
      }
      return acc;
    }, []);
