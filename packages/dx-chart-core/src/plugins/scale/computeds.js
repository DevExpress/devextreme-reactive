import { extent } from 'd3-array';
import { scaleLinear, scaleBand } from 'd3-scale';
import { setScalePadding } from '../../utils/scale';
import {
  HORIZONTAL, VERTICAL, LINEAR, BAND, ARGUMENT_DOMAIN, VALUE_DOMAIN,
} from '../../constants';

const isDefined = item => item !== undefined;

export const getValueDomainName = name => name || VALUE_DOMAIN;

// TODO: Property name should not contain "axis" part as it actually means domain.
const getSeriesValueDomainName = series => getValueDomainName(series.axisName);

const calculateDomainField = (items, domain, type) => (
  type === BAND ? [...domain, ...items] : extent([...domain, ...extent(items)])
);

const getDomainItems = (data, field) => {
  const items = [];
  data.forEach((dataItem) => {
    const value = dataItem[field];
    if (isDefined(value)) {
      items.push(value);
    }
  });
  return items;
};

const getCorrectAxisType = (type, data, field) => {
  if (!type && typeof data.find(item => isDefined(item[field]))[field] === 'string') {
    return BAND;
  }
  return type || LINEAR;
};

const calculateDomains = (domains, seriesList, data) => {
  seriesList.forEach((seriesItem) => {
    const valueDomainName = getSeriesValueDomainName(seriesItem);
    const { argumentField, valueField } = seriesItem;
    const argumentDomain = domains[ARGUMENT_DOMAIN];
    const valueDomain = domains[valueDomainName];

    const valueType = getCorrectAxisType(valueDomain.type, data, valueField);
    const argumentType = getCorrectAxisType(argumentDomain.type, data, argumentField);

    // TODO: This is a temporary workaround for Stack plugin.
    // Once scales (or domains) are exposed for modification Stack will modify scale and
    // this code will be removed.
    const valueDomainItems = seriesItem.getValueDomain
      ? seriesItem.getValueDomain(data) : getDomainItems(data, valueField);
    valueDomain.domain = calculateDomainField(
      valueDomainItems,
      valueDomain.domain,
      valueType,
    );
    valueDomain.type = valueType;

    argumentDomain.domain = calculateDomainField(
      getDomainItems(data, argumentField),
      argumentDomain.domain,
      argumentType,
    );
    argumentDomain.type = argumentType;
  });
};

export const computeExtension = (extension) => {
  const defaultExtension = [
    { type: LINEAR, constructor: scaleLinear },
    { type: BAND, constructor: () => setScalePadding(scaleBand(), 0.3) },
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
    if (seriesItem.isStartedFromZero && domain.domain.length === 0) {
      domain.domain = [0];
    }
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
