import moment from 'moment';
import { PureComputed } from '@devexpress/dx-core';
import { AppointmentMoment } from './all-day-panel.types';

/** @internal */
export type Interval = [moment.Moment, moment.Moment];

/** @internal */
export type ComputedHelperFn = PureComputed<
  [any, string, (...args: any[]) => any, any]
>;
/** @internal */
export type ViewPredicateFn = PureComputed<
  [AppointmentMoment, Date, Date, number[]?, boolean?], boolean
>;
/** @internal */
export type CalculateFirstDateOfWeekFn = PureComputed<
  [Date, number, number[]], Date
> ;
