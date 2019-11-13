import { PureComputed } from '@devexpress/dx-core';
import moment from 'moment';
import { AppointmentModel } from '../../types';

export const isMonthCell: PureComputed<
  [boolean | undefined], boolean
> = otherMonth => otherMonth === undefined ? false : true;

export const isPastAppointment: PureComputed<
  [AppointmentModel, number], boolean
> = (appointmentData, currentTime) => {
  const momentCurrentDate = moment(currentTime);
  if (appointmentData.allDay) {
    return momentCurrentDate.isAfter(appointmentData.endDate as Date, 'day');
  }
  if (momentCurrentDate.isAfter(appointmentData.endDate as Date)) return true;
  return false;
};
