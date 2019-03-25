export interface VirtualTableStateProps {
  infinite: boolean;
  start: number;
  rowCount: number;
  virtualPageSize?: number;
  loading: boolean;
  getRows: (skip: number, take: number) => void;
  // onFirstRowIndexChange?: (index: number) => void;
  // onViewportTopChange?: (top: number) => void;
}

export type VirtualTableStateState = {
  virtualRowsCache: any,
  viewportTop: number;
  requestedPageIndex?: number,
  availableRowCount: number,
};
