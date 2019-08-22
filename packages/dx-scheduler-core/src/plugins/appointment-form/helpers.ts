import moment from 'moment';
import { PureComputed } from '@devexpress/dx-core';
import { RRule, Options } from 'rrule';
import {
  Action,
  StartDate,
  EndDate,
} from '../../types';
import { DEFAULT_RULE_OBJECT, RRULE_REPEAT_TYPES, REPEAT_TYPES } from './constants';

export const callActionIfExists: PureComputed<[Action, object], void> = (action, payload) => {
  if (action) {
    action(payload);
  }
};

export const isAllDayCell: PureComputed<
  [StartDate, EndDate], boolean
> = (
  startDate, endDate,
  ) => moment(endDate as EndDate).diff(moment(startDate as StartDate), 'days') >= 1;

export const changeRecurrenceFrequency: PureComputed<
  [string, number, Date], string
> = (
  rule,
  freq,
  startDate,
) => {
  if (!rule) {
    if (freq === RRULE_REPEAT_TYPES.MONTHLY) {
      return (new RRule({
        ...DEFAULT_RULE_OBJECT,
        freq,
        bymonthday: [startDate.getDate()],
      })).toString();
    }
    if (freq === RRULE_REPEAT_TYPES.YEARLY) {
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

  if (freq === RRULE_REPEAT_TYPES.MONTHLY && options.freq === freq) return rule;

  options.freq = freq;
  if (freq === RRULE_REPEAT_TYPES.MONTHLY || freq === RRULE_REPEAT_TYPES.YEARLY) {
    options.bymonthday = startDate.getDate();
  }
  if (freq === RRULE_REPEAT_TYPES.DAILY || freq === RRULE_REPEAT_TYPES.WEEKLY) {
    options.bymonthday = undefined;
    options.byweekday = undefined;
  }
  const nextRule = new RRule(options);
  return nextRule.toString();
};

export const getRecurrenceOptions: PureComputed<
[string | null], Partial<Options>
> = (rule) => {
  if (!rule) return null;
  const options = RRule.parseString(rule);
  let byweekday = [];
  if (options.byweekday) {
    byweekday = options.byweekday.map(weekDay => weekDay.weekday);
    options.byweekday = byweekday;
  }
  return options;
};

export const changeRecurrenceOptions: PureComputed<
  [Partial<Options>], string | undefined
>  = (options) => {
  return options ? (new RRule({...options})).toString() : undefined;
};

export const handleStartDateChange: PureComputed<
[number, Partial<Options>], string | undefined
> = (
  newStartDay,
  options,
) => {
  if (newStartDay <= 31) {
    const nextOptions = { ...options, bymonthday: newStartDay };
    return changeRecurrenceOptions(nextOptions);
  }
  return changeRecurrenceOptions(options);
};

export const handleToDayOfWeekChange = (
  weekNumber,
  dayOfWeek,
  options,
) => {
  if (weekNumber < 4) {
    const nextOptions = {
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
    return changeRecurrenceOptions(nextOptions);
  }
  const nextOptions = {
    ...options,
    bymonthday: [-1, -2, -3, -4, -5, -6, -7],
    byweekday: dayOfWeek > 0 ? dayOfWeek - 1 : 6,
  };
  return changeRecurrenceOptions(nextOptions);
};

export const handleWeekNumberChange = (
  newWeekNumber,
  options,
) => {
  if (newWeekNumber < 4) {
    const nextOptions = {
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
    return changeRecurrenceOptions(nextOptions);
  }
  const nextOptions = {
    ...options,
    bymonthday: [-1, -2, -3, -4, -5, -6, -7],
  };
  return changeRecurrenceOptions(nextOptions);
};

export const getRRuleFrequency = repeatType => RRULE_REPEAT_TYPES[repeatType.toUpperCase()];

export const getFrequencyString = (rRuleFrequency) => {
  if (rRuleFrequency === RRULE_REPEAT_TYPES.DAILY) return REPEAT_TYPES.DAILY;
  if (rRuleFrequency === RRULE_REPEAT_TYPES.WEEKLY) return REPEAT_TYPES.WEEKLY;
  if (rRuleFrequency === RRULE_REPEAT_TYPES.MONTHLY) return REPEAT_TYPES.MONTHLY;
  if (rRuleFrequency === RRULE_REPEAT_TYPES.YEARLY) return REPEAT_TYPES.YEARLY;
  return REPEAT_TYPES.NEVER;
}
