import moment from 'moment';
import { calculateFirstDateOfWeek } from '../../utils';

export const dayScale = (
  currentDate,
  firstDayOfWeek,
  dayCount,
  excluded = [],
) => {
  const result = [];
  const date = firstDayOfWeek !== undefined
    ? moment(calculateFirstDateOfWeek(currentDate, firstDayOfWeek, excluded))
    : moment(currentDate);
  for (let index = 0; index < dayCount; index += 1) {
    if (excluded.findIndex(item => item === date.day()) === -1) {
      result.push(date.toDate());
    }
    date.add(1, 'days');
  }
  return result;
};

export const availableViews = (views, viewName) => {
  if (!views) return [viewName];
  if (views.findIndex(view => viewName === view) === -1) {
    const nextViews = views.slice();
    nextViews.push(viewName);
    return nextViews;
  } return views;
};
