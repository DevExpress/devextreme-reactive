export interface VirtualTableStateProps {
  infiniteScrolling: boolean;
  start: number;
  totalRowCount: number;
  pageSize?: number;
  loading: boolean;
  getRows: (skip: number, take: number) => void;
}

/** @internal */
export type VirtualTableStateState = {
  virtualRowsCache: any,
  requestedPageIndex?: number,
  availableRowCount: number,
};
