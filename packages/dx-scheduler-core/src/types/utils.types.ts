import moment from 'moment';
import { AppointmentModel } from './scheduler-core.types';
import { Rect } from './horizontal-rect.types';

export type Interval = [moment.Moment, moment.Moment];
type GroupItem = {
  start: moment.Moment;
  end: moment.Moment;
  dataItem: AppointmentModel;
  offset: number;
};

export type AppointmentGroup = {
  items: GroupItem[];
  reduceValue: number;
};

export type AppointmentUnwrappedGroup = {
  start: moment.Moment;
  end: moment.Moment;
  dataItem: AppointmentModel;
  offset: number;
  reduceValue: number;
};

export interface ElementRect extends Rect {
  dataItem: AppointmentModel;
  type: string;
}
