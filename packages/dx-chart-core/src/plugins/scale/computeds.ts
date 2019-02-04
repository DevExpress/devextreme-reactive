import { extent } from 'd3-array';
import { scaleLinear as d3ScaleLinear, scaleBand as d3ScaleBand } from 'd3-scale';
import { isHorizontal, getValueDomainName } from '../../utils/scale';
import { ARGUMENT_DOMAIN, VALUE_DOMAIN } from '../../constants';
import {
  Series, Point, Scale, SeriesList, PointList, ScalesCache, Domain,
} from '../../types';

type FactoryFn = () => Scale;
type ModifyDomainFn = (domain: Domain) => Domain;
type DomainInfo = {
  readonly modifyDomain?: ModifyDomainFn;
  domain: Domain;
  factory?: FactoryFn;
  isDiscrete?: boolean;
};
type DomainInfoCache = {
  readonly [name: string]: DomainInfo;
};

export const defaultDomains: DomainInfoCache = {
  [ARGUMENT_DOMAIN]: { domain: [] },
  [VALUE_DOMAIN]: { domain: [] },
};

export const addDomain = (domains: DomainInfoCache, name: string, props: any) => {
  const ret: DomainInfoCache = {
    ...domains,
    [name]: props,
  };
  return ret;
};

const copy = (domains: DomainInfoCache) => {
  const result = {};
  Object.keys(domains).forEach((name) => {
    result[name] = { ...domains[name], domain: [] };
  });
  return result as DomainInfoCache;
};

const getSeriesValueDomainName = (series: Series) => getValueDomainName(series.scaleName);

const mergeContinuousDomains = (
  domain: Domain, items: Domain,
): Domain => extent([...domain, ...items]);
const mergeDiscreteDomains = (
  domain: Domain, items: Domain,
): Domain => Array.from(new Set([...domain, ...items]));

const getArgument = (point: Point) => point.argument;
const getValue = (point: Point) => point.value;

const extendDomain = (target: DomainInfo, items: Domain) => {
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

export const scaleLinear = d3ScaleLinear;
export const scaleBand = () => d3ScaleBand().paddingInner(0.3).paddingOuter(0.15);

const guessFactory = (points: PointList, getItem: (point: Point) => any): FactoryFn => {
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

export const computeDomains = (domains: DomainInfoCache, seriesList: SeriesList) => {
  const result = copy(domains);
  collectDomainsFromSeries(result, seriesList);
  calculateDomains(result, seriesList);
  customizeDomains(result);
  return result;
};

type Layout = {
  readonly width: number;
  readonly height: number;
};
export const buildScales = (domains: DomainInfoCache, { width, height }: Layout) => {
  const scales = {};
  Object.keys(domains).forEach((name) => {
    const obj = domains[name];
    const scale = obj.factory!();
    scale.domain(obj.domain);
    scale.range(isHorizontal(name) ? [0, width] : [height, 0]);
    scales[name] = scale;
  });
  return scales as ScalesCache;
};
