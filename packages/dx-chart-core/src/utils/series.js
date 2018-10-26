import { area } from 'd3-shape';
import { dArea, dLine, dSpline } from '../plugins/series/computeds';

const isPointInRect = (x, y, x1, x2, y1, y2) => x1 <= x && x <= x2 && y1 <= y && y <= y2;

const LINE_TOLERANCE = 10;

// This function is called from event handlers (when DOM is available) -
// *window.document* can be accessed safely.
const createContext = () => document.createElement('canvas').getContext('2d'); // eslint-disable-line no-undef

// For a start using browser canvas will suffice.
// However a better and more clean solution should be found.
// Can't d3 perform hit testing?
const createCanvasAbusingHitTesterCreator = makePath => (coordinates) => {
  const ctx = createContext();
  const path = makePath();
  path.context(ctx);
  path(coordinates);
  return ([px, py]) => {
    const hit = ctx.isPointInPath(px, py) ? {} : null;
    if (hit) {
      const point = coordinates.find(({ x, y }) => isPointInRect(
        px, py,
        x - LINE_TOLERANCE, x + LINE_TOLERANCE, y - LINE_TOLERANCE, y + LINE_TOLERANCE,
      ));
      if (point) {
        hit.point = point.index;
      }
    }
    return hit;
  };
};

export const createAreaHitTester = createCanvasAbusingHitTesterCreator(() => {
  const path = area();
  path.x(dArea.x());
  path.y1(dArea.y1());
  path.y0(dArea.y0());
  return path;
});

export const createLineHitTester = createCanvasAbusingHitTesterCreator(() => {
  const path = area();
  const getY = dLine.y();
  path.x(dLine.x());
  path.y1(point => getY(point) - LINE_TOLERANCE);
  path.y0(point => getY(point) + LINE_TOLERANCE);
  return path;
});

export const createSplineHitTester = createCanvasAbusingHitTesterCreator(() => {
  const path = area();
  const getY = dSpline.y();
  path.x(dSpline.x());
  path.y1(point => getY(point) - LINE_TOLERANCE);
  path.y0(point => getY(point) + LINE_TOLERANCE);
  path.curve(dSpline.curve());
  return path;
});

export const createBarHitTester = coordinates => ([px, py]) => {
  const point = coordinates.find(({
    x, width, y, y1,
  }) => isPointInRect(px, py, x, x + width, Math.min(y, y1), Math.max(y, y1)));
  return point ? { point: point.index } : null;
};

// TODO: Use actual point size here!
export const createScatterHitTester = coordinates => ([px, py]) => {
  const point = coordinates.find(({
    x, y,
  }) => isPointInRect(px, py, x - 10, x + 10, y - 10, y + 10));
  return point ? { point: point.index } : null;
};

const mapAngleTod3 = (angle) => {
  const ret = angle + Math.PI / 2;
  return ret >= 0 ? ret : ret + Math.PI * 2;
};

export const createPieHitTester = coordinates => ([px, py]) => {
  const point = coordinates.find(({
    x, y, innerRadius, outerRadius, startAngle, endAngle,
  }) => {
    const dx = px - x;
    const dy = py - y;
    const r = Math.sqrt(dx * dx + dy * dy);
    if (r < innerRadius || r > outerRadius) {
      return null;
    }
    const angle = mapAngleTod3(Math.atan2(dy, dx));
    return startAngle <= angle && angle <= endAngle;
  });
  return point ? { point: point.index } : null;
};

const buildFilter = (targets) => {
  const result = {};
  targets.forEach(({ series, point }) => {
    result[series] = result[series] || { points: {} };
    if (point >= 0) {
      result[series].points[point] = true;
    } else {
      result[series].self = true;
    }
  });
  return result;
};

export const changeSeriesState = (seriesList, targets, state) => {
  if (targets.length === 0) {
    return seriesList;
  }
  const filter = buildFilter(targets);
  let matches = 0;
  const result = seriesList.map((seriesItem) => {
    const obj = filter[seriesItem.name];
    if (!obj) {
      return seriesItem;
    }
    matches += 1;
    const props = {};
    if (obj.self) {
      props.state = state;
    }
    if (Object.keys(obj.points).length) {
      props.points = seriesItem.points.map(
        point => (obj.points[point.index] ? { ...point, state } : point),
      );
    }
    return { ...seriesItem, ...props };
  });
  // This is to prevent false rerenders.
  return matches > 0 ? result : seriesList;
};
