import moment from 'moment';
import {
  sliceAppointmentByDay,
  dayBoundaryPredicate,
  reduceAppointmentByDayBounds,
  normalizeAppointmentDuration,
} from './helpers';

describe('Week view helpers', () => {
  describe('Rect calculation helper', () => {
    describe('#sliceAppointmentByDay', () => {
      it('should slice multi-days appointment', () => {
        const slicedAppointments = sliceAppointmentByDay({
          start: moment('2018-06-27 09:00'),
          end: moment('2018-06-28 11:00'),
        }, 30);
        const [first, last] = slicedAppointments;

        expect(slicedAppointments)
          .toHaveLength(2);
        expect(first.start.format())
          .toEqual(moment('2018-06-27 09:00').format());
        expect(first.end.format())
          .toEqual(moment('2018-06-27').endOf('day').format());
        expect(last.start.format())
          .toEqual(moment('2018-06-28').format());
        expect(last.end.format())
          .toEqual(moment('2018-06-28 11:00').format());
      });
      it('should not slice one-day appointment', () => {
        const slicedAppointments = sliceAppointmentByDay({
          start: moment('2018-06-27 09:00'),
          end: moment('2018-06-27 11:00'),
        }, 30);

        expect(slicedAppointments)
          .toHaveLength(1);

        expect(slicedAppointments[0].start.format())
          .toEqual(moment('2018-06-27 09:00').format());
        expect(slicedAppointments[0].end.format())
          .toEqual(moment('2018-06-27 11:00').format());
      });
      it('should correct slice left short appointment', () => {
        const slicedAppointments = sliceAppointmentByDay({
          start: moment('2018-06-27T23:55'),
          end: moment('2018-06-28T00:30'),
        }, 30);

        expect(slicedAppointments)
          .toHaveLength(2);

        expect(slicedAppointments[0].start.format())
          .toEqual(moment('2018-06-27T23:44:59').format());
        expect(slicedAppointments[0].end.format())
          .toEqual(moment('2018-06-27T23:59:59').format());
        expect(slicedAppointments[0].short)
          .toEqual(true);
        expect(slicedAppointments[1].start.format())
          .toEqual(moment('2018-06-28T00:00').format());
        expect(slicedAppointments[1].end.format())
          .toEqual(moment('2018-06-28T00:30').format());
        expect(slicedAppointments[1].short)
          .toEqual(false);
      });
      it('should correct slice right short appointment', () => {
        const slicedAppointments = sliceAppointmentByDay({
          start: moment('2018-06-27T23:00'),
          end: moment('2018-06-28T00:05'),
        }, 30);

        expect(slicedAppointments)
          .toHaveLength(2);

        expect(slicedAppointments[0].start.format())
          .toEqual(moment('2018-06-27T23:00').format());
        expect(slicedAppointments[0].end.format())
          .toEqual(moment('2018-06-27T23:59:59').format());
        expect(slicedAppointments[0].short)
          .toEqual(false);
        expect(slicedAppointments[1].start.format())
          .toEqual(moment('2018-06-28T00:00').format());
        expect(slicedAppointments[1].end.format())
          .toEqual(moment('2018-06-28T00:15').format());
        expect(slicedAppointments[1].short)
          .toEqual(true);
      });
      it('should correct slice left and right short appointment', () => {
        const slicedAppointments = sliceAppointmentByDay({
          start: moment('2018-06-27T23:55'),
          end: moment('2018-06-28T00:05'),
        }, 30);

        expect(slicedAppointments)
          .toHaveLength(2);

        expect(slicedAppointments[0].start.format())
          .toEqual(moment('2018-06-27T23:44:59').format());
        expect(slicedAppointments[0].end.format())
          .toEqual(moment('2018-06-27T23:59:59').format());
        expect(slicedAppointments[0].short)
          .toEqual(true);
        expect(slicedAppointments[1].start.format())
          .toEqual(moment('2018-06-28T00:00').format());
        expect(slicedAppointments[1].end.format())
          .toEqual(moment('2018-06-28T00:15').format());
        expect(slicedAppointments[1].short)
          .toEqual(true);
      });
    });

    describe('#dayBoundaryPredicate', () => {
      it('should not take appointment from excluded days', () => {
        expect(dayBoundaryPredicate(
          { start: moment('2018-06-24 10:00'), end: moment('2018-06-24 11:00') },
          '2018-03-21 09:00',
          '2019-06-27 18:00',
          [0],
        )).toBeFalsy();
      });

      it('should not take appointment that ends before left bound', () => {
        expect(dayBoundaryPredicate(
          { start: moment('2018-06-24 10:00'), end: moment('2018-06-24 11:00') },
          '2018-03-21 11:00',
          '2018-06-27 18:00',
        )).toBeFalsy();
      });

      it('should not take appointment that starts after right bound', () => {
        expect(dayBoundaryPredicate(
          { start: moment('2018-06-24 12:00'), end: moment('2018-06-24 15:00') },
          '2018-03-22 11:00',
          '2018-06-27 12:00',
        )).toBeFalsy();
      });

      it('should take appointment that starts between left and right bounds', () => {
        expect(dayBoundaryPredicate(
          { start: moment('2018-06-24 12:00'), end: moment('2018-06-24 18:00') },
          '2018-04-22 12:00',
          '2018-07-24 15:00',
        )).toBeTruthy();
      });

      it('should take appointment that ends between left and right bounds', () => {
        expect(dayBoundaryPredicate(
          { start: moment('2018-06-24 09:00'), end: moment('2018-06-24 15:00') },
          '2018-06-24 12:00',
          '2018-06-29 18:00',
        )).toBeTruthy();
      });

      it('should take appointment that starts before left bound and ends after right bound', () => {
        expect(dayBoundaryPredicate(
          { start: moment('2018-06-24 09:00'), end: moment('2018-06-24 18:00') },
          '2018-04-22 12:00',
          '2018-07-26 15:00',
        )).toBeTruthy();
      });

      it('should not take appointment that ends before left view bound', () => {
        expect(dayBoundaryPredicate(
          { start: moment('2018-06-22 09:00'), end: moment('2018-06-22 12:00') },
          '2018-06-22 12:00',
          '2018-06-26 15:00',
        )).toBeFalsy();
      });

      it('should not take appointment that starts after right view bound', () => {
        expect(dayBoundaryPredicate(
          { start: moment('2018-06-26 15:01'), end: moment('2018-06-26 16:00') },
          '2018-06-22 12:00',
          '2018-06-26 15:00',
        )).toBeFalsy();
      });
    });

    describe('#reduceAppointmentByDayBounds', () => {
      const cellDuration = 30;
      it('should crop appointment start', () => {
        const appointemnt = reduceAppointmentByDayBounds(
          { start: moment('2018-07-12T04:00'), end: moment('2018-07-12T11:00'), short: false },
          '2018-07-12T10:00', '2018-07-12T15:00', cellDuration,
        );
        expect(appointemnt.start.format())
          .toBe(moment('2018-07-12T10:00').format());
        expect(appointemnt.end.format())
          .toBe(moment('2018-07-12T11:00').format());
        expect(appointemnt.short)
          .toBe(false);
      });
      it('should crop appointment start and end', () => {
        const appointemnt = reduceAppointmentByDayBounds(
          { start: moment('2018-07-12T03:00'), end: moment('2018-07-12T11:00') },
          '2018-07-12T04:00', '2018-07-12T07:00', cellDuration,
        );
        expect(appointemnt.start.format())
          .toBe(moment('2018-07-12T04:00').format());
        expect(appointemnt.end.format())
          .toBe(moment('2018-07-12T07:00').format());
      });
      it('should crop apoitnment end', () => {
        const appointemnt = reduceAppointmentByDayBounds(
          { start: moment('2018-07-12T03:00'), end: moment('2018-07-12T11:00') },
          '2018-07-12T02:00', '2018-07-12T07:00', cellDuration,
        );
        expect(appointemnt.start.format())
          .toBe(moment('2018-07-12T03:00').format());
        expect(appointemnt.end.format())
          .toBe(moment('2018-07-12T07:00').format());
      });
      it('should not crop appointment', () => {
        const appointemnt = reduceAppointmentByDayBounds(
          { start: moment('2018-07-12T03:00'), end: moment('2018-07-12T11:00'), short: true },
          '2018-07-12T02:00', '2018-07-12T15:00', cellDuration,
        );
        expect(appointemnt.start.format())
          .toBe(moment('2018-07-12T03:00').format());
        expect(appointemnt.end.format())
          .toBe(moment('2018-07-12T11:00').format());
        expect(appointemnt.short)
          .toBe(true);
      });
      it('should crop left short appointment', () => {
        const appointemnt = reduceAppointmentByDayBounds(
          { start: moment('2018-07-12T01:20'), end: moment('2018-07-12T02:05') },
          '2018-07-12T02:00', '2018-07-12T04:00', cellDuration,
        );
        expect(appointemnt.start.format())
          .toBe(moment('2018-07-12T02:00').format());
        expect(appointemnt.end.format())
          .toBe(moment('2018-07-12T02:15').format());
        expect(appointemnt.short)
          .toBe(true);
      });
      it('should crop right short appointment', () => {
        const appointemnt = reduceAppointmentByDayBounds(
          { start: moment('2018-07-12T03:55'), end: moment('2018-07-12T05:00') },
          '2018-07-12T02:00', '2018-07-12T04:00', cellDuration,
        );
        expect(appointemnt.start.format())
          .toBe(moment('2018-07-12T03:45:00').format());
        expect(appointemnt.end.format())
          .toBe(moment('2018-07-12T04:00').format());
        expect(appointemnt.short)
          .toBe(true);
      });
    });

    describe('#normalizeAppointmentDuration', () => {
      const cellDuration = 30;
      it('should format dates and keep rest args', () => {
        const result = normalizeAppointmentDuration(
          { start: '2018-07-12T02:00', end: '2018-07-12T04:00', data: 'data' },
          cellDuration,
        );
        expect(result.start.format())
          .toEqual(moment('2018-07-12T02:00').format());
        expect(result.end.format())
          .toEqual(moment('2018-07-12T04:00').format());
        expect(result.data)
          .toEqual('data');
        expect(result.short)
          .toEqual(false);
      });
      it('should add minimal duration if appointment is short', () => {
        const result = normalizeAppointmentDuration(
          { start: '2018-07-12T02:00', end: '2018-07-12T02:14' },
          cellDuration,
        );
        expect(result.start.format())
          .toEqual(moment('2018-07-12T02:00').format());
        expect(result.end.format())
          .toEqual(moment('2018-07-12T02:15').format());
        expect(result.short)
          .toEqual(true);
      });
      it('should add minimal duration if short appointment places near an end day', () => {
        const result = normalizeAppointmentDuration(
          { start: '2018-07-12T23:55', end: '2018-07-12T12:55' },
          cellDuration,
        );
        expect(result.start.format())
          .toEqual(moment('2018-07-12T23:44:59').format());
        expect(result.end.format())
          .toEqual(moment('2018-07-12T23:59:59').format());
        expect(result.short)
          .toEqual(true);
      });
    });
  });
});
