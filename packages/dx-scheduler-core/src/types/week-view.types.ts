import { PureComputed } from '@devexpress/dx-core';
import { Appointment, SchedulerDateTime } from './scheduler-core.types';
import { AppointmentMoment } from './all-day-panel.types';
import { Group } from './integrated-grouping.types';

/** @internal */
export type CalculateWeekDateIntervalsFn = PureComputed<
  [Appointment[], Date, Date, number[], number], AppointmentMoment[][]
>;
/** @internal */
export type DayBoundaryPredicateFn = PureComputed<
  [AppointmentMoment, Date, Date, number[]], boolean
>;
/** @internal */
export type ReduceAppointmentByDayBoundsFn = PureComputed<
  [AppointmentMoment, Date, Date, number], AppointmentMoment
>;
/** @internal */
export type NormalizeAppointmentDurationFn = PureComputed<
  [Appointment, number], AppointmentMoment
>;
/** @internal */
export type TimeScaleLabelData = {
  startDate?: SchedulerDateTime;
  endDate?: SchedulerDateTime;
  key: any;
  groupingInfo?: Group[];
};
