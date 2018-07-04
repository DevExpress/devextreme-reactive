import moment from 'moment';
import {
  sortAppointments,
  findOverlappedAppointments,
  adjustAppointments,
  filterAppointmentsByBoundary,
  cutDayAppointments,
  getCellByDate,
  predicate,
  removeAllDayAppointments,
} from './helpers';

describe('Appointments helper', () => {
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

  describe('Helpers', () => {
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
  });


  describe('#filterAppointmentsByBoundary', () => {
    it('should remove appointment if it is excluded day', () => {
      const dayAppointments = [
        { start: new Date(2018, 5, 24, 10), end: new Date(2018, 5, 24, 11), dataItem: {} },
      ];
      const startViewDate = new Date(2018, 5, 24, 9);
      const endViewDate = new Date(2018, 5, 24, 18);
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
        { start: new Date(2018, 5, 24, 10), end: new Date(2018, 5, 24, 11), dataItem: {} },
      ];
      const startViewDate = new Date(2018, 5, 24, 11);
      const endViewDate = new Date(2018, 5, 24, 18);
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
        { start: new Date(2018, 5, 24, 12), end: new Date(2018, 5, 24, 15), dataItem: {} },
      ];
      const startViewDate = new Date(2018, 5, 24, 11);
      const endViewDate = new Date(2018, 5, 24, 12);
      const excludedDays = [];
      expect(filterAppointmentsByBoundary(
        dayAppointments,
        startViewDate,
        endViewDate,
        excludedDays,
      )).toEqual([]);
    });

    it('should remove appointment if it `start` between `startViewDate` and `endViewDate`', () => {
      const dayAppointments = [
        { start: new Date(2018, 5, 24, 12), end: new Date(2018, 5, 24, 18), dataItem: {} },
      ];
      const startViewDate = new Date(2018, 5, 24, 12);
      const endViewDate = new Date(2018, 5, 24, 15);
      const excludedDays = [];
      expect(filterAppointmentsByBoundary(
        dayAppointments,
        startViewDate,
        endViewDate,
        excludedDays,
      )).toEqual([
        { start: new Date(2018, 5, 24, 12), end: new Date(2018, 5, 24, 18), dataItem: {} },
      ]);
    });

    it('should remove appointment if it `end` between `startViewDate` and `endViewDate`', () => {
      const dayAppointments = [
        { start: new Date(2018, 5, 24, 9), end: new Date(2018, 5, 24, 15), dataItem: {} },
      ];
      const startViewDate = new Date(2018, 5, 24, 12);
      const endViewDate = new Date(2018, 5, 24, 18);
      const excludedDays = [];
      expect(filterAppointmentsByBoundary(
        dayAppointments,
        startViewDate,
        endViewDate,
        excludedDays,
      )).toEqual([
        { start: new Date(2018, 5, 24, 9), end: new Date(2018, 5, 24, 15), dataItem: {} },
      ]);
    });

    it('should remove appointment if it `start` before `startViewDate` and `end` after `endViewDate`', () => {
      const dayAppointments = [
        { start: new Date(2018, 5, 24, 9), end: new Date(2018, 5, 24, 18), dataItem: {} },
      ];
      const startViewDate = new Date(2018, 5, 24, 12);
      const endViewDate = new Date(2018, 5, 24, 15);
      const excludedDays = [];
      expect(filterAppointmentsByBoundary(
        dayAppointments,
        startViewDate,
        endViewDate,
        excludedDays,
      )).toEqual([
        { start: new Date(2018, 5, 24, 9), end: new Date(2018, 5, 24, 18), dataItem: {} },
      ]);
    });
  });

  describe('#cutDayAppointments', () => {
    it('should cut if appointment `start` before `startViewTime` and `end` before `endViewTime`', () => {
      const dayAppointments = [
        { start: new Date(2018, 5, 24, 9), end: new Date(2018, 5, 24, 15), dataItem: {} },
      ];
      const startViewDate = new Date(2018, 5, 24, 12);
      const endViewDate = new Date(2018, 5, 24, 15);

      expect(cutDayAppointments(dayAppointments, startViewDate, endViewDate))
        .toEqual([
          { start: new Date(2018, 5, 24, 12), end: new Date(2018, 5, 24, 15), dataItem: {} },
        ]);
    });

    it('should cut if appointment `start` after `startViewTime` and `end` before `endViewTime`', () => {
      const dayAppointments = [
        { start: new Date(2018, 5, 24, 12), end: new Date(2018, 5, 24, 15), dataItem: {} },
      ];
      const startViewDate = new Date(2018, 5, 24, 12);
      const endViewDate = new Date(2018, 5, 24, 15);

      expect(cutDayAppointments(dayAppointments, startViewDate, endViewDate))
        .toEqual([
          { start: new Date(2018, 5, 24, 12), end: new Date(2018, 5, 24, 15), dataItem: {} },
        ]);
    });

    it('should cut if appointment `start` after `startViewTime` and `end` after `endViewTime`', () => {
      const dayAppointments = [
        { start: new Date(2018, 5, 24, 12), end: new Date(2018, 5, 24, 18), dataItem: {} },
      ];
      const startViewDate = new Date(2018, 5, 24, 12);
      const endViewDate = new Date(2018, 5, 24, 15);

      expect(cutDayAppointments(dayAppointments, startViewDate, endViewDate))
        .toEqual([
          { start: new Date(2018, 5, 24, 12), end: new Date(2018, 5, 24, 15), dataItem: {} },
        ]);
    });

    it('should cut if appointment `start` after `startViewTime` and `end` after `endViewTime`', () => {
      const dayAppointments = [
        { start: new Date(2018, 5, 24, 10), end: new Date(2018, 5, 24, 18), dataItem: {} },
      ];
      const startViewDate = new Date(2018, 5, 24, 12);
      const endViewDate = new Date(2018, 5, 24, 15);

      expect(cutDayAppointments(dayAppointments, startViewDate, endViewDate))
        .toEqual([
          { start: new Date(2018, 5, 24, 12), end: new Date(2018, 5, 24, 15), dataItem: {} },
        ]);
    });
  });

  describe('#predicate', () => {
    it('should filter appointments from excluded days', () => {
      const boundary = { left: new Date(2018, 6, 2), right: new Date(2018, 6, 8, 23, 59) };
      const excludedDays = [4, 6, 0];
      const items = [
        { start: moment(new Date(2018, 6, 3, 9)), end: moment(new Date(2018, 6, 3, 11)), v: true },
        { start: moment(new Date(2018, 6, 4, 9)), end: moment(new Date(2018, 6, 5, 11)), v: true },
        { start: moment(new Date(2018, 6, 5, 9)), end: moment(new Date(2018, 6, 5, 11)), v: false },
        { start: moment(new Date(2018, 6, 5, 9)), end: moment(new Date(2018, 6, 6, 11)), v: true },
        { start: moment(new Date(2018, 6, 7, 9)), end: moment(new Date(2018, 6, 7, 9)), v: false },
        { start: moment(new Date(2018, 6, 7, 9)), end: moment(new Date(2018, 6, 8, 10)), v: false },
        { start: moment(new Date(2018, 6, 5, 9)), end: moment(new Date(2018, 6, 7, 10)), v: true },
      ];

      items.forEach((item) => {
        expect(predicate(item.start, item.end, boundary, excludedDays))
          .toBe(item.v);
      });
    });
  });

  describe('#removeAllDayAppointments', () => {
    it('should remove all day appointments', () => {
      const items = [
        { start: moment(new Date(2018, 6, 3, 9)), end: moment(new Date(2018, 6, 3, 11)) },
        { start: moment(new Date(2018, 6, 4, 9)), end: moment(new Date(2018, 6, 5, 11)) },
        { start: moment(new Date(2018, 6, 5)), end: moment(new Date(2018, 6, 5, 23, 59)) },
        { start: moment(new Date(2018, 6, 5, 9)), end: moment(new Date(2018, 6, 6, 8, 59)) },
      ];

      expect(removeAllDayAppointments(items))
        .toEqual([
          { start: moment(new Date(2018, 6, 3, 9)), end: moment(new Date(2018, 6, 3, 11)) },
          { start: moment(new Date(2018, 6, 5)), end: moment(new Date(2018, 6, 5, 23, 59)) },
          { start: moment(new Date(2018, 6, 5, 9)), end: moment(new Date(2018, 6, 6, 8, 59)) },
        ]);
    });
  });
});
