import moment from 'moment';

export const viewBoundTitle = (startViewDate, endViewDate, step) => {
  const momentStartViewDate = moment(startViewDate);
  const momentEndViewDate = moment(endViewDate);
  if (step !== 'month') {
    if (momentStartViewDate.isSame(momentEndViewDate, 'day')) {
      return momentStartViewDate.format('D MMMM YYYY');
    }
    if (momentStartViewDate.isSame(momentEndViewDate, 'year')) {
      if (momentStartViewDate.isSame(momentEndViewDate, 'month')) {
        return `${momentStartViewDate.date()}-${momentEndViewDate.format('D MMMM YYYY')}`;
      }
      return `${momentStartViewDate.format('D MMM')} - ${momentEndViewDate.format('D MMM YYYY')}`;
    }
    return `${momentStartViewDate.format('D MMM YY')} - ${momentEndViewDate.format('D MMM YY')}`;
  }
  if (momentStartViewDate.isSame(momentEndViewDate, 'year')) {
    if (momentStartViewDate.isSame(momentEndViewDate, 'month')) {
      return momentStartViewDate.format('MMMM YYYY');
    }
    return `${momentStartViewDate.format('MMM')}-${momentEndViewDate.format('MMM YYYY')}`;
  }
  return `${momentStartViewDate.format('MMM YY')} - ${momentEndViewDate.format('MMM YY')}`;
};
