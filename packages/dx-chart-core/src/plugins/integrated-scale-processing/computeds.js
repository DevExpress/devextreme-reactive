import { extent } from 'd3-array';

const getAxesDomain = axes =>
  axes.reduce((acc, {
    name, min, max, orientation,
  }) => {
    acc[name] = { domain: [min, max], orientation };
    return acc;
  }, {});

const calculateDomain = (series, data, domains, argumentAxisName) =>
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

export const domains = (axes, series, data, argumentAxisName) => {
  const axesDomains = getAxesDomain(axes);
  return calculateDomain(series, data, axesDomains, argumentAxisName);
};
