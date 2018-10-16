import { stack } from 'd3-shape';

// "Stack" plugin relies on "data" and "series" plugins and
// knowledge about "calculateCoordinates" and "d3Func" functions behavior.

const getStackedPointTransformer = ({
  getPointTransformer, valueField0,
}) => (series, data, ...args) => {
  const transform = getPointTransformer(series, data, ...args);
  const { valueScale } = series;
  return (point) => {
    const ret = transform(point);
    ret.y1 = valueScale(data[point.index][valueField0]);
    return ret;
  };
};

// TODO: Temporary - see corresponding note in *computeDomains*.
const getValueDomainCalculator = ({ valueField, valueField0, stackKey }) => (data) => {
  const items = [];
  data.forEach((dataItem) => {
    if (dataItem[stackKey] !== undefined) {
      items.push(dataItem[valueField], dataItem[valueField0]);
    }
  });
  return items;
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
    const stackedSeriesItem = {
      ...seriesItem,
      valueField: `stack_${seriesStack}_${position}`,
      stack: seriesStack,
      stackKey: seriesItem.valueField,
      stackPosition: position,
    };
    if (stackedSeriesItem.isStartedFromZero) {
      stackedSeriesItem.valueField0 = `${stackedSeriesItem.valueField}_0`;
      stackedSeriesItem.getPointTransformer = getStackedPointTransformer(stackedSeriesItem);
      stackedSeriesItem.getValueDomain = getValueDomainCalculator(stackedSeriesItem);
    }
    return stackedSeriesItem;
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
      if (stackData && dataItem[seriesItem.stackKey] !== undefined) {
        const [value0, value] = stackData[seriesItem.stackPosition][i];
        newData[seriesItem.valueField] = value;
        if (seriesItem.valueField0) {
          newData[seriesItem.valueField0] = value0;
        }
      }
    });
    return Object.keys(newData).length ? { ...dataItem, ...newData } : dataItem;
  });
};

// The only purpose of this function is to prevent some props from being passed to DOM.
// It should be removed when that issue is resolved.
export const clearStackedSeries = seriesList => seriesList.map((seriesItem) => {
  const {
    stackKey, stackPosition, valueField0, ...restProps
  } = seriesItem;
  return restProps;
});

export const getStacks = series => Array.from(
  new Set(series.map(({ stack: seriesStack }) => seriesStack).filter(x => x)),
);
