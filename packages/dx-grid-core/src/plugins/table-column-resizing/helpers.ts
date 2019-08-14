import { ColumnSizeFn, ValidValueFn } from '../../types';

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

    if (size + nextSize !== width + nextWidth) {
      const moreThanLimit = size + nextSize > width + nextWidth;
      const columnExpand = shift > 0;
      // NOTE: logical XOR in TypeScript
      if (moreThanLimit !== columnExpand) {
        nextSize = width + nextWidth - size;
      } else {
        size = width + nextWidth - nextSize;
      }
    }

    return [size, nextSize];
  }

  return [size];
};

export const isValidValue: ValidValueFn = (value, validUnits) => {
  const numb = parseInt(value, 10);
  const unit = numb ? value.substr(numb.toString().length) : value;
  return validUnits.findIndex(validUnit => validUnit === unit) >= 0;
};
