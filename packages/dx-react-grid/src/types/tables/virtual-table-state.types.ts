export interface VirtualTableStateProps {
  start: number;
  totalRowsCount: number;
  getRows: (skip: number, take: number) => void;
  onFirstRowIndexChange?: (index: number) => void;
  onViewportTopChange?: (top: number) => void;
}

export type VirtualTableStateState = {
  firstRowIndex: number;
  viewportTop: number;
};
