import moment from 'moment';
import {
  calculateFirstDateOfWeek,
  sortAppointments,
  findOverlappedAppointments,
  adjustAppointments,
  filterAppointmentsByBoundary,
  getCellByDate,
  predicate,
  unwrapGroups,
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
    describe('#sortAppointments', () => {
      it('should sort appointments', () => {
        expect(sortAppointments(appointments))
          .toEqual(sortedAppointments);
      });
    });

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

    describe('#predicate', () => {
      it('should filter outside appointments', () => {
        const boundary = { left: '2018-07-10 09:00', right: '2018-07-10 11:00' };
        const items = [
          { start: moment('2018-07-10 08:00'), end: moment('2018-07-10 10:00'), expected: true },
          { start: moment('2018-07-10 10:00'), end: moment('2018-07-10 12:00'), expected: true },
          { start: moment('2018-07-10 08:00'), end: moment('2018-07-10 12:00'), expected: true },
          { start: moment('2018-07-10 09:30'), end: moment('2018-07-10 10:30'), expected: true },
          { start: moment('2018-07-10 08:00'), end: moment('2018-07-10 09:00'), expected: false },
          { start: moment('2018-07-10 11:00'), end: moment('2018-07-10 12:00'), expected: false },
        ];

        items.forEach((item) => {
          expect(predicate(item.start, item.end, boundary))
            .toBe(item.expected);
        });
      });

      it('should filter appointments from excluded days', () => {
        const boundary = { left: '2018-07-02', right: '2018-07-08 23:59' };
        const excludedDays = [4, 6, 0];
        const items = [
          { start: moment('2018-07-03 09:00'), end: moment('2018-07-03 11:00'), expected: true },
          { start: moment('2018-07-04 09:00'), end: moment('2018-07-05 11:00'), expected: true },
          { start: moment('2018-07-05 09:00'), end: moment('2018-07-05 11:00'), expected: false },
          { start: moment('2018-07-05 09:00'), end: moment('2018-07-06 11:00'), expected: true },
          { start: moment('2018-07-07 09:00'), end: moment('2018-07-07 09:00'), expected: false },
          { start: moment('2018-07-07 09:00'), end: moment('2018-07-08 10:00'), expected: false },
          { start: moment('2018-07-05 09:00'), end: moment('2018-07-07 10:00'), expected: true },
        ];

        items.forEach((item) => {
          expect(predicate(item.start, item.end, boundary, excludedDays, false))
            .toBe(item.expected);
        });
      });

      it('should filter all-day appointments', () => {
        const boundary = { left: '2018-07-08', right: '2018-07-12' };
        const items = [
          { start: moment('2018-07-10 08:00'), end: moment('2018-07-10 10:00'), expected: true },
          { start: moment('2018-07-10 22:00'), end: moment('2018-07-11 02:00'), expected: true },
          { start: moment('2018-07-09 08:00'), end: moment('2018-07-10 08:00'), expected: false },
        ];

        items.forEach((item) => {
          expect(predicate(item.start, item.end, boundary, []))
            .toBe(item.expected);
        });
      });
    });

    describe('#filterAppointmentsByBoundary', () => {
      it('should remove appointment if it is excluded day', () => {
        const dayAppointments = [
          { start: moment('2018-06-24 10:00'), end: moment('2018-06-24 11:00'), dataItem: {} },
        ];
        const startViewDate = '2018-03-21 09:00';
        const endViewDate = '2019-06-27 18:00';
        const excludedDays = [0];
        expect(filterAppointmentsByBoundary(
          dayAppointments,
          startViewDate,
          endViewDate,
          excludedDays,
        )).toEqual([]);
      });

      it('should remove appointment if it `end` before `startViewDate`', () => {
        const dayAppointments = [
          { start: moment('2018-06-24 10:00'), end: moment('2018-06-24 11:00'), dataItem: {} },
        ];
        const startViewDate = '2018-03-21 11:00';
        const endViewDate = '2018-06-27 18:00';
        const excludedDays = [];
        expect(filterAppointmentsByBoundary(
          dayAppointments,
          startViewDate,
          endViewDate,
          excludedDays,
        )).toEqual([]);
      });

      it('should remove appointment if it `start` after `endViewDate`', () => {
        const dayAppointments = [
          { start: moment('2018-06-24 12:00'), end: moment('2018-06-24 15:00'), dataItem: {} },
        ];
        const startViewDate = '2018-03-22 11:00';
        const endViewDate = '2018-06-27 12:00';
        const excludedDays = [];
        expect(filterAppointmentsByBoundary(
          dayAppointments,
          startViewDate,
          endViewDate,
          excludedDays,
        )).toEqual([]);
      });

      it('should keep appointment if it `start` between `startViewDate` and `endViewDate`', () => {
        const dayAppointments = [
          { start: moment('2018-06-24 12:00'), end: moment('2018-06-24 18:00'), dataItem: {} },
        ];
        const startViewDate = '2018-04-22 12:00';
        const endViewDate = '2018-07-24 15:00';
        const excludedDays = [];
        expect(filterAppointmentsByBoundary(
          dayAppointments,
          startViewDate,
          endViewDate,
          excludedDays,
        )).toEqual([
          { start: moment('2018-06-24 12:00'), end: moment('2018-06-24 18:00'), dataItem: {} },
        ]);
      });

      it('should keep appointment if it `end` between `startViewDate` and `endViewDate`', () => {
        const dayAppointments = [
          { start: moment('2018-06-24 09:00'), end: moment('2018-06-24 15:00'), dataItem: {} },
        ];
        const startViewDate = '2018-04-26 12:00';
        const endViewDate = '2018-04-29 18:00';
        const excludedDays = [];
        expect(filterAppointmentsByBoundary(
          dayAppointments,
          startViewDate,
          endViewDate,
          excludedDays,
        )).toEqual([
          { start: moment('2018-06-24 09:00'), end: moment('2018-06-24 15:00'), dataItem: {} },
        ]);
      });

      it('should keep appointment if it `start` before `startViewDate` and `end` after `endViewDate`', () => {
        const dayAppointments = [
          { start: moment('2018-06-24 09:00'), end: moment('2018-06-24 18:00'), dataItem: {} },
        ];
        const startViewDate = '2018-04-22 12:00';
        const endViewDate = '2018-07-26 15:00';
        const excludedDays = [];
        expect(filterAppointmentsByBoundary(
          dayAppointments,
          startViewDate,
          endViewDate,
          excludedDays,
        )).toEqual([
          { start: moment('2018-06-24 09:00'), end: moment('2018-06-24 18:00'), dataItem: {} },
        ]);
      });
    });
  });
});
