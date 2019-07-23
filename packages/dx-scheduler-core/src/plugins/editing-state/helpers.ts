import moment from 'moment';
import { RRule, rrulestr, RRuleSet } from 'rrule';
import { EditType, AppointmentModel } from '../../types';
import { ALL, CURRENT, CURRENT_FOLLOWING } from '../../constants';

export const deleteCurrent = (appointmentData: AppointmentModel) => {
  const currentExDate = `${new Date(appointmentData.startDate).toISOString()
    .replace(/-/gi, '').replace(/:/gi, '').replace('.', '').slice(0, 15)}Z`;
  const exDate = appointmentData.exDate
    ? `${appointmentData.exDate}, ${currentExDate}`
    : currentExDate;

  return { changed: { [appointmentData.id!]: { exDate } } };
};

export const deleteAll = (appointmentData: AppointmentModel) => {
  return { deleted: appointmentData.id };
};

export const deletedCurrentAndFollowing = (appointmentData: AppointmentModel) => {
  const { rRule, startDate, parentData } = appointmentData;

  const options = {
    ...RRule.parseString(rRule),
    dtstart: moment(parentData.startDate).toDate(), // toUTCString() ???
    until: moment(startDate).toDate(),
    count: ""
  };
  let rruleSet = new RRuleSet();
  rruleSet.rrule(new RRule(options));

  return {
    changed: {
      [appointmentData.id!]: { rRule: rruleSet.valueOf()[1].slice(6) },
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
