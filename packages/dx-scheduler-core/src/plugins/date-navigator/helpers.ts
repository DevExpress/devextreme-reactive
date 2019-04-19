import moment from 'moment';
import { PureComputed } from '@devexpress/dx-core';
import { ViewBoundTextFn } from '../../types';

const calculateTextByDays: PureComputed<
  [Date, Date, any], string
> = (startViewDate, endViewDate, dateFormat) => {
  const momentStartViewDate = moment(startViewDate as Date);
  const momentEndViewDate = moment(endViewDate as Date);

  if (momentStartViewDate.isSame(momentEndViewDate, 'day')) {
    // return momentStartViewDate.format('D MMMM YYYY');
    return dateFormat(momentStartViewDate.toDate(), { day: 'numeric', month: 'long', year: 'numeric' });
  }
  if (momentStartViewDate.isSame(momentEndViewDate, 'year')) {
    if (momentStartViewDate.isSame(momentEndViewDate, 'month')) {
      return `${dateFormat(momentStartViewDate.toDate(), { day: 'numeric' })}-${dateFormat(momentEndViewDate.toDate(), { day: 'numeric', month: 'long', year: 'numeric' })}`;
    }
    // return `${momentStartViewDate.format('D MMM')} - ${momentEndViewDate.format('D MMM YYYY')}`;
    return `${dateFormat(momentStartViewDate.toDate(), { day: 'numeric', month: 'long' })} - ${dateFormat(momentEndViewDate.toDate(), { day: 'numeric', month: 'long', year: 'numeric' })}`;
  }
  // return `${momentStartViewDate.format('D MMM YY')} - ${momentEndViewDate.format('D MMM YY')}`;
  return `${dateFormat(momentStartViewDate.toDate(), { day: 'numeric', month: 'long', year: '2-digit' })} - ${dateFormat(momentEndViewDate.toDate(), { day: 'numeric', month: 'long', year: '2-digit' })}`;
};

const calculateTextByMonths: PureComputed<
  [Date, number, (any1: any, any2: any) => string], string
> = (currentDate, intervalCount, dateFormat) => {
  const momentCurrentDate = moment(currentDate as Date);

  if (intervalCount === 1) {
    // return momentCurrentDate.format('MMMM YYYY');
    return dateFormat(currentDate, { month: 'short', year: 'numeric' });
  }
  const lastMonth = momentCurrentDate.clone().add(intervalCount - 1, 'month');
  if (momentCurrentDate.isSame(lastMonth, 'year')) {
    // return `${momentCurrentDate.format('MMM')}-${lastMonth.format('MMM YYYY')}`;
    return `${dateFormat(currentDate, { month: 'short' })}-${dateFormat(lastMonth.toDate(), { month: 'short', year: 'numeric' })}`;
  }
  // return `${momentCurrentDate.format('MMM YY')} - ${lastMonth.format('MMM YY')}`;
  return `${dateFormat(currentDate, { month: 'short', year: '2-digit' })} - ${dateFormat(lastMonth.toDate(), { month: 'short', year: '2-digit' })}`;
};

export const viewBoundText = (
  startViewDate: any, endViewDate: any, step: any, currentDate: any, intervalCount: any, dateFormat: any,
) => (
  step !== 'month'
    ? calculateTextByDays(startViewDate, endViewDate, dateFormat)
    : calculateTextByMonths(currentDate, intervalCount, dateFormat)
);
