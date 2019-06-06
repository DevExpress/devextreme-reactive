import { NumberArray, Location } from '../types';
// This function is to be called from context where DOM is available -
// so *window* can be accessed safely.
/** @internal */
export const getOffset = (element: Element): NumberArray => {
  const { left, top } = element.getBoundingClientRect();
  // Safer way to get window.
  const { defaultView } = element.ownerDocument!;
  const { pageXOffset, pageYOffset } = defaultView!;
  return [left + pageXOffset, top + pageYOffset];
};

/** @internal */
export const getEventCoords = (e: any, offset: NumberArray): Location => {
  const { pageX, pageY } = e.touches ? e.touches[0] : e;
  return [pageX - offset[0], pageY - offset[1]];
};
