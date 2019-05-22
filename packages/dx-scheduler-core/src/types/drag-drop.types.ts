import { PureComputed } from '@devexpress/dx-core';
import { Appointment, ViewCell, AppointmentModel, AllDayCell } from './scheduler-core.types';
import { ElementRect } from './utils.types';

export type ClientOffset = {
  x: number;
  y: number;
};

/** @internal */
export type TimeType = 'seconds' | 'minutes' | 'hours';

/** @internal */
export type AllDayRects = PureComputed<
  [Appointment[], Date,  Date, number[], ViewCell[][], Element[][]], ElementRect[]
>;
/** @internal */
export type VerticalRects = PureComputed<
  [Appointment[], Date,  Date, number[], ViewCell[][], number, Element[][]], ElementRect[]
>;
/** @internal */
export type HorizontalRects = PureComputed<
  [Appointment[], Date,  Date, ViewCell[][], Element[][]], ElementRect[]
>;

type AppointmentBoundaries = {
  appointmentStartTime?: Date,
  appointmentEndTime?: Date,
  offsetTimeTop?: number,
};
/** @internal */
export type CalculateAppointmentTimeBoundaries = PureComputed<
  [AppointmentModel, ViewCell | AllDayCell, string, number, number, number],
  AppointmentBoundaries
>;
/** @internal */
export type TimeBoundariesByDrag = PureComputed<
  [AppointmentModel, AppointmentModel,  string, number, number, number], AppointmentBoundaries
>;
/** @internal */
export type TimeBoundariesByResize = PureComputed<
  [AppointmentModel, AppointmentModel,  string, number, number], AppointmentBoundaries
>;
