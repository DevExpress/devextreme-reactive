class Node {
  start: number;
  rows: ReadonlyArray<any>;
  prev: Node | null = null;
  next: Node | null = null;

  constructor(start: number, rows: ReadonlyArray<any>) {
    this.start = start;
    this.rows = rows;
  }
}

// tslint:disable-next-line:max-classes-per-file
class LRUCache {
  pageSize: number;
  capacity: number;
  head!: Node;
  tail!: Node;
  pages: Map<number, Node> = new Map();

  constructor(pageSize: number, capacity = 0) {
    this.pageSize = pageSize;
    this.capacity = capacity || Number.POSITIVE_INFINITY;
    this.initList();
  }

  initList() {
    this.head = new Node(-1, []);
    this.tail = new Node(-1, []);
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  addPage(pageStart: number, rows: ReadonlyArray<any>) {
    if (this.pages.has(pageStart)) {
      this.removePage(pageStart);
    }

    const node = new Node(pageStart, rows);
    const last = this.tail.prev!;
    last.next = node;
    node.next = this.tail;
    node.prev = last;
    this.tail.prev = node;
    this.pages.set(pageStart, node);

    if (this.pages.size > this.capacity) {
      this.removePage(this.head.next!.start);
    }
  }

  removePage(start: number) {
    const node = this.pages.get(start)!;
    node.prev!.next = node.next;
    node.next!.prev = node.prev;

    this.pages.delete(start);
  }

  getPage(pageStart: number) {
    if (!this.pages.has(pageStart)) {
      return null;
    }

    const { rows } = this.pages.get(pageStart)!;
    this.removePage(pageStart);
    this.addPage(pageStart, rows);

    return rows;
  }

  clear() {
    this.pages.clear();
    this.initList();
  }
}

export const createRemoteRowsCache = (pageSize: number, capacity = 0) => {
  const cache = new LRUCache(pageSize, capacity / pageSize);

  return {
    getRows: (start: number, count: number) => {
      let result: any[] = [];
      const pageCount = Math.ceil(count / pageSize);
      for (let i = 0; i < pageCount; i += 1) {
        const pageStart = start + i * pageSize;
        const chunk = cache.getPage(pageStart);

        // add incomplete page to result only if it is last one
        if (chunk === null || (i !== pageCount - 1 && chunk.length !== pageSize)) {
          return result;
        }
        result = result.concat(chunk);
      }
      return result;
    },
    setRows: (start: number, rows: ReadonlyArray<any>) => {
      const pageCount = Math.ceil(rows.length / pageSize);
      for (let i = 0; i < pageCount; i += 1) {
        const pageStart = i * pageSize;
        const rowsChunk = rows.slice(pageStart, pageStart + pageSize);

        // put incomplete page only if it is last one
        if (rowsChunk.length === pageSize || i === pageCount - 1) {
          cache.addPage(pageStart + start, rowsChunk);
        }
      }
    },
    invalidate: () => cache.clear(),
  };
};
