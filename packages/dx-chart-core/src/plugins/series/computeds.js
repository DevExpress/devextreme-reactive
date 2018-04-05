import {
  symbol,
  symbolCircle,
  line,
  curveCardinal,
  area,
} from 'd3-shape';
import { createScale } from '../../utils/scale';

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
        .curve(curveCardinal)(path);
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

export const getSeriesAttributes = (
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
  } = series.find(seriesItem => seriesItem.valueField === name);
  const scales = xyScales(domains, argumentAxisName, domainName, width, height);
  const path = computeLinePath(data, scales, argumentField, valueField);
  return ({
    dPoint: symbol().size([55]).type(symbolCircle)(),
    d: getDAttribute(type, height, path),
    coordinates: path,
    scales,
    height,
  });
};
