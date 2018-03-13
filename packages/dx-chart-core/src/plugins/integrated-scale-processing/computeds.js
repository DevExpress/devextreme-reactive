import { extent } from 'd3-array';

const getDomain = axes =>
  axes.reduce((acc, { name, min, max }) => {
    acc[name] = [min, max];
    return acc;
  }, {});

const domainComputed = (series, data, domains, argumentAxisName) =>
  Object.assign(
    {},
    domains,
    series.reduce((acc, seriesOption) => {
      const { valueField, argumentField, axisName } = seriesOption;
      const valueDomain = extent(data, item => item[valueField]);
      const argumentDomain = extent(data, item => item[argumentField]);
      acc[axisName] = acc[axisName]
        ? extent(acc[axisName].concat(valueDomain))
        : valueDomain;
      acc[argumentAxisName] = acc[argumentAxisName]
        ? extent(acc[argumentAxisName].concat(argumentDomain))
        : argumentDomain;
      return acc;
    }, {}),
  );

export const calculateDomain = (axes, series, data, argumentAxisName) => {
  const domains = getDomain(axes);
  return domainComputed(series, data, domains, argumentAxisName);
};
