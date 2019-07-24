import moment from 'moment';
import { RRule, rrulestr, RRuleSet } from 'rrule';
import { EditType, AppointmentModel } from '../../types';
import { ALL, CURRENT, CURRENT_FOLLOWING } from '../../constants';

// For testing
// https://www.googleapis.com/calendar/v3/calendars/87okid34j969uje1ksg6cmc3do@group.calendar.google.com/events?key=AIzaSyBnNAISIUKe6xdhq1_rjor2rxoI3UlMY7k

export const deleteCurrent = (appointmentData: AppointmentModel) => {
  const currentExDate = `${moment.utc(appointmentData.startDate).format('YYYYMMDDTHHmmss')}Z`;
  const exDate = appointmentData.exDate
    ? `${appointmentData.exDate}, ${currentExDate}`
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
    dtstart: moment.utc(parentData.startDate).toDate(), // toUTCString() ???
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
  return  { changed: {  [appointmentData.id!]: { exDate: '', rRule: '' } } };
};

export const editCurrent = (changes: any, appointmentData: AppointmentModel) => {
  return {
    changed: { [appointmentData.id!]: { exDate: '', rRule: '' } },
    added: { ...appointmentData },
  };
};

export const editCurrentAndFollowing = (changes: any, appointmentData: AppointmentModel) => {
  return {
    changed: { [appointmentData.id!]: { exDate: '', rRule: '' } },
    added: { ...appointmentData },
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
  return changes;
};
