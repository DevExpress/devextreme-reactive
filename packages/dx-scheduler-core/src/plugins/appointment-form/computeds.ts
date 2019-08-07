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
  const newRule = new RRule(options);
  return newRule.toString();
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
        bymonth: startDate.getMonth(),
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
  const newRule = new RRule(options);
  return newRule.toString();
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
  const newRule = new RRule(options);
  return newRule.toString();
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
  const newRule = new RRule(options);
  return newRule.toString();
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
  const newRule = new RRule(options);
  return newRule.toString();
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
