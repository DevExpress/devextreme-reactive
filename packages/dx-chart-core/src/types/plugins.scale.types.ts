import { PureComputed } from '@devexpress/dx-core';
import {
  ScaleObject, DomainItems, ScalesCache, Point, Series,
} from './chart-core.types';
import {
  RangesCache,
} from './plugins.layout-manager.types';

export type FactoryFn = () => ScaleObject;
export type ModifyDomainFn = (domain: DomainItems) => DomainItems;
/** @internal */
export type DomainInfo = {
  readonly modifyDomain?: ModifyDomainFn;
  readonly domain: DomainItems;
  readonly factory?: FactoryFn;
  readonly isDiscrete: boolean;
};
/** @internal */
export type DomainInfoCache = {
  readonly [name: string]: DomainInfo;
};
/** @internal */
export type DomainOptions = {
  readonly modifyDomain?: ModifyDomainFn;
  readonly factory?: FactoryFn;
};
/** @internal */
export type AddDomainFn = PureComputed<[DomainInfoCache, string, DomainOptions]>;
/** @internal */
export type ExtendDomainsFn = PureComputed<[DomainInfoCache, Series]>;
/** @internal */
export type MergeDomainsFn = (domain: DomainItems, items: DomainItems) => DomainItems;
/** @internal */
export type GetItemFn = (point: Point) => any;
/** @internal */
export type GetDomainItemsFn = (series: Series) => DomainItems;
/** @internal */
export type BuildScalesFn = PureComputed<[DomainInfoCache, RangesCache], ScalesCache>;
