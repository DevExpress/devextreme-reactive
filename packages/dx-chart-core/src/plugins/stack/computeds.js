import { stack } from 'd3-shape';

// "Stack" plugin relies on "data" and "series" plugins and
// knowledge about "calculateCoordinates" and "d3Func" functions behavior.

const getStackedPointTransformer = getPointTransformer => (series, ...args) => {
  const transform = getPointTransformer(series, ...args);
  const { valueScale } = series;
  return (point) => {
    const ret = transform(point);
    ret.y1 = valueScale(point.value0);
    return ret;
  };
};

// TODO: Temporary - see corresponding note in *computeDomains*.
const getValueDomain = (points) => {
  const items = [];
  points.forEach((point) => {
    items.push(point.value, point.value0);
  });
  return items;
};

const collectStacks = (seriesList) => {
  const stacks = {};
  const seriesInfo = {};
  seriesList.forEach((seriesItem, i) => {
    const { stack: seriesStack = `stack${i}` } = seriesItem;
    if (seriesStack === null) {
      return;
    }

    if (!stacks[seriesStack]) {
      stacks[seriesStack] = [];
    }
    const stackKeys = stacks[seriesStack];
    const position = stackKeys.length;
    stackKeys.push(seriesItem.valueField);
    seriesInfo[seriesItem.symbolName] = { stack: seriesStack, position };
  });
  return { stacks, seriesInfo };
};

const getStackedData = (stacks, dataItems, offset, order) => {
  const result = {};
  Object.entries(stacks).forEach(([name, keys]) => {
    result[name] = stack().keys(keys).order(order).offset(offset)(dataItems);
  });
  return result;
};

const buildStackedSeries = (series, { stack: seriesStack, position }, stackedData) => {
  const dataItems = stackedData[seriesStack][position];
  const points = series.points.map((point) => {
    const [value0, value] = dataItems[point.index];
    return { ...point, value, value0 };
  });
  const stackedSeries = {
    ...series,
    stack: seriesStack,
    points,
  };
  if (series.isStartedFromZero) {
    stackedSeries.getPointTransformer = getStackedPointTransformer(series.getPointTransformer);
    stackedSeries.getValueDomain = getValueDomain;
  }
  return stackedSeries;
};

export const getStackedSeries = (seriesList, dataItems, offset, order) => {
  const { stacks, seriesInfo } = collectStacks(seriesList);
  const stackedData = getStackedData(stacks, dataItems, offset, order);
  const stackedSeriesList = seriesList.map((seriesItem) => {
    const info = seriesInfo[seriesItem.symbolName];
    return info ? buildStackedSeries(seriesItem, info, stackedData) : seriesItem;
  });
  return stackedSeriesList;
};

export const getStacks = series => Array.from(
  new Set(series.map(({ stack: seriesStack }) => seriesStack).filter(x => x)),
);
