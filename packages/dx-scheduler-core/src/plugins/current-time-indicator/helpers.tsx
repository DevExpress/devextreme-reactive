import { PureComputed } from '@devexpress/dx-core';
import moment from 'moment';
import {
  IsCellShadedFn, IsShadedAppointment,
  GetCurrentTimeIndicatorTopFn,
} from '../../types';

export const isMonthCell: PureComputed<
  [boolean | undefined], boolean
> = otherMonth => otherMonth !== undefined;

export const isShadedAppointment: IsShadedAppointment = (
  { data: appointmentData }, currentTime, shadePreviousAppointments,
) => {
  const momentCurrentDate = moment(currentTime);
  if (appointmentData.allDay) {
    return momentCurrentDate.isAfter(appointmentData.endDate as Date, 'day')
    && shadePreviousAppointments;
  }
  if (momentCurrentDate.isAfter(appointmentData.endDate as Date)) {
    return shadePreviousAppointments;
  }
  return false;
};

export const getCurrentTimeIndicatorTop: GetCurrentTimeIndicatorTopFn = (
  cellData, currentTime,
) => {
  const top = ((currentTime - cellData.startDate.getTime()) * 100)
  / (cellData.endDate.getTime() - cellData.startDate.getTime());
  return (top < 0 || top > 100) ? undefined : `${top}%`;
};

export const isCellShaded: IsCellShadedFn = (
  { startDate, endDate, otherMonth }, currentTime, shadePreviousCells,
) => {
  const monthCell = isMonthCell(otherMonth);
  return ((startDate.getTime() < currentTime && !monthCell)
    || endDate.getTime() < currentTime && monthCell) && shadePreviousCells;
};
