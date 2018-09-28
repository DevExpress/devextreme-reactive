import { stack } from 'd3-shape';

const getStacks = series => series.reduce((
  prevValue,
  { valueField, stack: seriesStack },
  index,
) => {
  if (!prevValue[seriesStack]) {
    return {
      ...prevValue,
      [seriesStack]: {
        keys: [valueField],
        series: [index],
      },
    };
  }
  return {
    ...prevValue,
    [seriesStack]: {
      keys: [...prevValue[seriesStack].keys, valueField],
      series: [...prevValue[seriesStack].series, index],
    },
  };
}, {});

const filtering = ({ stack: seriesStack }) => seriesStack;

export const processData = (offset, order) => (series, data) => {
  const stacks = getStacks(series);

  const arrayOfStacks = Object.entries(stacks).reduce((prevValue, item) => ({
    ...prevValue,
    [item[0]]: stack()
      .keys(item[1].keys)
      .order(order)
      .offset(offset)(data),
  }), {});


  return data.map((singleData, dataIndex) => series.reduce((prevValue, {
    valueField, name, stack: seriesStack,
  }, index) => {
    const seriesIndex = stacks[seriesStack].series.findIndex(item => item === index);
    return {
      ...prevValue,
      [`${valueField}-${name}-stack`]: arrayOfStacks[seriesStack][seriesIndex][dataIndex],
    };
  }, singleData));
};

export const getStackedSeries = ({ series: seriesList }) => {
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
      stack: seriesStack,
      stackKey: seriesItem.valueField,
      stackPosition: position,
      valueField: `stack_${seriesStack}_${position}`,
    };
  });
};

export const buildGetStackedData = (offset, order) => ({ data, series: seriesList }) => {
  const stacks = seriesList.reduce((total, { stack: seriesStack, stackKey }) => {
    if (!seriesStack) {
      return total;
    }
    return {
      ...total,
      [seriesStack]: (total[seriesStack] || []).concat(stackKey),
    };
  }, {});

  Object.keys(stacks).forEach((name) => {
    stacks[name] = stack().keys(stacks[name]).order(order).offset(offset)(data);
  });

  return data.map((dataItem, i) => {
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

export const seriesWithStacks = series => series.reduce((prevResult, singleSeries, index) => {
  const { stack: seriesStack = `stack${index}` } = singleSeries;

  return [...prevResult, { ...singleSeries, stack: seriesStack }];
}, []);

export const stacks = series => [
  ...new Set(series
    .filter(singleSeries => filtering(singleSeries))
    .map(({ stack: seriesStack }) => seriesStack)),
];
