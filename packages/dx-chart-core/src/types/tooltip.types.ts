import { PureComputed, CustomFunction } from '@devexpress/dx-core';
import { Target } from './chart-core.types';

type TargetItemChangeFn = CustomFunction<[Target|null], void>;
export type GetParametersFn = PureComputed<[any[], Target], {element: any, text: string}>;
export type ProcessHandleTooltipFn = PureComputed<[Target[], Target, TargetItemChangeFn],
  Target | undefined | null>;
