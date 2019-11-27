import moment from 'moment';
import { PureComputed } from '@devexpress/dx-core';
import { RRule, Options, Weekday } from 'rrule';
import {
  Action,
  StartDate,
  EndDate,
  RadioGroupDisplayData,
} from '../../types';
import {
  DEFAULT_RULE_OBJECT, RRULE_REPEAT_TYPES, REPEAT_TYPES, LAST_WEEK,
  DAYS_OF_WEEK_ARRAY, DAYS_IN_WEEK, DAYS_OF_WEEK_DATES,
} from './constants';
import { getCountDependingOnRecurrenceType } from './utils';

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
  rule, freq, startDate,
) => {
  if (!rule) {
    if (freq === RRULE_REPEAT_TYPES.MONTHLY) {
      return (new RRule({
        ...DEFAULT_RULE_OBJECT,
        freq,
        bymonthday: [startDate.getDate()],
        count: getCountDependingOnRecurrenceType(freq),
      })).toString();
    }
    if (freq === RRULE_REPEAT_TYPES.YEARLY) {
      return (new RRule({
        ...DEFAULT_RULE_OBJECT,
        freq,
        bymonthday: [startDate.getDate()],
        bymonth: startDate.getMonth() + 1,
        count: getCountDependingOnRecurrenceType(freq),
      })).toString();
    }
    return (new RRule({
      ...DEFAULT_RULE_OBJECT, freq, count: getCountDependingOnRecurrenceType(freq),
    })).toString();
  }

  const options = RRule.parseString(rule);
  if (options.freq === freq) return rule;

  options.freq = freq;
  options.count = getCountDependingOnRecurrenceType(freq);
  if (freq === RRULE_REPEAT_TYPES.MONTHLY || freq === RRULE_REPEAT_TYPES.YEARLY) {
    options.bymonthday = startDate.getDate();
  }
  if (freq === RRULE_REPEAT_TYPES.YEARLY) {
    options.bymonth = startDate.getMonth() + 1;
  }
  if (freq === RRULE_REPEAT_TYPES.DAILY || freq === RRULE_REPEAT_TYPES.WEEKLY) {
    options.bymonthday = undefined;
  }
  options.byweekday = undefined;
  const nextRule = new RRule(options);
  return nextRule.toString();
};

export const getRecurrenceOptions: PureComputed<
  [string | undefined], Partial<Options> | null
> = (rule) => {
  if (!rule) return null;
  const options = RRule.parseString(rule);
  if (options.byweekday) {
    const byweekday = (options.byweekday as Weekday[]).map(weekDay => weekDay.weekday);
    options.byweekday = byweekday;
  }
  return options;
};

export const changeRecurrenceOptions = (options: Partial<Options>) => {
  return options ? (new RRule({ ...options })).toString() : undefined;
};

export const handleStartDateChange = (nextStartDay: number, options: Partial<Options>) => {
  if (nextStartDay <= 31) {
    const nextOptions = { ...options, bymonthday: nextStartDay };
    return changeRecurrenceOptions(nextOptions);
  }
  return changeRecurrenceOptions(options);
};

export const handleToDayOfWeekChange = (
  weekNumber: number, dayOfWeek: number, options: Partial<Options>,
) => {
  const nextOptions = setByMonthDay(weekNumber, options);
  nextOptions.byweekday = dayOfWeek > 0 ? dayOfWeek - 1 : 6;
  return changeRecurrenceOptions(nextOptions);
};

export const handleWeekNumberChange = (nextWeekNumber: number, options: Partial<Options>) =>
  changeRecurrenceOptions(setByMonthDay(nextWeekNumber, options));

export const getRRuleFrequency: PureComputed<
  [string], number
> = repeatType => RRULE_REPEAT_TYPES[repeatType.toUpperCase()];

export const getFrequencyString: PureComputed<
  [number], string
> = (rRuleFrequency) => {
  if (rRuleFrequency === RRULE_REPEAT_TYPES.DAILY) return REPEAT_TYPES.DAILY;
  if (rRuleFrequency === RRULE_REPEAT_TYPES.WEEKLY) return REPEAT_TYPES.WEEKLY;
  if (rRuleFrequency === RRULE_REPEAT_TYPES.MONTHLY) return REPEAT_TYPES.MONTHLY;
  if (rRuleFrequency === RRULE_REPEAT_TYPES.YEARLY) return REPEAT_TYPES.YEARLY;
  return REPEAT_TYPES.NEVER;
};

const setByMonthDay = (nextWeekNumber: number, options: Partial<Options>) => {
  if (nextWeekNumber < 4) {
    return {
      ...options,
      bymonthday: [
        nextWeekNumber * 7 + 1,
        nextWeekNumber * 7 + 2,
        nextWeekNumber * 7 + 3,
        nextWeekNumber * 7 + 4,
        nextWeekNumber * 7 + 5,
        nextWeekNumber * 7 + 6,
        nextWeekNumber * 7 + 7,
      ],
    };
  }
  return { ...options, bymonthday: [-1, -2, -3, -4, -5, -6, -7] };
};

export const getRadioGroupDisplayData: PureComputed<
[Partial<Options>, number, number, number, string, string], RadioGroupDisplayData
> = (
  recurrenceOptions, stateDayOfWeek, stateWeekNumber, stateDayNumber, firstOption, secondOption,
) => {
  let weekNumber = LAST_WEEK;
  if (recurrenceOptions.bymonthday && !Array.isArray(recurrenceOptions.bymonthday)) {
    return {
      dayNumberTextField: (recurrenceOptions.bymonthday as number),
      weekNumber: stateWeekNumber,
      dayOfWeek: stateDayOfWeek,
      radioGroupValue: firstOption,
    };
  }
  if (!recurrenceOptions.byweekday) {
    return {
      dayOfWeek: stateDayOfWeek,
      weekNumber: stateWeekNumber,
      radioGroupValue: secondOption,
      dayNumberTextField: stateDayNumber,
    };
  }
  const dayOfWeek = recurrenceOptions.byweekday[0] < 6
    ? recurrenceOptions.byweekday[0] + 1 : 0;
  if (recurrenceOptions.bymonthday && (recurrenceOptions.bymonthday[0] > 0)) {
    weekNumber = Math.trunc(recurrenceOptions.bymonthday[0] / 7);
  }

  return {
    dayOfWeek,
    weekNumber,
    radioGroupValue: secondOption,
    dayNumberTextField: stateDayNumber,
  };
};

export const handleChangeFrequency: PureComputed<
  [string, string, Date, Action], void
> = (repeatType, rRule, startDate, action) => {
  const rruleRepeatType = getRRuleFrequency(repeatType);
  let nextRRule;
  if (rruleRepeatType !== undefined) {
    nextRRule = changeRecurrenceFrequency(
      rRule,
      rruleRepeatType,
      startDate,
    );
  }
  action({ rRule: nextRRule });
};

export const handleWeekDaysChange: PureComputed<
[Partial<Options>, number], void
> = (options, weekDay) => {
  const byWeekDay = options.byweekday || [];
  const index = (byWeekDay as number[]).indexOf(weekDay);
  const isAdded = !(index > -1);
  if (isAdded) {
    (byWeekDay as number[]).push(weekDay);
  } else if (index > -1) {
    (byWeekDay as number[]).splice(index, 1);
  }
  if (byWeekDay === 0) return { ...options, byweekday: undefined };
  return { ...options, byweekday: byWeekDay };
};

export const getDaysOfWeekArray: PureComputed<[number], Array<number>> = (firstDayOfWeek) => {
  const firstPart = DAYS_OF_WEEK_ARRAY.filter(
    dayOfWeek => dayOfWeek >= firstDayOfWeek - 1 && dayOfWeek < DAYS_IN_WEEK - 1,
  );
  const secondPart = DAYS_OF_WEEK_ARRAY.filter(
    dayOfWeek => dayOfWeek < firstDayOfWeek - 1 || dayOfWeek >= DAYS_IN_WEEK - 1,
  );
  return firstDayOfWeek !== 0 ? [...firstPart, ...secondPart] : [...secondPart, ...firstPart];
};

export const getDaysOfWeekDates: PureComputed<[number], Array<Date>> = (firstDayOfWeek) => {
  const firstPart = DAYS_OF_WEEK_DATES.slice(firstDayOfWeek, DAYS_OF_WEEK_DATES.length);
  const secondPart = DAYS_OF_WEEK_DATES.slice(0, firstDayOfWeek);
  return [...firstPart, ...secondPart];
};
