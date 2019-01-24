import {
  symbol,
  symbolCircle,
  line,
  curveMonotoneX,
  area,
  arc,
  pie,
} from 'd3-shape';
import { ARGUMENT_DOMAIN } from '../../constants';
import { getWidth, getValueDomainName, fixOffset } from '../../utils/scale';

const getX = ({ x }) => x;
const getY = ({ y }) => y;
const getY1 = ({ y1 }) => y1;

export const dArea = area()
  .x(getX)
  .y1(getY)
  .y0(getY1);

export const dLine = line()
  .x(getX)
  .y(getY);

export const dSpline = line()
  .x(getX)
  .y(getY)
  .curve(curveMonotoneX);

export const getPiePointTransformer = ({
  argumentScale, valueScale, points,
}) => {
  const x = Math.max(...argumentScale.range()) / 2;
  const y = Math.max(...valueScale.range()) / 2;
  const maxRadius = Math.min(x, y);
  const pieData = pie().sort(null).value(d => d.value)(points);
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

export const getLinePointTransformer = ({ argumentScale, valueScale }) => {
  const fixedArgumentScale = fixOffset(argumentScale);
  return point => ({
    ...point,
    x: fixedArgumentScale(point.argument),
    y: valueScale(point.value),
  });
};

export const getScatterPointTransformer = getLinePointTransformer;

export const getAreaPointTransformer = (series) => {
  const transform = getLinePointTransformer(series);
  const y1 = series.valueScale(0);
  return (point) => {
    const ret = transform(point);
    ret.y1 = y1;
    return ret;
  };
};
// Used for domain calculation and stacking.
getAreaPointTransformer.isStartedFromZero = true;

export const getBarPointTransformer = ({
  argumentScale, valueScale,
}) => {
  const y1 = valueScale(0);
  const fixedArgumentScale = fixOffset(argumentScale);
  return point => ({
    ...point,
    x: fixedArgumentScale(point.argument),
    y: valueScale(point.value),
    y1,
    maxBarWidth: getWidth(argumentScale),
  });
};
// Used for domain calculation and stacking.
getBarPointTransformer.isStartedFromZero = true;
// Used for Bar grouping.
getBarPointTransformer.isBroad = true;

getPiePointTransformer.getPointColor = (palette, index) => palette[index % palette.length];

export const findSeriesByName = (
  name, series,
) => series.find(seriesItem => seriesItem.symbolName === name);

export const dBar = ({
  x, y, y1, width,
}) => ({
  x: x - width / 2, y: Math.min(y, y1), width: width || 2, height: Math.abs(y1 - y),
});

export const dSymbol = ({ size }) => symbol().size([size ** 2]).type(symbolCircle)();

export const dPie = ({
  maxRadius, innerRadius, outerRadius, startAngle, endAngle,
}) => arc()
  .innerRadius(innerRadius * maxRadius)
  .outerRadius(outerRadius * maxRadius)
  .startAngle(startAngle)
  .endAngle(endAngle)();

getBarPointTransformer.getTargetElement = ({
  x, y, y1, barWidth, maxBarWidth,
}) => {
  const width = barWidth * maxBarWidth;
  const height = Math.abs(y1 - y);
  return {
    x: x - width / 2,
    y,
    d: `M0,0 ${width},0 ${width},${height} 0,${height}`,
  };
};
getPiePointTransformer.getTargetElement = ({
  x, y, innerRadius, outerRadius, maxRadius, startAngle, endAngle,
}) => {
  const center = arc()
    .innerRadius(innerRadius * maxRadius)
    .outerRadius(outerRadius * maxRadius)
    .startAngle(startAngle)
    .endAngle(endAngle)
    .centroid();
  return {
    x: center[0] + x, y: center[1] + y, d: symbol().size([1 ** 2]).type(symbolCircle)(),
  };
};

getAreaPointTransformer.getTargetElement = ({ x, y }) => ({
  x,
  y,
  d: symbol().size([2 ** 2]).type(symbolCircle)(),
});

getLinePointTransformer.getTargetElement = getAreaPointTransformer.getTargetElement;

getScatterPointTransformer.getTargetElement = ({ x, y, point }) => ({
  x,
  y,
  d: symbol().size([point.size ** 2]).type(symbolCircle)(),
});

const getUniqueName = (list, name) => {
  const names = new Set(list.map(item => item.name));
  let ret = name;
  while (names.has(ret)) {
    ret = ret.replace(/\d*$/, str => (str ? +str + 1 : 0));
  }
  return ret;
};

// TODO: Memoization is much needed here.
// Though "series" list never persists, single "series" item most often does.
const createPoints = ({ argumentField, valueField, getPointTransformer }, data, props, palette) => {
  const points = [];
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

export const addSeries = (series, data, palette, props, restProps) => {
  // It is used to generate unique series dependent attribute names for patterns.
  // *symbolName* cannot be used as it cannot be part of DOM attribute name.
  const index = series.length;
  const seriesColor = props.color || palette[index % palette.length];
  return [...series, {
    ...props,
    name: getUniqueName(series, props.name),
    index,
    points: createPoints(props, data, { ...restProps, color: seriesColor }, palette),
    color: seriesColor,
  }];
};

// TODO: Memoization is much needed here by the same reason as in "createPoints".
// Make "scales" persistent first.
const scalePoints = (series, scales) => {
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

export const scaleSeriesPoints = (series, scales) => series.map(
  seriesItem => scalePoints(seriesItem, scales),
);
