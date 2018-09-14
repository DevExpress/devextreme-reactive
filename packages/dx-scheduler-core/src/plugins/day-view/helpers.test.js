import moment from 'moment';
import { sliceAppointmentByBoundaries, getDayRectByDates } from './helpers';

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
  describe('#getDayRectByDates', () => {
    const offsetParent = {
      getBoundingClientRect: () => ({
        top: 10, left: 10, width: 250,
      }),
    };
    const cellElements = [{}, {
      getBoundingClientRect: () => ({
        top: 10, left: 20, width: 100, height: 100,
      }),
      offsetParent,
    }, {
      getBoundingClientRect: () => ({
        top: 110, left: 20, width: 100, height: 100,
      }),
      offsetParent,
    }, {}];

    it('should calculate geometry by dates', () => {
      const timeScale = [
        { start: new Date(2017, 6, 20, 8, 0), end: new Date(2017, 6, 20, 8, 30) },
        { start: new Date(2017, 6, 20, 8, 30), end: new Date(2017, 6, 20, 9, 0) },
        { start: new Date(2017, 6, 20, 9, 0), end: new Date(2017, 6, 20, 9, 30) },
        { start: new Date(2017, 6, 20, 9, 30), end: new Date(2017, 6, 20, 10, 0) },
      ];
      const currentDate = new Date(2018, 5, 25);
      const cellDuration = 30;
      const startDate = new Date(2018, 5, 25, 8, 45);
      const endDate = new Date(2018, 5, 25, 9, 15);
      const {
        top, left, height, width, parentWidth,
      } = getDayRectByDates(
        startDate,
        endDate,
        {
          currentDate,
          timeScale,
          cellDuration,
          cellElements,
        },
      );

      expect(top).toBe(50);
      expect(left).toBe(10);
      expect(height).toBe(100);
      expect(width).toBe(85);
      expect(parentWidth).toBe(250);
    });
  });
});
