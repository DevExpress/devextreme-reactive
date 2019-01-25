import { extent } from 'd3-array';
import { scaleLinear as d3ScaleLinear, scaleBand as d3ScaleBand } from 'd3-scale';
import { isHorizontal, getValueDomainName } from '../../utils/scale';
import { ARGUMENT_DOMAIN, VALUE_DOMAIN } from '../../constants';

export const defaultDomains = {
  [ARGUMENT_DOMAIN]: {},
  [VALUE_DOMAIN]: {},
};

export const addDomain = (domains, name, props) => ({
  ...domains,
  [name]: props,
});

const copy = (domains) => {
  const result = {};
  Object.keys(domains).forEach((name) => {
    result[name] = { ...domains[name], domain: [] };
  });
  return result;
};

const getSeriesValueDomainName = series => getValueDomainName(series.scaleName);

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
      Object.assign(domains[ARGUMENT_DOMAIN], {
        factory: guessFactory(seriesItem.points, getArgument),
      });
    }
    const valueDomainName = getSeriesValueDomainName(seriesItem);
    const obj = domains[valueDomainName];
    if (!obj.factory) {
      obj.factory = guessFactory(seriesItem.points, getValue);
    }
    // TODO: It is to be removed together with *TODO* from above.
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

const customizeDomains = (domains) => {
  Object.keys(domains).forEach((name) => {
    const obj = domains[name];
    if (obj.modifyDomain) {
      obj.domain = obj.modifyDomain(obj.domain);
    }
  });
};

export const computeDomains = (domains, seriesList) => {
  const result = copy(domains);
  collectDomainsFromSeries(result, seriesList);
  calculateDomains(result, seriesList);
  customizeDomains(result);
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
