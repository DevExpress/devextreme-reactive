import { area } from 'd3-shape';
import {
  dArea, dRotateArea, dLine, dRotateLine, dSpline, dRotateSpline,
} from '../plugins/series/computeds';
import {
  SeriesList, TransformedPoint, PointList, TargetList, PointDistance, Location,
  CreateHitTesterFn, MakePathFn, IsPointInPathFn,
  HitTestPointFn, Filter,
  BarSeries, ScatterSeries, PieSeries,
  PathFn,
} from '../types';

const getSegmentLength = (dx: number, dy: number) => Math.sqrt(dx * dx + dy * dy);

// *distance* is a normalized distance to point.
// It belongs to [0, Infinity):
//  = 0 - at point center
//  = 1 - at point border
//  > 1 - outside point

// This function is called from event handlers (when DOM is available) -
// *window.document* can be accessed safely.
const createContext = () => document.createElement('canvas').getContext('2d')!;

// For a start using browser canvas will suffice.
// However a better and more clean solution should be found.
// Can't d3 perform hit testing?
const createCanvasAbusingHitTester = (
  makePath: MakePathFn, points: PointList, rotated: boolean,
): IsPointInPathFn => {
  const ctx = createContext();
  const path = makePath(rotated);
  path.context(ctx);
  path(points as any);
  return ([x, y]) => ctx.isPointInPath(x, y);
};

const LINE_POINT_SIZE = 20;
const LINE_TOLERANCE = 10;

const getDistance = (
  [px, py]: Location, { arg, val }: TransformedPoint, rotated: boolean,
) => {
  const x = rotated ? val : arg;
  const y = rotated ? arg : val;
  return getSegmentLength(px - x, py - y);
};

const createContinuousSeriesHitTesterCreator =
  (makePath: MakePathFn): CreateHitTesterFn => (points, rotated) => {
    const fallbackHitTest = createCanvasAbusingHitTester(makePath, points, rotated);
    return (target) => {
      let minDistance = Number.MAX_VALUE;
      let minIndex: number = 0;
      const list: PointDistance[] = [];
      points.forEach((point, i) => {
        const distance = getDistance(target, point as TransformedPoint, rotated);
        if (distance <= LINE_POINT_SIZE) {
          list.push({ distance, index: point.index });
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

const createPointsEnumeratingHitTesterCreator =
  (hitTestPoint: HitTestPointFn): CreateHitTesterFn => (points, rotated) => (target) => {
    const list: PointDistance[] = [];
    points.forEach((point) => {
      const status = hitTestPoint(target, point as TransformedPoint, rotated);
      if (status) {
        list.push({ index: point.index, distance: status.distance });
      }
    });
    return list.length ? { points: list } : null;
  };

/** @internal */
export const createAreaHitTester = createContinuousSeriesHitTesterCreator((rotated) => {
  const path: PathFn = area() as any;
  const hitArea = rotated ? dRotateArea : dArea;
  if (rotated) {
    path.x1!(hitArea.x1!());
    path.x0!(hitArea.x0!());
    path.y(hitArea.y());
  } else {
    path.x(hitArea.x());
    path.y1!(hitArea.y1!());
    path.y0!(hitArea.y0!());
  }
  return path;
});

/** @internal */
export const createLineHitTester = createContinuousSeriesHitTesterCreator((rotated) => {
  const path: PathFn = area() as any;
  const hitLine = rotated ? dRotateLine : dLine;
  if (rotated) {
    const getX = hitLine.x();
    path.y(hitLine.y());
    path.x0!(point => getX(point) + LINE_TOLERANCE);
    path.x1!(point => getX(point) - LINE_TOLERANCE);
  } else {
    const getY = hitLine.y();
    path.x(hitLine.x());
    path.y1!(point => getY(point) - LINE_TOLERANCE);
    path.y0!(point => getY(point) + LINE_TOLERANCE);
  }
  return path;
});

/** @internal */
export const createSplineHitTester = createContinuousSeriesHitTesterCreator((rotated) => {
  const path: PathFn = area() as any;
  const hitSpline = rotated ? dRotateSpline : dSpline;
  if (rotated) {
    const getX = hitSpline.x();
    path.y(hitSpline.y());
    path.x1!(point => getX(point) - LINE_TOLERANCE);
    path.x0!(point => getX(point) + LINE_TOLERANCE);
  } else {
    const getY = hitSpline.y();
    path.x(hitSpline.x());
    path.y1!(point => getY(point) - LINE_TOLERANCE);
    path.y0!(point => getY(point) + LINE_TOLERANCE);
  }
  path.curve!(hitSpline.curve!());
  return path;
});

const hitTestRect = (dx: number, dy: number, halfX: number, halfY: number) => (
  Math.abs(dx) <= halfX && Math.abs(dy) <= halfY ? {
    distance: getSegmentLength(dx, dy),
  } : null
);

// Some kind of binary search can be used here as bars can be ordered along argument axis.
/** @internal */
export const createBarHitTester = createPointsEnumeratingHitTesterCreator(
  ([px, py], point, rotated) => {
    const {
      arg, val, startVal, barWidth, maxBarWidth,
    } = point as BarSeries.PointProps;
    const halfWidth = maxBarWidth * barWidth / 2;
    const halfHeight = Math.abs(val - startVal!) / 2;
    const centerVal = (val + startVal!) / 2;
    const xCenter = rotated ? centerVal : arg;
    const yCenter = rotated ? arg : centerVal;
    return hitTestRect(
      px - xCenter,
      py - yCenter,
      rotated ? halfHeight : halfWidth,
      rotated ? halfWidth : halfHeight,
    );
  },
);

/** @internal */
export const createScatterHitTester = createPointsEnumeratingHitTesterCreator(
  ([px, py], obj, rotated) => {
    const { point } = obj as ScatterSeries.PointProps;
    const distance = getDistance([px, py], obj, rotated);
    return distance <= point.size / 2 ? { distance } : null;
  },
);

const mapAngleTod3 = (angle: number) => {
  const ret = angle + Math.PI / 2;
  return ret >= 0 ? ret : ret + Math.PI * 2;
};

// Some kind of binary search can be used here as pies can be ordered along angle axis.
/** @internal */
export const createPieHitTester = createPointsEnumeratingHitTesterCreator(
  ([px, py], point) => {
    const {
      arg: x, val: y, innerRadius, outerRadius, startAngle, maxRadius, endAngle,
    } = point as PieSeries.PointProps;
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

const buildFilter = (targets: TargetList): Filter => {
  const result = {};
  targets.forEach(({ series, point }) => {
    (result[series] = result[series] || new Set()).add(point);
  });
  return result;
};

/** @internal */
export const changeSeriesState = (seriesList: SeriesList, targets: TargetList, state: string) => {
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
    const props: { state: string, points?: TransformedPoint[] } = { state };
    if (set.size) {
      props.points = (seriesItem.points as TransformedPoint[]).map(
        point => (set.has(point.index) ? { ...point, state } : point),
      );
    }
    return { ...seriesItem, ...props };
  });
  // This is to prevent false rerenders.
  return matches > 0 ? result : seriesList;
};
