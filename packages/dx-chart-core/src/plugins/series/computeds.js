import {
  symbol,
  symbolCircle,
  line,
  curveMonotoneX,
  area,
  arc,
  pie,
} from 'd3-shape';
import { createScale, getWidth, setScalePadding } from '../../utils/scale';

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

const getSeriesPoints = (series, dataItems, transformPoint = x => x) => {
  const points = [];
  dataItems.forEach((dataItem, index) => {
    const argument = dataItem[series.argumentField];
    const value = dataItem[series.valueField];
    if (argument !== undefined && value !== undefined) {
      points.push(transformPoint({
        argument,
        value,
        index,
      }));
    }
  });
  return points;
};

export const pieAttributes = (data, { xScale, yScale }, series) => {
  const { innerRadius = 0, outerRadius = 1, valueField } = series;
  const x = Math.max(...xScale.range()) / 2;
  const y = Math.max(...yScale.range()) / 2;
  const radius = Math.min(x, y);
  const pieData = pie().sort(null).value(d => d[valueField])(data);
  const gen = arc().innerRadius(innerRadius * radius).outerRadius(outerRadius * radius);
  return getSeriesPoints(series, data, ({ argument, value, index }) => {
    const { startAngle, endAngle } = pieData[index];
    return {
      d: gen.startAngle(startAngle).endAngle(endAngle)(),
      value,
      id: argument,
      x,
      y,
    };
  });
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

// TODO: Take group settings from *series*; move settings calculation to Stack plugin
// (since it handles bar grouping by now)
const getGroupSettings = (series, argumentScale, stacks, scaleExtension) => {
  const width = getWidth(argumentScale);
  const { barWidth = 0.9, stack } = series;
  const groupsScale = setScalePadding(createScale(
    {
      domain: stacks,
    },
    width,
    width,
    scaleExtension.find(item => item.type === 'band').constructor,
  ), 1 - barWidth);
  return {
    groupWidth: getWidth(groupsScale),
    groupOffset: groupsScale(stack),
  };
};

export const barCoordinates = (
  data, { xScale, yScale }, series, stacks = [undefined], scaleExtension,
) => {
  const y1 = yScale.range()[0];
  const { groupWidth, groupOffset } = getGroupSettings(series, xScale, stacks, scaleExtension);
  return getSeriesPoints(series, data, ({ argument, value, index }) => ({
    x: xScale(argument) + groupOffset,
    y: yScale(value),
    y1,
    id: index,
    value,
    width: groupWidth,
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
