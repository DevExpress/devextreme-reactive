import moment, { Moment } from 'moment';
import { ViewCell } from '../../types';
import { PureComputed } from '@devexpress/dx-core';

export const getDayScaleCellColSpan: PureComputed<
  [ViewCell[][]], number
> = (cellsData) => {
  const firstDate = cellsData[0][0].startDate;
  let count = 1;
  while (cellsData[0][count] && moment(cellsData[0][count].startDate).isSame(firstDate, 'day')) {
    count += 1;
  }
  return count;
};

export const getDayScaleCells: PureComputed<
[ViewCell[][], boolean], ViewCell[]
> = (cellsData, isGroupingPanelAfterDates) => {
  if (!isGroupingPanelAfterDates) {
    return cellsData[0].map(({
      startDate, endDate, today, endOfGroup, groupingInfo,
    }, index) => ({
      key: index.toString(),
      startDate, endDate, today, endOfGroup, groupingInfo,
    }));
  }
  let prevDate: Moment;
  const colSpan = getDayScaleCellColSpan(cellsData);
  return cellsData[0].reduce((acc, { startDate, endDate, today }, index) => {
    const currentDate = moment(startDate);
    if (currentDate.isSame(prevDate)) {
      return acc;
    }
    prevDate = currentDate;
    return [
      ...acc, {
        key: index.toString(),
        startDate, endDate, today, colSpan,
        endOfGroup: true,
      },
    ];
  }, [] as ViewCell[]);
};
