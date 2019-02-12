import { PureComputed } from '@devexpress/dx-core';
import { Appointment } from './scheduler-core.types';
import { AppointmentMoment } from './all-day-panel.types';

export type CalculateWeekDateIntervalsFn = PureComputed<
  [Appointment[], Date, Date, number[]], AppointmentMoment[]
>;

export type DayBoundaryPredicateFn = PureComputed<
  [AppointmentMoment, Date, Date, number[]], boolean
>;

export type ReduceAppointmentByDayBoundsFn = PureComputed<
  [AppointmentMoment, Date, Date], AppointmentMoment
>;
