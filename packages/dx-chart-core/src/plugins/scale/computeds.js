import { extent } from 'd3-array';
import { scaleLinear as d3ScaleLinear, scaleBand as d3ScaleBand } from 'd3-scale';
import { isHorizontal, getValueDomainName } from '../../utils/scale';
import { ARGUMENT_DOMAIN, VALUE_DOMAIN } from '../../constants';

const createDomain = () => ({ domain: [] });

export const defaultDomains = {
  [ARGUMENT_DOMAIN]: createDomain(),
  [VALUE_DOMAIN]: createDomain(),
};

export const addDomain = (domains, name, props) => ({
  ...domains,
  [name]: { ...createDomain(), ...props },
});

const copy = (domains) => {
  const result = {};
  Object.keys(domains).forEach((name) => {
    result[name] = { ...domains[name] };
  });
  return result;
};

// TODO: Property name should not contain "axis" part as it actually means domain.
const getSeriesValueDomainName = series => getValueDomainName(series.axisName);

const mergeContinuousDomains = (domain, items) => extent([...domain, ...items]);
const mergeDiscreteDomains = (domain, items) => Array.from(new Set([...domain, ...items]));

const getArgument = point => point.argument;
const getValue = point => point.value;

const extendDomain = (target, items) => {
  const merge = target.isDiscrete ? mergeDiscreteDomains : mergeContinuousDomains;
  Object.assign(target, { domain: merge(target.domain, items) });
};

const calculateDomains = (domains, seriesList) => {
  seriesList.forEach((seriesItem) => {
    const valueDomainName = getSeriesValueDomainName(seriesItem);
    const { points } = seriesItem;
    // TODO: This is a temporary workaround for Stack plugin.
    // Once scales (or domains) are exposed for modification Stack will modify scale and
    // this code will be removed.
    const valueDomainItems = seriesItem.getValueDomain
      ? seriesItem.getValueDomain(points) : points.map(getValue);
    extendDomain(domains[valueDomainName], valueDomainItems);
    extendDomain(domains[ARGUMENT_DOMAIN], points.map(getArgument));
  });
};

export const scaleLinear = d3ScaleLinear;
export const scaleBand = () => d3ScaleBand().paddingInner(0.3).paddingOuter(0.15);

const guessFactory = (points, getItem) => (
  (points.length && typeof getItem(points[0]) === 'string' && scaleBand) || scaleLinear
);

const collectDomainsFromSeries = (domains, seriesList) => {
  seriesList.forEach((seriesItem) => {
    if (!domains[ARGUMENT_DOMAIN].factory) {
      const obj = domains[ARGUMENT_DOMAIN];
      obj.factory = guessFactory(seriesItem.points, getArgument);
    }
    const valueDomainName = getSeriesValueDomainName(seriesItem);
    if (!domains[valueDomainName]) {
      Object.assign(domains, { [valueDomainName]: createDomain() });
    }
    const obj = domains[valueDomainName];
    if (!obj.factory) {
      obj.factory = guessFactory(seriesItem.points, getValue);
    }
    if (seriesItem.getPointTransformer.isStartedFromZero && obj.domain.length === 0) {
      obj.domain = [0];
    }
  });
  Object.keys(domains).forEach((name) => {
    const obj = domains[name];
    if (!obj.factory) {
      obj.factory = scaleLinear;
    }
    obj.isDiscrete = !!obj.factory().bandwidth;
  });
  return domains;
};

const applyMinMax = (domains) => {
  Object.keys(domains).forEach((name) => {
    const obj = domains[name];
    if (!obj.isDiscrete) {
      if (obj.min !== undefined) {
        obj.domain[0] = obj.min;
      }
      if (obj.max !== undefined) {
        obj.domain[1] = obj.max;
      }
    }
  });
};

export const computeDomains = (domains, seriesList) => {
  const result = copy(domains);
  collectDomainsFromSeries(result, seriesList);
  calculateDomains(result, seriesList);
  applyMinMax(result);
  return result;
};

export const buildScales = (domains, { width, height }) => {
  const scales = {};
  Object.keys(domains).forEach((name) => {
    const obj = domains[name];
    scales[name] = obj.factory()
      .domain(obj.domain)
      .range(isHorizontal(name) ? [0, width] : [height, 0]);
  });
  return scales;
};
