import { extent } from 'd3-array';
import { HORIZONTAL, VERTICAL, BAND } from '../../constants';

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

const calculateDomainField = (field1, field2, data, domain = [], type) => {
  const getFieldItem = field => object => object[field];
  if (type === BAND) {
    return [...domain, ...data.map(getFieldItem(field1))];
  }
  return extent([
    ...domain,
    ...extent(data, getFieldItem(field1)),
    ...extent(data, getFieldItem(field2)),
  ]);
};

const calculateDomain = (series, data, axesDomains, argumentAxisName) =>
  series.reduce(
    (domains, {
      valueField, argumentField, axisName, name,
    }) => ({
      ...domains,
      [axisName]: {
        domain: calculateDomainField(
          `${valueField}-${name}-end`,
          `${valueField}-${name}-start`,
          data,
          domains[axisName] && domains[axisName].domain,
          domains[axisName] && domains[axisName].type,
        ),
        orientation: VERTICAL,
        type: domains[axisName] && domains[axisName].type,
      },
      [argumentAxisName]: {
        domain: calculateDomainField(
          argumentField,
          undefined,
          data,
          domains[argumentAxisName] && domains[argumentAxisName].domain,
          domains[argumentAxisName] && domains[argumentAxisName].type,
        ),
        orientation: HORIZONTAL,
        type: domains[argumentAxisName] && domains[argumentAxisName].type,
      },
    }),
    axesDomains,
  );

export const domains = (axes, series, data, argumentAxisName) => {
  const axesDomains = getAxesDomains(axes);
  return calculateDomain(series, data, axesDomains, argumentAxisName);
};
