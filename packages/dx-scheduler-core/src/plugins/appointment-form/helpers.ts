import moment from 'moment';
import { PureComputed } from '@devexpress/dx-core';
import { RRule, Options, Weekday } from 'rrule';
import {
  Action,
  StartDate,
  EndDate,
  RadioGroupDisplayData,
  ValidResource,
} from '../../types';
import {
  DEFAULT_RULE_OBJECT, RRULE_REPEAT_TYPES, REPEAT_TYPES, LAST_WEEK,
  DAYS_OF_WEEK_ARRAY, DAYS_IN_WEEK, DAYS_OF_WEEK_DATES, RRULE_DAYS_OF_WEEK,
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
> = rule => !rule ? null : RRule.parseString(rule);

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
  const validDayOfWeek = dayOfWeek > 0 ? dayOfWeek - 1 : 6;
  const validWeekNumber = weekNumber === 4 ? -1 : weekNumber + 1;
  const rruleDayOfWeek = RRULE_DAYS_OF_WEEK[validDayOfWeek];

  const nextOptions = {
    ...options,
    byweekday: [rruleDayOfWeek.nth(validWeekNumber)],
    bymonthday: undefined,
  };

  return changeRecurrenceOptions(nextOptions);
};

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

export const getRadioGroupDisplayData: PureComputed<
  [Partial<Options>, number, number, number, string, string], RadioGroupDisplayData
> = (
  recurrenceOptions, stateDayOfWeek, stateWeekNumber, stateDayNumber, firstOption, secondOption,
) => {
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
  const dayOfWeek = recurrenceOptions.byweekday[0].weekday < 6
    ? recurrenceOptions.byweekday[0].weekday + 1 : 0;
  const weekNumber = recurrenceOptions.byweekday[0].n === -1
    ? LAST_WEEK
    : recurrenceOptions.byweekday[0].n - 1;

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
> = (options, currentWeekDay) => {
  const byWeekDay = options.byweekday || [];
  const index = (byWeekDay as Weekday[]).findIndex(({ weekday }) => weekday === currentWeekDay);

  const isAdded = index === -1;

  if (isAdded) {
    (byWeekDay as Weekday[]).push(RRULE_DAYS_OF_WEEK[currentWeekDay]);
  } else if (index > -1) {
    (byWeekDay as Weekday[]).splice(index, 1);
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

export const checkMultipleResourceFields: PureComputed<
  [object, ValidResource[]], object
> = (resourceFields, resources) => resources.reduce((acc, resource) => {
  if (!resource.allowMultiple) {
    return acc;
  }

  const fieldName = resource.fieldName;
  const field = resourceFields[fieldName];
  return {
    ...acc,
    [fieldName]: Array.isArray(field) ? field : [field],
  };
}, resourceFields);
