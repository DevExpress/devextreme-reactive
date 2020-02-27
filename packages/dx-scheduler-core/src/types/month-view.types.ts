import moment from 'moment';
import { PureComputed } from '@devexpress/dx-core';
import { Appointment, SchedulerDateTime, AppointmentId } from './scheduler-core.types';
import { AppointmentMoment, ViewCellData } from './all-day-panel.types';
import { ViewMetaData } from './utils.types';

/** @internal */
export type TimeBounds = { left: moment.Moment, right: moment.Moment };

/** Describes a cell data configuration object. */
export interface MonthCellData {
  /** Specifies the cell's start time. */
  startDate: Date;
  /** Specifies the cell's end time. */
  endDate: Date;
  /** Indicates whether the cell's date is not in the current month. */
  otherMonth: boolean;
  /** Indicates whether the cell's date is today. */
  today: boolean;
}

/** @internal */
export type MonthCellsDataComputedFn = PureComputed<
  [Date, number, number, Date | number], MonthCellData[][]
>;
/** @internal */
export type CalculateMonthDateIntervalsFn = PureComputed<
  [Appointment[], Date, Date], AppointmentMoment[][]
>;
/** @internal */
export type SliceAppointmentByWeekFn = PureComputed<
  [TimeBounds, AppointmentMoment, number], AppointmentMoment[]
>;
/** @internal */
export type GetMonthCellIndexByAppointmentDataFn = PureComputed<
  [ViewCellData[][], ViewMetaData,
  SchedulerDateTime, AppointmentMoment, boolean], AppointmentId
>;
