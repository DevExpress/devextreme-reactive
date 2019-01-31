import { PureComputed } from '@devexpress/dx-core';
import { Target } from './chart-core.types';

export type GetParametersFn = PureComputed<[any[], Target], {element: any, text: string}>;
export type TargetItemChangeFn = any;
export type ProcessHandleTooltipFn = PureComputed<[Target[], Target, TargetItemChangeFn],
  Target | undefined | null>;
