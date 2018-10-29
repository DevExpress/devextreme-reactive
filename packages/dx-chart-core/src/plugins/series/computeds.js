import {
  symbol,
  symbolCircle,
  line,
  curveMonotoneX,
  area,
  arc,
  pie,
} from 'd3-shape';
import { scaleOrdinal } from 'd3-scale';
import { ARGUMENT_DOMAIN } from '../../constants';
import { getWidth, getValueDomainName } from '../../utils/scale';

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

export const getPiePointTransformer = ({
  innerRadius = 0, outerRadius = 1, argumentScale, valueScale, palette, points,
}) => {
  const x = Math.max(...argumentScale.range()) / 2;
  const y = Math.max(...valueScale.range()) / 2;
  const radius = Math.min(x, y);
  const pieData = pie().sort(null).value(d => d.value)(points);
  const inner = innerRadius * radius;
  const outer = outerRadius * radius;
  const gen = arc().innerRadius(inner).outerRadius(outer);
  const colorScale = scaleOrdinal().range(palette);
  return (point) => {
    const { startAngle, endAngle } = pieData[point.index];
    return {
      ...point,
      // TODO: It should be calculated in *pointComponent*.
      d: gen.startAngle(startAngle).endAngle(endAngle)(),
      color: point.color || colorScale(point.index),
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
  return point => ({
    ...point,
    x: argumentScale(point.argument) + offset,
    y: valueScale(point.value),
    y1,
  });
};

export const getBarPointTransformer = ({
  argumentScale, valueScale, barWidth,
}) => {
  const y1 = valueScale(0);
  const categoryWidth = getWidth(argumentScale);
  const offset = categoryWidth * (1 - barWidth) / 2;
  const width = categoryWidth * barWidth;
  return point => ({
    ...point,
    x: argumentScale(point.argument) + offset,
    y: valueScale(point.value),
    y1,
    width,
  });
};
// Used for Bar grouping.
getBarPointTransformer.isBroad = true;

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

// TODO: Memoization is much needed here.
// Though "series" list never persists, single "series" item most often does.
const createPoints = (argumentField, valueField, data) => {
  const points = [];
  data.forEach((dataItem, index) => {
    const argument = dataItem[argumentField];
    const value = dataItem[valueField];
    if (argument !== undefined && value !== undefined) {
      points.push({ argument, value, index });
    }
  });
  return points;
};

export const addSeries = (series, data, palette, props) => {
  const points = createPoints(props.argumentField, props.valueField, data);
  return addItem(series, {
    ...props,
    points,
    uniqueName: props.name,
    palette, // TODO: For Pie only. Find a better place for it.
    color: props.color || palette[series.length % palette.length],
  });
};

// TODO: Memoization is much needed here by the same reason as in "createPoints".
// Make "scales" persistent first.
const scalePoints = (series, scales) => {
  const { getPointTransformer, ...rest } = series;
  const transform = getPointTransformer({
    ...series,
    argumentScale: scales[ARGUMENT_DOMAIN],
    valueScale: scales[getValueDomainName(series.axisName)],
  });
  return {
    ...rest,
    points: series.points.map(transform),
  };
};

export const scaleSeriesPoints = (series, scales) => series.map(
  seriesItem => scalePoints(seriesItem, scales),
);
