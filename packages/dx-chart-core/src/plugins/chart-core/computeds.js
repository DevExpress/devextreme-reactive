export const argumentAxisName = series => series[0].argumentField;

export const processData = (series, data) => data.map(singleData => series.reduce((prevValue, {
  valueField, name, stack,
}) => {
  const startValue = prevValue.collection[stack] || 0;
  const endValue = startValue + singleData[valueField];

  return {
    singleData: {
      ...prevValue.singleData,
      [`${valueField}${name}start`]: startValue,
      [`${valueField}${name}end`]: endValue,
    },
    collection: {
      ...prevValue.collection,
      [stack]: endValue,
    },
  };
}, { singleData, collection: {} }).singleData);


export const calculateSeriesWithStacks = series =>
  series.reduce((prevResult, singleSeries, index) => {
    const { stack = `stack${index}` } = singleSeries;
    const { seriesWithStacks, allStacks } = prevResult;

    return {
      seriesWithStacks: [...seriesWithStacks, { ...singleSeries, stack }],
      allStacks: [...allStacks, stack],
    };
  }, { seriesWithStacks: [], allStacks: [] });
