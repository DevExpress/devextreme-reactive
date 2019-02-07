import { PureComputed } from '@devexpress/dx-core';
import {
  Scale, DomainItems, ScalesCache, SeriesList, Point,
} from './chart-core.types';

export type FactoryFn = () => Scale;
type ModifyDomainFn = (domain: DomainItems) => DomainItems;
export type DomainInfo = {
  readonly modifyDomain?: ModifyDomainFn;
  domain: DomainItems;
  factory?: FactoryFn;
  isDiscrete?: boolean;
};
export type DomainInfoCache = {
  readonly [name: string]: DomainInfo;
};
export type AddDomain = PureComputed<[DomainInfoCache, string, any]>;

export type MergeDomainsFn = (domain: DomainItems, items: DomainItems) => DomainItems;
export type GetItemFn = (point: Point) => any;

export type ComputeDomains = PureComputed<[DomainInfoCache, SeriesList]>;
export type Layout = {
  width: number;
  height: number;
};

export type BuildScales = PureComputed<[DomainInfoCache, Layout], ScalesCache>;
