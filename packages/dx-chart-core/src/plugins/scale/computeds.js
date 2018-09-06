import { extent } from 'd3-array';
import { scaleLinear, scaleBand } from 'd3-scale';
import { HORIZONTAL, VERTICAL, BAND } from '../../constants';

const isDefined = item => item !== undefined;

const collectAxesOptions = axes => axes.reduce(
  (domains, {
    name, type, tickFormat,
  }) => ({
    ...domains,
    [name]: {
      type,
      tickFormat,
    },
  }),
  {},
);

const calculateDomainField = (getFieldItemFirst, getFieldItemSecond, data, domain = [], type) => {
  const getCategories = (prev, cur) => {
    const categories = getFieldItemFirst(cur);
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
    ...extent(data, getFieldItemFirst),
    ...extent(data, getFieldItemSecond),
  ]);
};

const getCorrectAxisType = (type, data, field) => {
  if (!type && typeof data.find(item => isDefined(item[field]))[field] === 'string') {
    return 'band';
  }
  return type || 'linear';
};

const getFieldStack = (index, object) => (
  object && isDefined(object[index]) ? object[index] : undefined
);

const calculateDomain = (series, data, axesOptions, argumentAxisName, startFromZero) => series
  .reduce(
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
            object => getFieldStack(1, object[`${valueField}-${name}-stack`]),
            startFromZero[axisName] ? object => getFieldStack(0, object[`${valueField}-${name}-stack`]) : undefined,
            data,
            domains[axisName] && domains[axisName].domain,
            valueType,
          ),
          orientation: VERTICAL,
          type: valueType,
          tickFormat: domains[axisName] && domains[axisName].tickFormat,
        },
        [argumentAxisName]: {
          domain: calculateDomainField(
            object => object[argumentField],
            null,
            data,
            domains[argumentAxisName] && domains[argumentAxisName].domain,
            argumentType,
          ),
          orientation: HORIZONTAL,
          type: argumentType,
          tickFormat: domains[argumentAxisName] && domains[argumentAxisName].tickFormat,
        },
      };
    },
    axesOptions,
  );

const recalculateDomain = (range, currentDomain) => ({
  domain: currentDomain.type !== BAND ? range : currentDomain.domain,
  type: currentDomain.type,
  orientation: currentDomain.orientation,
  tickFormat: currentDomain.tickFormat,
});

const adjustDomains = (axes, calculatedDomains) => axes.reduce(
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
  calculatedDomains,
);

export const computedExtension = (extension) => {
  const defaultExtension = [
    { type: 'linear', constructor: scaleLinear },
    { type: 'band', constructor: scaleBand },
  ];
  return extension.concat(defaultExtension);
};

export const domains = (axes = [], series, data, argumentAxisName, startFromZero) => {
  const axesOptions = collectAxesOptions(axes);
  const calculatedDomains = calculateDomain(series, data, axesOptions,
    argumentAxisName, startFromZero);
  return adjustDomains(axes, calculatedDomains);
};
