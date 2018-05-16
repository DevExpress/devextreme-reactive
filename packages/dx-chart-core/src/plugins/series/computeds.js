import {
  symbol,
  symbolCircle,
  line,
  curveCatmullRom,
  area,
  arc,
  pie,
} from 'd3-shape';
import { createScale } from '../../utils/scale';

const getX = ({ x }) => x;
const getY = ({ y }) => y;
const getY1 = ({ y1 }) => y1;

const computeLinePath = (data, scales, argumentField, valueField, name) =>
  data.map(dataItem => ({
    x: scales.xScale(dataItem[argumentField]),
    y: scales.yScale(dataItem[`${valueField}-${name}-end`]),
    y1: scales.yScale(dataItem[`${valueField}-${name}-start`]),
    id: dataItem[argumentField],
    value: dataItem[valueField],
  }));

const getDAttribute = (type, path) => {
  switch (type) {
    case 'spline':
      return line()
        .x(getX)
        .y(getY)
        .curve(curveCatmullRom)(path);
    case 'area':
      return area()
        .x(getX)
        .y1(getY)
        .y0(getY1)(path);
    default:
      return line()
        .x(getX)
        .y(getY)(path);
  }
};

export const xyScales = (
  domainsOptions,
  argumentAxisName,
  domainName,
  layout,
  stacks,
  groupWidth,
  barWidth,
) => {
  const { width, height } = layout;
  const argumentDomainOptions = domainsOptions[argumentAxisName];
  const xScale = createScale(argumentDomainOptions, width, height, 1 - groupWidth);
  const bandwidth = xScale.bandwidth && xScale.bandwidth();

  return {
    xScale,
    yScale: createScale(domainsOptions[domainName], width, height),
    x0Scale: argumentDomainOptions.type === 'band' && createScale({
      orientation: argumentDomainOptions.orientation,
      type: argumentDomainOptions.type,
      domain: stacks,
    }, bandwidth, bandwidth, 1 - barWidth),
  };
};

export const pieAttributes = (
  valueField,
  data,
  width,
  height,
  innerRadius,
  outerRadius,
) => {
  const radius = Math.min(width, height) / 2;
  const pieData = pie().value(d => d[valueField])(data);

  return pieData.map(d =>
    arc().innerRadius(radius * innerRadius)
      .outerRadius(radius * outerRadius || radius)
      .startAngle(d.startAngle)
      .endAngle(d.endAngle)());
};

export const coordinates = (
  data,
  scales,
  argumentField,
  valueField,
  name,
) => computeLinePath(data, scales, argumentField, valueField, name);

export const findSeriesByName = (name, series) =>
  series.find(seriesItem => seriesItem.name === name);

export const lineAttributes = (
  type,
  path,
  scales,
) => ({
  d: getDAttribute(type, path),
  x: scales.xScale.bandwidth ? scales.xScale.bandwidth() / 2 : 0,
  y: 0,
});

export const pointAttributes = (scales, size) => {
  const dPoint = symbol().size([size ** 2]).type(symbolCircle)();
  const offSet = scales.xScale.bandwidth ? scales.xScale.bandwidth() / 2 : 0;
  return item => ({
    d: dPoint,
    x: item.x + offSet,
    y: item.y,
  });
};

export const barPointAttributes = (scales, _, stack) => {
  const bandwidth = scales.x0Scale.bandwidth();
  const offset = scales.x0Scale(stack);
  return item => ({
    x: item.x + offset,
    y: item.y,
    width: bandwidth,
    height: item.y1 - item.y,
  });
};

export const seriesData = (series = [], seriesProps) => [...series, seriesProps];
