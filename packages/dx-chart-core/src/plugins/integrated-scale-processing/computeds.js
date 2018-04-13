import { extent } from 'd3-array';

const isDefined = item => item !== undefined;

const getAxesDomains = axes =>
  axes.reduce(
    (domains, {
      name, min, max, type,
    }) => ({
      ...domains,
      [name]: {
        domain: [min, max].filter(isDefined),
        type,
      },
    }),
    {},
  );

const calculateDomainField = (field, data, domain = [], type) => {
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
        domain: calculateDomainField(
          valueField,
          data,
          domains[axisName] && domains[axisName].domain,
          domains[axisName] && domains[axisName].type,
        ),
        orientation: 'vertical',
        type: domains[axisName] && domains[axisName].type,
      },
      [argumentAxisName]: {
        domain: calculateDomainField(
          argumentField,
          data,
          domains[argumentAxisName] && domains[argumentAxisName].domain,
          domains[argumentAxisName] && domains[argumentAxisName].type,
        ),
        orientation: 'horizontal',
        type: domains[argumentAxisName] && domains[argumentAxisName].type,
      },
    }),
    axesDomains,
  );

export const domains = (axes, series, data, argumentAxisName) => {
  const axesDomains = getAxesDomains(axes);
  return calculateDomain(series, data, axesDomains, argumentAxisName);
};
