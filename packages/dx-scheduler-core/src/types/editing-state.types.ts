import { AppointmentModel, Index } from './scheduler-core.types';

export type AppointmentChanges = { [key: string]: object };
export type Changes = { change: AppointmentModel | {} };
export type EditAppointmentPayload = { appointmentId: Index };
