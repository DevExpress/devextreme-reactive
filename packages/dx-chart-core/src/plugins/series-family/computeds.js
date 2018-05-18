export const processData = (series, data) => data.map(singleData => series.reduce((prevValue, {
  valueField, name, stack, type,
}) => {
  let startValue = prevValue.collection[stack] || 0;
  let endValue = startValue + singleData[valueField];

  if (!prevValue.collection[stack] && type !== 'area' && type !== 'bar') {
    startValue = singleData[valueField];
    endValue = singleData[valueField];
  }

  return {
    singleData: {
      ...prevValue.singleData,
      [`${valueField}-${name}-start`]: Math.min(startValue, endValue),
      [`${valueField}-${name}-end`]: Math.max(startValue, endValue),
    },
    collection: {
      ...prevValue.collection,
      [stack]: endValue,
    },
  };
}, { singleData, collection: {} }).singleData);

export const seriesWithStacks = series =>
  series.reduce((prevResult, singleSeries, index) => {
    const { stack = `stack${index}` } = singleSeries;

    return [...prevResult, { ...singleSeries, stack }];
  }, []);

export const stacks = series => series.reduce((prevResult, singleSeries) => {
  const { stack } = singleSeries;
  return [...prevResult, stack];
}, []);
