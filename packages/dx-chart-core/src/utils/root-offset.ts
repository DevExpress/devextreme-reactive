// This function is to be called from context where DOM is available -
// so *window* can be accessed safely.
/** @internal */
export const getRootOffset = (root: Element) => {
  const { left, top } = root.getBoundingClientRect();
  const { pageXOffset, pageYOffset } = window;
  return [left + pageXOffset, top + pageYOffset];
};
