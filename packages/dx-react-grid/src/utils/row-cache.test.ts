import { createRowCache } from './row-cache';

describe('Remote rows cache', () => {
  const createRows = length => (
    Array.from({ length }).map((_, id) => ({ id }))
  );

  it('should store and retrieve rows', () => {
    const rows = createRows(6);
    const cache = createRowCache(3);

    cache.setRows(0, rows);

    expect(cache.getRows(0, 6))
      .toEqual(rows);
  });

  it('should store and retrive arbitary rows', () => {
    const rows = createRows(9);
    const cache = createRowCache(3);

    cache.setRows(15, rows.slice(3));
    cache.setRows(12, rows.slice(0, 3));

    expect(cache.getRows(12, 9))
      .toEqual(rows);
  });

  it('should overwrite rows with the same start', () => {
    const rows = createRows(6);
    const cache = createRowCache(3);

    cache.setRows(15, rows.slice(0, 6));
    cache.setRows(18, rows.slice(1, 4));

    expect(cache.getRows(15, 6)).toEqual([
      ...rows.slice(0, 3),
      ...rows.slice(1, 4),
    ]);
  });

  it('should not discard incomplete pages', () => {
    const rows = createRows(8);
    const cache = createRowCache(3);

    cache.setRows(3, rows);

    expect(cache.getRows(3, 8))
      .toEqual(rows);
  });

  it('should return consistent rows', () => {
    const rows = createRows(12);
    const cache = createRowCache(3);

    cache.setRows(0, rows.slice(0, 5));
    cache.setRows(6, rows.slice(6, 12));

    expect(cache.getRows(0, 12))
      .toEqual(rows.slice(0, 5));
  });

  it('should retrive incomplete pages', () => {
    const rows = createRows(5);
    const cache = createRowCache(3);

    cache.setRows(0, rows);

    expect(cache.getRows(0, 12))
      .toEqual(rows);
  });

  it('should retrive incomplete page if it is the only one', () => {
    const rows = createRows(2);
    const cache = createRowCache(3);

    cache.setRows(0, rows);

    expect(cache.getRows(0, 12))
      .toEqual(rows);
  });

  it('should invalidate all pages', () => {
    const rows = createRows(9);
    const cache = createRowCache(3);

    cache.setRows(0, rows);
    cache.setRows(9, rows);
    cache.invalidate();

    expect(cache.getRows(0, 3)).toEqual([]);
    expect(cache.getRows(9, 3)).toEqual([]);
  });

  describe('pages replacement', () => {
    it('should discard least reacently used page ', () => {
      const rows = createRows(20);
      const cache = createRowCache(4, 16);

      cache.setRows(0, rows);

      expect(cache.getRows(0, 4))
        .toEqual([]);
      expect(cache.getRows(4, 16))
        .toEqual(rows.slice(4, 20));
    });

    it('should update page recently used info on retirieve', () => {
      const rows = createRows(16);
      const cache = createRowCache(4, 12);

      cache.setRows(0, rows);
      cache.getRows(8, 4);
      cache.getRows(4, 4);
      cache.setRows(0, rows.slice(0, 4));

      expect(cache.getRows(0, 12))
        .toEqual(rows.slice(0, 12));
      expect(cache.getRows(12, 4))
        .toEqual([]);
    });
  });
});
