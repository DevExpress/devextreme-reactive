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
    isFixed?: boolean,
    getCellColSpan?: GetCellColSpanFn,
    tableRef?: React.RefObject<HTMLTableElement>,
    forwardedRef?: React.MutableRefObject<any> | React.RefCallback<any> | null,
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
  viewportTop: number,
  skipItems: [number, number],
  containerHeight: number,
  containerWidth: number,
  viewportLeft: number,
};

type virtualBlockProps = placeholderComponents | 'tableRef' | 'minWidth' | 'bodyComponent';
/** @internal */
export type VirtualTableLayoutBlockProps = Pick<VirtualTableLayoutProps, virtualBlockProps> & {
  name: string,
  isFixed?: boolean,
  collapsedGrid: {
    columns: any,
    rows: any,
  },
  tableRef?: React.RefObject<HTMLTableElement>,
};
