import { appointments } from './appointments';

const today = new Date();
const todayArgs = [
  today.getFullYear(),
  today.getMonth(),
];
let date = 1;
const makeToday = prevDate => (
  new Date(
    ...todayArgs,
    date,
    prevDate.getHours(),
    prevDate.getMinutes(),
  )
);
export default appointments.map(({ startDate, endDate, ...restArgs }) => {
  const result = {
    startDate: makeToday(startDate),
    endDate: makeToday(endDate),
    ...restArgs,
  };
  date += 1;
  if (date > 31) date = 1;
  return result;
});
