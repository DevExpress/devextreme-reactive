/** Describes a row cache */
export interface RowCache {
  /** Returns `take` number of rows starting with the `skip` row from the cache */
  getRows(skip: number, take: number): any[];
  /** Adds `rows` to the cache */
  setRows(skip: number, rows: ReadonlyArray<any>): void;
  /** Clears the cache */
  invalidate(): void;
}
