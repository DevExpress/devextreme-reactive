import { PureComputed } from '@devexpress/dx-core';
import { FormatterFn } from './scheduler-core.types';

/** @internal */
export type ViewBoundTextFn = PureComputed<
  [Date, Date, string, Date, number, FormatterFn], string
>;
