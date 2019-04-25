import moment from 'moment';
import { PureComputed } from '@devexpress/dx-core';
import { ViewBoundTextFn, FormatterFn } from '../../types';

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
  [Date, Date, FormatterFn], string
> = (startViewDate, endViewDate, formatDate) => {
  const momentStartViewDate = moment(startViewDate as Date);
  const momentEndViewDate = moment(endViewDate as Date);

  if (momentStartViewDate.isSame(momentEndViewDate, 'day')) {
    return formatDate(momentStartViewDate.toDate(), dayLongMonthLongYear);
  }
  if (momentStartViewDate.isSame(momentEndViewDate, 'year')) {
    if (momentStartViewDate.isSame(momentEndViewDate, 'month')) {
      return `${
        formatDate(momentStartViewDate.toDate(), day)
      }-${
        formatDate(momentEndViewDate.toDate(), day)
      } ${
        formatDate(momentEndViewDate.toDate(), longMonthLongYear)
      }`;
    }
    return `${
      formatDate(momentStartViewDate.toDate(), dayShortMonth)
    } - ${
      formatDate(momentEndViewDate.toDate(), dayShortMonthLongYear)
    }`;
  }
  return `${
    formatDate(momentStartViewDate.toDate(), dayShortMonthShortYear)
  } - ${
    formatDate(momentEndViewDate.toDate(), dayShortMonthShortYear)
  }`;
};

const calculateTextByMonths: PureComputed<
  [Date, number, FormatterFn], string
> = (currentDate, intervalCount, formatDate) => {
  const momentCurrentDate = moment(currentDate as Date);

  if (intervalCount === 1) {
    return formatDate(momentCurrentDate.toDate(), longMonthLongYear);
  }
  const lastMonth = momentCurrentDate.clone().add(intervalCount - 1, 'month');
  if (momentCurrentDate.isSame(lastMonth, 'year')) {
    return `${
      formatDate(momentCurrentDate.toDate(), shortMonth)
    }-${
      formatDate(lastMonth.toDate(), shortMonthLongYear)
    }`;
  }
  return `${
    formatDate(momentCurrentDate.toDate(), shortMonthShortYear)
  } - ${
    formatDate(lastMonth.toDate(), shortMonthShortYear)
  }`;
};

export const viewBoundText: ViewBoundTextFn = (
  startViewDate, endViewDate, step, currentDate, intervalCount, formatDate,
) => (
  step !== 'month'
    ? calculateTextByDays(startViewDate, endViewDate, formatDate)
    : calculateTextByMonths(currentDate, intervalCount, formatDate)
);
