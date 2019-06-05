export interface VirtualTableStateProps {
  infiniteScrolling: boolean;
  skip: number;
  totalRowCount: number;
  pageSize?: number;
  loading: boolean;
  getRows: (skip: number, take: number) => void;
}

/** @internal */
export type VirtualTableStateState = {
  visibleRowBoundaries: object,
  virtualPageIndex: number,
};

/** @internal */
export type DeprecatedLazyLoadingStrategyProps = {
  totalRowCount: number;
  skip: number;
  infiniteScrolling: boolean;
  pageSize: number;
  getRows: (skip: number, take: number) => void;
};

/** @internal */
export type DeprecatedLazyLoadingStrategyState = {
  virtualRowsCache: any,
  requestedPageIndex?: number,
  availableRowCount: number,
};
