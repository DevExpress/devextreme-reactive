import {
  symbol,
  symbolCircle,
  line,
  curveMonotoneX,
  area,
  arc,
  pie,
} from 'd3-shape';
import {
  SeriesList, Series, PointList, Point, DataItems, AddSeriesFn, ScalesCache, ScaleSeriesPointsFn,
  GetPointTransformerFn, Colors, Rect,
  BarSeries, ScatterSeries, PieSeries,
  PointComponentProps, PathFn,
} from '../../types';
import { ARGUMENT_DOMAIN } from '../../constants';
import { getValueDomainName, getWidth } from '../../utils/scale';

const getX = ({ x }: PointComponentProps) => x;
const getY = ({ y }: PointComponentProps) => y;
const getY1 = ({ y1 }: PointComponentProps) => y1!;

/** @internal */
export const dArea: PathFn = area<PointComponentProps>()
  .x(getX)
  .y1(getY)
  .y0(getY1) as any;

/** @internal */
export const dLine: PathFn = line<PointComponentProps>()
  .x(getX)
  .y(getY) as any;

/** @internal */
export const dSpline: PathFn = line<PointComponentProps>()
  .x(getX)
  .y(getY)
  .curve(curveMonotoneX) as any;

/** @internal */
export const getPiePointTransformer: GetPointTransformerFn = ({
  argumentScale, valueScale, points,
}) => {
  const x = Math.max(...argumentScale.range()) / 2;
  const y = Math.max(...valueScale.range()) / 2;
  const maxRadius = Math.min(x, y);
  const pieData = pie<Point>().sort(null).value(d => d.value)(points as Point[]);
  return (point) => {
    const { startAngle, endAngle } = pieData[point.index];
    return {
      ...point,
      x,
      y,
      startAngle,
      endAngle,
      maxRadius,
    };
  };
};

/** @internal */
export const getLinePointTransformer: GetPointTransformerFn = ({
  argumentScale, valueScale,
}) => point => ({
  ...point,
  x: argumentScale(point.argument),
  y: valueScale(point.value),
});

// Though transformations for line and scatter are the same,
// separate function instance is required as it contains additional static fields.
/** @internal */
export const getScatterPointTransformer: GetPointTransformerFn = (
  ...args
) => getLinePointTransformer(...args);

/** @internal */
export const getAreaPointTransformer: GetPointTransformerFn = (series) => {
  const transform = getLinePointTransformer(series);
  const y1 = series.valueScale(0);
  return (point) => {
    const ret = transform(point);
    return { ...ret, y1 };
  };
};
// Used for domain calculation and stacking.
getAreaPointTransformer.isStartedFromZero = true;

/** @internal */
export const getBarPointTransformer: GetPointTransformerFn = ({
  argumentScale, valueScale,
}) => {
  const y1 = valueScale(0);
  return point => ({
    ...point,
    y1,
    x: argumentScale(point.argument),
    y: valueScale(point.value),
    maxBarWidth: getWidth(argumentScale),
  });
};
// Used for domain calculation and stacking.
getBarPointTransformer.isStartedFromZero = true;
// Used for Bar grouping.
getBarPointTransformer.isBroad = true;

getPiePointTransformer.getPointColor = (palette, index) => palette[index % palette.length];

/** @internal */
export const findSeriesByName = (
  name: symbol, series: SeriesList,
): Series => series.find(seriesItem => seriesItem.symbolName === name) as Series;

/** @internal */
export const dBar = ({
  x, y, y1, barWidth, maxBarWidth,
}: BarSeries.PointProps) => {
  const width = barWidth * maxBarWidth;
  return {
    x: x - width / 2, y: Math.min(y, y1!), width: width || 2, height: Math.abs(y1! - y),
  };
};

/** @internal */
export const dSymbol = (
  { size }: ScatterSeries.PointOptions,
) => symbol().size(size ** 2).type(symbolCircle)()!;

/** @internal */
export const dPie = ({
  maxRadius, innerRadius, outerRadius, startAngle, endAngle,
}: PieSeries.PointProps) => arc()({
  startAngle,
  endAngle,
  innerRadius: innerRadius * maxRadius,
  outerRadius: outerRadius * maxRadius,
})!;

const getRect = (cx: number, cy: number, dx: number, dy: number): Rect => (
  [cx - dx, cy - dy, cx + dx, cy + dy]
);

getBarPointTransformer.getTargetElement = (point) => {
  const { x, y, y1, barWidth, maxBarWidth } = point as BarSeries.PointProps;
  const width = barWidth * maxBarWidth;
  const height = Math.abs(y1! - y);
  return getRect(x, y + height / 2, width / 2, height / 2);
};

getPiePointTransformer.getTargetElement = (point) => {
  const {
    x, y, innerRadius, outerRadius, maxRadius, startAngle, endAngle,
  } = point as PieSeries.PointProps;
  const center = arc().centroid({
    startAngle,
    endAngle,
    innerRadius: innerRadius * maxRadius,
    outerRadius: outerRadius * maxRadius,
  });
  const cx = center[0] + x;
  const cy = center[1] + y;
  return getRect(cx, cy, 0.5, 0.5);
};

getAreaPointTransformer.getTargetElement = ({ x, y }) => getRect(x, y, 1, 1);

getLinePointTransformer.getTargetElement = getAreaPointTransformer.getTargetElement;

getScatterPointTransformer.getTargetElement = (arg) => {
  const { x, y, point } = arg as ScatterSeries.PointProps;
  const t = point.size / 2;
  return getRect(x, y, t, t);
};

const getUniqueName = (list: SeriesList, name: string) => {
  const names = new Set(list.map(item => item.name));
  let ret = name;
  while (names.has(ret)) {
    // @ts-ignore
    ret = ret.replace(/\d*$/, str => (str ? +str + 1 : 0));
  }
  return ret;
};

// TODO: Memoization is much needed here.
// Though "series" list never persists, single "series" item most often does.
const createPoints = (
  {
    argumentField, valueField, getPointTransformer,
  }: Series,
  data: DataItems, props: any, palette: Colors,
): PointList => {
  const points: Point[] = [];
  data.forEach((dataItem, index) => {
    const argument = dataItem[argumentField];
    const value = dataItem[valueField];
    if (argument !== undefined && value !== undefined) {
      points.push({
        argument,
        value,
        index,
        ...props,
        color: getPointTransformer.getPointColor
          ? getPointTransformer.getPointColor(palette, index) : props.color,
      });
    }
  });
  return points;
};

/** @internal */
export const addSeries: AddSeriesFn = (
  series, data, palette, props, restProps,
) => {
  // It is used to generate unique series dependent attribute names for patterns.
  // *symbolName* cannot be used as it cannot be part of DOM attribute name.
  const index = series.length;
  const seriesColor = props.color || palette[index % palette.length];
  return [...series, {
    ...props,
    index,
    name: getUniqueName(series, props.name),
    points: createPoints(props, data, { ...restProps, color: seriesColor }, palette),
    color: seriesColor,
  }];
};

// TODO: Memoization is much needed here by the same reason as in "createPoints".
// Make "scales" persistent first.
const scalePoints = (series: Series, scales: ScalesCache) => {
  const transform = series.getPointTransformer({
    ...series,
    argumentScale: scales[ARGUMENT_DOMAIN],
    valueScale: scales[getValueDomainName(series.scaleName)],
  });
  const ret: Series = {
    ...series,
    points: series.points.map(transform),
  };
  return ret;
};

/** @internal */
export const scaleSeriesPoints: ScaleSeriesPointsFn = (
  series, scales,
) => series.map(seriesItem => scalePoints(seriesItem, scales));
