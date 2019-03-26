import { createRemoteRowsCache } from './remote-rows-cache';

describe('Remote rows cache', () => {
  const createRows = length => (
    Array.from({ length }).map((_, id) => ({ id }))
  );

  describe('Simple cache', () => {
    it('should store and retrieve rows', () => {
      const rows = createRows(6);
      const cache = createRemoteRowsCache(3);

      cache.setRows(0, rows);

      expect(cache.getRows(0, 6)).toEqual(rows);
    });

    it('should store and retrive arbitary rows', () => {
      const rows = createRows(9);
      const cache = createRemoteRowsCache(3);

      cache.setRows(15, rows.slice(3));
      cache.setRows(12, rows.slice(0, 3));

      debugger
      expect(cache.getRows(12, 9)).toEqual(rows);
    });
  });
});
