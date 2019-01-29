import moment from 'moment';
import { PureReducer } from '@devexpress/dx-core';
import { CurrentDatePayload, CurrentDate, ViewName } from '../../types';

export const changeCurrentDate: PureReducer<CurrentDate, CurrentDatePayload, Date> = (
  currentDate, {
  nextDate, step, amount, direction,
}) => (
  nextDate
  || moment(currentDate as Date)[direction === 'back' ? 'subtract' : 'add'](amount, step)
    .toDate()
  || moment().subtract(amount, step)
);

export const setCurrentViewName: PureReducer<
  ViewName, ViewName, ViewName
> = (currentViewName, nextViewName) => nextViewName;
