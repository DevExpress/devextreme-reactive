import { TableColumn, TableRow } from './table.types';
import { PureComputed } from '@devexpress/dx-core';

export type GetColumnWidthFn = PureComputed<[TableColumn, number?], number>;
export type GetRowHeightFn = PureComputed<[TableRow, number?], number>;
export type GetColSpanFn = PureComputed<[TableRow, TableColumn?], number>;
export type CollapsedColumn = TableColumn & { width: number };
export type CollapsedCell = { column: Pick<TableColumn, 'key' | 'type'>, colSpan: number };
type CollapsedRow = TableRow & { cells: any[], height: number };

export type VisibleBoundary =  ReadonlyArray<number>;
export type GetVisibleBoundaryFn = PureComputed<
  [ReadonlyArray<any>, number, number, (item: any) => number, number],
  VisibleBoundary
>;

export type GetVisibleBoundaryWithFixedFn = PureComputed<
  [VisibleBoundary, ReadonlyArray<TableColumn>],
  VisibleBoundary[]
>;

export type GetSpanBoundaryFn = PureComputed<
  [TableColumn[], VisibleBoundary[], (item: any) => number],
  VisibleBoundary[]
>;

export type CollapseBoundariesFn = PureComputed<
  [number, VisibleBoundary[], ReadonlyArray<VisibleBoundary>[]],
  VisibleBoundary[]
>;

export type GetColumnsSizeFn = PureComputed<
  [TableColumn[], number, number, GetColumnWidthFn],
  number
>;

export type GetCollapsedColumnsFn = PureComputed<
  [TableColumn[], VisibleBoundary[], VisibleBoundary[], GetColumnWidthFn],
  CollapsedColumn[]
>;

export type GetCollapsedAndStubRowsFn = PureComputed<
// tslint:disable-next-line: max-line-length
  [TableRow[], VisibleBoundary, VisibleBoundary[], GetRowHeightFn, (r: TableRow) => ReadonlyArray<any>],
  CollapsedRow[]
>;

export type GetCollapsedCellsFn = PureComputed<
  [TableColumn[], VisibleBoundary[], VisibleBoundary[], GetColSpanFn],
  CollapsedCell[]
>;

export type GetCollapsedGridFn = PureComputed<
  [{
    rows: TableRow[], columns: TableColumn[],
    top: number, height: number, left: number, width: number,
    getColumnWidth: GetColumnWidthFn, getRowHeight: GetRowHeightFn, getColSpan: GetColSpanFn,
  }],
  { columns: CollapsedColumn[], rows: CollapsedRow[] }
>;
