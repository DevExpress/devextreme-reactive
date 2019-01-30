import { PureComputed } from '@devexpress/dx-core';
import { AppointmentCore, ExcludedDays } from './scheduler-core.types';
import { LeftBound, RightBound, AppointmentMoment } from './all-day-panel.types';

export type CalculateWeekDateIntervals = PureComputed<
  [AppointmentCore[], LeftBound, RightBound, ExcludedDays], AppointmentMoment[]
>;

export type DayBoundaryPredicate = PureComputed<
  [AppointmentMoment, LeftBound, RightBound, ExcludedDays], boolean
>;

export type ReduceAppointmentByDayBounds = PureComputed<
  [AppointmentMoment, LeftBound, RightBound], AppointmentMoment
>;
