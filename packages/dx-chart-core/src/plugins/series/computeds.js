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
import { ARGUMENT_DOMAIN } from '../../constants';
import {
  getValueDomainName, createScale, getWidth, setScalePadding,
} from '../../utils/scale';

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

const identityScale = scaleIdentity();

// No-scales case is handled because the function is also called to get legend source
// where coordinates are not required and hence scales are not available.
// TODO: Is there a way to improve it?
// `...args` are added because of Bar case where `stacks` and `scaleExtension` are required.
// TODO: Remove `...args` when Bar case is resolved.
export const getSeriesPoints = (series, data, scales, ...args) => {
  const points = [];
  const transform = series.getPointTransformer({
    ...series,
    argumentScale: scales ? scales[ARGUMENT_DOMAIN] : identityScale,
    valueScale: scales ? scales[getValueDomainName(series.axisName)] : identityScale,
  }, data, scales, ...args);
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

export const getPiePointTransformer = ({
  innerRadius = 0, outerRadius = 1, valueField, argumentScale, valueScale, palette,
}, data) => {
  const x = Math.max(...argumentScale.range()) / 2;
  const y = Math.max(...valueScale.range()) / 2;
  const radius = Math.min(x, y);
  const pieData = pie().sort(null).value(d => d[valueField])(data);
  const inner = innerRadius * radius;
  const outer = outerRadius * radius;
  const gen = arc().innerRadius(inner).outerRadius(outer);
  const colorScale = scaleOrdinal().range(palette);
  return ({ argument, value, index }) => {
    const { startAngle, endAngle } = pieData[index];
    return {
      // TODO: It should be calculated in *pointComponent*.
      d: gen.startAngle(startAngle).endAngle(endAngle)(),
      value,
      color: colorScale(index),
      id: argument,
      x,
      y,
      innerRadius: inner,
      outerRadius: outer,
      startAngle,
      endAngle,
    };
  };
};

export const getAreaPointTransformer = ({ argumentScale, valueScale }) => {
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
const getGroupSettings = (argumentScale, barWidth, stack, stacks, scaleExtension) => {
  const width = getWidth(argumentScale);
  const groupsScale = setScalePadding(createScale(
    {
      domain: stacks,
    },
    width,
    width,
    scaleExtension.find(item => item.type === 'band').constructor,
  ), 1 - barWidth);
  return {
    groupOffset: groupsScale(stack),
    groupWidth: getWidth(groupsScale),
  };
};

export const getBarPointTransformer = ({
  argumentScale, valueScale, barWidth = 0.9, stack,
}, data, scales, stacks = [undefined], scaleExtension) => {
  const y1 = valueScale(0);
  const { groupWidth, groupOffset } = getGroupSettings(
    argumentScale, barWidth, stack, stacks, scaleExtension,
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
    // TODO: It should be calculated in *pointComponent*.
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
