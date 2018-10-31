import { stack } from 'd3-shape';
import { scaleBand } from 'd3-scale';

// "Stack" plugin relies on "data" and "series" getters and
// knowledge about "getPointTransformer" and "path" functions behavior.

const getStackedPointTransformer = (getPointTransformer) => {
  const wrapper = (series) => {
    const transform = getPointTransformer(series);
    const { valueScale } = series;
    return (point) => {
      const ret = transform(point);
      ret.y1 = valueScale(point.value0);
      return ret;
    };
  };
  // Preserve static fields of original transformer.
  Object.assign(wrapper, getPointTransformer);
  return wrapper;
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
  seriesList.forEach((seriesItem) => {
    const { stack: seriesStack } = seriesItem;
    if (!seriesStack) {
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
  // Stack cannot consist of single series.
  Object.keys(stacks).forEach((name) => {
    if (stacks[name].length === 1) {
      delete stacks[name];
    }
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
    points,
  };
  if (series.isStartedFromZero) {
    stackedSeries.getPointTransformer = getStackedPointTransformer(series.getPointTransformer);
    stackedSeries.getValueDomain = getValueDomain;
  }
  return stackedSeries;
};

const applyStacking = (seriesList, dataItems, offset, order) => {
  const { stacks, seriesInfo } = collectStacks(seriesList);
  if (Object.keys(stacks).length === 0) {
    return seriesList;
  }
  const stackedData = getStackedData(stacks, dataItems, offset, order);
  return seriesList.map((seriesItem) => {
    const info = seriesInfo[seriesItem.symbolName];
    return info ? buildStackedSeries(seriesItem, info, stackedData) : seriesItem;
  });
};

const getGroupName = (series, i) => series.stack || `group-${i}`;

const getGroupedPointTransformer = (getPointTransformer, groupCount, groupOffset) => {
  const wrapper = (series) => {
    const transform = getPointTransformer(series);
    const { barWidth } = series;
    const widthCoeff = 1 / groupCount;
    const offsetCoeff = -(1 - barWidth) / 2 + groupOffset + widthCoeff * (1 - barWidth) / 2;
    return (point) => {
      const ret = transform(point);
      ret.x += (ret.width / barWidth) * offsetCoeff;
      ret.width *= widthCoeff;
      return ret;
    };
  };
  // Preserve static fields of original transformer.
  Object.assign(wrapper, getPointTransformer);
  return wrapper;
};

const applyGrouping = (seriesList) => {
  const groups = new Set();
  seriesList.forEach((seriesItem, i) => {
    if (seriesItem.getPointTransformer.isBroad) {
      groups.add(getGroupName(seriesItem, i));
    }
  });
  // There cannot be single group.
  if (groups.size < 2) {
    return seriesList;
  }
  const scale = scaleBand().domain(Array.from(groups)).range([0, 1]);
  return seriesList.map((seriesItem, i) => {
    if (!seriesItem.getPointTransformer.isBroad) {
      return seriesItem;
    }
    const getPointTransformer = getGroupedPointTransformer(
      seriesItem.getPointTransformer, groups.size, scale(getGroupName(seriesItem, i)),
    );
    return {
      ...seriesItem,
      getPointTransformer,
    };
  });
};

export const getStackedSeries = (seriesList, dataItems, offset, order) => {
  const stackedSeriesList = applyStacking(seriesList, dataItems, offset, order);
  const groupedSeriesList = applyGrouping(stackedSeriesList);
  return groupedSeriesList;
};
