import moment from 'moment';
import {
  sliceAppointmentByDay,
  dayBoundaryPredicate,
  reduceAppointmentByDayBounds,
} from './helpers';
import { recurringViewPredicate } from './computeds';
import { access } from 'fs-extra';

describe('Week view helpers', () => {
  describe('Rect calculation helper', () => {
    describe('#sliceAppointmentByDay', () => {
      it('should slice multi-days appointment', () => {
        const slicedAppointments = sliceAppointmentByDay({
          start: moment('2018-06-27 09:00'),
          end: moment('2018-06-28 11:00'),
        });
        const [first, last] = slicedAppointments;

        expect(slicedAppointments)
          .toHaveLength(2);
        expect(first.start.toJSON())
          .toEqual(moment('2018-06-27 09:00').toJSON());
        expect(first.end.toJSON())
          .toEqual(moment('2018-06-27').endOf('day').toJSON());
        expect(last.start.toJSON())
          .toEqual(moment('2018-06-28').toJSON());
        expect(last.end.toJSON())
          .toEqual(moment('2018-06-28 11:00').toJSON());
      });

      it('should not slice one-day appointment', () => {
        const slicedAppointments = sliceAppointmentByDay({
          start: moment('2018-06-27 09:00'),
          end: moment('2018-06-27 11:00'),
        });

        expect(slicedAppointments)
          .toHaveLength(1);

        expect(slicedAppointments[0].start.toJSON())
          .toEqual(moment('2018-06-27 09:00').toJSON());
        expect(slicedAppointments[0].end.toJSON())
          .toEqual(moment('2018-06-27 11:00').toJSON());
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
      it('should crop appointment start', () => {
        const appointemnt = reduceAppointmentByDayBounds(
          { start: moment('2018-07-12 04:00'), end: moment('2018-07-12 11:00') },
          '2018-07-12 10:00', '2018-07-12 15:00',
        );
        expect(appointemnt.start.format())
          .toBe(moment('2018-07-12 10:00').format());
        expect(appointemnt.end.format())
          .toBe(moment('2018-07-12 11:00').format());
      });
      it('should crop appointment start and end', () => {
        const appointemnt = reduceAppointmentByDayBounds(
          { start: moment('2018-07-12 03:00'), end: moment('2018-07-12 11:00') },
          '2018-07-12 04:00', '2018-07-12 07:00',
        );
        expect(appointemnt.start.format())
          .toBe(moment('2018-07-12 04:00').format());
        expect(appointemnt.end.format())
          .toBe(moment('2018-07-12 07:00').format());
      });
      it('should crop apoitnment end', () => {
        const appointemnt = reduceAppointmentByDayBounds(
          { start: moment('2018-07-12 03:00'), end: moment('2018-07-12 11:00') },
          '2018-07-12 02:00', '2018-07-12 07:00',
        );
        expect(appointemnt.start.format())
          .toBe(moment('2018-07-12 03:00').format());
        expect(appointemnt.end.format())
          .toBe(moment('2018-07-12 07:00').format());
      });
      it('should not crop appointment', () => {
        const appointemnt = reduceAppointmentByDayBounds(
          { start: moment('2018-07-12 03:00'), end: moment('2018-07-12 11:00') },
          '2018-07-12 02:00', '2018-07-12 15:00',
        );
        expect(appointemnt.start.format())
          .toBe(moment('2018-07-12 03:00').format());
        expect(appointemnt.end.format())
          .toBe(moment('2018-07-12 11:00').format());
      });
    });

    describe('#recurringViewPredicate', () => {
      fit('should work', () => {
        const leftBoundary = new Date('2019-04-01 00:00');
        const rightBoundary = new Date('2019-04-04 00:00');
        const appointments = [
          { start: new Date('2019-04-1 03:00'), end: new Date('2019-04-1 04:00') },
          { start: new Date('2019-04-1 03:00'), end: new Date('2019-04-1 04:00'), rRule: 'FREQ=DAILY;COUNT=10' },
          { start: new Date('2019-04-2 03:00'), end: new Date('2019-04-2 04:00') },
        ];

        const appts = appointments.reduce((acc, appointment) => [...acc, ...recurringViewPredicate(appointment, leftBoundary, rightBoundary)], []);
        debugger
      });
    });
  });
});
