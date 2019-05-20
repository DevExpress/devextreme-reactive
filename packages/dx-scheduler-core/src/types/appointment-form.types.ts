import { AppointmentModel, SchedulerTime } from './scheduler-core.types';

export type Action = ([fieldName]?: any) => void;
export type StartDate = SchedulerTime;
export type EndDate = SchedulerTime;
export type AppointmentDataPayload = {
  appointmentData: AppointmentModel;
};
export type AddedAppointmentDataPayload = {
  appointmentData: AppointmentModel | {};
};
