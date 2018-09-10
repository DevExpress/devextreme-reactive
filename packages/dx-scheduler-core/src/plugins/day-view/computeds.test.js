import {
  calculateDayViewDateIntervals,
  calculateViewBoundary,
} from './computeds';

describe('DayView computeds', () => {
  describe('#calculateDayViewDateIntervals', () => {
    const leftBound = new Date('10-09-2018 10:00');
    const rightBound = new Date('10-09-2018 17:00');
    it('should not slice appointment', () => {
      const appointments = [
        { start: new Date('10-09-2018 10:00'), end: new Date('10-09-2018 17:00'), data: {} },
      ];

      const intervals = calculateDayViewDateIntervals(appointments, leftBound, rightBound);
      expect(intervals)
        .toHaveLength(1);
      expect(intervals[0].start.toDate())
        .toEqual(new Date('10-09-2018 10:00'));
      expect(intervals[0].end.toDate())
        .toEqual(new Date('10-09-2018 17:00'));
      expect(intervals[0].data)
        .toEqual(appointments[0].data);
    });

    it('should slice appointment from left boundary', () => {
      const appointments = [
        { start: new Date('10-09-2018 8:00'), end: new Date('10-09-2018 17:00') },
      ];

      const intervals = calculateDayViewDateIntervals(appointments, leftBound, rightBound);
      expect(intervals)
        .toHaveLength(1);

      expect(intervals[0].start.toDate())
        .toEqual(new Date('10-09-2018 10:00'));
      expect(intervals[0].end.toDate())
        .toEqual(new Date('10-09-2018 17:00'));
    });

    it('should slice appointment from right boundary', () => {
      const appointments = [
        { start: new Date('10-09-2018 8:00'), end: new Date('10-09-2018 17:00') },
      ];

      const intervals = calculateDayViewDateIntervals(appointments, leftBound, rightBound);
      expect(intervals)
        .toHaveLength(1);

      expect(intervals[0].start.toDate())
        .toEqual(new Date('10-09-2018 10:00'));
      expect(intervals[0].end.toDate())
        .toEqual(new Date('10-09-2018 17:00'));
    });
  });
  describe('#calculateViewBoundary', () => {
    it('should work', () => {
      const currentDate = new Date('2018-09-10 10:30');
      const boundaryDayHour = 20;

      expect(calculateViewBoundary(currentDate, boundaryDayHour))
        .toEqual(new Date('2018-09-10 20:00'));
    });
  });
});
