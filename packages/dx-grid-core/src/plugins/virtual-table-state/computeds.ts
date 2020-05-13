import { mergeRows } from './helpers';
import { intervalUtil } from './utils';
import { VirtualRowsWithCacheFn, PlainRowsFn, LoadedRowsStartFn } from '../../types';

export const virtualRowsWithCache: VirtualRowsWithCacheFn = (skip, rows, cache) => {
  const rowsInterval = intervalUtil.getRowsInterval({ skip, rows });
  const cacheInterval = intervalUtil.getRowsInterval(cache);

  return mergeRows(rowsInterval, cacheInterval, rows, cache.rows, skip, cache.skip);
};

export const plainRows: PlainRowsFn = (virtualRows, availableRowCount) => {
  return virtualRows.rows.length > availableRowCount
    ? virtualRows.rows.slice(0, availableRowCount)
    : virtualRows.rows;
};

export const loadedRowsStart: LoadedRowsStartFn = virtualRows => virtualRows.skip;
