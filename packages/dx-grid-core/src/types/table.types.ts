import { PureComputed } from '@devexpress/dx-core';
import { Column } from './grid-core.types';
import { IntegratedFiltering } from './filtering.types';

/** Describes properties of a table row that the Table plugin renders. */
export interface TableRow {
  /** A unique table row identifier. */
  key: string;
  /*** Specifies the table row type. The specified value defines which cell template
   * is used to render the row. */
  type: symbol;
  /** Specifies the associated row's ID. */
  rowId?: number | string;
  /** Specifies the associated row. */
  row?: any;
  /** Specifies the table row height. */
  height?: number;
  /** @internal */
  dataIndex?: number;
}

/** Describes properties of a table column that the Table plugin renders. */
export interface TableColumn {
  /** A unique table column identifier. */
  key: string;
  /*** Specifies the table column type. The specified value defines which cell template
   * is used to render the column. */
  type: symbol;
  /** Specifies the associated user column. */
  column?: Column;
  /** Specifies the table column width. */
  width?: number | string;
  /** Specifies the table's column alignment. */
  align?: 'left' | 'right' | 'center';
  /** Specifies the fixed table's column alignment. */
  fixed?: 'left' | 'right';
  /** Specifies column resize mode. */
  resizingMode?: string;
}

export type GridColumnExtension = {
  /** The name of the column to extend. */
  columnName: string;
  /** The table column width. */
  width?: number | string;
  /** The table column alignment. */
  align?: 'left' | 'right' | 'center';
  /** Specifies whether word wrap is enabled in a column's cells. */
  wordWrapEnabled?: boolean;
} & IntegratedFiltering.ColumnExtension;

/** @internal */
export type GetColumnExtensionFn = PureComputed<[string], GridColumnExtension>;
/** @internal */
export type GetColumnExtensionValueGetterFn = PureComputed<
  [GridColumnExtension[], string, any], GetColumnExtensionFn
>;

/** @internal */
export type GetCellColSpanFn = PureComputed<
  [{ tableRow: TableRow, tableColumns: TableColumn[], tableColumn: TableColumn }],
  number
>;
/** @internal */
export type CellColSpanGetter = PureComputed<[GetCellColSpanFn]>;

/** @internal */
export type ColumnGeometry = { left: number, right: number, isFixed?: boolean };
/** @internal */
// tslint:disable-next-line: max-line-length
export type TargetColumnGeometry = ColumnGeometry & { top: number, bottom: number };
/** @internal */
export type GetTableColumnGeometriesFn = PureComputed<[TableColumn[], number], ColumnGeometry[]>;
/** @internal */
// tslint:disable-next-line: max-line-length
export type GetTableTargetColumnIndexFn = PureComputed<[TargetColumnGeometry[], number], number>;
/** @internal */
// tslint:disable-next-line: max-line-length
export type GetTargetColumnGeometriesFn = PureComputed<[TargetColumnGeometry[], number], TargetColumnGeometry[]>;
/** @internal */
// tslint:disable-next-line: max-line-length
export type GetNodeGeometriesFn = PureComputed<[HTMLElement], ColumnGeometry>;

/** @internal */
export type ColumnAnimation = {
  startTime: number,
  style: object,
  left?: { from: number, to: number },
};
/** @internal */
export type ColumnAnimationMap = ReadonlyMap<string, ColumnAnimation>;
/** @internal */
export type ColumnAnimationStyleMap = ReadonlyMap<string, object>;
/** @internal */
export type GetColumnAnimationsFn = PureComputed<
  [TableColumn[], TableColumn[], number, ColumnAnimationMap],
  ColumnAnimationMap
>;
/** @internal */
export type FilterActiveAnimationsFn = PureComputed<[ColumnAnimationMap]>;
/** @internal */
export type EvalAnimationsFn = PureComputed<[ColumnAnimationMap], ColumnAnimationStyleMap>;

/** @internal */
export type CheckColumnExtensionsFn = PureComputed<
  [GridColumnExtension[]], void
>;
