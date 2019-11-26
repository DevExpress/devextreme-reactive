import { PureComputed } from '@devexpress/dx-core';
import { Appointment } from './scheduler-core.types';
import { AppointmentMoment } from './all-day-panel.types';
import { Grouping } from './grouping-state.types';
import { Resource } from './resources.types';

/** @internal */
export type CalculateWeekDateIntervalsFn = PureComputed<
  [Appointment[], Date, Date, number[], number, Grouping[], Resource[]], AppointmentMoment[]
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
