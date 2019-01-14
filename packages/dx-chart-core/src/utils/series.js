import { area } from 'd3-shape';
import { dArea, dLine, dSpline } from '../plugins/series/computeds';

const getSegmentLength = (dx, dy) => Math.sqrt(dx * dx + dy * dy);

// *distance* is a normalized distance to point.
// It belongs to [0, Infinity):
//  = 0 - at point center
//  = 1 - at point border
//  > 1 - outside point

// This function is called from event handlers (when DOM is available) -
// *window.document* can be accessed safely.
const createContext = () => document.createElement('canvas').getContext('2d'); // eslint-disable-line no-undef

// For a start using browser canvas will suffice.
// However a better and more clean solution should be found.
// Can't d3 perform hit testing?
const createCanvasAbusingHitTester = (makePath, points) => {
  const ctx = createContext();
  const path = makePath();
  path.context(ctx);
  path(points);
  return ([x, y]) => ctx.isPointInPath(x, y);
};

const LINE_POINT_SIZE = 20;
const LINE_TOLERANCE = 10;

const getContinuousPointDistance = ([px, py], { x, y }) => getSegmentLength(px - x, py - y);

const createContinuousSeriesHitTesterCreator = makePath => (points) => {
  const fallbackHitTest = createCanvasAbusingHitTester(makePath, points);
  return (target) => {
    let minDistance = Number.MAX_VALUE;
    let minIndex;
    const list = [];
    points.forEach((point, i) => {
      const distance = getContinuousPointDistance(target, point);
      if (distance <= LINE_POINT_SIZE) {
        list.push({ index: point.index, distance });
      }
      if (distance < minDistance) {
        minDistance = distance;
        minIndex = i;
      }
    });
    // This is special case for continuous series - if no point is actually hit
    // then the closest point to the pointer position is picked.
    if (!list.length && fallbackHitTest(target)) {
      list.push({ index: points[minIndex].index, distance: minDistance });
    }
    return list.length ? { points: list } : null;
  };
};

const createPointsEnumeratingHitTesterCreator = hitTestPoint => points => (target) => {
  const list = [];
  points.forEach((point) => {
    const status = hitTestPoint(target, point);
    if (status) {
      list.push({ index: point.index, distance: status.distance });
    }
  });
  return list.length ? { points: list } : null;
};

export const createAreaHitTester = createContinuousSeriesHitTesterCreator(() => {
  const path = area();
  path.x(dArea.x());
  path.y1(dArea.y1());
  path.y0(dArea.y0());
  return path;
});

export const createLineHitTester = createContinuousSeriesHitTesterCreator(() => {
  const path = area();
  const getY = dLine.y();
  path.x(dLine.x());
  path.y1(point => getY(point) - LINE_TOLERANCE);
  path.y0(point => getY(point) + LINE_TOLERANCE);
  return path;
});

export const createSplineHitTester = createContinuousSeriesHitTesterCreator(() => {
  const path = area();
  const getY = dSpline.y();
  path.x(dSpline.x());
  path.y1(point => getY(point) - LINE_TOLERANCE);
  path.y0(point => getY(point) + LINE_TOLERANCE);
  path.curve(dSpline.curve());
  return path;
});

const hitTestRect = (dx, dy, halfX, halfY) => (
  Math.abs(dx) <= halfX && Math.abs(dy) <= halfY ? {
    distance: getSegmentLength(dx, dy),
  } : null
);

// Some kind of binary search can be used here as bars can be ordered along argument axis.
export const createBarHitTester = createPointsEnumeratingHitTesterCreator(
  ([px, py], {
    x, y, y1, barWidth, maxBarWidth,
  }) => {
    const xCenter = x;
    const yCenter = (y + y1) / 2;
    const halfWidth = maxBarWidth * barWidth / 2;
    const halfHeight = Math.abs(y - y1) / 2;
    return hitTestRect(px - xCenter, py - yCenter, halfWidth, halfHeight);
  },
);

export const createScatterHitTester = createPointsEnumeratingHitTesterCreator(
  ([px, py], { x, y, point }) => {
    const distance = getSegmentLength(px - x, py - y);
    return distance <= point.size / 2 ? { distance } : null;
  },
);

const mapAngleTod3 = (angle) => {
  const ret = angle + Math.PI / 2;
  return ret >= 0 ? ret : ret + Math.PI * 2;
};

// Some kind of binary search can be used here as pies can be ordered along angle axis.
export const createPieHitTester = createPointsEnumeratingHitTesterCreator(
  ([px, py], {
    x, y, innerRadius, outerRadius, startAngle, maxRadius, endAngle,
  }) => {
    const inner = innerRadius * maxRadius;
    const outer = outerRadius * maxRadius;
    const rCenter = (inner + outer) / 2;
    const angleCenter = (startAngle + endAngle) / 2;
    const halfRadius = (outer - inner) / 2;
    const halfAngle = Math.abs(startAngle - endAngle) / 2;
    const dx = px - x;
    const dy = py - y;
    const r = getSegmentLength(dx, dy);
    const angle = mapAngleTod3(Math.atan2(dy, dx));
    // This is not a correct distance calculation but for now it will suffice.
    // For Pie series it would not be actually used.
    return hitTestRect(r - rCenter, angle - angleCenter, halfRadius, halfAngle);
  },
);

const buildFilter = (targets) => {
  const result = {};
  targets.forEach(({ series, point }) => {
    (result[series] = result[series] || new Set()).add(point);
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
    const set = filter[seriesItem.name];
    if (!set) {
      return seriesItem;
    }
    matches += 1;
    const props = { state };
    if (set.size) {
      props.points = seriesItem.points.map(
        point => (set.has(point.index) ? { ...point, state } : point),
      );
    }
    return { ...seriesItem, ...props };
  });
  // This is to prevent false rerenders.
  return matches > 0 ? result : seriesList;
};
