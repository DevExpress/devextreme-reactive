import { timeUnits, dayUnits, startViewDate, endViewDate } from './computeds';

describe('View computeds', () => {
  describe('#timeUnits', () => {
    it('should return time units', () => {
      const units = timeUnits();
      expect(units).toHaveLength(48);
      expect(units[0]).toEqual([[0, 0], [0, 30]]);
      expect(units[47]).toEqual([[23, 30], [0, 0]]);
    });

    it('should return time units depend on start/end day hours', () => {
      const units = timeUnits(10, 11);
      expect(units).toEqual([
        [[10, 0], [10, 30]],
        [[10, 30], [11, 0]],
      ]);
    });

    it('should return time units depend on cell duration', () => {
      const units = timeUnits(10, 11, 20);
      expect(units).toEqual([
        [[10, 0], [10, 20]],
        [[10, 20], [10, 40]],
        [[10, 40], [11, 0]],
      ]);
    });
  });

  describe('#dayUnits', () => {
    const currentDate = new Date(2018, 5, 24);
    it('should return default day units', () => {
      const units = dayUnits();
      expect(units).toHaveLength(7);
    });

    it('should return day units depend on first day of week', () => {
      let units = dayUnits(currentDate, 1);

      expect(units[0].toString()).toBe(new Date(2018, 5, 25).toString());
      expect(units[6].toString()).toBe(new Date(2018, 6, 1).toString());

      units = dayUnits(currentDate, 3);

      expect(units[0].toString()).toBe(new Date(2018, 5, 27).toString());
      expect(units[6].toString()).toBe(new Date(2018, 6, 3).toString());
    });

    it('should return day units depend on day count', () => {
      let units = dayUnits(currentDate, 0, 5);

      expect(units[0].toString()).toBe(currentDate.toString());
      expect(units[units.length - 1].toString()).toBe(new Date(2018, 5, 28).toString());

      units = dayUnits(currentDate, 0, 14);

      expect(units[0].toString()).toBe(currentDate.toString());
      expect(units[units.length - 1].toString()).toBe(new Date(2018, 6, 7).toString());
    });

    it('should return day units depend on standard weekends', () => {
      const units = dayUnits(currentDate, 0, 7, [0, 6]);

      expect(units).toHaveLength(5);
      expect(units[0].toString()).toBe(new Date(2018, 5, 25).toString());
      expect(units[units.length - 1].toString()).toBe(new Date(2018, 5, 29).toString());
    });

    it('should return day units depend on weekends and day count', () => {
      const units = dayUnits(currentDate, 0, 5, [1, 3]);

      expect(units).toHaveLength(3);
      expect(units[0].toString()).toBe(currentDate.toString());
      expect(units[units.length - 1].toString()).toBe(new Date(2018, 5, 28).toString());
    });
  });

  describe('#startViewDate', () => {
    it('should return start date', () => {
      const startDate = startViewDate([new Date(2018, 5, 24)], [[[8, 0], [8, 30]], [[12, 0], [12, 33]]]);
      expect(startDate.toString()).toBe(new Date(2018, 5, 24, 8, 0).toString());
    });
  });

  describe('#endViewDate', () => {
    it('should return end date', () => {
      const endDate = endViewDate(
        [new Date(2018, 5, 24), new Date(2018, 6, 25)],
        [[[8, 0], [8, 30]], [[12, 0], [12, 33]]],
      );
      expect(endDate.toString()).toBe(new Date(2018, 6, 25, 12, 33).toString());
    });
  });
});
