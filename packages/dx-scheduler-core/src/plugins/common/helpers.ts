import moment from 'moment';
import { PureComputed } from '@devexpress/dx-core';
import {
  VERTICAL_TYPE, HORIZONTAL_TYPE, DAY_OPTIONS, SHORT_MONTH_OPTIONS,
  DAY_SHORT_MONTH_OPTIONS, SHORT_MONTH_LONG_YEAR_OPTIONS,
  SHORT_MONTH_SHORT_YEAR_OPTIONS, MONTH_YEAR_OPTIONS,
  DAY_LONG_MONTH_LONG_YEAR_OPTIONS, DAY_SHORT_MONTH_SHORT_YEAR_OPTIONS,
  DAY_SHORT_MONTH_LONG_YEAR_OPTIONS, LONG_WEEK_DAY_OPTIONS, APPOINTMENT_TOOLTIP, EMPTY_OPTIONS,
} from '../../constants';
import { ViewBoundTextFn, FormatterFn } from '../../types';

const MONTH_TYPE = 'month';

export const getViewType: PureComputed<[string], string> = (currentViewType) => {
  if (currentViewType === MONTH_TYPE) return HORIZONTAL_TYPE;
  return VERTICAL_TYPE;
};

export const isMidnight: PureComputed<
  [Date], boolean
> = (date) => {
  const momentDate = moment(date as Date);
  return momentDate.hours() === 0 && momentDate.minutes() === 0 && momentDate.seconds() === 0;
};

const calculateTextByDays: PureComputed<
  [Date, Date, FormatterFn, object], string
> = (startViewDate, endViewDate, formatDate, additionalOptions) => {
  const momentStartViewDate = moment(startViewDate as Date);
  const momentEndViewDate = moment(endViewDate as Date);

  if (momentStartViewDate.isSame(momentEndViewDate, 'day')) {
    return formatDate(momentStartViewDate.toDate(), {
      ...DAY_LONG_MONTH_LONG_YEAR_OPTIONS, ...additionalOptions,
    });
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
  startViewDate, endViewDate, type, currentDate, intervalCount, formatDate,
) => (type !== 'month'
  ? calculateTextByDays(
    startViewDate, endViewDate, formatDate,
    type === APPOINTMENT_TOOLTIP ? LONG_WEEK_DAY_OPTIONS : EMPTY_OPTIONS,
  )
  : calculateTextByMonths(currentDate, intervalCount, formatDate)
);
