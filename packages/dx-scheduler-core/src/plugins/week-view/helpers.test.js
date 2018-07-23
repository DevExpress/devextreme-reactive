import moment from 'moment';
import {
  calculateFirstDateOfWeek,
  findOverlappedAppointments,
  sliceAppointmentByDay,
  adjustAppointments,
  dayBoundaryPredicate,
  getCellByDate,
  getRectByDates,
  unwrapGroups,
  reduceAppointmentByDayBounds,
} from './helpers';

describe('Week view helpers', () => {
  describe('#calculateFirstDateOfWeek', () => {
    it('should calculate first daye of week', () => {
      const firstDateOfWeek = calculateFirstDateOfWeek('2018-07-06', 3);
      expect(firstDateOfWeek.toString())
        .toBe(new Date(2018, 6, 4).toString());
    });

    it('should calculate first date of week depend on excluded days', () => {
      const firstDateOfWeek = calculateFirstDateOfWeek('2018-07-06', 2, [3, 2, 1]);
      expect(firstDateOfWeek.toString())
        .toBe(new Date(2018, 6, 5).toString());
    });
  });

  describe('Rect calculation helper', () => {
    const appointments = [
      { start: moment('2018-07-02 10:00'), end: moment('2018-07-02 11:00') },
      { start: moment('2018-07-02 10:30'), end: moment('2018-07-02 12:00') },
      { start: moment('2018-07-01 10:00'), end: moment('2018-07-01 13:00') },
      { start: moment('2018-07-01 11:30'), end: moment('2018-07-01 12:00') },
      { start: moment('2018-07-01 10:00'), end: moment('2018-07-01 11:00') },
      { start: moment('2018-07-02 10:40'), end: moment('2018-07-02 13:00') },
      { start: moment('2018-07-03 11:00'), end: moment('2018-07-03 15:00') },
    ];
    const sortedAppointments = [
      appointments[2], appointments[4], appointments[3],
      appointments[0], appointments[1], appointments[5], appointments[6],
    ];
    const overlappedAppointments = [
      [appointments[2], appointments[4], appointments[3]],
      [appointments[0], appointments[1], appointments[5]],
      [appointments[6]],
    ];

    describe('#findOverlappedAppointments', () => {
      it('should detect overlapped appointments', () => {
        expect(findOverlappedAppointments(sortedAppointments))
          .toEqual(overlappedAppointments);
      });
    });

    describe('#adjustAppointments', () => {
      it('should calculate appointment offset and reduce coefficient', () => {
        expect(adjustAppointments(overlappedAppointments))
          .toEqual([
            {
              items: [
                { ...appointments[2], offset: 0 },
                { ...appointments[4], offset: 1 },
                { ...appointments[3], offset: 1 },
              ],
              reduceValue: 2,
            },
            {
              items: [
                { ...appointments[0], offset: 0 },
                { ...appointments[1], offset: 1 },
                { ...appointments[5], offset: 2 },
              ],
              reduceValue: 3,
            },
            {
              items: [
                { ...appointments[6], offset: 0 },
              ],
              reduceValue: 1,
            },
          ]);
      });
    });

    describe('#unwrapGroups', () => {
      it('should calculate appointment offset and reduce coefficient', () => {
        const appointmentsGroups = [
          {
            reduceValue: 1,
            items: [
              {
                start: moment('2017-07-20 08:00'),
                end: moment('2017-07-20 08:30'),
                dataItem: {},
                offset: 1,
              },
              {
                start: moment('2017-07-20 08:30'),
                end: moment('2017-07-20 09:00'),
                dataItem: {},
                offset: 2,
              },
            ],
          },
          {
            reduceValue: 2,
            items: [
              {
                start: moment('2017-04-20 08:00'),
                end: moment('2017-04-22 08:30'),
                dataItem: {},
                offset: 0,
              },
              {
                start: moment('2017-05-25 08:00'),
                end: moment('2017-05-25 09:15'),
                dataItem: {},
                offset: 1,
              },
            ],
          },
        ];
        expect(unwrapGroups(appointmentsGroups))
          .toEqual([
            {
              ...appointmentsGroups[0].items[0],
              reduceValue: 1,
            },
            {
              ...appointmentsGroups[0].items[1],
              reduceValue: 1,
            },
            {
              ...appointmentsGroups[1].items[0],
              reduceValue: 2,
            },
            {
              ...appointmentsGroups[1].items[1],
              reduceValue: 2,
            },
          ]);
      });
    });

    describe('#getCellByDate', () => {
      it('should calculate cell index and start date', () => {
        const times = [
          { start: new Date(2017, 6, 20, 8, 0), end: new Date(2017, 6, 20, 8, 30) },
          { start: new Date(2017, 6, 20, 8, 30), end: new Date(2017, 6, 20, 9, 0) },
          { start: new Date(2017, 6, 20, 9, 0), end: new Date(2017, 6, 20, 9, 30) },
        ];
        const days = [new Date(2018, 5, 24), new Date(2018, 5, 25), new Date(2018, 5, 26)];
        const { index, startDate } = getCellByDate(days, times, new Date(2018, 5, 25, 8, 30));
        expect(index)
          .toBe(4);
        expect(startDate.toString())
          .toBe(new Date(2018, 5, 25, 8, 30).toString());
      });

      it('should calculate cell index by takePref property', () => {
        const times = [
          { start: new Date(2017, 6, 20, 8, 0), end: new Date(2017, 6, 20, 8, 30) },
          { start: new Date(2017, 6, 20, 8, 30), end: new Date(2017, 6, 20, 9, 0) },
        ];
        const takePrev = true;
        const days = [new Date(2018, 5, 26)];
        expect(getCellByDate(days, times, new Date(2018, 5, 26, 8, 30), takePrev).index)
          .toBe(0);
        expect(getCellByDate(days, times, new Date(2018, 5, 26, 8, 30)).index)
          .toBe(1);
      });
    });

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
          '2018-04-26 12:00',
          '2018-04-29 18:00',
        )).toBeTruthy();
      });

      it('should take appointment that starts before left bound and ends after right bound', () => {
        expect(dayBoundaryPredicate(
          { start: moment('2018-06-24 09:00'), end: moment('2018-06-24 18:00') },
          '2018-04-22 12:00',
          '2018-07-26 15:00',
        )).toBeTruthy();
      });
    });

    describe('#getRectByDates', () => {
      const offsetParent = {
        getBoundingClientRect: () => ({
          top: 10, left: 10, width: 250,
        }),
      };
      const cellElements = [{}, {}, {}, {}, {
        getBoundingClientRect: () => ({
          top: 10, left: 20, width: 100, height: 100,
        }),
        offsetParent,
      }, {}, {}, {
        getBoundingClientRect: () => ({
          top: 110, left: 20, width: 100, height: 100,
        }),
        offsetParent,
      }];

      it('should calculate geometry by dates', () => {
        const times = [
          { start: new Date(2017, 6, 20, 8, 0), end: new Date(2017, 6, 20, 8, 30) },
          { start: new Date(2017, 6, 20, 8, 30), end: new Date(2017, 6, 20, 9, 0) },
          { start: new Date(2017, 6, 20, 9, 0), end: new Date(2017, 6, 20, 9, 30) },
          { start: new Date(2017, 6, 20, 9, 30), end: new Date(2017, 6, 20, 10, 0) },
        ];
        const days = [new Date(2018, 5, 24), new Date(2018, 5, 25), new Date(2018, 5, 26)];
        const cellDuration = 30;
        const startDate = new Date(2018, 5, 25, 8, 45);
        const endDate = new Date(2018, 5, 25, 9, 15);
        const {
          top, left, height, width, parentWidth,
        } = getRectByDates(
          startDate,
          endDate,
          days,
          times,
          cellDuration,
          cellElements,
        );

        expect(top).toBe(50);
        expect(left).toBe(10);
        expect(height).toBe(100);
        expect(width).toBe(85);
        expect(parentWidth).toBe(250);
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
  });
});
