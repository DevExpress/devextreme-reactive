import { ColumnSizesFn, ValidValueFn, ConvertWidthFn, ColumnWidthFn } from '../../types';

const getColumnWidth: ColumnWidthFn = (
  columnWidths, name, {
    columnName, cachedWidths, shift, minColumnWidth, maxColumnWidth, columnExtensions = [],
}) => {
  const change = name === columnName ? shift : -shift;
  const column  = columnWidths.find(elem => elem.columnName === name)!;
  const extension = columnExtensions.find(elem => elem.columnName === name);
  const width = typeof column.width === 'number'
    ? column.width
    : cachedWidths[name];
  const minWidth = extension && extension.minWidth! >= 0
    ? extension.minWidth
    : minColumnWidth;
  const maxWidth = extension && extension.maxWidth! >= 0
    ? extension.maxWidth
    : maxColumnWidth;
  const size = Math.max(
    minWidth!,
    Math.min(width + change, maxWidth!),
  );

  return ({ width, size });
};

export const getColumnSizes: ColumnSizesFn = (
  columnWidths, payload) => {
  const { columnName, nextColumnName, resizingMode, shift } = payload;
  const { width, size } = getColumnWidth(columnWidths, columnName, payload);

  if (resizingMode === 'nextColumn') {
    const { width: nextWidth, size: nextSize } = getColumnWidth(
      columnWidths, nextColumnName, payload,
    );

    if (size + nextSize !== width + nextWidth) {
      const moreThanLimit = size + nextSize > width + nextWidth;
      const columnExpand = shift > 0;
      if (moreThanLimit !== columnExpand) {
        return { size, nextSize: width + nextWidth - size };
      }
      return { size: width + nextWidth - nextSize, nextSize };
    }
    return { size, nextSize };
  }

  return { size };
};

export const isValidValue: ValidValueFn = (value, validUnits) => {
  const numb = parseInt(value, 10);
  const unit = numb ? value.substr(numb.toString().length) : value;
  const sizeIsAuto = isNaN(numb) && unit === 'auto';
  const sizeIsValid = numb >= 0 && validUnits.some(validUnit => validUnit === unit);
  return sizeIsAuto || sizeIsValid;
};

export const convertWidth: ConvertWidthFn = (value) => {
  if (typeof value === 'string') {
    const numb = parseInt(value, 10);
    if (value.substr(numb.toString().length).length > 0) {
      return value;
    }
    return numb;
  }
  return value;
};
