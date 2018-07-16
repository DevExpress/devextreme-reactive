import moment from 'moment';

export const viewBoundTitle = (startViewDate, endViewDate, step) => {
  if (step !== 'month') {
    if (moment(startViewDate).isSame(endViewDate, 'day')) {
      return moment(startViewDate).format('D MMMM YYYY');
    }
    if (moment(startViewDate).isSame(endViewDate, 'year')) {
      if (moment(startViewDate).isSame(endViewDate, 'month')) {
        return `${moment(startViewDate).date()}-${moment(endViewDate).format('D MMMM YYYY')}`;
      }
      return `${moment(startViewDate).format('D MMM')}-${moment(endViewDate).format('D MMM YYYY')}`;
    }
    return `${moment(startViewDate).format('D MMM YY')}-${moment(endViewDate).format('D MMM YY')}`;
  }
  if (moment(startViewDate).isSame(endViewDate, 'year')) {
    if (moment(startViewDate).isSame(endViewDate, 'month')) {
      return moment(startViewDate).format('MMMM YYYY');
    }
    return `${moment(startViewDate).format('MMM')}-${moment(endViewDate).format('MMM YYYY')}`;
  }
  return `${moment(startViewDate).format('MMM YY')}-${moment(endViewDate).format('MMM YY')}`;
};
