import { PureComputed } from '@devexpress/dx-core';
import { Getters } from '@devexpress/dx-react-core';
import { TableColumn, TableRow, GetCellColSpanFn } from './table.types';
import { RIGHT_POSITION, LEFT_POSITION } from '../plugins/virtual-table/constants';

/** @internal */
export type GetColumnWidthFn = PureComputed<[TableColumn, number?], number | null>;
/** @internal */
export type GetRowHeightFn = PureComputed<[TableRow, number?], number>;
/** @internal */
export type GetColSpanFn = PureComputed<[TableRow, TableColumn], number>;
/** @internal */
export type CollapsedColumn = TableColumn & { width: number };
/** @internal */
export type CollapsedCell = { column: Pick<TableColumn, 'key' | 'type'>, colSpan: number };
/** @internal */
export type CollapsedRow = TableRow & { cells: any[], height: number };

/** @internal */
export type VisibleBoundary = ReadonlyArray<number>;

/** @internal */
export type GridViewport = {
  columns: VisibleBoundary[];
  rows: VisibleBoundary;
  headerRows: VisibleBoundary;
  footerRows: VisibleBoundary;
  left: number;
  top: number; // to anchor a boundary to specific coords
  width: number;
  height: number;
};
/** @internal */
export type GetVisibleBoundaryFn = PureComputed<
  [ReadonlyArray<any>, number, number, (item: any) => number | null, number, number?],
  VisibleBoundary
>;

/** @internal */
export type GetVisibleBoundaryWithFixedFn = PureComputed<
  [VisibleBoundary, ReadonlyArray<TableColumn>],
  VisibleBoundary[]
>;

/** @internal */
export type GetSpanBoundaryFn = PureComputed<
  [TableColumn[], VisibleBoundary[], (item: any) => number],
  VisibleBoundary[]
>;

/** @internal */
export type CollapseBoundariesFn = PureComputed<
  [number, VisibleBoundary[], ReadonlyArray<VisibleBoundary>[]],
  VisibleBoundary[]
>;

/** @internal */
export type GetColumnsSizeFn = PureComputed<
  [TableColumn[], number, number, GetColumnWidthFn],
  number
>;

/** @internal */
export type GetCollapsedColumnsFn = PureComputed<
  [TableColumn[], VisibleBoundary[], VisibleBoundary[], GetColumnWidthFn],
  CollapsedColumn[]
>;

/** @internal */
export type GetCollapsedAndStubRowsFn = PureComputed<
// tslint:disable-next-line: max-line-length
  [TableRow[], VisibleBoundary, VisibleBoundary[], GetRowHeightFn, (r: TableRow) => ReadonlyArray<any>, number],
  CollapsedRow[]
>;

/** @internal */
export type GetCollapsedCellsFn = PureComputed<
  [TableRow, TableColumn[], VisibleBoundary[], VisibleBoundary[], GetColSpanFn],
  CollapsedCell[]
>;

/** @internal */
export type GetCollapsedGridFn = PureComputed<
  [{
    rows: TableRow[], columns: TableColumn[],
    rowsVisibleBoundary?: VisibleBoundary, columnsVisibleBoundary: VisibleBoundary[],
    getColumnWidth: GetColumnWidthFn, getRowHeight: GetRowHeightFn,
    getColSpan: GetColSpanFn,
    totalRowCount: number,
    offset: number,
  }],
  { columns: CollapsedColumn[], rows: CollapsedRow[] }
>;

/** @internal */
export type CollapsedGrid = { columns: CollapsedColumn[], rows: CollapsedRow[] };
/** @internal */
export type GetCollapsedGridsFn = PureComputed<
  [{
    headerRows: TableRow[],
    bodyRows: TableRow[],
    footerRows: TableRow[],
    columns: TableColumn[],
    loadedRowsStart: number,
    totalRowCount: number,
    getCellColSpan?: GetCellColSpanFn,
    viewportLeft: number,
    containerWidth: number,
    viewport: GridViewport,
    getColumnWidth: GetColumnWidthFn,
    getRowHeight: GetRowHeightFn,
  }],
  {
    headerGrid: CollapsedGrid,
    bodyGrid: CollapsedGrid,
    footerGrid: CollapsedGrid,
  }
>;

/** @internal */
export type GetColumnWidthGetterFn = PureComputed<
  [TableColumn[], number, number],
  GetColumnWidthFn
>;

/** @internal */
export type GetViewportFn = PureComputed<
  [any, Getters, number, GetRowHeightFn, GetColumnWidthFn], GridViewport
>;

/** @internal */
export type GetRenderBoundaryFn = PureComputed<[number, number[], number], number[]>;
/** @internal */
export type GetSpecificRenderBoundaryFn = PureComputed<[number, number[]], number[]>;

/** @internal */
export type GetRowsVisibleBoundaryFn = PureComputed<
[TableRow[], number, number, GetRowHeightFn, number, number, boolean?], VisibleBoundary
>;

type PageTriggersMeta = {
  topTriggerIndex: number,
  topTriggerPosition: number,
  bottomTriggerIndex: number,
  bottomTriggerPosition: number,
};
/** @internal */
export type GridGeometry = {
  viewportTop: number;
  containerHeight: number;
  viewport: GridViewport;
  estimatedRowHeight: number;
};

/** @internal */
export type PageTriggersMetaFn = PureComputed<
  [GridGeometry, Getters], PageTriggersMeta | null
>;
/** @internal */
export type CheckTableColumnWidths = PureComputed<
  [TableColumn[]], void
>;
/** @internal */
export type GetScrollHeightByIndex = PureComputed<
  [number, number], number | undefined
>;
/** @internal */
export type GetScrollPosition = PureComputed<
  [TableRow[], number, number | string | symbol | undefined, number, number], number | undefined
>;
/** @internal */
export type GetTopRowId = PureComputed<
  [GridViewport, TableRow[], boolean], string | number | undefined
>;
/** @internal */
export type GetScrollLeft = PureComputed<
  [number, number, typeof LEFT_POSITION | typeof RIGHT_POSITION | undefined], number | undefined
>;
/** @internal */
export type IsColumnsWidthEqual = PureComputed<[TableColumn[], TableColumn[]], boolean>;
