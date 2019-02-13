import { PureReducer } from '@devexpress/dx-core';
import { AppointmentModel, AppointmentDataPayload } from '../../types';

export const setAppointmentData: PureReducer<
  AppointmentModel, AppointmentDataPayload
> = (prevAppointmentData, { appointmentData }) => appointmentData;
