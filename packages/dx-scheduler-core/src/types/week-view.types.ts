import { PureComputed } from '@devexpress/dx-core';
import { Appointment } from './scheduler-core.types';
import { AppointmentMoment } from './all-day-panel.types';

/** @internal */
export type CalculateWeekDateIntervalsFn = PureComputed<
  [Appointment[], Date, Date, number[]], AppointmentMoment[]
>;
/** @internal */
export type DayBoundaryPredicateFn = PureComputed<
  [AppointmentMoment, Date, Date, number[]], boolean
>;
/** @internal */
export type ReduceAppointmentByDayBoundsFn = PureComputed<
  [AppointmentMoment, Date, Date], AppointmentMoment
>;
