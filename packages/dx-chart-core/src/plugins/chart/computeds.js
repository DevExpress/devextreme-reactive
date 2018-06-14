export const axisName = argumentAxisName => argumentAxisName || 'argumentAxis';

export const prepareData = (data, series) => data.map(singleData => series.reduce((prevValue, {
  valueField, name,
}) => {
  if (singleData[valueField] === undefined) {
    return prevValue;
  }

  return {
    ...prevValue,
    [`${valueField}-${name}-stack`]: [0, singleData[valueField]],
  };
}, singleData));
