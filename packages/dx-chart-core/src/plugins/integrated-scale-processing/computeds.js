import { extent } from 'd3-array';

const isNotUndefined = item => item !== undefined;

const getAxesDomain = axes =>
  axes.reduce(
    (domains, {
      name, min, max, orientation, type,
    }) => ({
      ...domains,
      [name]: {
        domain: [min, max].filter(isNotUndefined),
        orientation,
        type,
      },
    }),
    {},
  );

const calculateDomainFiled = (field, data, domain = [], type) => {
  const getFieldItem = object => object[field];
  if (type === 'band') {
    return [...domain, ...data.map(getFieldItem)];
  }
  return extent([...domain, ...extent(data, getFieldItem)]);
};

const calculateDomain = (series, data, axesDomains, argumentAxisName) =>
  series.reduce(
    (domains, { valueField, argumentField, axisName }) => ({
      ...domains,
      [axisName]: {
        domain: calculateDomainFiled(
          valueField,
          data,
          domains[axisName].domain,
          domains[axisName].type,
        ),
        orientation: domains[axisName] && domains[axisName].orientation,
        type: domains[axisName] && domains[axisName].type,
      },
      [argumentAxisName]: {
        domain: calculateDomainFiled(
          argumentField,
          data,
          domains[argumentAxisName].domain,
          domains[argumentAxisName].type,
        ),
        orientation:
          domains[argumentAxisName] && domains[argumentAxisName].orientation,
        type: domains[argumentAxisName].type,
      },
    }),
    axesDomains,
  );

export const domains = (axes, series, data, argumentAxisName) => {
  const axesDomains = getAxesDomain(axes);
  return calculateDomain(series, data, axesDomains, argumentAxisName);
};
