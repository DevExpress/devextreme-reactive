import {
  timeScale,
  dayScale,
  startViewDate,
  endViewDate,
} from './computeds';

describe('View computeds', () => {
  describe('#timeScale', () => {
    const currentDate = new Date(2018, 5, 28);
    const firstDateOfWeek = new Date(2018, 5, 25);
    const format = date => `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    it('should start calculation from start view date', () => {
      const units = timeScale(currentDate, 1, 0, 1, 30);
      expect(format(units[0].start))
        .toEqual(format(firstDateOfWeek));
    });
    it('should return time units', () => {
      const units = timeScale(currentDate, 1, 0, 24, 30);
      expect(units).toHaveLength(48);
      expect(units[0].start.getHours()).toBe(0);
      expect(units[0].start.getMinutes()).toBe(0);
      expect(units[0].end.getHours()).toBe(0);
      expect(units[0].end.getMinutes()).toBe(30);

      expect(units[47].start.getHours()).toBe(23);
      expect(units[47].start.getMinutes()).toBe(30);
      expect(units[47].end.getHours()).toBe(23);
      expect(units[47].end.getMinutes()).toBe(59);
    });

    it('should return time units depend on start/end day hours', () => {
      const units = timeScale(currentDate, 1, 10, 11, 30);
      expect(units[0].start.getHours()).toBe(10);
      expect(units[0].start.getMinutes()).toBe(0);
      expect(units[0].end.getHours()).toBe(10);
      expect(units[0].end.getMinutes()).toBe(30);

      expect(units[1].start.getHours()).toBe(10);
      expect(units[1].start.getMinutes()).toBe(30);
      expect(units[1].end.getHours()).toBe(10);
      expect(units[1].end.getMinutes()).toBe(59);
    });

    it('should return time units depend on cell duration', () => {
      const units = timeScale(currentDate, 1, 10, 11, 20);
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

      expect(units[0]).toEqual(new Date(2018, 5, 25));
      expect(units[6]).toEqual(new Date(2018, 6, 1));

      units = dayScale(currentDate, 3);

      expect(units[0]).toEqual(new Date(2018, 5, 27));
      expect(units[6]).toEqual(new Date(2018, 6, 3));
    });

    it('should return day units depend on day count', () => {
      let units = dayScale(currentDate, 0, 5);

      expect(units[0]).toEqual(currentDate);
      expect(units[units.length - 1]).toEqual(new Date(2018, 5, 28));

      units = dayScale(currentDate, 0, 14);

      expect(units[0]).toEqual(currentDate);
      expect(units[units.length - 1]).toEqual(new Date(2018, 6, 7));
    });

    it('can exclude days', () => {
      const units = dayScale(currentDate, 0, 7, [0, 6]);

      expect(units).toHaveLength(5);
      expect(units[0]).toEqual(new Date(2018, 5, 25));
      expect(units[units.length - 1]).toEqual(new Date(2018, 5, 29));
    });

    it('can excluded days depend on day count', () => {
      const units = dayScale(currentDate, 0, 5, [1, 3]);

      expect(units).toHaveLength(3);
      expect(units[0]).toEqual(currentDate);
      expect(units[units.length - 1]).toEqual(new Date(2018, 5, 28));
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
      expect(startDate).toEqual(new Date(2018, 5, 24, 8, 0));
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
      expect(endDate).toEqual(new Date(2018, 5, 24, 12, 32, 59));
    });
  });
});
