import { TableRow, TableColumn } from './index';

/** Describes a row cache */
export interface RowCache {
  /** Returns `take` number of rows starting with the `skip` row from the cache */
  getRows(skip: number, take: number): any[];
  /** Adds `rows` to the cache */
  setRows(skip: number, rows: ReadonlyArray<any>): void;
  /** Clears the cache */
  invalidate(): void;
}

export interface NavigatedComponent {
  tableRow: TableRow;
  tableColumn: TableColumn;
  /** @internal */
  setFocusedElement?: ({ key1, key2 }: { key1: string, key2: string }) => {};
  updateRefForKeyboardNavigation?: ({ ref, key1, key2, action }:
    { ref: any, key1: string, key2: string, action: string }) => {};
}
