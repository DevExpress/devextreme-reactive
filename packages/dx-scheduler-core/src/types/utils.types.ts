import moment from 'moment';
import { AppointmentModel } from './scheduler-core.types';
import { Rect } from './horizontal-rect.types';

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
