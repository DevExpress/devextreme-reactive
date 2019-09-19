import { TableColumn, TableRow } from './table.types';
import { HeaderColumnChainRows } from './header-row.types';
import { VisibleBoundary } from './virtual-table.types';

/** Describes properties of column bands that the TableBandHeader plugin renders. */
export interface ColumnBands {
  /** A column name that is used to identify a column in the bands tree. */
  columnName?: string;
  /** The band's title. Used only for bands and ignored for columns. */
  title?: string;
  /** Nested bands and columns. */
  children?: ColumnBands[];
}

/** @internal */
type NestedLevel = { level: number };
/** @internal */
export type BandHeaderRow = TableRow & NestedLevel;
/** @internal */
export type BandLevels = { [bandTitle: string]: number };
/** @internal */
export type GetMaxNestedLevelFn = (
  bands: ColumnBands[],
  level?: number,
  result?: NestedLevel | null,
) => NestedLevel;

/** @internal */
type ColumnBandMeta = { level: number; title: string | null };

/** @internal */
export type BandColumnChainExtension = { bandTitle: string };

/** @internal */
export type GetColumnBandMetaFn = (
  columnName: string,
  bands: ReadonlyArray<ColumnBands>,
  tableRowLevel: number,
  level?: number,
  title?: string | null | undefined,
  result?: ColumnBandMeta | null,
) => ColumnBandMeta;

/** @internal */
type BandComponentPayload = {
  colSpan?: number;
  rowSpan?: number;
  value?: string;
  column?: ColumnBandMeta;
  beforeBorder?: boolean;
  [x: string]: any;
};
/** @internal */
export type GetBandComponentFn = (
  params: { tableColumn: TableColumn; tableRow: BandHeaderRow; rowSpan?: number },
  tableHeaderRows: TableRow[],
  tableColumns: TableColumn[],
  columnsBands: ColumnBands[],
  tableHeaderColumnChains: HeaderColumnChainRows,
  columnVisibleIntervals: VisibleBoundary[],
  bandLevelsVisibility: boolean[],
) => { type: string | null; payload: BandComponentPayload | null };
