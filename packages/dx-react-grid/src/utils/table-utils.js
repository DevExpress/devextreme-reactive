import { querySelectorAll } from './dom';

export const getKeyGetter = getIntrinsicKey => (object, index) => {
  const intrinsicKey = getIntrinsicKey(object);
  const type = object.type || 'data';
  const key = intrinsicKey === undefined ? `$${index}` : intrinsicKey;
  return `${type}_${key}`;
};

export const getCellInfo = ({ row, columnIndex, columns }) => {
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
