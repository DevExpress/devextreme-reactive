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
  virtualRowsCache: any,
  requestedStartIndex: number,
  availableRowCount: number,
  requestedEndIndex: number,
};
