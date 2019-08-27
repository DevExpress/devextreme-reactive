import {
  symbol,
  symbolCircle,
  line,
  curveMonotoneX,
  curveMonotoneY,
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
import { Size } from '@devexpress/dx-react-core';
import { ARGUMENT_DOMAIN } from '../../constants';
import { getValueDomainName, getWidth } from '../../utils/scale';

const getArg = ({ arg }: PointComponentProps) => arg;
const getVal = ({ val }: PointComponentProps) => val;
const getStartVal = ({ startVal }: PointComponentProps) => startVal!;

/** @internal */
export const dArea: PathFn = area<PointComponentProps>()
  .x(getArg)
  .y1(getVal)
  .y0(getStartVal) as any;

/** @internal */
export const dRotateArea: PathFn = area<PointComponentProps>()
  .x1(getStartVal)
  .x0(getVal)
  .y(getArg) as any;

/** @internal */
export const dLine: PathFn = line<PointComponentProps>()
  .x(getArg)
  .y(getVal) as any;

/** @internal */
export const dRotateLine = line<PointComponentProps>()
  .x(getVal)
  .y(getArg) as any;

/** @internal */
export const dSpline: PathFn = line<PointComponentProps>()
  .x(getArg)
  .y(getVal)
  .curve(curveMonotoneX) as any;

/** @internal */
export const dRotateSpline: PathFn = line<PointComponentProps>()
  .x(getVal)
  .y(getArg)
  .curve(curveMonotoneY) as any;

/** @internal */
export const dBar = (
  arg: number, val: number, startVal: number, width: number, rotated: boolean,
) => {
  const height = Math.abs(val - startVal!);
  const minVal = Math.min(val, startVal!);
  return {
    x: rotated ? minVal : arg - width / 2,
    y: rotated ? arg - width / 2 : minVal,
    width: rotated ? height : width || 2,
    height: rotated ? width || 2 : height,
  };
};

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
      arg: x,
      val: y,
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
  arg: argumentScale(point.argument),
  val: valueScale(point.value),
} as any);

// Though transformations for line and scatter are the same,
// separate function instance is required as it contains additional static fields.
/** @internal */
export const getScatterPointTransformer: GetPointTransformerFn = (
  ...args
) => getLinePointTransformer(...args);

/** @internal */
export const getAreaPointTransformer: GetPointTransformerFn = (series) => {
  const transform = getLinePointTransformer(series);
  const startVal = series.valueScale(0);
  return (point) => {
    const ret = transform(point);
    return {
      ...ret,
      startVal,
    };
  };
};
// Used for domain calculation and stacking.
getAreaPointTransformer.isStartedFromZero = true;

/** @internal */
export const getBarPointTransformer: GetPointTransformerFn = ({
  argumentScale, valueScale,
}) => {
  const startVal = valueScale(0);
  return point => ({
    ...point,
    arg: argumentScale(point.argument),
    val: valueScale(point.value),
    startVal,
    maxBarWidth: getWidth(argumentScale),
  } as any);
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

const getRect = (
  cArg: number, cVal: number, dArg: number, dVal: number, rotated: boolean,
): Rect => {
  const minArg = cArg - dArg;
  const minVal = cVal - dVal;
  const maxArg = cArg + dArg;
  const maxVal = cVal + dVal;
  return rotated ? [minVal, minArg, maxVal, maxArg] : [minArg, minVal, maxArg, maxVal];
};

getBarPointTransformer.getTargetElement = (point) => {
  const {
    arg, val, startVal, barWidth, maxBarWidth, rotated,
  } = point as BarSeries.PointProps;
  const halfWidth = barWidth * maxBarWidth / 2;
  const halfHeight = Math.abs(startVal! - val) / 2;
  const centerVal = (val + startVal!) / 2;
  return getRect(arg, centerVal, halfWidth, halfHeight, rotated);
};

getPiePointTransformer.getTargetElement = (point) => {
  const {
    arg: x, val: y, innerRadius, outerRadius, maxRadius, startAngle, endAngle,
  } = point as PieSeries.PointProps;
  const center = arc().centroid({
    startAngle,
    endAngle,
    innerRadius: innerRadius * maxRadius,
    outerRadius: outerRadius * maxRadius,
  });
  const cx = center[0] + x;
  const cy = center[1] + y;
  return getRect(cx, cy, 0.5, 0.5, false);
};

getAreaPointTransformer.getTargetElement = ({ arg, val, rotated }) => (
  getRect(arg, val, 1, 1, rotated)
);

getLinePointTransformer.getTargetElement = getAreaPointTransformer.getTargetElement;

getScatterPointTransformer.getTargetElement = (obj) => {
  const { arg, val, point, rotated } = obj as ScatterSeries.PointProps;
  const t = point.size / 2;
  return getRect(arg, val, t, t, rotated);
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
const scalePoints = (series: Series, scales: ScalesCache, rotated: boolean) => {
  const transform = series.getPointTransformer({
    ...series,
    argumentScale: scales[ARGUMENT_DOMAIN],
    valueScale: scales[getValueDomainName(series.scaleName)],
  });
  const ret: Series = {
    ...series,
    rotated,
    points: series.points.map(point => ({
      ...transform(point),
      rotated,
    })),
  };
  return ret;
};

/** @internal */
export const scaleSeriesPoints: ScaleSeriesPointsFn = (
  series, scales, rotated,
) => series.map(seriesItem => scalePoints(seriesItem, scales, rotated));

/** @internal */
export const getVisibility = (
  pane: Size, centerX: number, centerY: number, width: number, height: number,
) => {
  return (centerX - width / 2 < 0 && centerX + width / 2 < 0)
  || (centerX - width / 2 > pane.width && centerX + width / 2 > pane.width)
  || (centerY - height / 2 < 0 && centerY + height / 2 < 0)
  || (centerY - height / 2 > pane.height && centerY + height / 2 > pane.height) ?
  'hidden' : 'visible';
};

/** @internal */
export const adjustBarSize = (
  bar: { width: number, height: number, x: number, y: number }, { width, height }: Size,
) => {
  const x = Math.max(0, bar.x);
  const y = Math.max(0, bar.y);
  return {
    x,
    y,
    width: Math.min(width, bar.x + bar.width) - x,
    height: Math.min(height, bar.y + bar.height) - y,
  };
};
