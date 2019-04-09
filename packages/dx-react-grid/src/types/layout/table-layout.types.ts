import {
  TableRow, TableColumn, ColumnAnimationStyleMap, GetCellColSpanFn, TableProps,
} from '../index';
import { GetRowHeightFn, GetColumnWidthFn, VisibleBoundary } from '@devexpress/dx-grid-core/src';

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
  visibleBoundaries: any,
};
/** @internal */
export type TableLayoutCoreState = {
  animationState: ColumnAnimationStyleMap,
};

/** @internal */
export type VisibleBoundaries = {
  columns: VisibleBoundary[],
  // headerRows: VisibleBoundary,
  bodyRows: VisibleBoundary,
  // footerRows: VisibleBoundary,
};

/** @internal */
export interface VirtualTableLayoutProps extends TableLayoutProps {
  height: number | 'auto';
  estimatedRowHeight: number;
  headTableComponent: React.ComponentType<object>;
  footerTableComponent: React.ComponentType<object>;
  onUpdate: () => void;
  renderRowBoundaries: VisibleBoundary;
  visibleColumnsBoundaries: VisibleBoundary[];
  getRowHeight: GetRowHeightFn;
  getColumnWidth: GetColumnWidthFn;
  headerHeight: number;
  bodyHeight: number;
  footerHeight: number;
  containerHeight: number;
  containerWidth: number;
  viewportLeft: number;
  blockRefsHandler: (name: string, ref: React.ReactInstance | null) => void;
  rowRefsHandler: (row: any, ref?: React.ReactInstance | null) => void;
  totalRowCount: number;
  loadedRowsStart: number;
}
/** @internal */
export type VirtualTableLayoutState = {
  rowHeights: Map<any, number>,
  viewportTop: number,
  viewportLeft: number,
  height: number,
  headerHeight: number,
  bodyHeight: number,
  footerHeight: number,
  containerWidth: number,
  containerHeight: number,
};
