import moment from 'moment';
import { calculateFirstDateOfWeek } from '../../utils';

export const dayScale = (
  currentDate = new Date(),
  firsDayOfWeek = 0,
  dayCount = 7,
  excluded = [],
) => {
  const result = [];
  const date = moment(calculateFirstDateOfWeek(currentDate, firsDayOfWeek, excluded));
  for (let index = 0; index < dayCount; index += 1) {
    if (excluded.findIndex(item => item === date.day()) === -1) {
      result.push(date.toDate());
    }
    date.add(1, 'days');
  }
  return result;
};
