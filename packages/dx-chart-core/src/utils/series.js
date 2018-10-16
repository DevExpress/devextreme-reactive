import { area } from 'd3-shape';
import { dArea, dLine, dSpline } from '../plugins/series/computeds';

// This function is called from event handlers (when DOM is available) -
// so window can be accessed safely.
const createContext = () => document.createElement('canvas').getContext('2d'); // eslint-disable-line no-undef

export const createAreaHitTester = (coordinates) => {
  const ctx = createContext();
  const path = area();
  path.x(dArea.x());
  path.y1(dArea.y1());
  path.y0(dArea.y0());
  path.context(ctx);
  path(coordinates);
  return ([x, y]) => ctx.isPointInPath(x, y);
};

export const createLineHitTester = (coordinates) => {
  const ctx = createContext();
  const path = area();
  path.x(dLine.x());
  const getY = dLine.y();
  path.y1(point => getY(point) - 10);
  path.y0(point => getY(point) + 10);
  path.context(ctx);
  path(coordinates);
  return ([x, y]) => ctx.isPointInPath(x, y);
};

export const createSplineHitTester = (coordinates) => {
  const ctx = createContext();
  const path = area();
  path.x(dSpline.x());
  const getY = dSpline.y();
  path.y1(point => getY(point) - 10);
  path.y0(point => getY(point) + 10);
  path.curve(dSpline.curve());
  path.context(ctx);
  path(coordinates);
  return ([x, y]) => ctx.isPointInPath(x, y);
};

export const createBarHitTester = () => () => false;

export const createScatterHitTester = () => () => false;

export const createPieHitTester = () => () => false;
