import { extent } from 'd3-array';
import { scaleLinear as d3ScaleLinear, scaleBand as d3ScaleBand } from 'd3-scale';
import { isHorizontal, getValueDomainName } from '../../utils/scale';
import { ARGUMENT_DOMAIN, VALUE_DOMAIN } from '../../constants';
import {
  Series, Scale, SeriesList, PointList, DomainItems, DomainInfoCache, BuildScalesFn,
  AddDomainFn, MergeDomainsFn, GetItemFn, DomainInfo, FactoryFn, ComputeDomainsFn,
} from '../../types';

/** @internal */
export const defaultDomains: DomainInfoCache = {
  [ARGUMENT_DOMAIN]: { domain: [] },
  [VALUE_DOMAIN]: { domain: [] },
};
/** @internal */
export const addDomain: AddDomainFn = (domains, name, props) => ({
  ...domains,
  [name]: props,
});

const copy = (domains: DomainInfoCache): DomainInfoCache => {
  const result = {};
  Object.keys(domains).forEach((name) => {
    result[name] = { ...domains[name], domain: [] };
  });
  return result;
};

const getSeriesValueDomainName = (series: Series) => getValueDomainName(series.scaleName);

const mergeContinuousDomains: MergeDomainsFn = (domain, items) =>
  extent([...domain, ...items]);
const mergeDiscreteDomains: MergeDomainsFn = (domain, items) =>
  Array.from(new Set([...domain, ...items]));

const getArgument: GetItemFn = point => point.argument;
const getValue: GetItemFn = point => point.value;

const extendDomain = (target: DomainInfo, items: DomainItems) => {
  const merge = target.isDiscrete ? mergeDiscreteDomains : mergeContinuousDomains;
  Object.assign(target, { domain: merge(target.domain, items) });
};

const calculateDomains = (domains: DomainInfoCache, seriesList: SeriesList) => {
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
/** @internal */
export const scaleLinear: FactoryFn = d3ScaleLinear;
/** @internal */
export const scaleBand: FactoryFn = () => (
  d3ScaleBand().paddingInner(0.3).paddingOuter(0.15) as any as Scale
);

const guessFactory = (points: PointList, getItem: GetItemFn) => {
  if (points.length && typeof getItem(points[0]) === 'string') {
    return scaleBand as any as FactoryFn;
  }
  return scaleLinear;
};

const collectDomainsFromSeries = (domains: DomainInfoCache, seriesList: SeriesList) => {
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

const customizeDomains = (domains: DomainInfoCache) => {
  Object.keys(domains).forEach((name) => {
    const obj = domains[name];
    if (obj.modifyDomain) {
      obj.domain = obj.modifyDomain(obj.domain);
    }
  });
};

/** @internal */
export const computeDomains: ComputeDomainsFn = (domains, seriesList) => {
  const result = copy(domains);
  collectDomainsFromSeries(result, seriesList);
  calculateDomains(result, seriesList);
  customizeDomains(result);
  return result;
};

/** @internal */
export const buildScales: BuildScalesFn = (domains, { width, height }) => {
  const scales = {};
  Object.keys(domains).forEach((name) => {
    const obj = domains[name];
    const scale = obj.factory!();
    scale.domain(obj.domain);
    scale.range(isHorizontal(name) ? [0, width] : [height, 0]);
    scales[name] = scale;
  });
  return scales;
};
