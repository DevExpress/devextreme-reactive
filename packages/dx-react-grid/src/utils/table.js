import { querySelectorAll } from './dom';

export const getTableKeyGetter = getIntrinsicKey => (object, index) => {
  const intrinsicKey = getIntrinsicKey(object);
  const type = object.type || 'data';
  const key = intrinsicKey === undefined ? `$${index}` : intrinsicKey;
  return `${type}_${key}`;
};

export const tableColumnKeyGetter = getTableKeyGetter(column => column.name);

export const getTableCellInfo = ({ row, columnIndex, columns }) => {
  if (row.colspan !== undefined && columnIndex > row.colspan) { return { skip: true }; }
  const colspan = row.colspan === columnIndex ? columns.length - row.colspan : 1;
  return { colspan };
};

export const tableCellClickHandler = ({ headerRows, bodyRows, columns, onClick }) => (e) => {
  const { target, currentTarget } = e;

  const rowsEls = querySelectorAll(currentTarget, ':scope > thead > tr, :scope > tbody > tr');
  const rowIndex = [...rowsEls].findIndex(rowEl => rowEl.contains(target));
  if (rowIndex === -1) return;
  const cellEls = querySelectorAll(rowsEls[rowIndex], ':scope > th, :scope > td');
  const columnIndex = [...cellEls].findIndex(cellEl => cellEl.contains(target));
  if (columnIndex === -1) return;

  const row = [...headerRows, ...bodyRows][rowIndex];
  const column = columns[columnIndex];
  onClick({ row, column, e });
};

export const getTableColumnGeometries = (columns, tableWidth) => {
  const columnWidths = columns
    .map(column => column.width);

  const freeSpace = tableWidth;
  const restrictedSpace = columnWidths
    .reduce((accum, width) => accum + (width || 0), 0);
  const freeSpacePortions = columnWidths
    .reduce((accum, width) => accum + (width === undefined ? 1 : 0), 0);
  const freeSpacePortion = (freeSpace - restrictedSpace) / freeSpacePortions;

  let lastRightPosition = 0;
  return columnWidths
    .map(width => (width === undefined ? freeSpacePortion : width))
    .map((width) => {
      lastRightPosition += width;
      return {
        left: lastRightPosition - width,
        right: lastRightPosition,
      };
    });
};
