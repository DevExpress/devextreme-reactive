import { extent } from 'd3-array';
import { scaleLinear, scaleBand } from 'd3-scale';
import {
  HORIZONTAL, VERTICAL, LINEAR, BAND, ARGUMENT_DOMAIN, VALUE_DOMAIN,
} from '../../constants';

const isDefined = item => item !== undefined;

export const getValueDomainName = name => name || VALUE_DOMAIN;

// TODO: Property name should not contain "axis" part as it actually means domain.
const getSeriesValueDomainName = series => getValueDomainName(series.axisName);

const calculateDomainField = (getFieldItemFirst, getFieldItemSecond, data, domain, type) => {
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
    return BAND;
  }
  return type || LINEAR;
};

const getFieldStack = (index, object) => (
  object && isDefined(object[index]) ? object[index] : undefined
);

const calculateDomains = (domains, seriesList, data) => {
  seriesList.forEach((seriesItem) => {
    const valueDomainName = getSeriesValueDomainName(seriesItem);
    const { argumentField, valueField, name } = seriesItem;
    const argumentDomain = domains[ARGUMENT_DOMAIN];
    const valueDomain = domains[valueDomainName];

    const valueType = getCorrectAxisType(valueDomain.type, data, valueField);
    const argumentType = getCorrectAxisType(argumentDomain.type, data, argumentField);

    valueDomain.domain = calculateDomainField(
      object => getFieldStack(1, object[`${valueField}-${name}-stack`]),
      valueDomain.isStartedFromZero
        ? object => getFieldStack(0, object[`${valueField}-${name}-stack`]) : undefined,
      data,
      valueDomain.domain,
      valueType,
    );
    valueDomain.type = valueType;

    argumentDomain.domain = calculateDomainField(
      object => object[argumentField],
      null,
      data,
      argumentDomain.domain,
      argumentType,
    );
    argumentDomain.type = argumentType;
  });
};

export const computeExtension = (extension) => {
  const defaultExtension = [
    { type: LINEAR, constructor: scaleLinear },
    { type: BAND, constructor: scaleBand },
  ];
  return extension.concat(defaultExtension);
};

const collectDomains = (seriesList) => {
  const domains = {
    [ARGUMENT_DOMAIN]: { domain: [], orientation: HORIZONTAL },
  };
  seriesList.forEach((seriesItem) => {
    const name = getSeriesValueDomainName(seriesItem);
    const domain = domains[name] || { domain: [], orientation: VERTICAL };
    domains[name] = domain;
    domain.isStartedFromZero = domain.isStartedFromZero || seriesItem.isStartedFromZero;
  });
  return domains;
};

const takeTypeFromAxesOptions = (domains, axes) => {
  axes.forEach(({ name, type }) => {
    const domain = domains[name];
    if (domain) {
      domain.type = type;
    }
  });
};

const takeRestAxesOptions = (domains, axes) => {
  axes.forEach(({
    name, tickFormat, min, max,
  }) => {
    const domain = domains[name];
    if (!domain) {
      return;
    }
    domain.tickFormat = tickFormat;
    if (domain.type !== BAND) {
      domain.domain = [
        isDefined(min) ? min : domain.domain[0],
        isDefined(max) ? max : domain.domain[1],
      ];
    }
  });
};

export const computeDomains = (axes, series, data) => {
  const result = collectDomains(series);
  // Axes options are taken in two steps because *type* is required for domains calculation
  // and other options must be applied after domains are calculated.
  takeTypeFromAxesOptions(result, axes);
  calculateDomains(result, series, data);
  takeRestAxesOptions(result, axes);
  return result;
};
