import { PureComputed } from '@devexpress/dx-core';
import {
  GridColumnExtension, GetColumnExtensionValueGetterFn,
} from '../types';

export const getColumnExtension: PureComputed<
  [GridColumnExtension[] | undefined, string], GridColumnExtension
> = (columnExtensions, columnName) => {
  if (!columnExtensions) {
    // tslint:disable-next-line:no-object-literal-type-assertion
    return {} as GridColumnExtension;
  }
  const columnExtension = columnExtensions.find(extension => extension.columnName === columnName);
  if (!columnExtension) {
    // tslint:disable-next-line:no-object-literal-type-assertion
    return {} as GridColumnExtension;
  }
  return columnExtension;
};

export const getColumnExtensionValueGetter: GetColumnExtensionValueGetterFn = (
  columnExtensions, extensionName, defaultValue,
) => (columnName) => {
  if (columnExtensions) {
    const columnExtension = getColumnExtension(columnExtensions, columnName);
    const extensionValue = columnExtension[extensionName];
    return extensionValue !== undefined ? extensionValue : defaultValue;
  }
  return defaultValue;
};
