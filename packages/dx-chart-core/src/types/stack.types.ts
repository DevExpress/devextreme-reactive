import { CustomFunction, PureComputed } from '@devexpress/dx-core';
import { Stack, Series } from './chart-core.types';

type StackProps = {
  stacks: Stack[],
  order: OrderFn,
  offset: OffsetFn,
};
export type DataItems = any[];
export type StackMap = {[key: string]: number};
export type OrderFn = CustomFunction<[Stack[]], number[]>;
export type OffsetFn = CustomFunction<[Stack[], number[]], void>;
export type getStackedSeriesFn = PureComputed<[Series[], DataItems, StackProps]>;
export type ApplyStackingFn = PureComputed<[Series[], DataItems, StackMap, OffsetFn, OrderFn]>;

export type StacksKeys = {[key: number]: string[]};
export type SeriesPositions = {[key: string]: number};
export type CollectStacksFn = PureComputed<[Series[], StackMap], [StacksKeys, SeriesPositions]>;
