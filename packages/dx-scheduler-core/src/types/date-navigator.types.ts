import { PureComputed } from '@devexpress/dx-core';
import { StartViewDate, EndViewDate, CurrentDate, IntervalCount } from './scheduler-core.types';

export type NavigationStep = string;

export type ViewBoundTextFn = PureComputed<
  [StartViewDate, EndViewDate, NavigationStep, CurrentDate, IntervalCount], string
>;
