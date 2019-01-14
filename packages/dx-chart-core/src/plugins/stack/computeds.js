import { stack } from 'd3-shape';
import { scaleBand } from 'd3-scale';

// "Stack" plugin relies on "data" and "series" getters and
// knowledge about "getPointTransformer" and "path" functions behavior.

const buildSeriesToStackMap = (stacks) => {
  const result = {};
  stacks.forEach(({ series }, i) => {
    series.forEach((name) => {
      result[name] = i;
    });
  });
  return result;
};

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

const collectStacks = (seriesList, seriesToStackMap) => {
  const stacksKeys = {};
  const seriesPositions = {};
  seriesList.forEach(({ name, valueField }) => {
    const stackId = seriesToStackMap[name];
    if (stackId === undefined) {
      return;
    }

    if (!stacksKeys[stackId]) {
      stacksKeys[stackId] = [];
    }
    seriesPositions[name] = stacksKeys[stackId].length;
    stacksKeys[stackId].push(valueField);
  });
  // Stack cannot consist of single series.
  Object.keys(stacksKeys).forEach((stackId) => {
    if (stacksKeys[stackId].length === 1) {
      delete stacksKeys[stackId];
    }
  });
  return [stacksKeys, seriesPositions];
};

const getStackedData = (stacksKeys, dataItems, offset, order) => {
  const result = {};
  Object.keys(stacksKeys).forEach((stackId) => {
    result[stackId] = stack().keys(stacksKeys[stackId]).order(order).offset(offset)(dataItems);
  });
  return result;
};

const buildStackedSeries = (series, dataItems) => {
  const points = series.points.map((point) => {
    const [value0, value] = dataItems[point.index];
    return { ...point, value, value0 };
  });
  const stackedSeries = {
    ...series,
    points,
  };
  if (series.getPointTransformer.isStartedFromZero) {
    stackedSeries.getPointTransformer = getStackedPointTransformer(series.getPointTransformer);
    stackedSeries.getValueDomain = getValueDomain;
  }
  return stackedSeries;
};

const applyStacking = (seriesList, dataItems, seriesToStackMap, offset, order) => {
  const [stacksKeys, seriesPositions] = collectStacks(seriesList, seriesToStackMap);
  if (Object.keys(stacksKeys).length === 0) {
    return seriesList;
  }
  const stackedData = getStackedData(stacksKeys, dataItems, offset, order);
  return seriesList.map((seriesItem) => {
    const stackId = seriesToStackMap[seriesItem.name];
    const stackData = stackedData[stackId];
    if (!stackData) {
      return seriesItem;
    }
    const position = seriesPositions[seriesItem.name];
    return buildStackedSeries(seriesItem, stackData[position]);
  });
};

const getGroupName = (series, i, seriesToStackMap) => {
  const stackId = seriesToStackMap[series.name];
  return stackId >= 0 ? String(stackId) : `group-${i}`;
};

const getGroupedPointTransformer = (getPointTransformer, groupCount, groupOffset) => {
  const wrapper = (series) => {
    const transform = getPointTransformer(series);
    const widthCoeff = 1 / groupCount;
    return (point) => {
      const ret = transform(point);
      ret.x -= ret.maxBarWidth * (0.5 - 0.5 * widthCoeff - groupOffset * widthCoeff);
      ret.maxBarWidth /= groupCount;
      return ret;
    };
  };
  // Preserve static fields of original transformer.
  Object.assign(wrapper, getPointTransformer);
  return wrapper;
};

const applyGrouping = (seriesList, seriesToStackMap) => {
  const groups = new Set();
  seriesList.forEach((seriesItem, i) => {
    if (seriesItem.getPointTransformer.isBroad) {
      groups.add(getGroupName(seriesItem, i, seriesToStackMap));
    }
  });
  // There cannot be single group.
  if (groups.size < 2) {
    return seriesList;
  }
  const scale = scaleBand().domain(Array.from(groups)).range([0, groups.size]);
  return seriesList.map((seriesItem, i) => {
    if (!seriesItem.getPointTransformer.isBroad) {
      return seriesItem;
    }
    const getPointTransformer = getGroupedPointTransformer(
      seriesItem.getPointTransformer,
      groups.size,
      scale(getGroupName(seriesItem, i, seriesToStackMap)),
    );
    return {
      ...seriesItem,
      getPointTransformer,
    };
  });
};

export const getStackedSeries = (seriesList, dataItems, { stacks, offset, order }) => {
  const map = buildSeriesToStackMap(stacks);
  const stackedSeriesList = applyStacking(seriesList, dataItems, map, offset, order);
  const groupedSeriesList = applyGrouping(stackedSeriesList, map);
  return groupedSeriesList;
};
