import {
  TableRow, TableColumn, ColumnAnimationStyleMap, GetCellColSpanFn,
} from '@devexpress/dx-grid-core';
import { TableProps } from './table.types';

type tableLayoutComponents = 'containerComponent' | 'tableComponent'
  | 'headComponent' | 'bodyComponent' | 'footerComponent';
type placeholderComponents = 'rowComponent'
| 'cellComponent';

type Partialize<T> = {
  [K in keyof T]: T[K] extends React.ComponentType<infer U> ? React.ComponentType<Partial<U>> : T[K]
};

/** @internal */
export type TableLayoutProps =
  Pick<TableProps, tableLayoutComponents> & Partialize<Pick<TableProps, placeholderComponents>> & {
    headerRows: TableRow[],
    bodyRows: TableRow[],
    footerRows: TableRow[],
    columns: TableColumn[],
    minWidth?: number,
    minColumnWidth?: number,
    getCellColSpan?: GetCellColSpanFn,
    tableRef?: React.RefObject<HTMLTableElement>,
  };

/** @internal */
export type TableLayoutCoreProps = TableLayoutProps & {
  layoutComponent: React.ComponentType<TableLayoutProps>,
  minColumnWidth: number,
  columns: TableColumn[],
};
/** @internal */
export type TableLayoutCoreState = {
  animationState: ColumnAnimationStyleMap,
};

/** @internal */
export type VirtualTableLayoutProps = TableLayoutProps & {
  height: number | 'auto',
  estimatedRowHeight: number,
  headTableComponent: React.ComponentType<object>, // TODO: extract props?
  footerTableComponent: React.ComponentType<object>,
};
/** @internal */
export type VirtualTableLayoutState = {
  rowHeights: Map<any, number>,
  viewportTop: number,
  viewportLeft: number,
  width: number,
  height: number,
  headerHeight: number,
  bodyHeight: number,
  footerHeight: number,
};
