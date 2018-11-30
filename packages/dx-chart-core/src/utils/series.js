import { area } from 'd3-shape';
import { dArea, dLine, dSpline } from '../plugins/series/computeds';

// Based on https://en.wikipedia.org/wiki/Uniform_norm
const getUniformDistance = (dx, dy, rx, ry) => Math.max(
  Math.abs(dx) / rx, Math.abs(dy) / ry,
);

// Based on https://en.wikipedia.org/wiki/Norm_(mathematics)#Euclidean_norm
const getEuclideanDistance = (dx, dy, rx, ry) => Math.sqrt(
  (dx * dx) / (rx * rx) + (dy * dy) / (ry * ry),
);

const createPointsEnumeratingHitTesterCreator = hitTestPoint => points => (target) => {
  const list = [];
  points.forEach((point) => {
    // *distance* is a normalized distance to point.
    // It belongs to [0, Infinity):
    //  = 0 - at point center
    //  = 1 - at point border
    //  > 1 - outside point
    const distance = hitTestPoint(target, point);
    if (distance <= 1) {
      list.push({ index: point.index, distance });
    }
  });
  return list.length ? { points: list } : null;
};

const LINE_TOLERANCE = 10;

const createContinuousSeriesPointsHitTester = createPointsEnumeratingHitTesterCreator(
  ([px, py], { x, y }) => getEuclideanDistance(px - x, py - y, LINE_TOLERANCE, LINE_TOLERANCE),
);

// This function is called from event handlers (when DOM is available) -
// *window.document* can be accessed safely.
const createContext = () => document.createElement('canvas').getContext('2d'); // eslint-disable-line no-undef

// For a start using browser canvas will suffice.
// However a better and more clean solution should be found.
// Can't d3 perform hit testing?
const createCanvasAbusingHitTesterCreator = makePath => (points) => {
  const ctx = createContext();
  const path = makePath();
  path.context(ctx);
  path(points);
  const hitTestPoints = createContinuousSeriesPointsHitTester(points);
  return point => (ctx.isPointInPath(point[0], point[1]) ? (hitTestPoints(point) || {}) : null);
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

// Some kind of binary search can be used here as bars can be ordered along argument axis.
export const createBarHitTester = createPointsEnumeratingHitTesterCreator(
  ([px, py], point) => {
    const xCenter = point.x + point.width / 2;
    const yCenter = (point.y + point.y1) / 2;
    const halfWidth = point.width / 2;
    const halfHeight = Math.abs(point.y - point.y1) / 2;
    return getUniformDistance(px - xCenter, py - yCenter, halfWidth, halfHeight);
  },
);

// TODO: Use actual point size here!
export const createScatterHitTester = createPointsEnumeratingHitTesterCreator(
  ([px, py], { x, y }) => getEuclideanDistance(px - x, py - y, 10, 10),
);

const mapAngleTod3 = (angle) => {
  const ret = angle + Math.PI / 2;
  return ret >= 0 ? ret : ret + Math.PI * 2;
};

// Some kind of binary search can be used here as pies can be ordered along angle axis.
export const createPieHitTester = createPointsEnumeratingHitTesterCreator(
  ([px, py], {
    x, y, innerRadius, outerRadius, startAngle, endAngle,
  }) => {
    const rCenter = (innerRadius + outerRadius) / 2;
    const angleCenter = (startAngle + endAngle) / 2;
    const halfRadius = (outerRadius - innerRadius) / 2;
    const halfAngle = Math.abs(startAngle - endAngle) / 2;
    const dx = px - x;
    const dy = py - y;
    const r = Math.sqrt(dx * dx + dy * dy);
    const angle = mapAngleTod3(Math.atan2(dy, dx));
    return getUniformDistance(r - rCenter, angle - angleCenter, halfRadius, halfAngle);
  },
);

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
