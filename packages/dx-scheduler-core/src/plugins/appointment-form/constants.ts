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
  YEARLY: RRule.YEARLY,
  MONTHLY: RRule.MONTHLY,
  WEEKLY: RRule.WEEKLY,
  DAILY: RRule.DAILY,
  HOURLY: RRule.HOURLY,
  MINUTELY: RRule.MINUTELY,
};

export const REPEAT_TYPES = {
  DAILY: 'daily',
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
  YEARLY: 'yearly',
  NEVER: 'never',
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

export const SAVE_BUTTON = 'saveButton';
export const DELETE_BUTTON = 'deleteButton';
export const CANCEL_BUTTON = 'cancelButton';

export const OUTLINED_SWITCHER = 'outlinedSwitcher';
export const STANDARD_SWITCHER = 'standardSwitcher';

export const SUNDAY_DATE = new Date(2019, 7, 11);
export const MONDAY_DATE = new Date(2019, 7, 12);
export const TUESDAY_DATE = new Date(2019, 7, 13);
export const WEDNESDAY_DATE = new Date(2019, 7, 14);
export const THURSDAY_DATE = new Date(2019, 7, 15);
export const FRIDAY_DATE = new Date(2019, 7, 16);
export const SATURDAY_DATE = new Date(2019, 7, 17);

export const JANUARY_DATE = new Date(2019, 0, 1);
export const FEBRUARY_DATE = new Date(2019, 1, 1);
export const MARCH_DATE = new Date(2019, 2, 1);
export const APRIL_DATE = new Date(2019, 3, 1);
export const MAY_DATE = new Date(2019, 4, 1);
export const JUNE_DATE = new Date(2019, 5, 1);
export const JULY_DATE = new Date(2019, 6, 1);
export const AUGUST_DATE = new Date(2019, 7, 1);
export const SEPTEMBER_DATE = new Date(2019, 8, 1);
export const OCTOBER_DATE = new Date(2019, 9, 1);
export const NOVEMBER_DATE = new Date(2019, 10, 1);
export const DECEMBER_DATE = new Date(2019, 11, 1);