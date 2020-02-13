import { PureComputed } from '@devexpress/dx-core';
import { SchedulerDateTime } from '../../types';
import moment from 'moment';

export const navigateByOneMonth: PureComputed<
  [SchedulerDateTime, boolean], Date
> = (currentDate, isBackward) => moment(currentDate as SchedulerDateTime)
  [isBackward ? 'subtract' : 'add'](1, 'month').toDate();
