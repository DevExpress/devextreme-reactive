import { PureComputed } from '@devexpress/dx-core';
import {
  Point, SeriesList, DataItems,
} from './chart-core.types';
import { DomainInfoCache } from './plugins.scale.types';

/** @internal */
export interface StackedPoint extends Point {
  readonly value0: any;
}
export interface Stack {
  /** A list of series names */
  readonly series: string[];
}

export type StackData = ReadonlyArray<ReadonlyArray<number>>;
export type OrderFn = (series: StackData) => number[];
export type OffsetFn = (series: StackData, order: Iterable<number>) => void;

/** @internal */
export type StackMap = {
  readonly [series: string]: number;
};
/** @internal */
export type StacksKeys = {
  [stackId: number]: string[];
};
/** @internal */
export type SeriesPositions = {
  [name: string]: number;
};
type StackedDataItem = Readonly<[any, any]>;
/** @internal */
export type StackedDataItems = ReadonlyArray<StackedDataItem>;
/** @internal */
export type StackedData = {
  readonly [stackId: number]: {
    readonly [seriesPosition: number]: StackedDataItems;
  };
};
export type StackList = ReadonlyArray<Stack>;
export type StacksOptions = {
  stacks: StackList;
  offset: OffsetFn;
  order: OrderFn;
};
/** @internal */
export type GetStackedSeriesFn = PureComputed<[SeriesList, DataItems, StacksOptions]>;
/** @internal */
export type GetStackedDomainsFn = PureComputed<[DomainInfoCache, SeriesList]>;
