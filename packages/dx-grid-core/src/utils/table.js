import { querySelectorAll } from './dom-utils';

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
  if (row.colspan !== undefined && columnIndex > row.colspan) return { skip: true };
  if (row.colspan === columnIndex) return { colspan: columns.length - row.colspan };
  return {};
};

export const findTableCellTarget = (e) => {
  const { target, currentTarget } = e;

  const rowsEls = querySelectorAll(currentTarget, ':scope > tr, :scope > tr');
  const rowIndex = [...rowsEls].findIndex(rowEl => rowEl.contains(target));
  if (rowIndex === -1) return { rowIndex: -1, columnIndex: -1 };
  const cellEls = querySelectorAll(rowsEls[rowIndex], ':scope > th, :scope > td');
  const columnIndex = [...cellEls].findIndex(cellEl => cellEl.contains(target));
  if (columnIndex === -1) return { rowIndex: -1, columnIndex: -1 };

  return { rowIndex, columnIndex };
};
