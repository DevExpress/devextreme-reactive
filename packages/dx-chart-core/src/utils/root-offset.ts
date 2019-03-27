import { NumberArray } from '../types';

// This function is to be called from context where DOM is available -
// so *window* can be accessed safely.
/** @internal */
export const getRootOffset = (root: Element): NumberArray => {
  const { left, top } = root.getBoundingClientRect();
  const { pageXOffset, pageYOffset } = window;
  return [left + pageXOffset, top + pageYOffset];
};
