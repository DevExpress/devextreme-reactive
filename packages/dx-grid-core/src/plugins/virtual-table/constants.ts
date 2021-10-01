import { GridViewport } from '../../types';

/** @internal */
export const emptyViewport: GridViewport = {
  columns: [[0, 0]],
  rows: [0, 0],
  headerRows: [0, 0],
  footerRows: [0, 0],
  top: 0,
  left: 0,
  width: 800,
  height: 600,
};

export const TOP_POSITION = Symbol('top');
export const BOTTOM_POSITION = Symbol('bottom');
export const LEFT_POSITION = Symbol('left');
export const RIGHT_POSITION = Symbol('right');
