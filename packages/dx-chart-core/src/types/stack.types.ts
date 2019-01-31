import { CustomFunction, PureComputed } from '@devexpress/dx-core';
import { Stack, Series } from './chart-core.types';

export type DataItems = any[];
export type StackMap = {[key: string]: number};
export type OrderFn = CustomFunction<[Stack[]]>;
export type OffsetFn = CustomFunction<[Stack[], number[]]>;
export type StackProps = {
  stacks: Stack[],
  order: OrderFn,
  offset: OffsetFn,
};
export type getStackedSeriesFn = PureComputed<[Series[], DataItems, StackProps]>;
