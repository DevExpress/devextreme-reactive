import moment from 'moment';
import {
  sliceAppointmentByDay,
  dayBoundaryPredicate,
  reduceAppointmentByDayBounds,
  normalizeAppointmentDuration,
  getWeekVerticallyGroupedColumnIndex,
  getWeekHorizontallyGroupedColumnIndex,
  getWeekVerticallyGroupedRowIndex,
  getWeekHorizontallyGroupedRowIndex,
} from './helpers';
import { addDateToKey } from '../../utils';

jest.mock('../../utils', () => ({
  ...jest.requireActual('../../utils'),
  addDateToKey: jest.fn(),
}));

describe('Week view helpers', () => {
  describe('Rect calculation helper', () => {
    describe('#sliceAppointmentByDay', () => {
      afterEach(() => {
        jest.resetAllMocks();
      });
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
      it('should correct slice a short-on-first-day appointment', () => {
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
        expect(slicedAppointments[1].start.format())
          .toEqual(moment('2018-06-28T00:00').format());
        expect(slicedAppointments[1].end.format())
          .toEqual(moment('2018-06-28T00:30').format());
      });
      it('should correct slice a short-on-second-day short appointment', () => {
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
        expect(slicedAppointments[1].start.format())
          .toEqual(moment('2018-06-28T00:00').format());
        expect(slicedAppointments[1].end.format())
          .toEqual(moment('2018-06-28T00:15').format());
      });
      it('should correct slice short-on-first-and-second-day appointment', () => {
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
        expect(slicedAppointments[1].start.format())
          .toEqual(moment('2018-06-28T00:00').format());
        expect(slicedAppointments[1].end.format())
          .toEqual(moment('2018-06-28T00:15').format());
      });
      it('should call addDateToKey with correct parameters', () => {
        const start = moment('2018-06-27T23:55');
        const end = moment('2018-06-28T00:05');
        const key = 'test';
        sliceAppointmentByDay({ start, end, key }, 30);

        expect(addDateToKey)
          .toHaveBeenCalledTimes(2);
        expect(addDateToKey)
          .toHaveBeenCalledWith(key, start);
        expect(addDateToKey)
          .toHaveBeenCalledWith(key, end);
      });
      it('should not call addDateToKey if appointment is not sliced', () => {
        const start = moment('2018-06-27T21:55');
        const end = moment('2018-06-27T23:55');
        const key = 'test';
        sliceAppointmentByDay({ start, end, key }, 30);

        expect(addDateToKey)
          .not.toHaveBeenCalled();
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
      it('should cut appointment start', () => {
        const appointment = reduceAppointmentByDayBounds(
          { start: moment('2018-07-12T04:00'), end: moment('2018-07-12T11:00') },
          '2018-07-12T10:00', '2018-07-12T15:00', cellDuration,
        );
        expect(appointment.start.format())
          .toBe(moment('2018-07-12T10:00').format());
        expect(appointment.end.format())
          .toBe(moment('2018-07-12T11:00').format());
      });
      it('should cut appointment start and end', () => {
        const appointment = reduceAppointmentByDayBounds(
          { start: moment('2018-07-12T03:00'), end: moment('2018-07-12T11:00') },
          '2018-07-12T04:00', '2018-07-12T07:00', cellDuration,
        );
        expect(appointment.start.format())
          .toBe(moment('2018-07-12T04:00').format());
        expect(appointment.end.format())
          .toBe(moment('2018-07-12T07:00').format());
      });
      it('should cut appointment end', () => {
        const appointment = reduceAppointmentByDayBounds(
          { start: moment('2018-07-12T03:00'), end: moment('2018-07-12T11:00') },
          '2018-07-12T02:00', '2018-07-12T07:00', cellDuration,
        );
        expect(appointment.start.format())
          .toBe(moment('2018-07-12T03:00').format());
        expect(appointment.end.format())
          .toBe(moment('2018-07-12T07:00').format());
      });
      it('should not cut appointment', () => {
        const appointment = reduceAppointmentByDayBounds(
          { start: moment('2018-07-12T03:00'), end: moment('2018-07-12T11:00') },
          '2018-07-12T02:00', '2018-07-12T15:00', cellDuration,
        );
        expect(appointment.start.format())
          .toBe(moment('2018-07-12T03:00').format());
        expect(appointment.end.format())
          .toBe(moment('2018-07-12T11:00').format());
      });
      it('should cut a short-on-first-day appointment', () => {
        const appointment = reduceAppointmentByDayBounds(
          { start: moment('2018-07-12T01:20'), end: moment('2018-07-12T02:05') },
          '2018-07-12T02:00', '2018-07-12T04:00', cellDuration,
        );
        expect(appointment.start.format())
          .toBe(moment('2018-07-12T02:00').format());
        expect(appointment.end.format())
          .toBe(moment('2018-07-12T02:15').format());
      });
      it('should cut short-on-second-day appointment', () => {
        const appointment = reduceAppointmentByDayBounds(
          { start: moment('2018-07-12T03:55'), end: moment('2018-07-12T05:00') },
          '2018-07-12T02:00', '2018-07-12T04:00', cellDuration,
        );
        expect(appointment.start.format())
          .toBe(moment('2018-07-12T03:45:00').format());
        expect(appointment.end.format())
          .toBe(moment('2018-07-12T04:00').format());
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
      });
    });
  });

  describe('#view cell index helpers', () => {
    const firstTestAppointment = { test: 1 };
    const secondTestAppointment = { test: 2 };

    const horizontallyGroupedViewCells = [[{
      startDate: new Date('2018-06-24 08:00'),
      endDate: new Date('2018-06-24 08:30'),
      groupingInfo: [{ fieldName: 'test', id: 1 }],
    }, {
      startDate: new Date('2018-06-25 08:00'),
      endDate: new Date('2018-06-25 08:30'),
      groupingInfo: [{ fieldName: 'test', id: 1 }],
    }, {
      startDate: new Date('2018-06-26 08:00'),
      endDate: new Date('2018-06-26 08:30'),
      groupingInfo: [{ fieldName: 'test', id: 1 }],
    }, {
      startDate: new Date('2018-06-24 08:00'),
      endDate: new Date('2018-06-24 08:30'),
      groupingInfo: [{ fieldName: 'test', id: 2 }],
    }, {
      startDate: new Date('2018-06-25 08:00'),
      endDate: new Date('2018-06-25 08:30'),
      groupingInfo: [{ fieldName: 'test', id: 2 }],
    }, {
      startDate: new Date('2018-06-26 08:00'),
      endDate: new Date('2018-06-26 08:30'),
      groupingInfo: [{ fieldName: 'test', id: 2 }],
    }], [{
      startDate: new Date('2018-06-24 08:30'),
      endDate: new Date('2018-06-24 09:00'),
      groupingInfo: [{ fieldName: 'test', id: 1 }],
    }, {
      startDate: new Date('2018-06-25 08:30'),
      endDate: new Date('2018-06-25 09:00'),
      groupingInfo: [{ fieldName: 'test', id: 1 }],
    }, {
      startDate: new Date('2018-06-26 08:30'),
      endDate: new Date('2018-06-26 09:00'),
      groupingInfo: [{ fieldName: 'test', id: 1 }],
    }, {
      startDate: new Date('2018-06-24 08:30'),
      endDate: new Date('2018-06-24 09:00'),
      groupingInfo: [{ fieldName: 'test', id: 2 }],
    }, {
      startDate: new Date('2018-06-25 08:30'),
      endDate: new Date('2018-06-25 09:00'),
      groupingInfo: [{ fieldName: 'test', id: 2 }],
    }, {
      startDate: new Date('2018-06-26 08:30'),
      endDate: new Date('2018-06-26 09:00'),
      groupingInfo: [{ fieldName: 'test', id: 2 }],
    }]];

    const verticallyGroupedViewCells = [[{
      startDate: new Date('2018-06-24 08:00'),
      endDate: new Date('2018-06-24 08:30'),
      groupingInfo: [{ fieldName: 'test', id: 1 }],
    }, {
      startDate: new Date('2018-06-25 08:00'),
      endDate: new Date('2018-06-25 08:30'),
      groupingInfo: [{ fieldName: 'test', id: 1 }],
    }, {
      startDate: new Date('2018-06-26 08:00'),
      endDate: new Date('2018-06-26 08:30'),
      groupingInfo: [{ fieldName: 'test', id: 1 }],
    }], [{
      startDate: new Date('2018-06-24 08:30'),
      endDate: new Date('2018-06-24 09:00'),
      groupingInfo: [{ fieldName: 'test', id: 1 }],
    }, {
      startDate: new Date('2018-06-25 08:30'),
      endDate: new Date('2018-06-25 09:00'),
      groupingInfo: [{ fieldName: 'test', id: 1 }],
    }, {
      startDate: new Date('2018-06-26 08:30'),
      endDate: new Date('2018-06-26 09:00'),
      groupingInfo: [{ fieldName: 'test', id: 1 }],
    }], [{
      startDate: new Date('2018-06-24 08:00'),
      endDate: new Date('2018-06-24 08:30'),
      groupingInfo: [{ fieldName: 'test', id: 2 }],
    }, {
      startDate: new Date('2018-06-25 08:00'),
      endDate: new Date('2018-06-25 08:30'),
      groupingInfo: [{ fieldName: 'test', id: 2 }],
    }, {
      startDate: new Date('2018-06-26 08:00'),
      endDate: new Date('2018-06-26 08:30'),
      groupingInfo: [{ fieldName: 'test', id: 2 }],
    }], [{
      startDate: new Date('2018-06-24 08:30'),
      endDate: new Date('2018-06-24 09:00'),
      groupingInfo: [{ fieldName: 'test', id: 2 }],
    }, {
      startDate: new Date('2018-06-25 08:30'),
      endDate: new Date('2018-06-25 09:00'),
      groupingInfo: [{ fieldName: 'test', id: 2 }],
    }, {
      startDate: new Date('2018-06-26 08:30'),
      endDate: new Date('2018-06-26 09:00'),
      groupingInfo: [{ fieldName: 'test', id: 2 }],
    }]];

    describe('#getWeekVerticallyGroupedColumnIndex', () => {
      it('should return column index', () => {
        expect(getWeekVerticallyGroupedColumnIndex(verticallyGroupedViewCells, '2018-06-25 08:10'))
          .toBe(1);
      });
    });

    describe('#getWeekHorizontallyGroupedColumnIndex', () => {
      it('should return column index', () => {
        expect(getWeekHorizontallyGroupedColumnIndex(
          horizontallyGroupedViewCells, firstTestAppointment, '2018-06-25 08:10',
        ))
          .toBe(1);
        expect(getWeekHorizontallyGroupedColumnIndex(
          horizontallyGroupedViewCells, secondTestAppointment, '2018-06-25 08:10',
        ))
          .toBe(4);
      });
    });

    describe('#getWeekVerticallyGroupedRowIndex', () => {
      it('should return row index', () => {
        expect(getWeekVerticallyGroupedRowIndex(
          verticallyGroupedViewCells, firstTestAppointment, '2018-06-25 08:40', 1, false, 2,
        ))
          .toBe(1);
        expect(getWeekVerticallyGroupedRowIndex(
          verticallyGroupedViewCells, secondTestAppointment, '2018-06-25 08:40', 1, false, 2,
        ))
          .toBe(3);
      });

      it('should work with takePrev', () => {
        expect(getWeekVerticallyGroupedRowIndex(
          verticallyGroupedViewCells, firstTestAppointment, '2018-06-25 08:30', 1, false, 2,
        ))
          .toBe(1);
        expect(getWeekVerticallyGroupedRowIndex(
          verticallyGroupedViewCells, firstTestAppointment, '2018-06-25 08:30', 1, true, 2,
        ))
          .toBe(0);
      });
    });

    describe('#getWeekHorizontallyGroupedRowIndex', () => {
      it('should return row index', () => {
        expect(getWeekHorizontallyGroupedRowIndex(
          horizontallyGroupedViewCells, '2018-06-25 08:40', 1, false,
        ))
          .toBe(1);
      });

      it('should work with takePrev', () => {
        expect(getWeekHorizontallyGroupedRowIndex(
          horizontallyGroupedViewCells, '2018-06-25 08:30', 1, false,
        ))
          .toBe(1);
        expect(getWeekHorizontallyGroupedRowIndex(
          horizontallyGroupedViewCells, '2018-06-25 08:30', 1, true,
        ))
          .toBe(0);
      });
    });
  });
});
