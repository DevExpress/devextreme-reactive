import { PureComputed } from '@devexpress/dx-core';
import {
  Point, SeriesList, DataItems,
} from './chart-core.types';
export interface StackedPoint extends Point {
  readonly value0: any;
}
export interface Stack {
  // A list of series names
  readonly series: string[];
}

export type StackData = ReadonlyArray<ReadonlyArray<number>>;

export type OrderFn = (series: StackData) => number[];
export type OffsetFn = (series: StackData, order: number[]) => void;

export type StackMap = {
  readonly [series: string]: number;
};
export type StacksKeys = {
  [stackId: number]: string[];
};
export type SeriesPositions = {
  [name: string]: number;
};
type StackedDataItem = Readonly<[any, any]>;
export type StackedDataItems = ReadonlyArray<StackedDataItem>;
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
export type GetStackedSeriesFn = PureComputed<[SeriesList, DataItems, StacksOptions]>;
