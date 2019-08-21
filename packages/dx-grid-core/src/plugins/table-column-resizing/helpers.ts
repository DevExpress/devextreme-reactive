import { ColumnSizeFn, ValidValueFn, NumbStringToNumbFn } from '../../types';

export const getColumnSizes: ColumnSizeFn = (
  columnWidths, {
    columnName, nextColumnName, columnResizingMode, cachedWidths,
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

  if (columnResizingMode === 'nextColumn') {
    const nextColumn  = columnWidths.find(elem => elem.columnName === nextColumnName)!;
    const nextExtension = columnExtensions.find(elem => elem.columnName === nextColumnName);
    const nextWidth = typeof nextColumn.width === 'number'
      ? nextColumn.width
      : cachedWidths[nextColumnName];
    const nextMinWidth = nextExtension && nextExtension.minWidth! >= 0
      ? nextExtension.minWidth
      : minColumnWidth;
    const nextMaxWidth = nextExtension && nextExtension.maxWidth! >= 0
      ? nextExtension.maxWidth
      : maxColumnWidth;
    let nextSize = Math.max(
      nextMinWidth!,
      Math.min(nextWidth - shift, nextMaxWidth!),
    );

    if (size + nextSize !== width + nextWidth) {
      const moreThanLimit = size + nextSize > width + nextWidth;
      const columnExpand = shift > 0;

      if (moreThanLimit !== columnExpand) {
        nextSize = width + nextWidth - size;
      } else {
        size = width + nextWidth - nextSize;
      }
    }

    return { size, nextSize };
  }

  return { size };
};

export const isValidValue: ValidValueFn = (value, validUnits) => {
  const numb = parseInt(value, 10);
  const unit = numb ? value.substr(numb.toString().length) : value;
  const sizeIsAuto = isNaN(numb) && unit === 'auto';
  const sizeIsValid = !isNaN(numb) && validUnits.some(validUnit => validUnit === unit);
  return sizeIsAuto || sizeIsValid;
};

export const convertWidth: NumbStringToNumbFn = (value) => {
  if (typeof value === 'string') {
    const numb = parseInt(value, 10);
    if (value.substr(numb.toString().length).length > 0) {
      return value;
    }
    return numb;
  }
  return value;
};
