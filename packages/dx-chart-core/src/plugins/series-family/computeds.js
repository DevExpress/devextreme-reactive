import {
  stack,
  stackOrderNone,
  stackOffsetDiverging,
} from 'd3-shape';

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

export const processData = (stackOffset, stackOrder) => (series, data) => {
  const stacks = getStacks(series);

  const arrayOfStacks = Object.entries(stacks).reduce((prevValue, item) => ({
    ...prevValue,
    [item[0]]: stack()
      .keys(item[1].keys)
      .order(stackOrder || stackOrderNone)
      .offset(stackOffset || stackOffsetDiverging)(data),
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

export const seriesWithStacks = series =>
  series.reduce((prevResult, singleSeries, index) => {
    const { stack: seriesStack = `stack${index}` } = singleSeries;

    return [...prevResult, { ...singleSeries, stack: seriesStack }];
  }, []);

export const stacks = (series, seriesStackCallback) => {
  const callback = seriesStackCallback || (({ stack: seriesStack }) => seriesStack);
  return [...new Set(series.reduce((prevResult, singleSeries) => {
    const element = callback(singleSeries);
    return element ? [...prevResult, element] : prevResult;
  }, []))];
};

