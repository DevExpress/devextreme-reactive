export const getColumnExtension = (columnExtensions, columnName) => {
  if (!columnExtensions) {
    return {};
  }
  const columnExtension = columnExtensions.find(extension => extension.columnName === columnName);
  if (!columnExtension) {
    return {};
  }
  return columnExtension;
};

export const getColumnExtensionValueGetter = (
  columnExtensions, extensionName, defaultValue,
) => (columnName) => {
  if (columnExtensions) {
    const columnExtension = getColumnExtension(columnExtensions, columnName);
    const extensionValue = columnExtension[extensionName];
    return extensionValue !== undefined ? extensionValue : defaultValue;
  }
  return defaultValue;
};
