import {
  symbol,
  symbolCircle,
  line,
  curveMonotoneX,
  area,
  arc,
  pie,
} from 'd3-shape';
import { scaleOrdinal } from 'd3-scale';
import { ARGUMENT_DOMAIN } from '../../constants';
import { getWidth, getValueDomainName, fixOffset } from '../../utils/scale';

const getX = ({ x }) => x;
const getY = ({ y }) => y;
const getY1 = ({ y1 }) => y1;

const DEFAULT_POINT_SIZE = 7;

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
  argumentScale, valueScale, points, innerRadius, outerRadius, palette,
}) => {
  const x = Math.max(...argumentScale.range()) / 2;
  const y = Math.max(...valueScale.range()) / 2;
  const radius = Math.min(x, y);
  const pieData = pie().sort(null).value(d => d.value)(points);
  const inner = innerRadius * radius;
  const outer = outerRadius * radius;
  const gen = arc().innerRadius(inner).outerRadius(outer);
  const colorScale = scaleOrdinal().range(palette);
  return (point) => {
    const { startAngle, endAngle } = pieData[point.index];
    return {
      ...point,
      // TODO: It should be calculated in *pointComponent*.
      d: gen.startAngle(startAngle).endAngle(endAngle)(),
      color: point.color || colorScale(point.index),
      x,
      y,
      innerRadius: inner,
      outerRadius: outer,
      startAngle,
      endAngle,
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
  argumentScale, valueScale, barWidth,
}) => {
  const y1 = valueScale(0);
  const categoryWidth = getWidth(argumentScale);
  const offset = categoryWidth * (1 - barWidth) / 2;
  const width = categoryWidth * barWidth;
  return point => ({
    ...point,
    x: argumentScale(point.argument) + offset,
    y: valueScale(point.value),
    y1,
    width,
  });
};
// Used for domain calculation and stacking.
getBarPointTransformer.isStartedFromZero = true;
// Used for Bar grouping.
getBarPointTransformer.isBroad = true;

export const findSeriesByName = (
  name, series,
) => series.find(seriesItem => seriesItem.symbolName === name);

export const dBar = ({
  x, y, y1, width,
}) => ({
  x, y: Math.min(y, y1), width: width || 2, height: Math.abs(y1 - y),
});

export const pointAttributes = ({ size = DEFAULT_POINT_SIZE }) => {
  const dPoint = symbol().size([size ** 2]).type(symbolCircle)();
  return item => ({
    // TODO: It should be calculated in *pointComponent*.
    d: dPoint,
    x: item.x,
    y: item.y,
  });
};

getBarPointTransformer.getTargetElement = ({
  x, y, y1, width,
}) => {
  const height = Math.abs(y1 - y);
  return {
    x,
    y,
    d: `M0,0 ${width},0 ${width},${height} 0,${height}`,
  };
};
getPiePointTransformer.getTargetElement = ({
  x, y, innerRadius, outerRadius, startAngle, endAngle,
}) => {
  const center = arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius)
    .startAngle(startAngle)
    .endAngle(endAngle)
    .centroid();
  return {
    x: center[0] + x, y: center[1] + y, d: symbol().size([1 ** 2]).type(symbolCircle)(),
  };
};

getAreaPointTransformer.getTargetElement = ({ x, y }) => {
  const size = DEFAULT_POINT_SIZE; // TODO get user size
  return {
    x,
    y,
    d: symbol().size([size ** 2]).type(symbolCircle)(),
  };
};

getLinePointTransformer.getTargetElement = getAreaPointTransformer.getTargetElement;

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
const createPoints = (argumentField, valueField, data) => {
  const points = [];
  data.forEach((dataItem, index) => {
    const argument = dataItem[argumentField];
    const value = dataItem[valueField];
    if (argument !== undefined && value !== undefined) {
      points.push({ argument, value, index });
    }
  });
  return points;
};

export const addSeries = (series, data, palette, props) => {
  // It is used to generate unique series dependent attribute names for patterns.
  // *symbolName* cannot be used as it cannot be part of DOM attribute name.
  const index = series.length;
  return [...series, {
    ...props,
    name: getUniqueName(series, props.name),
    index,
    points: createPoints(props.argumentField, props.valueField, data),
    palette, // TODO: For Pie only. Find a better place for it.
    color: props.color || palette[index % palette.length],
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
