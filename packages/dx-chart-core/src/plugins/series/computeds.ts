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
  Point, Domains,
  Series, DPieFn, DBarFn, GetPointTransformerFn, DataItems,
} from '../../types';
import { ARGUMENT_DOMAIN } from '../../constants';
import { getWidth, getValueDomainName, fixOffset } from '../../utils/scale';
import { PureComputed } from '@devexpress/dx-core';

const getX = ({ x }: Point) => x;
const getY = ({ y }: Point) => y;
const getY1 = ({ y1 }: Point) => y1;

export const dArea = area<Point>()
  .x(getX)
  .y1(getY)
  .y0(getY1);

export const dLine = line<Point>()
  .x(getX)
  .y(getY);

export const dSpline = line<Point>()
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

export const findSeriesByName: PureComputed<[string, Series[]], Series | undefined> = (
  name, series,
) => series.find(seriesItem => seriesItem.symbolName === name);

export const dBar: DBarFn = ({
  x, y, y1, width,
}) => ({
  x: x - width / 2, y: Math.min(y, y1), width: width || 2, height: Math.abs(y1 - y),
});

export const dSymbol: PureComputed<[Point], string> = (
  { size },
) => symbol().size(size ** 2).type(symbolCircle)()!;

export const dPie: DPieFn = ({
  maxRadius, innerRadius, outerRadius, startAngle, endAngle,
}) => arc()({
  startAngle,
  endAngle,
  innerRadius: innerRadius * maxRadius,
  outerRadius: outerRadius * maxRadius,
})!;

getBarPointTransformer.getTargetElement = ({
  x, y, y1, barWidth, maxBarWidth,
}) => {
  const width = barWidth * maxBarWidth;
  const height = Math.abs(y1 - y);
  return {
    y,
    x: x - width / 2,
    d: `M0,0 ${width},0 ${width},${height} 0,${height}`,
  };
};
getPiePointTransformer.getTargetElement = ({
  x, y, innerRadius, outerRadius, maxRadius, startAngle, endAngle,
}) => {
  const center = arc().centroid({
    startAngle,
    endAngle,
    innerRadius: innerRadius * maxRadius,
    outerRadius: outerRadius * maxRadius,
  });
  return {
    x: center[0] + x, y: center[1] + y, d: symbol().size(1 ** 2).type(symbolCircle)(),
  };
};

getAreaPointTransformer.getTargetElement = ({ x, y }) => ({
  x,
  y,
  d: symbol().size(2 ** 2).type(symbolCircle)(),
});

getLinePointTransformer.getTargetElement = getAreaPointTransformer.getTargetElement;

getScatterPointTransformer.getTargetElement = ({ x, y, point }) => ({
  x,
  y,
  d: symbol().size(point.size ** 2).type(symbolCircle)(),
});

const getUniqueName: PureComputed<[Series[], string], string> = (list, name) => {
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
const createPoints: PureComputed<[Series, DataItems[], any, string[]], Point[]> = (
  {
    argumentField, valueField, getPointTransformer,
  },
  data, props, palette) => {
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

export const addSeries: PureComputed<
  [Series[], DataItems, string[], any?, any?]
> = (series, data, palette, props?, restProps?) => {
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
const scalePoints: PureComputed<[Series, Domains]> = (series, scales) => {
  const transform = series.getPointTransformer({
    ...series,
    argumentScale: scales[ARGUMENT_DOMAIN],
    valueScale: scales[getValueDomainName(series.scaleName)],
  });
  return {
    ...series,
    points: series.points.map(transform),
  };
};

export const scaleSeriesPoints: PureComputed<
  [Series[], Domains]
> = (series, scales) => series.map(seriesItem => scalePoints(seriesItem, scales) as Series);
