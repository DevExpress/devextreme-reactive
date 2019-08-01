import { AppointmentModel, AppointmentId } from './scheduler-core.types';
import { PureComputed } from '@devexpress/dx-core/src';

export type AppointmentChanges = { [key: string]: object };
export type Changes = AppointmentModel | {};
export type EditAppointmentPayload = { appointmentId: AppointmentId };

export type EditType = 'ALL' | 'CURRENT_FOLLOWING' | 'CURRENT';

export type PreCommitChanges = PureComputed<
  [Changes | null, AppointmentModel, EditType], ChangeSet
>;

/** Describes uncommitted changes made to the scheduler data. */
export interface ChangeSet {
  /** An array of rows to be created. */
  added?: { [key: string]: object };
  // tslint:disable-next-line:max-line-length
  /** An associative array that stores changes made to existing data. Each array item specifies changes made to a row. The item's key specifies the associated row's ID. */
  changed?: { [key: string]: object };
  /** An array of IDs representing rows to be deleted. */
  deleted?: number | string;
}
