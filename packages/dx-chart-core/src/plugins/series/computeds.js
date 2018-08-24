import {
  symbol,
  symbolCircle,
  line,
  curveMonotoneX,
  area,
  arc,
  pie,
} from 'd3-shape';
import { createScale } from '../../utils/scale';

const getX = ({ x, width }) => x + (width / 2);
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

export const xyScales = (
  argumentDomainOptions,
  valueDomainOptions,
  { width, height },
  groupWidth,
) => ({
  xScale: createScale(argumentDomainOptions, width, height, 1 - groupWidth),
  yScale: createScale(valueDomainOptions, width, height),
});

export const pieAttributes = (
  data,
  { xScale, yScale },
  argumentField,
  valueField,
  name,
  stack,
  stacks,
  { innerRadius = 0, outerRadius = 1 },
) => {
  const width = Math.max.apply(null, xScale.range());
  const height = Math.max.apply(null, yScale.range());
  const radius = Math.min(width, height) / 2;
  const pieData = pie().value(d => d[valueField])(data);

  return pieData.map(({
    startAngle, endAngle, value, data: itemData,
  }) => ({
    d: arc()
      .innerRadius(innerRadius * radius)
      .outerRadius(outerRadius * radius)
      .startAngle(startAngle)
      .endAngle(endAngle)(),
    value,
    data: itemData,
    id: itemData[argumentField],
    x: width / 2,
    y: height / 2,
  }));
};

export const coordinates = (
  data,
  { xScale, yScale },
  argumentField,
  valueField,
  name,
) => data.reduce((result, dataItem, index) => {
  if (dataItem[argumentField] !== undefined && dataItem[valueField] !== undefined) {
    return [...result, {
      x: xScale(dataItem[argumentField]),
      y: yScale(dataItem[`${valueField}-${name}-stack`][1]),
      y1: yScale(dataItem[`${valueField}-${name}-stack`][0]),
      width: xScale.bandwidth ? xScale.bandwidth() : 0,
      id: index,
      value: dataItem[valueField],
    }];
  }
  return result;
}, []);

export const barCoordinates = (
  data,
  { xScale, yScale },
  argumentField,
  valueField,
  name,
  stack,
  stacks = [undefined],
  { barWidth = 0.9 },
) => {
  const rawCoordinates = coordinates(
    data,
    { xScale, yScale },
    argumentField,
    valueField,
    name,
  );
  const bandwidth = xScale.bandwidth ? xScale.bandwidth() : 0;
  const x0Scale = createScale(
    {
      type: 'band',
      domain: stacks,
    },
    bandwidth,
    bandwidth,
    1 - barWidth,
  );
  return rawCoordinates.map(item => ({
    ...item,
    width: x0Scale.bandwidth(),
    x: item.x + x0Scale(stack),
  }));
};

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
    d: dPoint,
    x: item.x,
    y: item.y,
  });
};

const createNewUniqueName = name => name.replace(/\d*$/, str => (str ? +str + 1 : 0));

export const seriesData = (series = [], seriesProps) => {
  if (series.find((({ uniqueName }) => uniqueName === seriesProps.uniqueName))) {
    return seriesData(
      series,
      { ...seriesProps, uniqueName: createNewUniqueName(seriesProps.uniqueName) },
    );
  }
  return [...series, seriesProps];
};

export const checkZeroStart = (fromZero, axisName, pathType) => ({ ...fromZero, [axisName]: fromZero[axisName] || (pathType === 'area' || pathType === 'bar') });
