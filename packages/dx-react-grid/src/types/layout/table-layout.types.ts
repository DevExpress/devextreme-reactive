import {
  TableRow, TableColumn, ColumnAnimationStyleMap, GetCellColSpanFn, TableProps,
  LEFT_POSITION, RIGHT_POSITION,
} from '../index';

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
    minWidth?: string,
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
export interface VirtualTableLayoutProps extends TableLayoutProps {
  height: number | 'auto';
  estimatedRowHeight: number;
  headTableComponent: React.ComponentType<object>;
  footerTableComponent: React.ComponentType<object>;
  totalRowCount: number;
  loadedRowsStart: number;
  isDataRemote: boolean;
  setViewport: any;
  viewport: any;
  scrollTop?: number;
  nextColumnId?: typeof LEFT_POSITION | typeof RIGHT_POSITION | undefined;
}
/** @internal */
export type VirtualTableLayoutState = {
  rowHeights: Map<any, number>,
  height: number,
  headerHeight: number,
  bodyHeight: number,
  footerHeight: number,
  visibleRowBoundaries: any,
};

type virtualBlockProps = placeholderComponents | 'tableRef' | 'minWidth' | 'bodyComponent';
/** @internal */
export type VirtualTableLayoutBlockProps = Pick<VirtualTableLayoutProps, virtualBlockProps> & {
  name: string,
  collapsedGrid: {
    columns: any,
    rows: any,
  },
  blockRefsHandler: (name: string, ref: React.ReactInstance | null) => void,
  rowRefsHandler: (row: any, ref?: React.ReactInstance | null) => void,
  marginBottom?: number,
  tableComponent: React.ComponentType<any>,
};
