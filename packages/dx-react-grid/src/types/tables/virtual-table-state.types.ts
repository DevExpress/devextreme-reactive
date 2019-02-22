export interface VirtualTableStateProps {
  start: number;
  rowCount: number;
  overscan?: number;
  defaultOverscan?: number;
  getRows: (skip: number, take: number) => void;
  onFirstRowIndexChange?: (index: number) => void;
  onViewportTopChange?: (top: number) => void;
}

export type VirtualTableStateState = {
  virtualRowsCache: any,
  firstRowIndex: number;
  virtualPageIndex: number;
  start: number;
  rowCount?: number;
  viewportTop: number;
  requestedStartIndex?: number,
  currentVirtualPageTop: number;
  lastQueryTime: number;
  // rowsCache: any[],
  // visibleBoundaries: any,
};
