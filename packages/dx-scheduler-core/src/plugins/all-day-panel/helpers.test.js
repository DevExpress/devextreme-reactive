import moment from 'moment';
import { allDayPredicate, sliceAppointmentsByBoundaries } from './helpers';

describe('AllDayPanel helpers', () => {
  describe('#allDayAppointment', () => {
    it('should work', () => {
      const appointment = { start: moment('2018-07-05'), end: moment('2018-07-06') };

      expect(allDayPredicate(appointment))
        .toBe(true);
    });

    it('should work with hours', () => {
      const appointment = { start: moment('2018-07-05 10:20'), end: moment('2018-07-06 10:19') };

      expect(allDayPredicate(appointment))
        .toBe(false);
    });

    it('should work with other years', () => {
      const appointment = { start: moment('2018-12-31 10:20'), end: moment('2019-01-01 10:00') };

      expect(allDayPredicate(appointment))
        .toBe(false);
    });

    it('should work with the "allDay" appointment field', () => {
      const appointment = { start: moment('2018-12-31 10:20'), end: moment('2019-01-01 10:00'), allDay: true };

      expect(allDayPredicate(appointment))
        .toBe(true);
    });
  });
  describe('#sliceAppointmentsByBoundaries', () => {
    const left = new Date('2018-07-30 00:00');
    const right = new Date('2018-08-05 23:59:59');
    it('should slice without excludedDays', () => {
      const excludedDays = [];
      const appointment = { start: moment('2018-07-30 10:00'), end: moment('2018-07-31 22:30'), dataItem: {} };

      const slicedAppointment = sliceAppointmentsByBoundaries(
        appointment, left, right, excludedDays,
      );
      expect(slicedAppointment[0].start.format())
        .toEqual(moment('2018-07-30 10:00').format());
      expect(slicedAppointment[0].end.format())
        .toEqual(moment('2018-07-31 22:30').format());
    });

    it('should slice if start in excluded days', () => {
      const excludedDays = [1, 2];
      const appointment = { start: moment('2018-07-30 10:00'), end: moment('2018-08-01 22:30'), dataItem: {} };

      const slicedAppointment = sliceAppointmentsByBoundaries(
        appointment, left, right, excludedDays,
      );
      expect(slicedAppointment[0].start.format())
        .toEqual(moment('2018-08-01 00:00').format());
      expect(slicedAppointment[0].end.format())
        .toEqual(moment('2018-08-01 22:30').format());
    });

    it('should slice if end in excluded days', () => {
      const excludedDays = [2, 3];
      const appointment = { start: moment('2018-07-30 10:00'), end: moment('2018-08-01 22:30'), dataItem: {} };

      const slicedAppointment = sliceAppointmentsByBoundaries(
        appointment, left, right, excludedDays,
      );
      expect(slicedAppointment[0].start.format())
        .toEqual(moment('2018-07-30 10:00').format());
      expect(slicedAppointment[0].end.format())
        .toEqual(moment('2018-07-30 23:59:59').format());
    });

    it('should not slice if boundaries are not excluded days', () => {
      const excludedDays = [0, 2, 4];
      const appointment = { start: moment('2018-07-30 10:00'), end: moment('2018-08-03 22:30'), dataItem: {} };

      const slicedAppointment = sliceAppointmentsByBoundaries(
        appointment, left, right, excludedDays,
      );
      expect(slicedAppointment[0].start.format())
        .toEqual(moment('2018-07-30 10:00').format());
      expect(slicedAppointment[0].end.format())
        .toEqual(moment('2018-08-03 22:30').format());
    });

    it('should slice if start is before left boundary', () => {
      const excludedDays = [];
      const appointment = { start: moment('2018-07-27 10:00'), end: moment('2018-08-03 22:30'), dataItem: {} };

      const slicedAppointment = sliceAppointmentsByBoundaries(
        appointment, left, right, excludedDays,
      );
      expect(slicedAppointment[0].start.format())
        .toEqual(moment('2018-07-30 00:00').format());
      expect(slicedAppointment[0].end.format())
        .toEqual(moment('2018-08-03 22:30').format());
    });

    it('should slice if end is after right boundary', () => {
      const excludedDays = [];
      const appointment = { start: moment('2018-07-31 10:00'), end: moment('2018-08-06 22:30'), dataItem: {} };

      const slicedAppointment = sliceAppointmentsByBoundaries(
        appointment, left, right, excludedDays,
      );
      expect(slicedAppointment[0].start.format())
        .toEqual(moment('2018-07-31 10:00').format());
      expect(slicedAppointment[0].end.format())
        .toEqual(moment('2018-08-05 23:59:59').format());
    });
  });
});
