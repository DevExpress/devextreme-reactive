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
