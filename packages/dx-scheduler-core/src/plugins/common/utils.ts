import moment, { Moment } from 'moment';
import { ViewCell } from '../../types';
import { PureComputed } from '@devexpress/dx-core';

export const getColSpan: PureComputed<
  [ViewCell[][]], number
> = (cellsData) => {
  const firstDate = moment(cellsData[0][0].startDate);
  let count = 1;
  while (cellsData[0][count] && moment(cellsData[0][count].startDate).isSame(firstDate, 'day')) {
    count += 1;
  }
  return count;
};

export const getDayScaleCells: PureComputed<
[ViewCell[][], boolean, () => any], ViewCell[]
> = (cellsData, groupPanelAfterDates, formatDate) => {
  if (!groupPanelAfterDates) {
    return cellsData[0].map(({
      startDate,
      endDate,
      today,
      hasRightBorder,
      groupingInfo,
    }, index) => ({
      key: index.toString(),
      startDate,
      endDate,
      today,
      formatDate,
      hasRightBorder,
      groupingInfo,
    }));
  }
  let prevDate: Moment;
  const colSpan = getColSpan(cellsData);
  return cellsData[0].reduce((acc, {
    startDate,
    endDate,
    today,
    hasRightBorder,
    groupingInfo,
  }, index) => {
    const currentDate = moment(startDate);
    if (currentDate.isSame(prevDate)) {
      return acc;
    }
    prevDate = currentDate;
    return [
      ...acc,
      ({
        key: index.toString(),
        startDate,
        endDate,
        today,
        formatDate,
        hasRightBorder,
        groupingInfo,
        colSpan,
      }),
    ];
  }, [] as ViewCell[]);
};
