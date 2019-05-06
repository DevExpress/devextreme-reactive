import moment from 'moment';
import { PureComputed } from '@devexpress/dx-core';
import { Appointment, AppointmentDate, AppointmentId } from './scheduler-core.types';
import { AppointmentMoment, ViewCellData } from './all-day-panel.types';

export type TimeBounds = { left: moment.Moment, right: moment.Moment };

/** Describes a cell data configuration object. */
export interface MonthCellData {
  /** Specifies the cell start time. */
  startDate: Date;
  /** Specifies the cell end time. */
  endDate: Date;
  /** Indicates whether the cell's date is not in the current month. */
  otherMonth: boolean;
  /** Indicates whether the cell's date is today. */
  today: boolean;
}

export type MonthCellsDataComputedFn = PureComputed<
  [Date, number, number, Date | number], MonthCellData[][]
>;

export type CalculateMonthDateIntervalsFn = PureComputed<
  [Appointment[], Date, Date], AppointmentMoment[]
>;

export type SliceAppointmentByWeekFn = PureComputed<
  [TimeBounds, AppointmentMoment, number], AppointmentMoment[]
>;

export type GetMonthCellIndexByDateFn = PureComputed<
  [ViewCellData[][], AppointmentDate, boolean], AppointmentId
>;
