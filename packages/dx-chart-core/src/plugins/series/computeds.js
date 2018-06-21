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
  data.reduce((result, dataItem) => {
    if (dataItem[argumentField] !== undefined && dataItem[valueField] !== undefined) {
      return [...result, {
        x: scales.xScale(dataItem[argumentField]),
        y: scales.yScale(dataItem[`${valueField}-${name}-stack`][1]),
        y1: scales.yScale(dataItem[`${valueField}-${name}-stack`][0]),
        id: dataItem[argumentField],
        value: dataItem[valueField],
      }];
    }
    return result;
  }, []);

const getGenerator = (type) => {
  switch (type) {
    case 'spline':
      return line()
        .x(getX)
        .y(getY)
        .curve(curveCatmullRom);
    case 'area':
      return area()
        .x(getX)
        .y1(getY)
        .y0(getY1);
    default:
      return line()
        .x(getX)
        .y(getY);
  }
};

export const xyScales = (
  domainsOptions,
  argumentAxisName,
  domainName,
  layout,
  stacks = [],
  { groupWidth = 1, barWidth = 1 },
) => {
  const { width, height } = layout;
  const argumentDomainOptions = domainsOptions[argumentAxisName];
  const xScale = createScale(argumentDomainOptions, width, height, 1 - groupWidth);
  const bandwidth = xScale.bandwidth ?
    xScale.bandwidth() :
    width / xScale.ticks().length;

  return {
    xScale,
    yScale: createScale(domainsOptions[domainName], width, height),
    x0Scale: createScale({
      orientation: argumentDomainOptions.orientation,
      type: 'band',
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

  return pieData.map(d => ({
    d: arc().innerRadius(radius * innerRadius)
      .outerRadius(radius * outerRadius || radius)
      .startAngle(d.startAngle)
      .endAngle(d.endAngle)(),
    value: d.value,
  }));
};

export const coordinates = (
  data,
  scales,
  argumentField,
  valueField,
  name,
) => computeLinePath(data, scales, argumentField, valueField, name);

export const findSeriesByName = (name, series) =>
  series.find(seriesItem => seriesItem.uniqueName === name);

export const lineAttributes = (
  type,
  scales,
) => ({
  path: getGenerator(type),
  x: scales.xScale.bandwidth ? scales.xScale.bandwidth() / 2 : 0,
  y: 0,
});

export const pointAttributes = (scales, { size = 7 }) => {
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
  const offset = scales.x0Scale(stack) || 0;
  return item => ({
    x: item.x + offset,
    y: Math.min(item.y, item.y1),
    width: bandwidth,
    height: Math.abs(item.y1 - item.y),
  });
};

export const seriesData = (series = [], seriesProps) => [...series, seriesProps];

export const checkZeroStart = (fromZero, axisName, pathType) =>
  ({ ...fromZero, [axisName]: fromZero[axisName] || (pathType === 'area' || pathType === 'bar') });
