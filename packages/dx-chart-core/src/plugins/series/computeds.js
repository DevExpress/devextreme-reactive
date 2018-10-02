import {
  symbol,
  symbolCircle,
  line,
  curveMonotoneX,
  area,
  arc,
  pie,
} from 'd3-shape';
import { createScale, getWidth } from '../../utils/scale';

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

const getConstructor = (scaleExtension, type) => scaleExtension.find(
  item => item.type === type,
).constructor;

export const xyScales = (
  argumentDomainOptions,
  valueDomainOptions,
  { width, height },
  groupWidth,
  scaleExtension,
) => {
  const xConstructor = getConstructor(scaleExtension, argumentDomainOptions.type);
  const yConstructor = getConstructor(scaleExtension, valueDomainOptions.type);
  return {
    xScale: createScale(argumentDomainOptions, width, height, xConstructor, 1 - groupWidth),
    yScale: createScale(valueDomainOptions, width, height, yConstructor),
  };
};

export const pieAttributes = (
  data,
  { xScale, yScale },
  {
    argumentField, valueField, innerRadius = 0, outerRadius = 1,
  },
) => {
  const width = Math.max.apply(null, xScale.range());
  const height = Math.max.apply(null, yScale.range());
  const radius = Math.min(width, height) / 2;
  const pieData = pie().sort(null).value(d => d[valueField])(data);

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
  { argumentField, valueField },
) => {
  const y1 = yScale(0);
  return data.reduce((result, dataItem, index) => {
    if (dataItem[argumentField] !== undefined && dataItem[valueField] !== undefined) {
      return [...result, {
        x: xScale(dataItem[argumentField]) + getWidth(xScale) / 2,
        y: yScale(dataItem[valueField]),
        y1,
        id: index,
        value: dataItem[valueField],
      }];
    }
    return result;
  }, []);
};

export const barCoordinates = (
  data,
  { xScale, yScale },
  {
    argumentField, valueField, stack, barWidth = 0.9,
  },
  stacks = [undefined],
  scaleExtension,
) => {
  const rawCoordinates = coordinates(
    data,
    { xScale, yScale },
    { argumentField, valueField },
  );
  const width = getWidth(xScale);
  const x0Scale = createScale(
    {
      domain: stacks,
    },
    width,
    width,
    getConstructor(scaleExtension, 'band'),
    1 - barWidth,
  );
  return rawCoordinates.map(item => ({
    ...item,
    width: getWidth(x0Scale),
    x: item.x - width / 2 + x0Scale(stack),
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

export const getPieItems = (series, domain) => domain.map(uniqueName => ({ uniqueName }));
