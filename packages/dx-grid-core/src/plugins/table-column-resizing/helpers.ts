import { ColumnSizeFn } from '../../types';

export const getColumnSize: ColumnSizeFn = (
  columnWidths, {
    columnName, nextColumnName, nextColumnResizing, cachedWidths,
    shift, minColumnWidth, maxColumnWidth, columnExtensions = [],
}) => {
  const column  = columnWidths.find(elem => elem.columnName === columnName)!;
  const extension = columnExtensions.find(elem => elem.columnName === columnName);
  const width = typeof column.width === 'number'
    ? column.width
    : cachedWidths[columnName];
  const minWidth = extension && extension.minWidth! >= 0
    ? extension.minWidth
    : minColumnWidth;
  const maxWidth = extension && extension.maxWidth! >= 0
    ? extension.maxWidth
    : maxColumnWidth;
  let size = Math.max(
    minWidth!,
    Math.min(width + shift, maxWidth!),
  );

  let nextColumn;
  let nextExtension;
  let nextWidth;
  let nextMinWidth;
  let nextMaxWidth;
  let nextSize;

  if (nextColumnResizing) {
    nextColumn  = columnWidths.find(elem => elem.columnName === nextColumnName)!;
    nextExtension = columnExtensions.find(elem => elem.columnName === nextColumnName);
    nextWidth = typeof nextColumn.width === 'number'
      ? nextColumn.width
      : cachedWidths[nextColumnName];
    nextMinWidth = nextExtension && nextExtension.minWidth! >= 0
      ? nextExtension.minWidth
      : minColumnWidth;
    nextMaxWidth = nextExtension && nextExtension.maxWidth! >= 0
      ? nextExtension.maxWidth
      : maxColumnWidth;
    nextSize = Math.max(
      nextMinWidth!,
      Math.min(nextWidth - shift, nextMaxWidth!),
    );

    if (size + nextSize > width + nextWidth) {
      size = size === minWidth!
        ? size
        : width + nextWidth - nextSize;
      nextSize = nextSize === nextMinWidth!
        ? nextSize
        : width + nextWidth - size;
    }

    return [size, nextSize];
  }

  return [size];
};
