import { mergeRows } from './helpers';
import { intervalUtil } from './utils';
import { VirtualRowsWithCacheFn } from '../../types';

export const virtualRowsWithCache: VirtualRowsWithCacheFn = (start, rows, cache) => {
  const rowsInterval = intervalUtil.getRowsInterval({ start, rows });
  const cacheInterval = intervalUtil.getRowsInterval(cache);

  return mergeRows(rowsInterval, cacheInterval, rows, cache.rows, start, cache.start);
};
