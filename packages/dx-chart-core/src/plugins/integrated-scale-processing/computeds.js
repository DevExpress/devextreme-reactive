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
  const getCategories = (prev, cur) => {
    const categories = getFieldItem(cur);
    if (isDefined(categories)) {
      return [...prev, categories];
    }
    return prev;
  };
  if (type === BAND) {
    return [...domain, ...data.reduce(getCategories, [])];
  }
  return extent([
    ...domain,
    ...extent(data, getFieldItem),
  ]);
};

const getCorrectAxisType = (type, data, field) => {
  if (!type && typeof data.find(item => isDefined(item[field]))[field] === 'string') {
    return 'band';
  }
  return type;
};

const calculateDomain = (series, data, axesTypes, argumentAxisName) =>
  series.reduce(
    (domains, {
      valueField, argumentField, axisName, name,
    }) => {
      const valueType = getCorrectAxisType(
        domains[axisName] && domains[axisName].type,
        data,
        valueField,
      );
      const argumentType = getCorrectAxisType(
        domains[argumentAxisName] && domains[argumentAxisName].type,
        data,
        argumentField,
      );
      return {
        ...domains,
        [axisName]: {
          domain: calculateDomainField(
            `${valueField}-${name}-end`,
            data,
            domains[axisName] && domains[axisName].domain,
            valueType,
          ),
          orientation: VERTICAL,
          type: valueType,
        },
        [argumentAxisName]: {
          domain: calculateDomainField(
            argumentField,
            data,
            domains[argumentAxisName] && domains[argumentAxisName].domain,
            argumentType,
          ),
          orientation: HORIZONTAL,
          type: argumentType,
        },
      };
    },
    axesTypes,
  );

const adjustRangeToZero = range => [Math.min(range[0], 0), Math.max(0, range[1])];

const recalculateDomain = (range, currentDomain) => ({
  domain: currentDomain.type !== BAND ? range : currentDomain.domain,
  type: currentDomain.type,
  orientation: currentDomain.orientation,
});

const adjustDomains = (axes, calculatedDomains, startFromZero) => {
  const adjustedDomainsBySeries = Object.keys(calculatedDomains).reduce((domains, name) => {
    const currentDomain = domains[name];
    const range = startFromZero[name] ?
      adjustRangeToZero(currentDomain.domain) : currentDomain.domain;
    return {
      ...domains,
      [name]: recalculateDomain(range, currentDomain),
    };
  }, calculatedDomains);

  return axes.reduce(
    (domains, {
      name, min, max,
    }) => {
      const currentDomain = domains[name];
      return {
        ...domains,
        [name]: recalculateDomain([
          isDefined(min) ? min : currentDomain.domain[0],
          isDefined(max) ? max : currentDomain.domain[1],
        ], currentDomain),
      };
    },
    adjustedDomainsBySeries,
  );
};

export const domains = (axes = [], series, data, argumentAxisName, startFromZero) => {
  const axesTypes = collectAxesTypes(axes);
  const calculatedDomains = calculateDomain(series, data, axesTypes, argumentAxisName);
  return adjustDomains(axes, calculatedDomains, startFromZero);
};
