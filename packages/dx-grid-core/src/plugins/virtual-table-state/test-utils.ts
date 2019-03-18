export const createInterval = (start, end) => ({ start, end });
export const generateRows = (interval, type = 'rows') => (
  Array
    .from({ length: interval.end - interval.start })
    .map((_, i) => ({ id: interval.start + i, type }))
);
export const createVirtualRows = interval => ({
  start: interval.start,
  rows: generateRows(interval),
});
