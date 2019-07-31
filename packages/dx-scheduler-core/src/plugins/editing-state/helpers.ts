import moment from 'moment';
import { RRule, rrulestr, RRuleSet } from 'rrule';
import { EditType, AppointmentModel } from '../../types';
import { ALL, CURRENT, CURRENT_FOLLOWING } from '../../constants';

// For testing
// https://www.googleapis.com/calendar/v3/calendars/87okid34j969uje1ksg6cmc3do@group.calendar.google.com/events?key=AIzaSyBnNAISIUKe6xdhq1_rjor2rxoI3UlMY7k

export const deleteCurrent = (appointmentData: AppointmentModel) => {
  const currentExDate = `${moment.utc(appointmentData.startDate).format('YYYYMMDDTHHmmss')}Z`;
  const exDate = appointmentData.exDate
    ? `${appointmentData.exDate},${currentExDate}`
    : currentExDate;

  return { changed: { [appointmentData.id!]: { exDate } } };
};

export const deleteAll = (appointmentData: AppointmentModel) => {
  return { deleted: appointmentData.id };
};

export const deletedCurrentAndFollowing = (appointmentData: AppointmentModel) => {
  const { rRule, startDate, parentData, exDate: prevExDate = '' } = appointmentData;

  const options = {
    ...RRule.parseString(rRule),
    dtstart: moment.utc(parentData.startDate).toDate(),
    until: moment.utc(startDate).toDate(),
    count: '',
  };
  let rruleSet = new RRuleSet();
  rruleSet.rrule(new RRule(options));

  let exDate;
  if (prevExDate.length > 0) {
    exDate = prevExDate.split(',').reduce((acc: string[], date: string) => {
      const momentDate = moment.utc(date);
      if (momentDate.isBefore(startDate)) {
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

export const editAll = (changes: any, appointmentData: AppointmentModel) => {
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

export const editCurrent = (changes: any, appointmentData: AppointmentModel) => {
  const added = {
    startDate: appointmentData.startDate,
    endDate: appointmentData.endDate,
    ...appointmentData.title && { title: appointmentData.title },
    ...changes,
  };
  const currentExDate = `${moment.utc(appointmentData.startDate).format('YYYYMMDDTHHmmss')}Z`;
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

export const editCurrentAndFollowing = (changes: any, appointmentData: AppointmentModel) => {
  const { rRule, startDate, parentData, exDate: prevExDate = '' } = appointmentData;

  const initialSequence = makeRruleSet(rRule, prevExDate, {
    dtstart: moment.utc(parentData.startDate).toDate(),
  }).all();

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

  const currentChildIndex = initialSequence.findIndex(date => moment(date).isSame(startDate));

  if (currentChildIndex === 0) {
    return editAll(changes, appointmentData);
  }

  const options = {
    ...RRule.parseString(rRule),
    dtstart: moment.utc(parentData.startDate).toDate(),
    until: moment.utc(initialSequence[currentChildIndex - 1]).toDate(),
    count: '',
  };
  const rruleSet = new RRuleSet();
  rruleSet.rrule(new RRule(options));

  let exDate;
  if (prevExDate.length > 0) {
    exDate = prevExDate.split(',').reduce((acc: string[], date: string) => {
      const momentDate = moment.utc(date);
      if (momentDate.isBefore(startDate)) {
        return [...acc, date];
      }
      return acc;
    }, []).join(',');
  }

  const addedRrule = makeRruleSet(rRule, '', {
    dtstart: moment.utc(startDate).toDate(),
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

export const preCommitChanges = (
  changes: any, appointmentData: AppointmentModel, editType: EditType,
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
