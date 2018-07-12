import moment from 'moment';
import { sliceAppointmentsByWeek } from './helpers';

describe('MonthView Helpers', () => {
  describe('#sliceAppointmentsBeWeek', () => {
    it('should not slice appointments if they are short', () => {
      const appointments = [
        { start: moment('2018-07-05'), end: moment('2018-07-06'), dataItem: {} },
        { start: moment('2018-07-03'), end: moment('2018-07-07'), dataItem: {} },
        { start: moment('2018-07-08'), end: moment('2018-07-14'), dataItem: {} },
      ];
      expect(sliceAppointmentsByWeek(appointments))
        .toEqual([
          { start: moment('2018-07-05'), end: moment('2018-07-06'), dataItem: {} },
          { start: moment('2018-07-03'), end: moment('2018-07-07'), dataItem: {} },
          { start: moment('2018-07-08'), end: moment('2018-07-14'), dataItem: {} },
        ]);
    });

    fit('should slice appointment if it start on first week and end on second week', () => {
      const appointments = [
        { start: moment('2018-07-07 22:00'), end: moment('2018-07-08 09:00'), dataItem: { id: 1 } },
      ];

      const slicedAppointments = sliceAppointmentsByWeek(appointments);
      expect(slicedAppointments)
        .toHaveLength(2);
      expect(slicedAppointments[0].start.format())
        .toEqual(moment('2018-07-07 22:00').format());
      expect(slicedAppointments[0].end.format())
        .toEqual(moment('2018-07-07 23:59:59.999').format());
      expect(slicedAppointments[1].start.format())
        .toEqual(moment('2018-07-08 00:00').format());
      expect(slicedAppointments[1].end.format())
        .toEqual(moment('2018-07-08 09:00').format());
    });

    it('should consider startDayOfWeek property', () => {
      const appointments = [
        { start: moment('2018-07-05'), end: moment('2018-07-06'), dataItem: {} },
        { start: moment('2018-07-03'), end: moment('2018-07-07'), dataItem: {} },
        { start: moment('2018-07-08'), end: moment('2018-07-14'), dataItem: {} },
      ];
      const startDayOfWeek = 4;

      const slicedAppointments = sliceAppointmentsByWeek(appointments, startDayOfWeek);
      expect(slicedAppointments)
        .toHaveLength(5);
      expect(slicedAppointments[]) ///// !!!!!!
        .toEqual();

        expect()
        .toEqual([
          { start: moment('2018-07-05'), end: moment('2018-07-06'), dataItem: {} },
          { start: moment('2018-07-03'), end: moment('2018-07-03 23:59'), dataItem: {} },
          { start: moment('2018-07-04 00:00'), end: moment('2018-07-07'), dataItem: {} },
          { start: moment('2018-07-08'), end: moment('2018-07-11 23:59'), dataItem: {} },
          { start: moment('2018-07-12 00:00'), end: moment('2018-07-14'), dataItem: {} },
        ]);
    });
  });
});
