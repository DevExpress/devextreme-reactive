import {
  LONG_WEEK_DAY_OPTIONS, SUNDAY_DATE, MONDAY_DATE, DAY_LONG_MONTH_OPTIONS,
  TUESDAY_DATE, WEDNESDAY_DATE, THURSDAY_DATE, FRIDAY_DATE, SATURDAY_DATE,
  JANUARY_DATE, LONG_MONTH_OPTIONS, FEBRUARY_DATE, MARCH_DATE, APRIL_DATE,
  MAY_DATE, AUGUST_DATE, OCTOBER_DATE, NOVEMBER_DATE, DECEMBER_DATE, SEPTEMBER_DATE,
  JULY_DATE, JUNE_DATE, REPEAT_TYPES,
} from '@devexpress/dx-scheduler-core';
import { PureComputed } from '@devexpress/dx-core';
import { Option } from '../../types';

export const getWeekNumberLabels: PureComputed<
  [(messageKey: string) => string], Array<Option>
> = getMessage => [
  {
    text: getMessage('firstLabel'),
    id: 0,
  },
  {
    text: getMessage('secondLabel'),
    id: 1,
  },
  {
    text: getMessage('thirdLabel'),
    id: 2,
  },
  {
    text: getMessage('fourthLabel'),
    id: 3,
  },
  {
    text: getMessage('lastLabel'),
    id: 4,
  },
];

export const getDaysOfWeek: PureComputed<
[(date: Date, formatOptions: object) => string], Array<Option>
> = formatDate => [
  {
    text: formatDate(SUNDAY_DATE, LONG_WEEK_DAY_OPTIONS),
    id: 0,
  },
  {
    text: formatDate(MONDAY_DATE, LONG_WEEK_DAY_OPTIONS),
    id: 1,
  },
  {
    text: formatDate(TUESDAY_DATE, LONG_WEEK_DAY_OPTIONS),
    id: 2,
  },
  {
    text: formatDate(WEDNESDAY_DATE, LONG_WEEK_DAY_OPTIONS),
    id: 3,
  },
  {
    text: formatDate(THURSDAY_DATE, LONG_WEEK_DAY_OPTIONS),
    id: 4,
  },
  {
    text: formatDate(FRIDAY_DATE, LONG_WEEK_DAY_OPTIONS),
    id: 5,
  },
  {
    text: formatDate(SATURDAY_DATE, LONG_WEEK_DAY_OPTIONS),
    id: 6,
  },
];

export const getMonths: PureComputed<
  [(date: Date, formatOptions: object) => string], Array<Option>
> = formatDate => [
  {
    text: formatDate(JANUARY_DATE, LONG_MONTH_OPTIONS),
    id: 1,
  },
  {
    text: formatDate(FEBRUARY_DATE, LONG_MONTH_OPTIONS),
    id: 2,
  },
  {
    text: formatDate(MARCH_DATE, LONG_MONTH_OPTIONS),
    id: 3,
  },
  {
    text: formatDate(APRIL_DATE, LONG_MONTH_OPTIONS),
    id: 4,
  },
  {
    text: formatDate(MAY_DATE, LONG_MONTH_OPTIONS),
    id: 5,
  },
  {
    text: formatDate(JUNE_DATE, LONG_MONTH_OPTIONS),
    id: 6,
  },
  {
    text: formatDate(JULY_DATE, LONG_MONTH_OPTIONS),
    id: 7,
  },
  {
    text: formatDate(AUGUST_DATE, LONG_MONTH_OPTIONS),
    id: 8,
  },
  {
    text: formatDate(SEPTEMBER_DATE, LONG_MONTH_OPTIONS),
    id: 9,
  },
  {
    text: formatDate(OCTOBER_DATE, LONG_MONTH_OPTIONS),
    id: 10,
  },
  {
    text: formatDate(NOVEMBER_DATE, LONG_MONTH_OPTIONS),
    id: 11,
  },
  {
    text: formatDate(DECEMBER_DATE, LONG_MONTH_OPTIONS),
    id: 12,
  },
];

export const getMonthsWithOf: PureComputed<
  [(messageKey: string) => string, (date: Date, formatOptions: object) => string],
    Array<Option>
> = (getMessage, formatDate) => [
  {
    text: getMessage('ofLabel')
      + formatDate(JANUARY_DATE, DAY_LONG_MONTH_OPTIONS).replace(/[\d.,]/g, '').toString(),
    id: 1,
  },
  {
    text: getMessage('ofLabel')
      + formatDate(FEBRUARY_DATE, DAY_LONG_MONTH_OPTIONS).replace(/[\d.,]/g, '').toString(),
    id: 2,
  },
  {
    text: getMessage('ofLabel')
      + formatDate(MARCH_DATE, DAY_LONG_MONTH_OPTIONS).replace(/[\d.,]/g, '').toString(),
    id: 3,
  },
  {
    text: getMessage('ofLabel')
      + formatDate(APRIL_DATE, DAY_LONG_MONTH_OPTIONS).replace(/[\d.,]/g, '').toString(),
    id: 4,
  },
  {
    text: getMessage('ofLabel')
      + formatDate(MAY_DATE, DAY_LONG_MONTH_OPTIONS).replace(/[\d.,]/g, '').toString(),
    id: 5,
  },
  {
    text: getMessage('ofLabel')
      + formatDate(JUNE_DATE, DAY_LONG_MONTH_OPTIONS).replace(/[\d.,]/g, '').toString(),
    id: 6,
  },
  {
    text: getMessage('ofLabel')
      + formatDate(JULY_DATE, DAY_LONG_MONTH_OPTIONS).replace(/[\d.,]/g, '').toString(),
    id: 7,
  },
  {
    text: getMessage('ofLabel')
      + formatDate(AUGUST_DATE, DAY_LONG_MONTH_OPTIONS).replace(/[\d.,]/g, '').toString(),
    id: 8,
  },
  {
    text: getMessage('ofLabel')
      + formatDate(SEPTEMBER_DATE, DAY_LONG_MONTH_OPTIONS).replace(/[\d.,]/g, '').toString(),
    id: 9,
  },
  {
    text: getMessage('ofLabel')
      + formatDate(OCTOBER_DATE, DAY_LONG_MONTH_OPTIONS).replace(/[\d., ]/g, '').toString(),
    id: 10,
  },
  {
    text: getMessage('ofLabel')
      + formatDate(NOVEMBER_DATE, DAY_LONG_MONTH_OPTIONS).replace(/[\d., ]/g, '').toString(),
    id: 11,
  },
  {
    text: getMessage('ofLabel')
      + formatDate(DECEMBER_DATE, DAY_LONG_MONTH_OPTIONS).replace(/[\d., ]/g, '').toString(),
    id: 12,
  },
];

export const getAvailableRecurrenceOptions: PureComputed<
[(messageKey: string) => string], Array<Option>
> = getMessage => ([
  {
    text: getMessage(REPEAT_TYPES.NEVER),
    id: REPEAT_TYPES.NEVER,
  },
  {
    text: getMessage(REPEAT_TYPES.DAILY),
    id: REPEAT_TYPES.DAILY,
  },
  {
    text: getMessage(REPEAT_TYPES.WEEKLY),
    id: REPEAT_TYPES.WEEKLY,
  },
  {
    text: getMessage(REPEAT_TYPES.MONTHLY),
    id: REPEAT_TYPES.MONTHLY,
  },
  {
    text: getMessage(REPEAT_TYPES.YEARLY),
    id: REPEAT_TYPES.YEARLY,
  },
]);
