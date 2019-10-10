import moment from 'moment';
import { PureComputed } from '@devexpress/dx-core';
import { VERTICAL_TYPE, HORIZONTAL_TYPE } from '../../constants';

const MONTH_TYPE = 'month';

export const getViewType: PureComputed<[string], string> = (currentViewType) => {
  if (currentViewType === MONTH_TYPE) return HORIZONTAL_TYPE;
  return VERTICAL_TYPE;
};

export const isMidnight: PureComputed<
  [Date], boolean
> = (date) => {
  const momentDate = moment(date as Date);
  return momentDate.hours() === 0 && momentDate.minutes() === 0 && momentDate.seconds() === 0;
};
