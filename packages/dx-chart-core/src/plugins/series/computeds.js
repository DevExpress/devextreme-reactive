import {
  symbol,
  symbolCircle,
  line,
  curveCatmullRom,
  area,
} from 'd3-shape';
import { createScale } from '../../utils/scale';

const POINT_SIZE = 7;

const getX = ({ x }) => x;
const getY = ({ y }) => y;

const computeLinePath = (data, scales, argumentField, valueField) =>
  data.map(dataItem => ({
    x: scales.xScale(dataItem[argumentField]),
    y: scales.yScale(dataItem[valueField]),
    id: dataItem[argumentField],
  }));

const getDAttribute = (type, height, path) => {
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
        .y0(height)(path);
    default:
      return line()
        .x(getX)
        .y(getY)(path);
  }
};

export const xyScales = (domainsOptions, argumentAxisName, domainName, width, height) => ({
  xScale: createScale(domainsOptions[argumentAxisName], width, height),
  yScale: createScale(domainsOptions[domainName], width, height),
});

export const seriesAttributes = (
  data,
  series,
  name,
  domains,
  argumentAxisName,
  layout,
  type,
) => {
  const { width, height } = layout;
  const {
    axisName: domainName,
    argumentField,
    valueField,
    point,
  } = series.find(seriesItem => seriesItem.name === name);
  const scales = xyScales(domains, argumentAxisName, domainName, width, height);
  const path = computeLinePath(data, scales, argumentField, valueField);
  const { size } = point || {};
  return {
    dPoint: symbol().size([(size || POINT_SIZE) ** 2]).type(symbolCircle)(),
    d: getDAttribute(type, height, path),
    coordinates: path,
    scales,
    height,
  };
};
