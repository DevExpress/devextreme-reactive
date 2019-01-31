import { PureComputed } from '@devexpress/dx-core';
import { AppointmentCore, ExcludedDays } from './scheduler-core.types';
import { LeftBound, RightBound, AppointmentMoment } from './all-day-panel.types';

export type CalculateWeekDateIntervalsFn = PureComputed<
  [AppointmentCore[], LeftBound, RightBound, ExcludedDays], AppointmentMoment[]
>;

export type DayBoundaryPredicateFn = PureComputed<
  [AppointmentMoment, LeftBound, RightBound, ExcludedDays], boolean
>;

export type ReduceAppointmentByDayBoundsFn = PureComputed<
  [AppointmentMoment, LeftBound, RightBound], AppointmentMoment
>;
