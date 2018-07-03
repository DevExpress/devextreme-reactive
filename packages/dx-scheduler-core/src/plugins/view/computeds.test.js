import { getCellByDate } from './helpers';
import {
  timeScale,
  dayScale,
  startViewDate,
  endViewDate,
  getRectByDates,
} from './computeds';

jest.mock('./helpers', () => ({
  getCellByDate: jest.fn(),
}));

describe('View computeds', () => {
  describe('#timeScale', () => {
    const startDate = new Date(2018, 5, 25);
    it('should use startDate date for all calculations', () => {
      const units = timeScale(0, 1, 30, startDate);
      expect(units[0].start.toString()).toBe(startDate.toString());
    });
    it('should return time units', () => {
      const units = timeScale(0, 24, 30, startDate);
      expect(units).toHaveLength(48);
      expect(units[0].start.getHours()).toBe(0);
      expect(units[0].start.getMinutes()).toBe(0);
      expect(units[0].end.getHours()).toBe(0);
      expect(units[0].end.getMinutes()).toBe(30);

      expect(units[47].start.getHours()).toBe(23);
      expect(units[47].start.getMinutes()).toBe(30);
      expect(units[47].end.getHours()).toBe(0);
      expect(units[47].end.getMinutes()).toBe(0);
    });

    it('should return time units depend on start/end day hours', () => {
      const units = timeScale(10, 11, 30, startDate);
      expect(units[0].start.getHours()).toBe(10);
      expect(units[0].start.getMinutes()).toBe(0);
      expect(units[0].end.getHours()).toBe(10);
      expect(units[0].end.getMinutes()).toBe(30);

      expect(units[1].start.getHours()).toBe(10);
      expect(units[1].start.getMinutes()).toBe(30);
      expect(units[1].end.getHours()).toBe(11);
      expect(units[1].end.getMinutes()).toBe(0);
    });

    it('should return time units depend on cell duration', () => {
      const units = timeScale(10, 11, 20, startDate);
      expect(units[0].start.getHours()).toBe(10);
      expect(units[0].start.getMinutes()).toBe(0);
      expect(units[0].end.getHours()).toBe(10);
      expect(units[0].end.getMinutes()).toBe(20);

      expect(units[1].start.getHours()).toBe(10);
      expect(units[1].start.getMinutes()).toBe(20);
      expect(units[1].end.getHours()).toBe(10);
      expect(units[1].end.getMinutes()).toBe(40);
    });
  });

  describe('#dayScale', () => {
    const currentDate = new Date(2018, 5, 24);
    it('should return default day units', () => {
      const units = dayScale();
      expect(units).toHaveLength(7);
    });

    it('should return day units depend on first day of week', () => {
      let units = dayScale(currentDate, 1);

      expect(units[0].toString()).toBe(new Date(2018, 5, 25).toString());
      expect(units[6].toString()).toBe(new Date(2018, 6, 1).toString());

      units = dayScale(currentDate, 3);

      expect(units[0].toString()).toBe(new Date(2018, 5, 27).toString());
      expect(units[6].toString()).toBe(new Date(2018, 6, 3).toString());
    });

    it('should return day units depend on day count', () => {
      let units = dayScale(currentDate, 0, 5);

      expect(units[0].toString()).toBe(currentDate.toString());
      expect(units[units.length - 1].toString()).toBe(new Date(2018, 5, 28).toString());

      units = dayScale(currentDate, 0, 14);

      expect(units[0].toString()).toBe(currentDate.toString());
      expect(units[units.length - 1].toString()).toBe(new Date(2018, 6, 7).toString());
    });

    it('can exclude days', () => {
      const units = dayScale(currentDate, 0, 7, [0, 6]);

      expect(units).toHaveLength(5);
      expect(units[0].toString()).toBe(new Date(2018, 5, 25).toString());
      expect(units[units.length - 1].toString()).toBe(new Date(2018, 5, 29).toString());
    });

    it('can excluded days depend on day count', () => {
      const units = dayScale(currentDate, 0, 5, [1, 3]);

      expect(units).toHaveLength(3);
      expect(units[0].toString()).toBe(currentDate.toString());
      expect(units[units.length - 1].toString()).toBe(new Date(2018, 5, 28).toString());
    });
  });

  describe('#startViewDate', () => {
    it('should return start date', () => {
      const startDate = startViewDate(
        [new Date(2018, 5, 24)],
        [
          { start: new Date(2017, 6, 20, 8, 0), end: new Date(2017, 6, 20, 10, 30) },
          { start: new Date(2017, 6, 20, 12, 0), end: new Date(2017, 6, 20, 12, 33) },
        ],
      );
      expect(startDate.toString()).toBe(new Date(2018, 5, 24, 8, 0).toString());
    });
  });

  describe('#endViewDate', () => {
    it('should return end date', () => {
      const endDate = endViewDate(
        [new Date(2018, 5, 24)],
        [
          { start: new Date(2017, 6, 20, 8, 0), end: new Date(2017, 6, 20, 10, 30) },
          { start: new Date(2017, 6, 20, 12, 0), end: new Date(2017, 6, 20, 12, 33) },
        ],
      );
      expect(endDate.toString()).toBe(new Date(2018, 5, 24, 12, 33).toString());
    });
  });

  describe('#getRectByDates', () => {
    beforeEach(() => {
      getCellByDate
        .mockImplementationOnce(() => ({ index: 0, startDate: new Date(2018, 5, 25, 8, 30) }))
        .mockImplementationOnce(() => ({ index: 1, startDate: new Date(2018, 5, 25, 9) }));
    });
    afterEach(() => {
      jest.clearAllMocks();
    });
    const offsetParent = {
      getBoundingClientRect: () => ({
        top: 10, left: 10,
      }),
    };
    const cellElements = [{
      getBoundingClientRect: () => ({
        top: 10, left: 20, width: 100, height: 100,
      }),
      offsetParent,
    }, {
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
        top, left, height, width,
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
    });
  });
});
