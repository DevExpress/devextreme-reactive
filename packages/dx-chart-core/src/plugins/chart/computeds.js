export const prepareData = (data, series, processingData) => (
  processingData ? processingData(series, data) : data
);
