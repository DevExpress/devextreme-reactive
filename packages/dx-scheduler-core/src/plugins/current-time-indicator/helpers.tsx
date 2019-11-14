import { PureComputed } from '@devexpress/dx-core';
import moment from 'moment';
import { IsCellShadedFn, IsReducedBrightnessAppointmentFn } from '../../types';

export const isMonthCell: PureComputed<
  [boolean | undefined], boolean
> = otherMonth => otherMonth === undefined ? false : true;

export const isReducedBrightnessAppointment: IsReducedBrightnessAppointmentFn = (
  { data: appointmentData }, currentTime, reduceBrightness,
) => {
  const momentCurrentDate = moment(currentTime);
  if (appointmentData.allDay) {
    return momentCurrentDate.isAfter(appointmentData.endDate as Date, 'day')
    && reduceBrightness;
  }
  if (momentCurrentDate.isAfter(appointmentData.endDate as Date)) {
    return true && reduceBrightness;
  }
  return false;
};

export const getCurrentTimeIndicatorTop: PureComputed<
  [Date | undefined, Date | undefined, Date | undefined], string
> = (startDate, endDate, currentTime) => {
  if (!startDate || !endDate || !currentTime) return '0';
  return `${((currentTime.getTime() - startDate.getTime()) * 100) / (endDate.getTime() - startDate.getTime())}%`;
};

export const isCellShaded: IsCellShadedFn = (
  { startDate, endDate, otherMonth }, currentTime, shadePastCells,
) => {
  const monthCell = isMonthCell(otherMonth);
  return ((startDate.getTime() < currentTime && !monthCell)
    || endDate.getTime() < currentTime && monthCell) && shadePastCells;
};

export const isAllDayCellShaded: IsCellShadedFn = (
  { endDate }, currentTime, shadePastCells,
) => (endDate.getTime() < currentTime && shadePastCells);
