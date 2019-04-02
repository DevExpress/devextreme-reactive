import { extent } from 'd3-array';
import {
  getValueDomainName, scaleLinear, scaleBand, rangesEqual, makeScale,
} from '../../utils/scale';
import { ARGUMENT_DOMAIN, VALUE_DOMAIN } from '../../constants';
import {
  Series, PointList, DomainItems, DomainInfoCache, BuildScalesFn, DomainInfo, DomainOptions,
  AddDomainFn, MergeDomainsFn, GetItemFn, GetDomainItemsFn,
  FactoryFn, ExtendDomainsFn, NumberArray,
} from '../../types';

const makeDomain = ({ factory, modifyDomain }: DomainOptions): DomainInfo => ({
  domain: [],
  factory,
  isDiscrete: !!(factory && isDiscrete(factory)),
  modifyDomain,
});

/** @internal */
export const defaultDomains: DomainInfoCache = {
  [ARGUMENT_DOMAIN]: makeDomain({}),
  [VALUE_DOMAIN]: makeDomain({}),
};
/** @internal */
export const addDomain: AddDomainFn = (domains, name, options) => ({
  ...domains,
  [name]: makeDomain(options),
});

const mergeContinuousDomains: MergeDomainsFn = (domain, items) => {
  const newDomain = extent([...domain, ...items]);
  return rangesEqual(newDomain as any, domain as any) ? domain : newDomain;
};

const mergeDiscreteDomains: MergeDomainsFn = (domain, items) => {
  const newDomain = Array.from(new Set([...domain, ...items]));
  return newDomain.length === domain.length ? domain : newDomain;
};

const getArgument: GetItemFn = point => point.argument;
const getValue: GetItemFn = point => point.value;

const guessFactory = (points: PointList, getItem: GetItemFn) => (
  points.length && typeof getItem(points[0]) === 'string' ? scaleBand : scaleLinear
);

const isDiscrete = (factory: FactoryFn) => 'bandwidth' in factory();

const updateDomainFactory = (domain: DomainInfo, series: Series, getItem: GetItemFn) => {
  if (domain.factory) {
    return domain;
  }
  const factory = guessFactory(series.points, getItem);
  return {
    ...domain,
    factory,
    isDiscrete: isDiscrete(factory),
  };
};

/** @internal */
export const updateDomainItems = (domain: DomainInfo, items: DomainItems): DomainInfo => {
  const merge = domain.isDiscrete ? mergeDiscreteDomains : mergeContinuousDomains;
  const merged = merge(domain.domain, items);
  return merged === domain.domain ? domain : {
    ...domain,
    domain: domain.modifyDomain ? domain.modifyDomain(merged) : merged,
  };
};

const getArgumentDomainItems: GetDomainItemsFn = series => series.points.map(getArgument);

const getValueDomainItems: GetDomainItemsFn = (series) => {
  const items = series.points.map(getValue);
  return series.getPointTransformer.isStartedFromZero ? [0, ...items] : items;
};

const updateDomain = (
  domain: DomainInfo, series: Series, getItem: GetItemFn, getDomainItems: GetDomainItemsFn,
) => updateDomainItems(updateDomainFactory(domain, series, getItem), getDomainItems(series));

/** @internal */
export const extendDomains: ExtendDomainsFn = (domains, series) => {
  const argumentDomain = updateDomain(
    domains[ARGUMENT_DOMAIN], series, getArgument, getArgumentDomainItems);
  const valueDomainName = getValueDomainName(series.scaleName);
  const valueDomain = updateDomain(
    domains[valueDomainName], series, getValue, getValueDomainItems);
  const changes = {};
  if (argumentDomain !== domains[ARGUMENT_DOMAIN]) {
    changes[ARGUMENT_DOMAIN] = argumentDomain;
  }
  if (valueDomain !== domains[valueDomainName]) {
    changes[valueDomainName] = valueDomain;
  }
  return Object.keys(changes).length ? { ...domains, ...changes } : domains;
};

/** @internal */
export const buildScales: BuildScalesFn = (domains, ranges) => {
  const scales = {};
  Object.keys(domains).forEach((name) => {
    scales[name] = makeScale(
      domains[name],
      ranges[name === ARGUMENT_DOMAIN ? ARGUMENT_DOMAIN : VALUE_DOMAIN] as NumberArray,
    );
  });
  return scales;
};
