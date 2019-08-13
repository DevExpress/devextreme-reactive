import { ColumnSizeFn } from '../../types';

export const getColumnSize: ColumnSizeFn = (
  updatedColumn, {columnName, shift, minColumnWidth, maxColumnWidth, columnExtensions = [],
}) => {
  const extendedColumn = columnExtensions.find(elem => elem.columnName === columnName);
  const minWidth = extendedColumn && extendedColumn.minWidth! >= 0
    ? extendedColumn.minWidth
    : minColumnWidth;
  const maxWidth = extendedColumn && extendedColumn.maxWidth! >= 0
    ? extendedColumn.maxWidth
    : maxColumnWidth;
  const size = Math.max(
    minWidth!,
    Math.min(updatedColumn.width! + shift, maxWidth!),
  );
  return size;
};
