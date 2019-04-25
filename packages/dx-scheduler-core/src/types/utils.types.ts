import moment from 'moment';
import { PureComputed } from '@devexpress/dx-core';
import { AppointmentModel } from './scheduler-core.types';
import { Rect } from './horizontal-rect.types';
import { AppointmentMoment } from './all-day-panel.types';

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
  fromPrev: boolean;
  toNext: boolean;
}

export interface ElementRect extends Rect {
  dataItem: AppointmentModel;
  type: string;
  fromPrev: boolean;
  toNext: boolean;
}

export type ComputedHelperFn = PureComputed<
  [any, string, (...args: any[]) => any, any]
>;

export type ViewPredicateFn = PureComputed<
  [AppointmentMoment, Date, Date, number[]?, boolean?], boolean
>;

export type CalculateFirstDateOfWeekFn = PureComputed<
  [Date, number, number[]], Date
> ;

export type RectCalculatorBaseFn = PureComputed<
  [AppointmentUnwrappedGroup, (...args: any) => any, object], any
>;

export type CalculateRectByDateIntervalsFn = PureComputed<
  [any, AppointmentMoment[], (...args: any) => any, any], ElementRect[]
>;
