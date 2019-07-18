import { EditType } from '../../types';
import { ALL, CURRENT, CURRENT_FOLLOWING } from '../../constants';

export const deleteCurrent = (appointmentData: any) => {
  const currentExDate = `${new Date(appointmentData.startDate).toISOString()
    .replace(/-/gi, '').replace(/:/gi, '').replace('.', '').slice(0, 15)}Z`;
  const exDate = appointmentData.exDate
    ? `${appointmentData.exDate}, ${currentExDate}`
    : currentExDate;

  return { changed: { [appointmentData.id]: { exDate } } };
};

export const deleteAll = (appointmentData: any) => {
  return { deleted: appointmentData.id };
};

export const deletedCurrentAndFollowing = (appointmentData: any) => {
  const rRule = '';
  return { changed: { [appointmentData.id]: { rRule, exDate: '' } } };
};

export const preCommitChanges = (changes: any, appointmentData: any, editType: EditType) => {
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
        return {};
      }
      case CURRENT: {
        return {};
      }
      case CURRENT_FOLLOWING: {
        return {};
      }
    }
  }
  return changes;
};
