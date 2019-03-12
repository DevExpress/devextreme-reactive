import { mergeRows } from './helpers';

export const virtualRowsWithCache = (start, rows, cache) => {
  const rowsInterval = { start, end: start + rows.length };
  const cacheInterval = { start: cache.start, end: cache.start + cache.rows.length };

  return mergeRows(rowsInterval, cacheInterval, rows, cache.rows, start, cache.start);
};
