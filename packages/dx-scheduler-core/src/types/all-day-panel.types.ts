import moment from 'moment';
import { PureComputed } from '@devexpress/dx-core';
import { AppointmentCore, AppointmentDate, ExcludedDays } from './scheduler-core.types';

export type LeftBound = Date;
export type RightBound = Date;
export type ViewCellData = { startDate: Date; endDate: Date; };
export type TakePrevious = boolean;

export interface AppointmentMoment {
  start: moment.Moment;
  end: moment.Moment;
  title?: string;
  allDay?: boolean;
  id?: number | string;
  [propertyName: string]: any;
}

export type CalculateAllDayDateIntervalsFn = PureComputed<
  [AppointmentCore[], LeftBound, RightBound, ExcludedDays], AppointmentMoment[]
>;

export type GetAllDayCellIndexByDateFn = PureComputed<
  [ViewCellData[][], AppointmentDate, TakePrevious], number
>;

export type SliceAppointmentsByBoundariesFn = PureComputed<
  [AppointmentMoment, LeftBound, RightBound, ExcludedDays], AppointmentMoment[]
>;
