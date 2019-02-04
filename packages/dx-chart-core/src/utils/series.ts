import { area, Area, CurveFactory } from 'd3-shape';
import { dArea, dLine, dSpline } from '../plugins/series/computeds';
import {
  SeriesList, TransformedPoint, PointList, TargetList, PointDistance, Location, CreateHitTesterFn,
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

type MakePathFn = () => Area<TransformedPoint>;
type IsPointInPathFn = (target: Location) => boolean;
// For a start using browser canvas will suffice.
// However a better and more clean solution should be found.
// Can't d3 perform hit testing?
const createCanvasAbusingHitTester = (makePath: MakePathFn, points: PointList): IsPointInPathFn => {
  const ctx = createContext();
  const path = makePath();
  path.context(ctx);
  path(points as TransformedPoint[]);
  return ([x, y]) => ctx.isPointInPath(x, y);
};

const LINE_POINT_SIZE = 20;
const LINE_TOLERANCE = 10;

const getContinuousPointDistance = (
  [px, py]: Location, { x, y }: TransformedPoint,
) => getSegmentLength(px - x, py - y);

const createContinuousSeriesHitTesterCreator =
  (makePath: MakePathFn): CreateHitTesterFn => (points) => {
    const fallbackHitTest = createCanvasAbusingHitTester(makePath, points);
    return (target) => {
      let minDistance = Number.MAX_VALUE;
      let minIndex: number = 0;
      const list: PointDistance[] = [];
      points.forEach((point, i) => {
        const distance = getContinuousPointDistance(target, point as TransformedPoint);
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

// TODO: Make some base "Point" interface and use it here instead of "any".
type HitTestPointFn = (location: Location, point: any) => Readonly<{ distance: number }> | null;

const createPointsEnumeratingHitTesterCreator =
  (hitTestPoint: HitTestPointFn): CreateHitTesterFn => points => (target) => {
    const list: PointDistance[] = [];
    points.forEach((point) => {
      const status = hitTestPoint(target, point);
      if (status) {
        list.push({ index: point.index, distance: status.distance });
      }
    });
    return list.length ? { points: list } : null;
  };

export const createAreaHitTester = createContinuousSeriesHitTesterCreator(() => {
  const path = area<TransformedPoint>();
  path.x(dArea.x());
  path.y1(dArea.y1()!);
  path.y0(dArea.y0());
  return path;
});

export const createLineHitTester = createContinuousSeriesHitTesterCreator(() => {
  const path = area<TransformedPoint>();
  const getY = dLine.y() as (x: TransformedPoint) => number;
  path.x(dLine.x());
  path.y1(point => getY(point) - LINE_TOLERANCE);
  path.y0(point => getY(point) + LINE_TOLERANCE);
  return path;
});

export const createSplineHitTester = createContinuousSeriesHitTesterCreator(() => {
  const path = area<TransformedPoint>();
  const getY = dSpline.y() as (x: TransformedPoint) => number;
  path.x(dSpline.x());
  path.y1(point => getY(point) - LINE_TOLERANCE);
  path.y0(point => getY(point) + LINE_TOLERANCE);
  path.curve(dSpline.curve() as CurveFactory);
  return path;
});

const hitTestRect = (dx: number, dy: number, halfX: number, halfY: number) => (
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

const mapAngleTod3 = (angle: number) => {
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

type Filter = {
  [series: string]: ReadonlySet<number>;
};

const buildFilter = (targets: TargetList): Filter => {
  const result = {};
  targets.forEach(({ series, point }) => {
    (result[series] = result[series] || new Set()).add(point);
  });
  return result;
};

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
