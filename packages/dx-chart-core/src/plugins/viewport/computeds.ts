import {
  ARGUMENT_DOMAIN,
} from '../../constants';
import {
  getValueDomainName,
} from '../../utils/scale';
import {
  DomainInfoCache,
  DomainInfo,
  DomainBounds,
  DomainItems,
} from '../../types';

const floatsEqual = (a: number, b: number) => Math.abs(a - b) < Number.EPSILON;

const adjustContinuousDomain = (domain: DomainItems, bounds: DomainBounds): DomainItems => (
  floatsEqual(domain[0], bounds[0]) && floatsEqual(domain[1], bounds[1]) ? domain : bounds.slice()
);

const adjustDiscreteDomain = (domain: DomainItems, bounds: DomainBounds): DomainItems => {
  const i = domain.indexOf(bounds[0]);
  const j = domain.indexOf(bounds[1]);
  return i > 0 || j < domain.length - 1 ? domain.slice(i, j + 1) : domain;
};

const adjustDomain = (domain: DomainInfo, bounds: DomainBounds): DomainInfo => {
  const adjust = domain.isDiscrete ? adjustDiscreteDomain : adjustContinuousDomain;
  const newItems = adjust(domain.domain, bounds);
  return newItems === domain.domain ? domain : { ...domain, domain: newItems };
};

export const adjustDomains = (
  domains: DomainInfoCache,
  argumentBounds?: DomainBounds, scaleName?: string, valueBounds?: DomainBounds,
) => {
  const changes = {};
  if (argumentBounds) {
    const newDomain = adjustDomain(domains[ARGUMENT_DOMAIN], argumentBounds);
    if (newDomain !== domains[ARGUMENT_DOMAIN]) {
      changes[ARGUMENT_DOMAIN] = newDomain;
    }
  }
  if (valueBounds) {
    const valueDomainName = getValueDomainName(scaleName);
    const newDomain = adjustDomain(domains[valueDomainName], valueBounds);
    if (newDomain !== domains[valueDomainName]) {
      changes[valueDomainName] = newDomain;
    }
  }
  return Object.keys(changes).length ? { ...domains, ...changes } : domains;
};
