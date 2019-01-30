import { AppointmentModel } from './scheduler-core.types';

export type Action = ([fieldName]?: any) => void;
export type StartDate = Date | number | string;
export type EndDate = Date | number | string;
export type AppointmentDataPayload = {
  appointmentData: AppointmentModel;
};
export type AddedAppointmentDataPayload = {
  appointmentData: AppointmentModel | {};
};
