import { PureComputed } from '@devexpress/dx-core';
import {
  ScaleObject, DomainItems, ScalesCache, SeriesList, Point,
} from './chart-core.types';

export type FactoryFn = () => ScaleObject;
export type ModifyDomainFn = (domain: DomainItems) => DomainItems;
/** @internal */
export type DomainInfo = {
  readonly modifyDomain?: ModifyDomainFn;
  domain: DomainItems;
  factory?: FactoryFn;
  isDiscrete?: boolean;
};
/** @internal */
export type DomainInfoCache = {
  readonly [name: string]: DomainInfo;
};
/** @internal */
export type AddDomainFn = PureComputed<[DomainInfoCache, string, any]>;
/** @internal */
export type MergeDomainsFn = (domain: DomainItems, items: DomainItems) => DomainItems;
/** @internal */
export type GetItemFn = (point: Point) => any;
/** @internal */
export type ComputeDomainsFn = PureComputed<[DomainInfoCache, SeriesList]>;
/** @internal */
export type Layout = {
  width: number;
  height: number;
};
/** @internal */
export type BuildScalesFn = PureComputed<[DomainInfoCache, Layout], ScalesCache>;
