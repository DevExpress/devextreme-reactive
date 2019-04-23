import { PureComputed } from '@devexpress/dx-core';

export type ViewBoundTextFn = PureComputed<
  [Date, Date, string, Date, number, any], string
>;
