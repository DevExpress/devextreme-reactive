import { PureComputed, memoize, argumentsShallowEqual } from '@devexpress/dx-core';
import { AppointmentModel, Appointment } from '../../types';
import { objectsAreEqual, datesAreEqual } from './helpers';

export const appointments: PureComputed<
  [AppointmentModel[]], Appointment[]
> = data => data.map(appointment => ({
  start: appointment.startDate,
  end: appointment.endDate,
  ...appointment.allDay !== undefined && {
    allDay: appointment.allDay,
  },
  dataItem: appointment,
}));

let callCount = 0;
export const dateTimeFormat: any = (local: string) => () => {
  console.log('Main call');
  let lastDate: any = null;
  let lastOptions: any = null;
  let lastResult: any = null;



  const aaa = (aa: any, bb: any, cc: any) => {
    // console.log('call');
    callCount += 1;
    console.log(callCount);
    return Intl.DateTimeFormat(aa, bb).format(cc);
  };

  const a = (nextDate: Date, nextOptions: any) => {
    if (lastDate === null
        || lastOptions === null
        || !datesAreEqual(lastDate, nextDate)
        || !objectsAreEqual(lastOptions, nextOptions)
      ) {
      lastResult = aaa(local, nextOptions, nextDate);
    }
    // lastResult = aaa(local, nextOptions, nextDate);

    lastDate = nextDate;
    lastOptions = nextOptions;
    return lastResult;
  };
  return a;
};
