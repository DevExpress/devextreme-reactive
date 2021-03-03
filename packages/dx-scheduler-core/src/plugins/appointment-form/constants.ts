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

export const RRULE_DAYS_OF_WEEK = [
  RRule.MO,
  RRule.TU,
  RRule.WE,
  RRule.TH,
  RRule.FR,
  RRule.SA,
  RRule.SU,
];

export const DAYS_IN_WEEK = 7;

export const DAYS_OF_WEEK_ARRAY = [
  DAYS_OF_WEEK.SUNDAY, DAYS_OF_WEEK.MONDAY, DAYS_OF_WEEK.TUESDAY, DAYS_OF_WEEK.WEDNESDAY,
  DAYS_OF_WEEK.THURSDAY, DAYS_OF_WEEK.FRIDAY, DAYS_OF_WEEK.SATURDAY,
];

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
  YEARLY: RRule.YEARLY as number,
  MONTHLY: RRule.MONTHLY as number,
  WEEKLY: RRule.WEEKLY as number,
  DAILY: RRule.DAILY as number,
  HOURLY: RRule.HOURLY as number,
  MINUTELY: RRule.MINUTELY as number,
};

export const REPEAT_TYPES = {
  DAILY: 'daily',
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
  YEARLY: 'yearly',
  NEVER: 'never',
};

export const REPEAT_TYPES_ARRAY = [
  REPEAT_TYPES.DAILY, REPEAT_TYPES.WEEKLY, REPEAT_TYPES.MONTHLY, REPEAT_TYPES.YEARLY,
];

export const WEEK_NUMBER_LABELS = [
  'firstLabel', 'secondLabel', 'thirdLabel', 'fourthLabel', 'lastLabel',
];

export const END_REPEAT_RADIO_GROUP = 'endRepeat';
export const MONTHLY_RADIO_GROUP = 'monthlyRadioGroup';
export const YEARLY_RADIO_GROUP = 'yearlyRadioGroup';

export const TITLE_TEXT_EDITOR = 'titleTextEditor';
export const MULTILINE_TEXT_EDITOR = 'multilineTextEditor';
export const ORDINARY_TEXT_EDITOR = 'ordinaryTextEditor';
export const NUMBER_EDITOR = 'numberEditor';

export const TITLE = 'title';
export const ORDINARY_LABEL = 'ordinaryLabel';

export const SAVE_BUTTON = 'saveButton';
export const DELETE_BUTTON = 'deleteButton';
export const CANCEL_BUTTON = 'cancelButton';

export const OUTLINED_SELECT = 'outlinedSelect';
export const STANDARD_SELECT = 'standardSelect';

export const SUNDAY_DATE = new Date(2019, 7, 11);
export const MONDAY_DATE = new Date(2019, 7, 12);
export const TUESDAY_DATE = new Date(2019, 7, 13);
export const WEDNESDAY_DATE = new Date(2019, 7, 14);
export const THURSDAY_DATE = new Date(2019, 7, 15);
export const FRIDAY_DATE = new Date(2019, 7, 16);
export const SATURDAY_DATE = new Date(2019, 7, 17);

export const DAYS_OF_WEEK_DATES = [
  SUNDAY_DATE, MONDAY_DATE, TUESDAY_DATE, WEDNESDAY_DATE,
  THURSDAY_DATE, FRIDAY_DATE, SATURDAY_DATE,
];

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

export const MONTHS_DATES = [
  JANUARY_DATE, FEBRUARY_DATE, MARCH_DATE, APRIL_DATE, MAY_DATE, JUNE_DATE,
  JULY_DATE, AUGUST_DATE, SEPTEMBER_DATE, OCTOBER_DATE, NOVEMBER_DATE, DECEMBER_DATE,
];

export const FIRST_WEEK = 0;
export const SECOND_WEEK = 1;
export const THIRD_WEEK = 2;
export const FOURTH_WEEK = 3;
export const LAST_WEEK = 4;

export const BASIC_YEALY_COUNT = 5;
export const BASIC_MONTHLY_COUNT = 12;
export const BASIC_WEEKLY_COUNT = 13;
export const BASIC_DAILY_COUNT = 30;
