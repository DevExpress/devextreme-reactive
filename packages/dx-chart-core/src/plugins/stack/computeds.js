import { stack } from 'd3-shape';

// "Stack" plugin relies on "data" and "series" plugins and
// knowledge about "calculateCoordinates" and "d3Func" functions behavior.

const getStackValueField = (seriesStack, stackPosition) => `stack_${seriesStack}_${stackPosition}`;

const getStackedCoordinatesCalculator = (series, seriesStack, stackPosition) => {
  const { calculateCoordinates, isStartedFromZero } = series;
  if (!isStartedFromZero || stackPosition === 0) {
    return calculateCoordinates;
  }
  const field = getStackValueField(seriesStack, stackPosition - 1);
  return (data, scales, ...args) => {
    const { yScale } = scales;
    const items = calculateCoordinates(data, scales, ...args);
    items.forEach(item => Object.assign(item, {
      y1: yScale(data[item.id][field]),
    }));
    return items;
  };
};

export const buildStackedSeries = (seriesList) => {
  const stacks = {};
  return seriesList.map((seriesItem, i) => {
    const { stack: seriesStack = `stack${i}` } = seriesItem;
    if (seriesStack === null) {
      return seriesItem;
    }
    const position = stacks[seriesStack] || 0;
    stacks[seriesStack] = position + 1;
    return {
      ...seriesItem,
      valueField: getStackValueField(seriesStack, position),
      calculateCoordinates: getStackedCoordinatesCalculator(seriesItem, seriesStack, position),
      stack: seriesStack,
      stackKey: seriesItem.valueField,
      stackPosition: position,
    };
  });
};

const getStackedData = (offset, order, dataItems, seriesList) => {
  const stacks = seriesList.reduce((total, { stack: seriesStack, stackKey }) => (seriesStack ? {
    ...total,
    [seriesStack]: (total[seriesStack] || []).concat(stackKey),
  } : total), {});
  return Object.entries(stacks).reduce((result, [name, keys]) => Object.assign(result, {
    [name]: stack().keys(keys).order(order).offset(offset)(dataItems),
  }), {});
};

export const buildStackedDataProcessor = (offset, order) => (dataItems, seriesList) => {
  const stacks = getStackedData(offset, order, dataItems, seriesList);
  return dataItems.map((dataItem, i) => {
    const newData = {};
    seriesList.forEach((seriesItem) => {
      const stackData = stacks[seriesItem.stack];
      if (!stackData) {
        return;
      }
      const value = stackData[seriesItem.stackPosition][i][1];
      newData[seriesItem.valueField] = value;
    });
    return Object.keys(newData).length ? { ...dataItem, ...newData } : dataItem;
  });
};

// The only purpose of this function is to prevent some props from being passed to DOM.
// It should be removed when that issue is resolved.
export const clearStackedSeries = seriesList => seriesList.map((seriesItem) => {
  const { stackKey, stackPosition, ...restProps } = seriesItem;
  return restProps;
});

export const getStacks = series => Array.from(new Set(series))
  .map(({ stack: seriesStack }) => seriesStack).filter(x => x);
