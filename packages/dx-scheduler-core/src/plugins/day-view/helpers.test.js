import moment from 'moment';
import { sliceAppointmentByBoundaries } from './helpers';

describe('DayView helpers', () => {
  describe('#sliceAppointmentByBoundaries', () => {
    const leftBoundary = new Date('2018-09-10 10:00');
    const rightBoundary = new Date('2018-09-10 17:00');
    it('should not slice appointment', () => {
      const appointment = { start: moment('2018-09-10 10:00'), end: moment('2018-09-10 17:00'), data: {} };

      const slicedAppointment = sliceAppointmentByBoundaries(
        appointment, leftBoundary, rightBoundary,
      );
      expect(slicedAppointment[0].start.toDate())
        .toEqual(appointment.start.toDate());
      expect(slicedAppointment[0].end.toDate())
        .toEqual(appointment.end.toDate());
      expect(slicedAppointment[0].data)
        .toEqual(appointment.data);
    });

    it('should slice appointment once', () => {
      const appointment = { start: moment('2018-09-10 12:00'), end: moment('2018-09-10 19:00') };

      const slicedAppointment = sliceAppointmentByBoundaries(
        appointment, leftBoundary, rightBoundary,
      );
      expect(slicedAppointment[0].start.toDate())
        .toEqual(appointment.start.toDate());
      expect(slicedAppointment[0].end.toDate())
        .toEqual(moment('2018-09-10 17:00').toDate());
    });

    it('should slice appointment once', () => {
      const appointment = { start: moment('2018-09-10 06:00'), end: moment('2018-09-10 15:00') };

      const slicedAppointment = sliceAppointmentByBoundaries(
        appointment, leftBoundary, rightBoundary,
      );
      expect(slicedAppointment[0].start.toDate())
        .toEqual(moment('2018-09-10 10:00').toDate());
      expect(slicedAppointment[0].end.toDate())
        .toEqual(appointment.end.toDate());
    });
  });
});
