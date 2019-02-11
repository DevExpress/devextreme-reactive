import moment from 'moment';
import { PureReducer } from '@devexpress/dx-core';
import { ChangeCurrentDatePayload } from '../../types';

export const changeCurrentDate: PureReducer<Date, ChangeCurrentDatePayload> = (
  currentDate, {
  nextDate, step, amount, direction,
}) => (
  nextDate
  || moment(currentDate as Date)[direction === 'back' ? 'subtract' : 'add'](amount, step)
    .toDate()
  || moment().subtract(amount, step)
);

export const setCurrentViewName: PureReducer<
  string, string, string
> = (currentViewName, nextViewName) => nextViewName;
