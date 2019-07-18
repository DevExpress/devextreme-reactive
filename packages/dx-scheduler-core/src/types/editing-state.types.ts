import { AppointmentModel, AppointmentId } from './scheduler-core.types';

export type AppointmentChanges = { [key: string]: object };
export type Changes = { change: AppointmentModel | {} };
export type EditAppointmentPayload = { appointmentId: AppointmentId };

export type EditType = 'ALL' | 'CURRENT_FOLLOWING' | 'CURRENT';
