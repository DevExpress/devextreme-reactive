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
  SeriesList, Series, PointList, Point, DataItems,
  GetPointTransformerFn, TransformedPoint, BarPoint, PiePoint, ScatterPoint, Palette, ScalesCache,
} from '../../types';
import { ARGUMENT_DOMAIN } from '../../constants';
import { getWidth, getValueDomainName, fixOffset } from '../../utils/scale';

const getX = ({ x }: TransformedPoint) => x;
const getY = ({ y }: TransformedPoint) => y;
const getY1 = ({ y1 }: TransformedPoint) => y1!;

export const dArea = area<TransformedPoint>()
  .x(getX)
  .y1(getY)
  .y0(getY1);

export const dLine = line<TransformedPoint>()
  .x(getX)
  .y(getY);

export const dSpline = line<TransformedPoint>()
  .x(getX)
  .y(getY)
  .curve(curveMonotoneX);

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

export const getLinePointTransformer: GetPointTransformerFn = ({
  argumentScale, valueScale,
}) => {
  const fixedArgumentScale = fixOffset(argumentScale);
  return point => ({
    ...point,
    x: fixedArgumentScale(point.argument),
    y: valueScale(point.value),
  });
};

export const getScatterPointTransformer = getLinePointTransformer;

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

export const getBarPointTransformer: GetPointTransformerFn = ({
  argumentScale, valueScale,
}) => {
  const y1 = valueScale(0);
  const fixedArgumentScale = fixOffset(argumentScale);
  return point => ({
    ...point,
    y1,
    x: fixedArgumentScale(point.argument),
    y: valueScale(point.value),
    maxBarWidth: getWidth(argumentScale),
  });
};
// Used for domain calculation and stacking.
getBarPointTransformer.isStartedFromZero = true;
// Used for Bar grouping.
getBarPointTransformer.isBroad = true;

getPiePointTransformer.getPointColor = (palette, index) => palette[index % palette.length];

export const findSeriesByName = (
  name: string, series: SeriesList,
) => series.find(seriesItem => seriesItem.symbolName === name);

export const dBar = ({
  x, y, y1, width,
}: TransformedPoint & { width: number }) => ({
  x: x - width / 2, y: Math.min(y, y1!), width: width || 2, height: Math.abs(y1! - y),
});

export const dSymbol = (
  { size }: { size: number },
) => symbol().size(size ** 2).type(symbolCircle)()!;

export const dPie = ({
  maxRadius, innerRadius, outerRadius, startAngle, endAngle,
}: {
  maxRadius: number, innerRadius: number, outerRadius: number, startAngle: number, endAngle: number,
}) => arc()({
  startAngle,
  endAngle,
  innerRadius: innerRadius * maxRadius,
  outerRadius: outerRadius * maxRadius,
})!;

getBarPointTransformer.getTargetElement = (point: TransformedPoint) => {
  const { x, y, y1, barWidth, maxBarWidth } = point as BarPoint;
  const width = barWidth * maxBarWidth;
  const height = Math.abs(y1! - y);
  return {
    y,
    x: x - width / 2,
    d: `M0,0 ${width},0 ${width},${height} 0,${height}`,
  };
};

getPiePointTransformer.getTargetElement = (point: TransformedPoint) => {
  const {
    x, y, innerRadius, outerRadius, maxRadius, startAngle, endAngle,
  } = point as PiePoint;
  const center = arc().centroid({
    startAngle,
    endAngle,
    innerRadius: innerRadius * maxRadius,
    outerRadius: outerRadius * maxRadius,
  });
  return {
    x: center[0] + x,
    y: center[1] + y,
    d: symbol().size(1 ** 2).type(symbolCircle)()!,
  };
};

getAreaPointTransformer.getTargetElement = ({ x, y }: TransformedPoint) => ({
  x,
  y,
  d: symbol().size(2 ** 2).type(symbolCircle)()!,
});

getLinePointTransformer.getTargetElement = getAreaPointTransformer.getTargetElement;

getScatterPointTransformer.getTargetElement = (arg: TransformedPoint) => {
  const { x, y, point } = arg as ScatterPoint;
  return {
    x,
    y,
    d: symbol().size(point.size ** 2).type(symbolCircle)()!,
  };
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
  data: DataItems, props: any, palette: Palette) => {
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
  return points as PointList;
};

export const addSeries = (
  series: SeriesList, data: DataItems, palette: Palette, props?: any, restProps?: any,
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
  }] as SeriesList;
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

export const scaleSeriesPoints = (
  series: SeriesList, scales: ScalesCache,
) => series.map(seriesItem => scalePoints(seriesItem, scales) as Series) as SeriesList;
