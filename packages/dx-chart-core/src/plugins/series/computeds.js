import {
  symbol,
  symbolCircle,
  line,
  curveMonotoneX,
  area,
  arc,
  pie,
} from 'd3-shape';
import { scaleIdentity, scaleOrdinal } from 'd3-scale';
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

// Default scales are provided because this function is called to get legend source
// where coordinates are not required and hence scales are not available.
// TODO: Is there a way to improve it?
// `...args` are added because of Bar case where `stacks` and `scaleExtension` are required.
// TODO: Remove `...args` when Bar case is resolved.
export const getSeriesPoints = (
  series, data, scales = { argumentScale: scaleIdentity(), valueScale: scaleIdentity() }, ...args
) => {
  const points = [];
  const transform = series.getPointTransformer(series, scales, data, ...args);
  data.forEach((dataItem, index) => {
    const argument = dataItem[series.argumentField];
    const value = dataItem[series.valueField];
    if (argument !== undefined && value !== undefined) {
      points.push(transform({
        argument,
        value,
        index,
      }));
    }
  });
  return points;
};

export const getPiePointTransformer = (series, { argumentScale, valueScale }, data) => {
  const { innerRadius = 0, outerRadius = 1, valueField } = series;
  const x = Math.max(...argumentScale.range()) / 2;
  const y = Math.max(...valueScale.range()) / 2;
  const radius = Math.min(x, y);
  const pieData = pie().sort(null).value(d => d[valueField])(data);
  const gen = arc().innerRadius(innerRadius * radius).outerRadius(outerRadius * radius);
  const colorScale = scaleOrdinal().range(series.palette);
  return ({ argument, value, index }) => {
    const { startAngle, endAngle } = pieData[index];
    return {
      d: gen.startAngle(startAngle).endAngle(endAngle)(),
      value,
      color: colorScale(index),
      id: argument,
      x,
      y,
    };
  };
};

export const getAreaPointTransformer = (series, { argumentScale, valueScale }) => {
  const y1 = valueScale(0);
  const offset = getWidth(argumentScale) / 2;
  return ({ argument, value, index }) => ({
    x: argumentScale(argument) + offset,
    y: valueScale(value),
    y1,
    id: index,
    value,
  });
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

export const getBarPointTransformer = (
  series, { argumentScale, valueScale }, data, stacks = [undefined], scaleExtension,
) => {
  const y1 = valueScale(0);
  const { groupWidth, groupOffset } = getGroupSettings(
    series, argumentScale, stacks, scaleExtension,
  );
  return ({ argument, value, index }) => ({
    x: argumentScale(argument) + groupOffset,
    y: valueScale(value),
    y1,
    id: index,
    value,
    width: groupWidth,
  });
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

const addItem = (list, item) => (list.find(obj => obj.uniqueName === item.uniqueName)
  ? addItem(list, {
    ...item,
    uniqueName: createNewUniqueName(item.uniqueName),
  })
  : list.concat(item)
);

export const addSeries = (series, palette, props) => addItem(series, {
  ...props,
  palette, // TODO: For Pie only. Find a better place for it.
  color: props.color || palette[series.length % palette.length],
  uniqueName: props.name,
});
