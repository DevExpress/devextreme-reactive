export interface VirtualTableStateProps {
  start: number;
  rowCount: number;
  getRows: (skip: number, take: number) => void;
  onFirstRowIndexChange?: (index: number) => void;
  onViewportTopChange?: (top: number) => void;
}

export type VirtualTableStateState = {
  virtualRowsCache: any,
  rowCount?: number;
  viewportTop: number;
  requestedPageIndex?: number,
  // currentVirtualPageTop: number;
  // lastQueryTime: number;
  // rowsCache: any[],
  // visibleBoundaries: any,
};
