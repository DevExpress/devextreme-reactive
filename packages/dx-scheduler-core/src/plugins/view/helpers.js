import moment from 'moment';

export const getCellByDate = (days, times, date) => {
  const rowIndex = times.findIndex((timeCell) => {
    const startTime = moment(timeCell.start);
    const endTime = moment(timeCell.end);
    const cellStart = moment(date).hour(startTime.hours()).minutes(startTime.minutes());
    const cellEnd = moment(date).hour(endTime.hours()).minutes(endTime.minutes());
    return moment(date).isBetween(cellStart, cellEnd, null, '[)');
  });

  const cellIndex = days.findIndex(day => moment(date).isSame(day, 'date'));
  const cellStartTime = moment(times[rowIndex].start);
  const cellStartDate = moment(days[cellIndex])
    .hour(cellStartTime.hours())
    .minutes(cellStartTime.minutes())
    .toDate();
  const totalCellIndex = (rowIndex * days.length) + cellIndex;
  return {
    index: totalCellIndex,
    startDate: cellStartDate,
  };
};
