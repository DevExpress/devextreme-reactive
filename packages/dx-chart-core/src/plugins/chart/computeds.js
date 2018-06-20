export const axisName = argumentAxisName => argumentAxisName || 'argumentAxis';

export const prepareData = (data, series, processingData) => (
  processingData ? processingData(series, data) :
    data.map(singleData => series.reduce((prevValue, {
      valueField, name,
    }) => {
      if (singleData[valueField] === undefined) {
        return prevValue;
      }

      return {
        ...prevValue,
        [`${valueField}-${name}-stack`]: [0, singleData[valueField]],
      };
    }, singleData)));
