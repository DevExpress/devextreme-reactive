import { RRule } from 'rrule';

export const DEFAULT_RULE_OBJECT = {
  interval: 1,
};

export const DAYS_OF_WEEK = {
  MONDAY: 0,
  TUESDAY: 1,
  WEDNESDAY: 2,
  THURSDAY: 3,
  FRIDAY: 4,
  SATURDAY: 5,
  SUNDAY: 6,
};

export const MONTHS = {
  JANUARY: 1,
  FEBRUARY: 2,
  MARCH: 3,
  APRIL: 4,
  MAY: 5,
  JUNE: 6,
  JULY: 7,
  AUGUST: 8,
  SEPTEMBER: 9,
  OCTOBER: 10,
  NOVEMBER: 11,
  DECEMBER: 12,
};

export const RRULE_REPEAT_TYPES = {
  yearly: RRule.YEARLY,
  monthly: RRule.MONTHLY,
  weekly: RRule.WEEKLY,
  daily: RRule.DAILY,
  hourly: RRule.HOURLY,
  minutely: RRule.MINUTELY,
};

export const END_REPEAT_RADIO_GROUP = 'endRepeat';
export const DAILY_RADIO_GROUP = 'dailyRadioGroup';
export const MONTHLY_RADIO_GROUP = 'monthlyRadioGroup';
export const YEARLY_RADIO_GROUP = 'yearlyRadioGroup';

export const TITLE_TEXT_EDITOR = 'titleTextEditor';
export const NOTES_TEXT_EDITOR = 'noteTextEditor';
export const ORDINARY_TEXT_EDITOR = 'ordinaryTextEditor';
export const NUMBER_EDITOR = 'numberEditor';

export const FULL_DATE_TIME_EDITOR = 'fullDateTimeEditor';
export const PARTIAL_DATE_TIME_EDITOR = 'partialDateTimeEditor';

export const TITLE_LABEL = 'titleLabel';
export const ORDINARY_LABEL = 'ordinaryLabel';
