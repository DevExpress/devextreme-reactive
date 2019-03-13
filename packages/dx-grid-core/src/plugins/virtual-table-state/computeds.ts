import { mergeRows } from './helpers';

export const virtualRowsWithCache = (start, rows, cache) => {
  const rowsInterval = { start, end: start + rows.length };
  const cacheInterval = { start: cache.start, end: cache.start + cache.rows.length };

  if (rowsInterval.end === 1000) debugger;
  const res = mergeRows(rowsInterval, cacheInterval, rows, cache.rows, start, cache.start);
  console.log('merge rows. rows interval', rowsInterval, 'cache interval', cacheInterval, 'res start', res.start)

  return res;
};
