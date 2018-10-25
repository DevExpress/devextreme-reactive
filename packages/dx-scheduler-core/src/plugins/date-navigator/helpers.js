import moment from 'moment';

const calculateTextByDays = (startViewDate, endViewDate) => {
  const momentStartViewDate = moment(startViewDate);
  const momentEndViewDate = moment(endViewDate);

  if (momentStartViewDate.isSame(momentEndViewDate, 'day')) {
    return momentStartViewDate.format('D MMMM YYYY');
  }
  if (momentStartViewDate.isSame(momentEndViewDate, 'year')) {
    if (momentStartViewDate.isSame(momentEndViewDate, 'month')) {
      return `${momentStartViewDate.format('D')}-${momentEndViewDate.format('D MMMM YYYY')}`;
    }
    return `${momentStartViewDate.format('D MMM')} - ${momentEndViewDate.format('D MMM YYYY')}`;
  }
  return `${momentStartViewDate.format('D MMM YY')} - ${momentEndViewDate.format('D MMM YY')}`;
};

const calculateTextByMonths = (currentDate, intervalCount) => {
  const momentCurrentDate = moment(currentDate);

  if (intervalCount === 1) {
    return momentCurrentDate.format('MMMM YYYY');
  }
  const lastMonth = momentCurrentDate.clone().add(intervalCount - 1, 'month');
  if (momentCurrentDate.isSame(lastMonth, 'year')) {
    return `${momentCurrentDate.format('MMM')}-${lastMonth.format('MMM YYYY')}`;
  }
  return `${momentCurrentDate.format('MMM YY')} - ${lastMonth.format('MMM YY')}`;
};

export const viewBoundText = (startViewDate, endViewDate, step, currentDate, intervalCount) => (
  step !== 'month'
    ? calculateTextByDays(startViewDate, endViewDate)
    : calculateTextByMonths(currentDate, intervalCount)
);
