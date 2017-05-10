export const getColumnFilterConfig = (filters, columnName) => {
  if (!filters.length) { return null; }

  const filter = filters.filter(s => s.column === columnName)[0];
  if (!filter) return null;

  const { column, ...config } = filter;
  return config;
};
