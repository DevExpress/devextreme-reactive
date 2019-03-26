class SimpleCache {
  protected pageSize: number;
  protected pages: Map<number, any[]> = new Map();

  constructor(pageSize: number) {
    this.pageSize = pageSize;
  }

  addPage(pageStart: number, rows: any[]) {
    this.pages.set(pageStart, rows);
  }

  getPage(pageStart: number) {
    return this.pages.get(pageStart);
  }

  clear() {
    this.pages.clear();
  }
}

// tslint:disable-next-line:max-classes-per-file
class LRUCacheDecorator extends SimpleCache {
  maxSize: number;
  indexes: number[] = [];
  indexesMap: Map<number, number> = new Map();

  constructor(pageSize: number, maxSize = 0) {
    super(pageSize);

    this.maxSize = maxSize;
  }

  addPage(pageStart: number, rows: any[]) {
    super.addPage(pageStart, rows);

    this.indexes.push(pageStart);
    if (this.indexes.length > this.maxSize) {
      const deleted = this.indexes.shift();
      if (deleted !== undefined) {
        this.pages.delete(deleted);
        this.indexesMap.delete(deleted);
      }
    }
  }

  getPage(pageStart: number) {
    const ind = this.indexesMap.get(pageStart);
    if (ind !== undefined) {
      const lastIndex = this.indexes.length - 1;
      const tmp = this.indexes[ind];
      this.indexes[ind] = this.indexes[lastIndex];
      this.indexes[lastIndex] = tmp;
    }

    return super.getPage(pageStart);
  }

  clear() {
    super.clear();

    this.indexes = [];
  }
}

export const createRemoteRowsCache = (pageSize: number, maxSize = 0) => {
  const cache = maxSize
    ? new LRUCacheDecorator(pageSize, maxSize)
    : new SimpleCache(pageSize);

  return {
    getRows: (start, count) => {
      let result: any[] = [];
      for (let i = 0; i < count / pageSize; i += 1) {
        const pageStart = start + i * pageSize;
        const chunk = cache.getPage(pageStart);
        if (chunk === undefined) {
          return null;
        }
        result = result.concat(chunk);
      }
      return result;
    },
    setRows: (start, rows) => {
      for (let i = 0; i < rows.length / pageSize; i += 1) {
        const pageStart = i * pageSize;
        const rowsChunk = rows.slice(pageStart, pageStart + pageSize);

        cache.addPage(pageStart + start, rowsChunk);
      }
    },
    invalidate: () => cache.clear(),
    cache,
  };
};
