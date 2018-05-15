import { extent } from 'd3-array';
import { HORIZONTAL, VERTICAL, BAND } from '../../constants';

const isDefined = item => item !== undefined;

const collectAxesTypes = axes =>
  axes.reduce(
    (domains, {
      name, type,
    }) => ({
      ...domains,
      [name]: {
        type,
      },
    }),
    {},
  );

const calculateDomainField = (field, data, domain = [], type) => {
  const getFieldItem = object => object[field];
  if (type === BAND) {
    return [...domain, ...data.map(getFieldItem)];
  }
  return extent([...domain, ...extent(data, getFieldItem)]);
};

const calculateDomain = (series, data, axesTypes, argumentAxisName) =>
  series.reduce(
    (domains, {
      valueField, argumentField, axisName, name,
    }) => ({
      ...domains,
      [axisName]: {
        domain: calculateDomainField(
          `${valueField}-${name}-end`,
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
          data,
          domains[argumentAxisName] && domains[argumentAxisName].domain,
          domains[argumentAxisName] && domains[argumentAxisName].type,
        ),
        orientation: HORIZONTAL,
        type: domains[argumentAxisName] && domains[argumentAxisName].type,
      },
    }),
    axesTypes,
  );

const adjustDomains = (axes, calculatedDomains) => axes.reduce(
  (domains, {
    name, min, max, type,
  }) => {
    const currentDomain = domains[name];
    return {
      ...domains,
      [name]: {
        domain: type !== BAND ? [
          isDefined(min) ? min : currentDomain.domain[0],
          isDefined(max) ? max : currentDomain.domain[1],
        ] : currentDomain.domain,
        type: currentDomain.type,
        orientation: currentDomain.orientation,
      },
    };
  },
  calculatedDomains,
);

export const domains = (axes, series, data, argumentAxisName) => {
  const axesTypes = collectAxesTypes(axes);
  const calculatedDomains = calculateDomain(series, data, axesTypes, argumentAxisName);
  return adjustDomains(axes, calculatedDomains);
};
