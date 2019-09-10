import {
  LONG_WEEK_DAY_OPTIONS, DAY_LONG_MONTH_OPTIONS,
  LONG_MONTH_OPTIONS,
} from '@devexpress/dx-scheduler-core';
import { PureComputed } from '@devexpress/dx-core';
import { Option, OptionsFormatterFn, DateFormatterFn } from '../../types';
import {
  MONTHS_DATES, DAYS_OF_WEEK_DATES, REPEAT_TYPES_ARRAY, WEEK_NUMBER_LABELS,
} from './constants';

export const getWeekNumberLabels: OptionsFormatterFn = getMessage =>
  WEEK_NUMBER_LABELS.map((weekNumberLabel, index) => ({
    text: getMessage(weekNumberLabel),
    id: index,
  }));

export const getDaysOfWeek: DateFormatterFn = formatDate => DAYS_OF_WEEK_DATES.map(
  (day, index) => ({
    text: getDayOfWeek(day, formatDate),
    id: index,
  }));

export const getMonths: DateFormatterFn = formatDate => MONTHS_DATES.map((month, index) => ({
  text: getMonth(month, formatDate),
  id: getMonthId(index),
}));

export const getMonthsWithOf: PureComputed<
  [(messageKey: string) => string, (date: Date, formatOptions: object) => string],
    Array<Option>
> = (getMessage, formatDate) => MONTHS_DATES.map((month, index) => ({
  text: getMonthWithOf(month, getMessage, formatDate),
  id: getMonthId(index),
}));

const getMonthWithOf = (
  date: Date,
  getMessage: (messageKey: string) => string,
  formatDate: (date: Date, formatOptions: object) => string,
) => getMessage('ofLabel')
  + formatDate(date, DAY_LONG_MONTH_OPTIONS).replace(/[\d.,]/g, '').toString();

const getMonth = (
  date: Date,
  formatDate: (date: Date, formatOptions: object) => string,
) => formatDate(date, LONG_MONTH_OPTIONS);

const getDayOfWeek = (
  date: Date,
  formatDate: (date: Date, formatOptions: object) => string,
) => formatDate(date, LONG_WEEK_DAY_OPTIONS);

const getMonthId: PureComputed<
  [number], number
> = index => index + 1;

export const getAvailableRecurrenceOptions: OptionsFormatterFn = getMessage =>
  REPEAT_TYPES_ARRAY.map(type => ({
    text: getMessage(type),
    id: type,
  }));
