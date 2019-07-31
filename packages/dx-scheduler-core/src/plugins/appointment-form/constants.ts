import { RRule } from 'rrule';

export const DEFAULT_RULE_OBJECT = {
  interval: 1,
};

export const DAYS_OF_WEEK = {
  MONDAY: RRule.MO,
  TUESDAY: RRule.TU,
  WEDNESDAY: RRule.WE,
  THURSDAY: RRule.TH,
  FRIDAY: RRule.FR,
  SATURDAY: RRule.SA,
  SUNDAY: RRule.SU,
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
