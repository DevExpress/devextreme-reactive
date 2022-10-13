import { Options } from 'rrule';
import { AppointmentModel, AppointmentId } from './scheduler-core.types';

export type AppointmentChanges = { [key: string]: object };
export type Changes = Partial<AppointmentModel>;
export type EditAppointmentPayload = { appointmentId: AppointmentId };

export type RecurrenceEditType = 'all' | 'currentAndFollowing' | 'current';

export type PreCommitChangesFn = (
  changes: Changes | null, appointmentData: Partial<AppointmentModel>, type: RecurrenceEditType,
) => ChangeSet;

/** @internal */
export type MakeDateSequenceFn = (
  rRule: string | undefined, exDate: string | undefined, prevStartDate: Date, date: Date,
) => { options: Partial<Options>, dates: Array<Date> };

/** @internal */
export type EditFn = (appointmentData: Partial<AppointmentModel>, changes: Changes) => ChangeSet;
/** @internal */
export type DeleteFn = (appointmentData: Partial<AppointmentModel>) => ChangeSet;
/* @internal */
export type ChangeFn = (
  appointmentData: Partial<AppointmentModel>, changes: Changes, changeAllAction: EditFn | DeleteFn,
) => ChangeSet;

/** Describes uncommitted changes made to the scheduler data. */
export interface ChangeSet {
  /** An array of rows to be created. */
  added?: { [key: string]: any };
  // tslint:disable-next-line:max-line-length
  /** An associative array that stores changes made to existing data. Each array item specifies changes made to a row. The item's key specifies the associated row's ID. */
  changed?: { [key: string]: any };
  /** An array of IDs representing rows to be deleted. */
  deleted?: number | string;
}
