import moment from 'moment';
import { PureComputed } from '@devexpress/dx-core';
import {
  CurrentDate, NavigationStep, IntervalCount, StartViewDate, EndViewDate,
} from '../../types';

const calculateTextByDays: PureComputed<
  [StartViewDate, EndViewDate], string
> = (startViewDate, endViewDate) => {
  const momentStartViewDate = moment(startViewDate as StartViewDate);
  const momentEndViewDate = moment(endViewDate as EndViewDate);

  if (momentStartViewDate.isSame(momentEndViewDate, 'day')) {
    return momentStartViewDate.format('D MMMM YYYY');
  }
  if (momentStartViewDate.isSame(momentEndViewDate, 'year')) {
    if (momentStartViewDate.isSame(momentEndViewDate, 'month')) {
      return `${momentStartViewDate.format('D')}-${momentEndViewDate.format('D MMMM YYYY')}`;
    }
    return `${momentStartViewDate.format('D MMM')} - ${momentEndViewDate.format('D MMM YYYY')}`;
  }
  return `${momentStartViewDate.format('D MMM YY')} - ${momentEndViewDate.format('D MMM YY')}`;
};

const calculateTextByMonths: PureComputed<
  [StartViewDate, IntervalCount], string
> = (currentDate, intervalCount) => {
  const momentCurrentDate = moment(currentDate as StartViewDate);

  if (intervalCount === 1) {
    return momentCurrentDate.format('MMMM YYYY');
  }
  const lastMonth = momentCurrentDate.clone().add(intervalCount - 1, 'month');
  if (momentCurrentDate.isSame(lastMonth, 'year')) {
    return `${momentCurrentDate.format('MMM')}-${lastMonth.format('MMM YYYY')}`;
  }
  return `${momentCurrentDate.format('MMM YY')} - ${lastMonth.format('MMM YY')}`;
};

export const viewBoundText: PureComputed<
  [StartViewDate, EndViewDate, NavigationStep, CurrentDate, IntervalCount], string
> = (startViewDate, endViewDate, step, currentDate, intervalCount) => (
  step !== 'month'
    ? calculateTextByDays(startViewDate, endViewDate)
    : calculateTextByMonths(currentDate, intervalCount)
);
