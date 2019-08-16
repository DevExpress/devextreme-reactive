import moment from 'moment';
import { RRule, rrulestr, RRuleSet } from 'rrule';
import {
  AppointmentModel, PreCommitChangesFn, Changes, MakeDateSequenceFn, EditFn, DeleteFn,
} from '../../types';
import { RECURRENCE } from '../../constants';

const mergeNewChanges = (
  appointmentData: Partial<AppointmentModel>, changes: Changes,
) => {
  const appointment = {
    ...appointmentData,
  };
  delete appointment.id;
  delete appointment.rRule;
  delete appointment.exDate;
  delete appointment.parentData;
  return { ...appointment, ...changes };
};

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

const configureExDate = (exDate: string | undefined, date: Date) => {
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
    ...RRule.parseString(rRule as string),
    ...options,
  }));

  return rruleSet.all();
};

const configureICalendarRules = (rRule: string | undefined, options: object) => {
  const rruleSet = new RRuleSet();
  rruleSet.rrule(new RRule({
    ...RRule.parseString(rRule as string),
    ...options,
  }));
  return rruleSet.valueOf();
};

export const deleteCurrent: DeleteFn = (appointmentData) => {
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

export const deleteAll: DeleteFn = (appointmentData) => {
  return { deleted: appointmentData.id };
};

export const deletedCurrentAndFollowing: DeleteFn = (appointmentData) => {
  const { rRule, startDate, parentData, exDate: prevExDate = '', id } = appointmentData;

  const initialSequence: Date[] = configureDateSequence(rRule, prevExDate, {
    dtstart: moment.utc(parentData.startDate).toDate(),
  });

  if (initialSequence.length === 1) {
    return deleteAll(appointmentData);
  }

  const currentChildIndex = initialSequence
    .findIndex(date => moment(date).isSame(startDate as Date));

  const changedRules = configureICalendarRules(rRule as string, {
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

export const editAll: EditFn = (changes, appointmentData) => {
  const { rRule, id } = appointmentData;

  const initialRule = new RRule(RRule.parseString(rRule as string));
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

export const editCurrent: EditFn = (changes, appointmentData) => ({
  changed: {
    [appointmentData.id!]: {
      exDate: configureExDate(appointmentData.exDate, appointmentData.startDate as Date),
    },
  },
  added: mergeNewChanges(appointmentData as Partial<AppointmentModel>, changes as Changes),
});

export const editCurrentAndFollowing: EditFn = (changes, appointmentData) => {
  const { rRule, startDate, parentData, exDate: prevExDate = '', id } = appointmentData;

  const initialRule = new RRule(RRule.parseString(rRule as string));
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

  const changedRules = configureICalendarRules(rRule as string, {
    dtstart: moment.utc(parentData.startDate).toDate(),
    until: moment.utc(initialSequence[currentChildIndex]).toDate(),
    count: null,
  });

  const addedRules = configureICalendarRules(rRule as string, {
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
    added: { rRule: addedRules[1].slice(6), ...mergeNewChanges(appointmentData, changes) },
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
