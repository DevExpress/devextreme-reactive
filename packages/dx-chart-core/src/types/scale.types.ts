import { PureComputed } from '@devexpress/dx-core';
import { Point } from './chart-core.types';

export type Domains = {
  [key: string]: any,
};
export type GetItemFn = PureComputed<[Point], any>;
export type Layout = {width: number, height: number};
