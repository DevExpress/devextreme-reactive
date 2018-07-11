import moment from 'moment';
import { filterAppointments } from './utils';

describe('Utils', () => {
  describe('#filterAppointments', () => {
    it('should filter outside appointments', () => {
      const appointments = [
        { start: moment('2018-07-10 08:00'), end: moment('2018-07-10 10:00') },
        { start: moment('2018-07-10 10:00'), end: moment('2018-07-10 12:00') },
        { start: moment('2018-07-10 08:00'), end: moment('2018-07-10 12:00') },
        { start: moment('2018-07-10 09:30'), end: moment('2018-07-10 10:30') },
        { start: moment('2018-07-10 08:00'), end: moment('2018-07-10 09:00') },
        { start: moment('2018-07-10 11:00'), end: moment('2018-07-10 12:00') },
      ];
      const filtered = filterAppointments(appointments, '2018-07-10 09:00', '2018-07-10 11:00');

      expect(filtered)
        .toEqual(appointments.slice(0, 4));
    });

    it('should filter appointments from excluded days', () => {
      const appointments = [
        { start: moment('2018-07-03 09:00'), end: moment('2018-07-03 11:00') },
        { start: moment('2018-07-04 09:00'), end: moment('2018-07-05 11:00') },
        { start: moment('2018-07-05 09:00'), end: moment('2018-07-06 11:00') },
        { start: moment('2018-07-05 09:00'), end: moment('2018-07-07 10:00') },
        { start: moment('2018-07-05 09:00'), end: moment('2018-07-05 11:00') },
        { start: moment('2018-07-07 09:00'), end: moment('2018-07-07 09:00') },
        { start: moment('2018-07-07 09:00'), end: moment('2018-07-08 10:00') },
      ];
      const filtered = filterAppointments(appointments, '2018-07-02', '2018-07-08 23:59', [4, 6, 0]);

      expect(filtered)
        .toEqual(appointments.slice(0, 4));
    });

    it('should filter all-day appointments', () => {
      const appointments = [
        { start: moment('2018-07-10 08:00'), end: moment('2018-07-10 10:00'), expected: true },
        { start: moment('2018-07-10 22:00'), end: moment('2018-07-11 02:00'), expected: true },
        { start: moment('2018-07-09 08:00'), end: moment('2018-07-10 08:00'), expected: false },
      ];
      const filtered = filterAppointments(appointments, '2018-07-08', '2018-07-12', [], true);

      expect(filtered)
        .toEqual(appointments.slice(0, 2));
    });
  });
});
