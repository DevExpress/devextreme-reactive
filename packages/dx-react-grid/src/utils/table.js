import { querySelectorAll } from './dom';

const getTableKeyGetter = (getIntrinsicKey, object, index) => {
  const type = object.type || 'data';
  const intrinsicKey = type === 'data' ? getIntrinsicKey(object) : object.id;
  const key = intrinsicKey === undefined ? `$${index}` : intrinsicKey;
  return `${type}_${key}`;
};

export const tableRowKeyGetter = getTableKeyGetter;

const getColumnId = column => column.name;
export const tableColumnKeyGetter = (column, columnIndex) =>
  getTableKeyGetter(getColumnId, column, columnIndex);

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
