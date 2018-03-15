import { extent } from 'd3-array';

const getDomain = axes =>
  axes.reduce((acc, {
    name, min, max, orientation,
  }) => {
    acc[name] = { domain: [min, max], orientation };
    return acc;
  }, {});

const domainComputed = (series, data, domains, argumentAxisName) =>
  (
    {
      ...series.reduce((acc, seriesOption) => {
        const { valueField, argumentField, axisName } = seriesOption;
        const valueDomain = extent(data, item => item[valueField]);
        const argumentDomain = extent(data, item => item[argumentField]);
        acc[axisName] = {
          domain: acc[axisName]
            ? extent(acc[axisName].domain.concat(valueDomain))
            : valueDomain,
          orientation: acc[axisName] && acc[axisName].orientation,
        };
        acc[argumentAxisName] = {
          domain: acc[argumentAxisName]
            ? extent(acc[argumentAxisName].domain.concat(argumentDomain))
            : argumentDomain,
          orientation: acc[argumentAxisName] && acc[argumentAxisName].orientation,
        };
        return acc;
      }, domains),
    }
  );

export const calculateDomain = (axes, series, data, argumentAxisName) => {
  const domains = getDomain(axes);
  return domainComputed(series, data, domains, argumentAxisName);
};
