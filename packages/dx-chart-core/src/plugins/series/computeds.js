import {
  symbol,
  symbolCircle,
  line,
  curveCatmullRom,
  area,
} from 'd3-shape';
import { createScale } from '../../utils/scale';

const POINT_SIZE = 7;
const GROUP_PADDING = 0.3;
const BAR_PADDING = 0.1;

const getX = ({ x }) => x;
const getY = ({ y }) => y;
const getY1 = ({ y1 }) => y1;

const computeLinePath = (data, scales, argumentField, valueField, name) =>
  data.map(dataItem => ({
    x: scales.xScale(dataItem[argumentField]),
    y: scales.yScale(dataItem[`${valueField}${name}end`]),
    y1: scales.yScale(dataItem[`${valueField}${name}start`]),
    id: dataItem[argumentField],
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

const xyScales = (domainsOptions, argumentAxisName, domainName, width, height, stacks) => {
  const argumentDomainOptions = domainsOptions[argumentAxisName];
  const xScale = createScale(argumentDomainOptions, width, height, GROUP_PADDING);
  const bandwidth = xScale.bandwidth && xScale.bandwidth();

  return {
    xScale,
    yScale: createScale(domainsOptions[domainName], width, height),
    x0Scale: argumentDomainOptions.type === 'band' && createScale({
      orientation: argumentDomainOptions.orientation,
      type: argumentDomainOptions.type,
      domain: stacks,
    }, bandwidth, bandwidth, BAR_PADDING),
  };
};

export const seriesAttributes = (
  data,
  series,
  name,
  domains,
  argumentAxisName,
  layout,
  stacks,
  type,
) => {
  const { width, height } = layout;
  const {
    axisName: domainName,
    argumentField,
    valueField,
    point,
    stack,
  } = series.find(seriesItem => seriesItem.name === name);
  const scales = xyScales(domains, argumentAxisName, domainName, width, height, stacks);
  const path = computeLinePath(data, scales, argumentField, valueField, name);
  const { size } = point || {};
  return {
    dPoint: symbol().size([(size || POINT_SIZE) ** 2]).type(symbolCircle)(),
    d: getDAttribute(type, path),
    coordinates: path,
    scales,
    stack,
    xOffset: scales.xScale.bandwidth && scales.xScale.bandwidth() / 2,
  };
};
