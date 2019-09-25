import moment from 'moment';
import { RRule, rrulestr, RRuleSet } from 'rrule';
import {
  AppointmentModel, PreCommitChangesFn, Changes, MakeDateSequenceFn, EditFn, DeleteFn, ChangeFn,
} from '../../types';
import { RECURRENCE_EDIT_SCOPE } from '../../constants';

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
  const currentExDate = `${moment.utc(date).format('YYYYMMDDTHHmmss')}Z`;
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

const changeCurrentAndFollowing: ChangeFn = (appointmentData, changes, changeAllAction) => {
  const { rRule, startDate, parentData, exDate: prevExDate = '', id } = appointmentData;

  const { initialSequence, currentChildIndex } = getAppointmentSequenceData(
    parentData.startDate, moment.utc(startDate as Date).toDate(), prevExDate, rRule,
  );

  if (currentChildIndex === 0) return changeAllAction(appointmentData, changes);

  const changedRules = configureICalendarRules(rRule as string, {
    dtstart: moment.utc(parentData.startDate).toDate(),
    until: moment.utc(initialSequence[currentChildIndex - 1]).toDate(),
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

const getAppointmentSequenceData = (
  prevStartDate: Date, startDate: Date, exDate: string, rRule: string | undefined,
) => {
  const initialSequence: Date[] = configureDateSequence(rRule, exDate, {
    dtstart: moment.utc(prevStartDate).toDate(),
  });
  const currentChildIndex = initialSequence
    .findIndex(date => moment(date).isSame(startDate as Date));
  return { initialSequence, currentChildIndex };
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

export const deleteCurrentAndFollowing: DeleteFn = appointmentData => changeCurrentAndFollowing(
  appointmentData, {}, deleteAll,
);

export const editAll: EditFn = (appointmentData, changes) => {
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

export const editCurrent: EditFn = (appointmentData, changes) => ({
  changed: {
    [appointmentData.id!]: {
      exDate: configureExDate(appointmentData.exDate, appointmentData.startDate as Date),
    },
  },
  added: mergeNewChanges(appointmentData as Partial<AppointmentModel>, changes as Changes),
});

export const editCurrentAndFollowing: EditFn = (appointmentData, changes) => {
  const { rRule, startDate, exDate: prevExDate = '', parentData } = appointmentData;
  const initialRule = new RRule(RRule.parseString(rRule as string));

  const { initialSequence, currentChildIndex } = getAppointmentSequenceData(
    parentData.startDate, moment.utc(startDate as Date).toDate(),  prevExDate, rRule,
  );
  if (currentChildIndex === 0) return editAll(appointmentData, changes);

  const addedRules = configureICalendarRules(appointmentData.rRule as string, {
    dtstart: moment.utc(startDate as Date).toDate(),
    count: initialSequence.length - currentChildIndex,
  });

  const addedAppointment = moment.utc(changes.startDate as Date).isAfter(initialRule.options.until!)
    ? { rRule: 'FREQ=DAILY;COUNT=1', exDate: '' } : { rRule: addedRules[1].slice(6) };

  return {
    changed: changeCurrentAndFollowing(appointmentData, changes, editAll).changed,
    added: {
      ...addedAppointment, ...mergeNewChanges(appointmentData, changes),
    },
  };
};

export const preCommitChanges: PreCommitChangesFn = (
  changes, appointmentData, editType,
) => {
  if (changes === null) {
    switch (editType) {
      case RECURRENCE_EDIT_SCOPE.ALL: {
        return deleteAll(appointmentData);
      }
      case RECURRENCE_EDIT_SCOPE.CURRENT: {
        return deleteCurrent(appointmentData);
      }
      case RECURRENCE_EDIT_SCOPE.CURRENT_AND_FOLLOWING: {
        return deleteCurrentAndFollowing(appointmentData);
      }
    }
  } else {
    switch (editType) {
      case RECURRENCE_EDIT_SCOPE.ALL: {
        return editAll(appointmentData, changes);
      }
      case RECURRENCE_EDIT_SCOPE.CURRENT: {
        return editCurrent(appointmentData, changes);
      }
      case RECURRENCE_EDIT_SCOPE.CURRENT_AND_FOLLOWING: {
        return editCurrentAndFollowing(appointmentData, changes);
      }
    }
  }
  return {};
};
