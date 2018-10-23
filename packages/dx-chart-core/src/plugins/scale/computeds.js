import { extent } from 'd3-array';
import { scaleLinear, scaleBand } from 'd3-scale';
import { createScale, setScalePadding, getValueDomainName } from '../../utils/scale';
import {
  HORIZONTAL, VERTICAL, LINEAR, BAND, ARGUMENT_DOMAIN,
} from '../../constants';

const isDefined = item => item !== undefined;

// TODO: Property name should not contain "axis" part as it actually means domain.
const getSeriesValueDomainName = series => getValueDomainName(series.axisName);

const calculateDomainField = (items, domain, type) => (
  type === BAND ? [...domain, ...items] : extent([...domain, ...extent(items)])
);

const getArgument = point => point.argument;

const getValue = point => point.value;

const getCorrectAxisType = (type, points, getItem) => (
  type || (points.length && typeof getItem(points[0]) === 'string' && BAND) || LINEAR
);

const calculateDomains = (domains, seriesList) => {
  seriesList.forEach((seriesItem) => {
    const valueDomainName = getSeriesValueDomainName(seriesItem);
    const { points } = seriesItem;
    const argumentDomain = domains[ARGUMENT_DOMAIN];
    const valueDomain = domains[valueDomainName];

    const valueType = getCorrectAxisType(valueDomain.type, points, getValue);
    const argumentType = getCorrectAxisType(argumentDomain.type, points, getArgument);

    // TODO: This is a temporary workaround for Stack plugin.
    // Once scales (or domains) are exposed for modification Stack will modify scale and
    // this code will be removed.
    const valueDomainItems = seriesItem.getValueDomain
      ? seriesItem.getValueDomain(points) : points.map(getValue);
    valueDomain.domain = calculateDomainField(
      valueDomainItems,
      valueDomain.domain,
      valueType,
    );
    valueDomain.type = valueType;

    argumentDomain.domain = calculateDomainField(
      points.map(getArgument),
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

export const computeDomains = (axes, series) => {
  const result = collectDomains(series);
  // Axes options are taken in two steps because *type* is required for domains calculation
  // and other options must be applied after domains are calculated.
  takeTypeFromAxesOptions(result, axes);
  calculateDomains(result, series);
  takeRestAxesOptions(result, axes);
  return result;
};

export const buildScales = (domains, scaleExtension, { width, height }) => {
  const scales = {};
  Object.entries(domains).forEach(([name, domain]) => {
    const { constructor } = scaleExtension.find(item => item.type === domain.type);
    scales[name] = createScale(domain, width, height, constructor);
  });
  return scales;
};
