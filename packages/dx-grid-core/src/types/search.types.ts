import { PureComputed } from '@devexpress/dx-core';
import { Column } from './grid-core.types';
import { FilterExpression } from './filtering.types';

/** @internal */
export type SearchFilterExpressionFn = PureComputed<
  [string, Column[], FilterExpression],
  FilterExpression
>;
