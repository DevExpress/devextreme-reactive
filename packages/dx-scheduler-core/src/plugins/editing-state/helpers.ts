import moment from 'moment';
import { RRule, rrulestr, RRuleSet, Options } from 'rrule';
import { PureComputed } from '@devexpress/dx-core';
import {
  AppointmentModel, PreCommitChangesFn, ChangeSet, Changes, MakeDateSequenceFn,
} from '../../types';
import { RECURRENCE } from '../../constants';

const reduceExDate = (prevExDate: string, boundDate: Date) => {
  if (prevExDate.length > 0) {
    return prevExDate.split(',').reduce((acc: string[], date: string) => {
      const momentDate = moment.utc(date);
      if (momentDate.isBefore(boundDate)) {
        return [...acc, date];
      }
      return acc;
    }, []).join(',');
  }
  return undefined;
};

const configureExDate = (exDate: string, date: Date) => {
  const currentExDate = `${moment.utc(date)
    .format('YYYYMMDDTHHmmss')}Z`;
  return exDate
    ? `${exDate},${currentExDate}`
    : currentExDate;
};

const configureDateSequence: MakeDateSequenceFn = (rRule, exDate, options) => {
  let rruleSet = new RRuleSet();
  if (exDate) {
    rruleSet = rrulestr(`EXDATE:${exDate}`, { forceset: true }) as RRuleSet;
  }
  rruleSet.rrule(new RRule({
    ...RRule.parseString(rRule),
    ...options,
  }));

  return rruleSet.all();
};

const configureICalendarRules = (rRule: string, options: object) => {
  const rruleSet = new RRuleSet();
  rruleSet.rrule(new RRule({
    ...RRule.parseString(rRule),
    ...options,
  }));
  return rruleSet.valueOf();
};

export const deleteCurrent: PureComputed<
  [Partial<AppointmentModel>], ChangeSet
> = (appointmentData) => {
  const currentSequence: Date[] = configureDateSequence(
    appointmentData.rRule,
    appointmentData.exDate,
    { dtstart: moment.utc(appointmentData.parentData.startDate).toDate() },
  );

  if (currentSequence.length === 1) {
    return deleteAll(appointmentData);
  }

  const nextExDate = configureExDate(appointmentData.exDate, appointmentData.startDate as Date);
  return { changed: { [appointmentData.id!]: { exDate: nextExDate } } };
};

export const deleteAll: PureComputed<
  [Partial<AppointmentModel>], ChangeSet
> = (appointmentData) => {
  return { deleted: appointmentData.id };
};

export const deletedCurrentAndFollowing: PureComputed<
  [Partial<AppointmentModel>], ChangeSet
> = (appointmentData) => {
  const { rRule, startDate, parentData, exDate: prevExDate = '', id } = appointmentData;

  const initialSequence: Date[] = configureDateSequence(rRule, prevExDate, {
    dtstart: moment.utc(parentData.startDate).toDate(),
  });

  if (initialSequence.length === 1) {
    return deleteAll(appointmentData);
  }

  const currentChildIndex = initialSequence
    .findIndex(date => moment(date).isSame(startDate as Date));

  const changedRules = configureICalendarRules(rRule, {
    dtstart: moment.utc(parentData.startDate).toDate(),
    until: moment.utc(initialSequence[currentChildIndex]).toDate(),
    count: null,
  });

  const nextExDate = reduceExDate(prevExDate, startDate as Date);
  return {
    changed: {
      [id!]: {
        rRule: changedRules[1].slice(6),
        ...nextExDate && prevExDate !== nextExDate ? { exDate: nextExDate } : {},
      },
    },
  };
};

export const editAll: PureComputed<
  [Changes, Partial<AppointmentModel>], ChangeSet
> = (changes, appointmentData) => {
  const { rRule, id } = appointmentData;

  const initialRule = new RRule(RRule.parseString(rRule));
  if (moment.utc(changes.startDate as Date).isAfter(initialRule.options.until!)) {
    return {
      changed: {
        [id!]: {
          ...changes,
          rRule: 'FREQ=DAILY;COUNT=1',
          exDate: '',
        },
      },
    };
  }

  return  { changed: {  [appointmentData.id!]: changes } };
};

export const editCurrent: PureComputed<
  [Changes, Partial<AppointmentModel>], ChangeSet
> = (changes, appointmentData) => ({
  changed: {
    [appointmentData.id!]: {
      exDate: configureExDate(appointmentData.exDate, appointmentData.startDate as Date),
    },
  },
  added: {
    ...appointmentData,
    parentData: undefined,
    exDate: undefined,
    rRule: undefined,
    id: undefined,
    ...changes,
  },
});

export const editCurrentAndFollowing: PureComputed<
  [Changes, Partial<AppointmentModel>], ChangeSet
> = (changes, appointmentData) => {
  const { rRule, startDate, parentData, exDate: prevExDate = '', id } = appointmentData;

  const initialRule = new RRule(RRule.parseString(rRule));
  if (moment.utc(changes.startDate as Date).isAfter(initialRule.options.until!)) {
    return {
      changed: {
        [id!]: {
          ...changes,
          rRule: 'FREQ=DAILY;COUNT=1',
          exDate: '',
        },
      },
    };
  }

  const initialSequence: Date[] = configureDateSequence(rRule, prevExDate, {
    dtstart: moment.utc(parentData.startDate).toDate(),
  });
  const currentChildIndex = initialSequence
    .findIndex(date => moment(date).isSame(startDate as Date));

  if (currentChildIndex === 0) {
    return editAll(changes, appointmentData);
  }

  const changedRules = configureICalendarRules(rRule, {
    dtstart: moment.utc(parentData.startDate).toDate(),
    until: moment.utc(initialSequence[currentChildIndex]).toDate(),
    count: null,
  });

  const addedRules = configureICalendarRules(rRule, {
    dtstart: moment.utc(startDate as Date).toDate(),
    count: initialSequence.length - currentChildIndex,
  });

  const nextExDate = reduceExDate(prevExDate, startDate as Date);
  return {
    changed: {
      [id!]: {
        rRule: changedRules[1].slice(6),
        ...nextExDate && prevExDate !== nextExDate ? { exDate: nextExDate } : {},
      },
    },
    added: {
      ...appointmentData,
      id: undefined,
      exDate: undefined,
      parentData: undefined,
      rRule: addedRules[1].slice(6),
      ...changes,
    },
  };
};

export const preCommitChanges: PreCommitChangesFn = (
  changes, appointmentData, editType,
) => {
  if (changes === null) {
    switch (editType) {
      case RECURRENCE.ALL: {
        return deleteAll(appointmentData);
      }
      case RECURRENCE.CURRENT: {
        return deleteCurrent(appointmentData);
      }
      case RECURRENCE.CURRENT_AND_FOLLOWING: {
        return deletedCurrentAndFollowing(appointmentData);
      }
    }
  } else {
    switch (editType) {
      case RECURRENCE.ALL: {
        return editAll(changes, appointmentData);
      }
      case RECURRENCE.CURRENT: {
        return editCurrent(changes, appointmentData);
      }
      case RECURRENCE.CURRENT_AND_FOLLOWING: {
        return editCurrentAndFollowing(changes, appointmentData);
      }
    }
  }
  return {};
};
