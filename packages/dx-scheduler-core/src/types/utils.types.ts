import moment from 'moment';
import { PureComputed } from '@devexpress/dx-core';
import {
  AppointmentModel, ViewName, ExcludedDays, CurrentDate, FirstDayOfWeek,
} from './scheduler-core.types';
import { Rect } from './horizontal-rect.types';
import { AppointmentMoment, LeftBound, RightBound } from './all-day-panel.types';

export type Interval = [moment.Moment, moment.Moment];
interface GroupItem {
  start: moment.Moment;
  end: moment.Moment;
  dataItem: AppointmentModel;
  offset: number;
}

export type AppointmentGroup = {
  items: GroupItem[];
  reduceValue: number;
};

export interface AppointmentUnwrappedGroup extends GroupItem {
  reduceValue: number;
}

export interface ElementRect extends Rect {
  dataItem: AppointmentModel;
  type: string;
}

export type Computed = PureComputed<
  [any, ViewName, (...args: any[]) => any, any]
>;

export type ViewPredicate = PureComputed<
  [AppointmentMoment, LeftBound, RightBound, ExcludedDays?, boolean?], boolean
>;

export type CalculateFirstDateOfWeek = PureComputed<
  [CurrentDate, FirstDayOfWeek, ExcludedDays], Date
> ;

export type RectCalculatorBase = PureComputed<
  [AppointmentUnwrappedGroup, (...args: any) => any, object], any
>;

export type CalculateRectByDateIntervals = PureComputed<
  [any, AppointmentMoment[], (...args: any) => any, any], ElementRect[]
>;
