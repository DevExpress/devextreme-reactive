export const getColumnFilterConfig = (filters, columnName) => {
  if (!filters.length) { return null; }

  const filter = filters.filter(s => s.columnName === columnName)[0];
  if (!filter) return null;

  const { columnName: _, ...config } = filter;
  return config;
};
