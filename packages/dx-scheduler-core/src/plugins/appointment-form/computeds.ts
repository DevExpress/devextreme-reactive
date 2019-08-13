import { RRule } from 'rrule';
import {
  ChangeRecurrenceNumberFeildFn,
  ChangeRecurrenceEndDateFn,
  ChangeRecurrenceWeekDaysFn,
  NumberRecurrenceRuleGetterFn,
  RecurrenceDateGetterFn,
  RecurrenceWeekDayGetterFn,
  RecurrecnceOptionsGetterFn,
  RecurrecnceOptionsSetterFn,
} from '../../types';
import { DEFAULT_RULE_OBJECT, RRULE_REPEAT_TYPES } from './constants';

export const changeRecurrenceInterval: ChangeRecurrenceNumberFeildFn = (
  rule,
  interval,
) => {
  if (!rule) return (new RRule({ interval })).toString();
  const options = RRule.parseString(rule);
  options.interval = interval;
  const nextRule = new RRule(options);
  return nextRule.toString();
};

export const getRecurrenceInterval: NumberRecurrenceRuleGetterFn = (
  rule,
) => {
  if (!rule) return undefined;
  const options = RRule.parseString(rule);
  return options.interval;
};

export const changeRecurrenceFrequency: ChangeRecurrenceNumberFeildFn = (
  rule,
  freq,
  startDate,
) => {
  if (!rule) {
    if (freq === RRULE_REPEAT_TYPES.monthly) {
      return (new RRule({
        ...DEFAULT_RULE_OBJECT,
        freq,
        bymonthday: [startDate.getDate()],
      })).toString();
    }
    if (freq === RRULE_REPEAT_TYPES.yearly) {
      return (new RRule({
        ...DEFAULT_RULE_OBJECT,
        freq,
        bymonthday: [startDate.getDate()],
        bymonth: startDate.getMonth() + 1,
      })).toString();
    }
    return (new RRule({ ...DEFAULT_RULE_OBJECT, freq })).toString();
  }

  const options = RRule.parseString(rule);

  if (freq === RRULE_REPEAT_TYPES.monthly && options.freq === freq) return rule;

  options.freq = freq;
  if (freq === RRULE_REPEAT_TYPES.monthly || freq === RRULE_REPEAT_TYPES.yearly) {
    options.bymonthday = startDate.getDate();
  }
  const nextRule = new RRule(options);
  return nextRule.toString();
};

export const getRecurrenceFrequency: NumberRecurrenceRuleGetterFn = (
  rule,
) => {
  if (!rule) return undefined;
  const options = RRule.parseString(rule);
  return options.freq;
};

export const changeRecurrenceEndDate: ChangeRecurrenceEndDateFn = (
  rule,
  endDate,
) => {
  if (!rule) return (new RRule({ until: endDate })).toString();
  const options = RRule.parseString(rule);
  options.until = endDate;
  const nextRule = new RRule(options);
  return nextRule.toString();
};

export const getRecurrenceEndDate: RecurrenceDateGetterFn = (
  rule,
) => {
  if (!rule) return null;
  const options = RRule.parseString(rule);
  return options.until;
};

export const changeRecurrenceCount: ChangeRecurrenceNumberFeildFn = (
  rule,
  count,
) => {
  if (!rule) return (new RRule({ count })).toString();
  const options = RRule.parseString(rule);
  options.count = count;
  const nextRule = new RRule(options);
  return nextRule.toString();
};

export const getRecurrenceCount: NumberRecurrenceRuleGetterFn = (
  rule,
) => {
  if (!rule) return undefined;
  const options = RRule.parseString(rule);
  return options.count;
};

export const changeRecurrenceWeekDays: ChangeRecurrenceWeekDaysFn = (
  rule,
  byweekday,
) => {
  if (!rule) return (new RRule({ byweekday })).toString();
  const options = RRule.parseString(rule);
  options.byweekday = byweekday;
  const nextRule = new RRule(options);
  return nextRule.toString();
};

export const getRecurrenceWeekDays: RecurrenceWeekDayGetterFn = (
  rule,
) => {
  if (!rule) return undefined;
  const options = RRule.parseString(rule);
  return options.byweekday;
};

export const getRecurrenceOptions: RecurrecnceOptionsGetterFn = (rule) => {
  if (!rule) return null;
  const options = RRule.parseString(rule);
  let byweekday = [];
  if (options.byweekday) {
    byweekday = options.byweekday.map(weekDay => weekDay.weekday);
    options.byweekday = byweekday;
  }
  return options;
};

export const changeRecurrenceOptions: RecurrecnceOptionsSetterFn = options =>
  (new RRule(options)).toString();

export const handleStartDateChange = (
  newStartDay,
  changeRecurrenceOptionsAction,
  options,
) => {
  if (newStartDay <= 31) {
    const newOptions = { ...options, bymonthday: newStartDay };
    changeRecurrenceOptionsAction(newOptions);
  }
};

export const handleToDayOfWeekChange = (
  weekNumber,
  dayOfWeek,
  changeRecurrenceOptionsAction,
  options,
) => {
  if (weekNumber < 4) {
    const newOptions = {
      ...options,
      bymonthday: [
        weekNumber * 7 + 1,
        weekNumber * 7 + 2,
        weekNumber * 7 + 3,
        weekNumber * 7 + 4,
        weekNumber * 7 + 5,
        weekNumber * 7 + 6,
        weekNumber * 7 + 7,
      ],
      byweekday: dayOfWeek > 0 ? dayOfWeek - 1 : 6,
    };
    changeRecurrenceOptionsAction(newOptions);
  } else {
    const newOptions = {
      ...options,
      bymonthday: [-1, -2, -3, -4, -5, -6, -7],
      byweekday: dayOfWeek > 0 ? dayOfWeek - 1 : 6,
    };
    changeRecurrenceOptionsAction(newOptions);
  }
};

export const handleWeekNumberChange = (
  newWeekNumber,
  changeRecurrenceOptionsAction,
  options,
) => {
  if (newWeekNumber < 4) {
    const newOptions = {
      ...options,
      bymonthday: [
        newWeekNumber * 7 + 1,
        newWeekNumber * 7 + 2,
        newWeekNumber * 7 + 3,
        newWeekNumber * 7 + 4,
        newWeekNumber * 7 + 5,
        newWeekNumber * 7 + 6,
        newWeekNumber * 7 + 7,
      ],
    };
    changeRecurrenceOptionsAction(newOptions);
  } else {
    const newOptions = {
      ...options,
      bymonthday: [-1, -2, -3, -4, -5, -6, -7],
    };
    changeRecurrenceOptionsAction(newOptions);
  }
};
