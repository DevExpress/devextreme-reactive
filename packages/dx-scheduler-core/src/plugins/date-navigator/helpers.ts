import moment from 'moment';
import { PureComputed } from '@devexpress/dx-core';
import { ViewBoundTextFn, FormatterFn } from '../../types';
import {
  DAY_OPTIONS,
  SHORT_MONTH_OPTIONS,
  DAY_SHORT_MONTH_OPTIONS,
  SHORT_MONTH_LONG_YEAR_OPTIONS,
  SHORT_MONTH_SHORT_YEAR_OPTIONS,
  MONTH_YEAR_OPTIONS,
  DAY_LONG_MONTH_LONG_YEAR_OPTIONS,
  DAY_SHORT_MONTH_SHORT_YEAR_OPTIONS,
  DAY_SHORT_MONTH_LONG_YEAR_OPTIONS,
} from '../../constants';

const calculateTextByDays: PureComputed<
  [Date, Date, FormatterFn], string
> = (startViewDate, endViewDate, formatDate) => {
  const momentStartViewDate = moment(startViewDate as Date);
  const momentEndViewDate = moment(endViewDate as Date);

  if (momentStartViewDate.isSame(momentEndViewDate, 'day')) {
    return formatDate(momentStartViewDate.toDate(), DAY_LONG_MONTH_LONG_YEAR_OPTIONS);
  }
  if (momentStartViewDate.isSame(momentEndViewDate, 'year')) {
    if (momentStartViewDate.isSame(momentEndViewDate, 'month')) {
      return `${
        formatDate(momentStartViewDate.toDate(), DAY_OPTIONS)
      }-${
        formatDate(momentEndViewDate.toDate(), DAY_OPTIONS)
      } ${
        formatDate(momentEndViewDate.toDate(), MONTH_YEAR_OPTIONS)
      }`;
    }
    return `${
      formatDate(momentStartViewDate.toDate(), DAY_SHORT_MONTH_OPTIONS)
    } - ${
      formatDate(momentEndViewDate.toDate(), DAY_SHORT_MONTH_LONG_YEAR_OPTIONS)
    }`;
  }
  return `${
    formatDate(momentStartViewDate.toDate(), DAY_SHORT_MONTH_SHORT_YEAR_OPTIONS)
  } - ${
    formatDate(momentEndViewDate.toDate(), DAY_SHORT_MONTH_SHORT_YEAR_OPTIONS)
  }`;
};

const calculateTextByMonths: PureComputed<
  [Date, number, FormatterFn], string
> = (currentDate, intervalCount, formatDate) => {
  const momentCurrentDate = moment(currentDate as Date);

  if (intervalCount === 1) {
    return formatDate(momentCurrentDate.toDate(), MONTH_YEAR_OPTIONS);
  }
  const lastMonth = momentCurrentDate.clone().add(intervalCount - 1, 'month');
  if (momentCurrentDate.isSame(lastMonth, 'year')) {
    return `${
      formatDate(momentCurrentDate.toDate(), SHORT_MONTH_OPTIONS)
    }-${
      formatDate(lastMonth.toDate(), SHORT_MONTH_LONG_YEAR_OPTIONS)
    }`;
  }
  return `${
    formatDate(momentCurrentDate.toDate(), SHORT_MONTH_SHORT_YEAR_OPTIONS)
  } - ${
    formatDate(lastMonth.toDate(), SHORT_MONTH_SHORT_YEAR_OPTIONS)
  }`;
};

export const viewBoundText: ViewBoundTextFn = (
  startViewDate, endViewDate, step, currentDate, intervalCount, formatDate,
) => (
  step !== 'month'
    ? calculateTextByDays(startViewDate, endViewDate, formatDate)
    : calculateTextByMonths(currentDate, intervalCount, formatDate)
);
