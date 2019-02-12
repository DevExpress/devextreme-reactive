import moment from 'moment';
import { PureComputed } from '@devexpress/dx-core';
import { Appointment, AppointmentDate } from './scheduler-core.types';

export type ViewCellData = { startDate: Date; endDate: Date; };

export interface AppointmentMoment {
  start: moment.Moment;
  end: moment.Moment;
  title?: string;
  allDay?: boolean;
  id?: number | string;
  [propertyName: string]: any;
}

export type CalculateAllDayDateIntervalsFn = PureComputed<
  [Appointment[], Date, Date, number[]], AppointmentMoment[]
>;

export type GetAllDayCellIndexByDateFn = PureComputed<
  [ViewCellData[][], AppointmentDate, boolean], number
>;

export type SliceAppointmentsByBoundariesFn = PureComputed<
  [AppointmentMoment, Date, Date, number[]], AppointmentMoment[]
>;
