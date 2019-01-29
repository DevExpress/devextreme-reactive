import { PureReducer } from '@devexpress/dx-core';
import { AppointmentModel } from '../../types';

export const setAppointmentData: PureReducer<
  AppointmentModel, AppointmentModel /// ???? { AppointmentModel }
> = (prevAppointmentData, { appointmentData }) => appointmentData;
