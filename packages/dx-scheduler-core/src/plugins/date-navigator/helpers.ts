import moment from 'moment';
import { PureComputed } from '@devexpress/dx-core';
import { ViewBoundTextFn } from '../../types';

const day = { day: 'numeric' };
const shortMonth = { month: 'short' };
const dayShortMonth = { day: 'numeric', month: 'short' };
const dayShortMonthLongYear = { day: 'numeric', month: 'short', year: 'numeric' };
const dayShortMonthShortYear = { day: 'numeric', month: 'short', year: '2-digit' };
const dayLongMonthLongYear = { day: 'numeric', month: 'long', year: 'numeric' };
const shortMonthLongYear = { month: 'short', year: 'numeric' };
const shortMonthShortYear = { month: 'short', year: '2-digit' };
const longMonthLongYear = { month: 'long', year: 'numeric' };

const calculateTextByDays: PureComputed<
  [Date, Date, any], string
> = (startViewDate, endViewDate, dateFormat) => {
  const momentStartViewDate = moment(startViewDate as Date);
  const momentEndViewDate = moment(endViewDate as Date);

  if (momentStartViewDate.isSame(momentEndViewDate, 'day')) {
    return dateFormat(momentStartViewDate.toDate(), dayLongMonthLongYear);
  }
  if (momentStartViewDate.isSame(momentEndViewDate, 'year')) {
    if (momentStartViewDate.isSame(momentEndViewDate, 'month')) {
      return `${
        dateFormat(momentStartViewDate.toDate(), day)
      }-${
        dateFormat(momentEndViewDate.toDate(), day)
      } ${
        dateFormat(momentEndViewDate.toDate(), longMonthLongYear)
      }`;
    }
    return `${
      dateFormat(momentStartViewDate.toDate(), dayShortMonth)
    } - ${
      dateFormat(momentEndViewDate.toDate(), dayShortMonthLongYear)
    }`;
  }
  return `${
    dateFormat(momentStartViewDate.toDate(), dayShortMonthShortYear)
  } - ${
    dateFormat(momentEndViewDate.toDate(), dayShortMonthShortYear)
  }`;
};

const calculateTextByMonths: PureComputed<
  [Date, number, any], string
> = (currentDate, intervalCount, dateFormat) => {
  const momentCurrentDate = moment(currentDate as Date);

  if (intervalCount === 1) {
    return dateFormat(momentCurrentDate.toDate(), longMonthLongYear);
  }
  const lastMonth = momentCurrentDate.clone().add(intervalCount - 1, 'month');
  if (momentCurrentDate.isSame(lastMonth, 'year')) {
    return `${
      dateFormat(momentCurrentDate.toDate(), shortMonth)
    }-${
      dateFormat(lastMonth.toDate(), shortMonthLongYear)
    }`;
  }
  return `${
    dateFormat(momentCurrentDate.toDate(), shortMonthShortYear)
  } - ${
    dateFormat(lastMonth.toDate(), shortMonthShortYear)
  }`;
};

export const viewBoundText: ViewBoundTextFn = (
  startViewDate, endViewDate, step, currentDate, intervalCount, dateFormat,
) => (
  step !== 'month'
    ? calculateTextByDays(startViewDate, endViewDate, dateFormat)
    : calculateTextByMonths(currentDate, intervalCount, dateFormat)
);
