import { PureComputed } from '@devexpress/dx-core';
import { Appointment, ViewCell, AppointmentModel } from './scheduler-core.types';
import { ElementRect } from './utils.types';

export type ClientOffset = {
  x: number;
  y: number;
};

export type TimeType = 'seconds' | 'minutes';

export type AllDayRects = PureComputed<
  [Appointment[], Date,  Date, number[], ViewCell[][], Element[][]], ElementRect[]
>;

export type VerticalRects = PureComputed<
  [Appointment[], Date,  Date, number[], ViewCell[][], number, Element[][]], ElementRect[]
>;

export type HorizontalRects = PureComputed<
  [Appointment[], Date,  Date, number[], ViewCell[][], Element[][]], ElementRect[]
>;

type AppointmentBoundaries = {
  appointmentStartTime: Date,
  appointmentEndTime: Date,
  offsetTimeTop: number,
};

export type CalculateAppointmentTimeBoundaries = PureComputed<
  [AppointmentModel, AppointmentModel, string, string, number, number, number, number],
  AppointmentBoundaries
>;
