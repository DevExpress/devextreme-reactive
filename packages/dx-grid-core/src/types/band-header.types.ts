import { TableColumn, TableRow } from './table.types';
import { HeaderColumnChainRows } from './header-row.types';

/** Describes properties of column bands that the TableBandHeader plugin renders. */
export interface ColumnBands {
  /** A column name that is used to identify a column in the bands tree. */
  columnName?: string;
  /** The band's title. Used only for bands and ignored for columns. */
  title?: string;
  /** Nested bands and columns. */
  children?: ColumnBands[];
}

type NestedLevel = { level: number };
export type BandHeaderRow = TableRow & NestedLevel;
export type GetMaxNestedLevelFn = (
  bands: ColumnBands[],
  level?: number,
  result?: NestedLevel | null,
) => NestedLevel;

type ColumnBandMeta = { level: number; title: string | null };

export type GetColumnBandMetaFn = (
  columnName: string,
  bands: ReadonlyArray<ColumnBands>,
  tableRowLevel: number,
  level?: number,
  title?: string | null | undefined,
  result?: ColumnBandMeta | null,
) => ColumnBandMeta;

type BandComponentPayload = {
  colSpan?: number;
  rowSpan?: number;
  value?: string;
  column?: ColumnBandMeta;
  beforeBorder?: boolean;
};
export type GetBandComponentFn = (
  params: { tableColumn: TableColumn; tableRow: TableRow; rowSpan?: number },
  tableHeaderRows: TableRow[],
  tableColumns: TableColumn[],
  columnsBands: ColumnBands[],
  tableHeaderColumnChains: HeaderColumnChainRows,
) => { type: string | null; payload: BandComponentPayload | null };
