import { mergeRows } from './helpers';
import { intervalUtil } from './utils';

export const virtualRowsWithCache = (start, rows, cache) => {
  const rowsInterval = intervalUtil.getRowsInterval({ start, rows });
  const cacheInterval = intervalUtil.getRowsInterval(cache);

  return mergeRows(rowsInterval, cacheInterval, rows, cache.rows, start, cache.start);
};
