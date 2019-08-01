import moment from 'moment';
import { RRule, rrulestr, RRuleSet, Options } from 'rrule';
import { PureComputed } from '@devexpress/dx-core';
import { AppointmentModel, PreCommitChanges, ChangeSet, Changes } from '../../types';
import { ALL, CURRENT, CURRENT_FOLLOWING } from '../../constants';

export const deleteCurrent: PureComputed<[AppointmentModel], ChangeSet> = (appointmentData) => {
  const currentSequence = makeRruleSet(appointmentData.rRule, appointmentData.exDate, {
    dtstart: moment.utc(appointmentData.parentData.startDate).toDate(),
  }).all();

  if (currentSequence.length === 1) {
    return deleteAll(appointmentData);
  }

  const currentExDate = `${moment.utc(appointmentData.startDate as Date)
    .format('YYYYMMDDTHHmmss')}Z`;
  const exDate = appointmentData.exDate
    ? `${appointmentData.exDate},${currentExDate}`
    : currentExDate;

  return { changed: { [appointmentData.id!]: { exDate } } };
};

export const deleteAll: PureComputed<[AppointmentModel], ChangeSet> = (appointmentData) => {
  return { deleted: appointmentData.id };
};

export const deletedCurrentAndFollowing: PureComputed<
  [AppointmentModel], ChangeSet
> = (appointmentData) => {
  const { rRule, startDate, parentData, exDate: prevExDate = '' } = appointmentData;

  const initialSequence = makeRruleSet(rRule, prevExDate, {
    dtstart: moment.utc(parentData.startDate).toDate(),
  }).all();

  if (initialSequence.length === 1) {
    return deleteAll(appointmentData);
  }

  const currentChildIndex = initialSequence
    .findIndex(date => moment(date).isSame(startDate as Date));

  const options: Partial<Options> = {
    ...RRule.parseString(rRule),
    dtstart: moment.utc(parentData.startDate).toDate(),
    until: moment.utc(initialSequence[currentChildIndex - 1]).toDate(),
    count: null,
  };
  const rruleSet = new RRuleSet();
  rruleSet.rrule(new RRule(options));

  let exDate;
  if (prevExDate.length > 0) {
    exDate = prevExDate.split(',').reduce((acc: string[], date: string) => {
      const momentDate = moment.utc(date);
      if (momentDate.isBefore(startDate as Date)) {
        return [...acc, date];
      }
      return acc;
    }, []).join(',');
  }

  return {
    changed: {
      [appointmentData.id!]: {
        rRule: rruleSet.valueOf()[1].slice(6),
        ...exDate && prevExDate !== exDate ? { exDate } : {},
      },
    },
  };
};

export const editAll: PureComputed<
  [Changes, AppointmentModel], ChangeSet
> = (changes, appointmentData) => {
  const { rRule } = appointmentData;

  const initialRule = new RRule(RRule.parseString(rRule));
  if (moment.utc(changes.startDate).isAfter(initialRule.options.until!)) {
    return {
      changed: {
        [appointmentData.id!]: {
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
  [Changes, AppointmentModel], ChangeSet
> = (changes, appointmentData) => {
  const added = {
    startDate: appointmentData.startDate,
    endDate: appointmentData.endDate,
    ...appointmentData.title && { title: appointmentData.title },
    ...changes,
  };
  const currentExDate = `${moment.utc(appointmentData.startDate as Date)
    .format('YYYYMMDDTHHmmss')}Z`;
  const exDate = appointmentData.exDate
    ? `${appointmentData.exDate},${currentExDate}`
    : currentExDate;

  return {
    changed: { [appointmentData.id!]: { exDate } },
    added,
  };
};

const makeRruleSet = (rRule: string, exDate: string, options: any) => {
  let rruleSet = new RRuleSet();
  if (exDate) {
    rruleSet = rrulestr(`EXDATE:${exDate}`, { forceset: true }) as RRuleSet;
  }
  rruleSet.rrule(new RRule({
    ...RRule.parseString(rRule),
    ...options,
  }));

  return rruleSet;
};

export const editCurrentAndFollowing: PureComputed<
  [Changes, AppointmentModel], ChangeSet
> = (changes, appointmentData) => {
  const { rRule, startDate, parentData, exDate: prevExDate = '' } = appointmentData;

  const initialRule = new RRule(RRule.parseString(rRule));
  if (moment.utc(changes.startDate).isAfter(initialRule.options.until!)) {
    return {
      changed: {
        [appointmentData.id!]: {
          ...changes,
          rRule: 'FREQ=DAILY;COUNT=1',
          exDate: '',
        },
      },
    };
  }

  const initialSequence = makeRruleSet(rRule, prevExDate, {
    dtstart: moment.utc(parentData.startDate).toDate(),
  }).all();
  const currentChildIndex = initialSequence
    .findIndex(date => moment(date).isSame(startDate as Date));

  if (currentChildIndex === 0) {
    return editAll(changes, appointmentData);
  }

  const options: Partial<Options> = {
    ...RRule.parseString(rRule),
    dtstart: moment.utc(parentData.startDate).toDate(),
    until: moment.utc(initialSequence[currentChildIndex - 1]).toDate(),
    count: null,
  };
  const rruleSet = new RRuleSet();
  rruleSet.rrule(new RRule(options));

  let exDate;
  if (prevExDate.length > 0) {
    exDate = prevExDate.split(',').reduce((acc: string[], date: string) => {
      const momentDate = moment.utc(date);
      if (momentDate.isBefore(startDate as Date)) {
        return [...acc, date];
      }
      return acc;
    }, []).join(',');
  }

  const addedRrule = makeRruleSet(rRule, '', {
    dtstart: moment.utc(startDate as Date).toDate(),
    count: initialSequence.length - currentChildIndex,
  });

  const added = {
    rRule: addedRrule.valueOf()[1].slice(6),
    startDate: appointmentData.startDate,
    endDate: appointmentData.endDate,
    ...appointmentData.title && { title: appointmentData.title },
    ...changes,
  };

  return {
    changed: {
      [appointmentData.id!]: {
        rRule: rruleSet.valueOf()[1].slice(6),
        ...exDate && prevExDate !== exDate ? { exDate } : {},
      },
    },
    added,
  };
};

export const preCommitChanges: PreCommitChanges = (
  changes, appointmentData, editType,
) => {
  // Delete Mode
  if (changes === null) {
    switch (editType) {
      case ALL: {
        return deleteAll(appointmentData);
      }
      case CURRENT: {
        return deleteCurrent(appointmentData);
      }
      case CURRENT_FOLLOWING: {
        return deletedCurrentAndFollowing(appointmentData);
      }
    }
  } else { // Edit Mode
    switch (editType) {
      case ALL: {
        return editAll(changes, appointmentData);
      }
      case CURRENT: {
        return editCurrent(changes, appointmentData);
      }
      case CURRENT_FOLLOWING: {
        return editCurrentAndFollowing(changes, appointmentData);
      }
    }
  }
  return {};
};
