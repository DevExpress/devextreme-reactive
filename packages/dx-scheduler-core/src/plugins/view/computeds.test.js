import { timeUnits, dayUnits } from './computeds';

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
    it('should return default day units', () => {
      const units = dayUnits();
      expect(units).toHaveLength(7);
    });

    it('should return day units depend on first day of week', () => {
      let units = dayUnits(new Date(), 1);

      expect(new Date(units[0]).getDay()).toBe(1);
      expect(new Date(units[6]).getDay()).toBe(0);

      units = dayUnits(new Date(), 3);

      expect(new Date(units[0]).getDay()).toBe(3);
      expect(new Date(units[6]).getDay()).toBe(2);
    });

    it('should return day units depend on day count', () => {
      let units = dayUnits(new Date(), 0, 5);

      expect(new Date(units[0]).getDay()).toBe(0);
      expect(new Date(units[units.length - 1]).getDay()).toBe(4);

      units = dayUnits(new Date(), 0, 14);

      expect(new Date(units[0]).getDay()).toBe(0);
      expect(new Date(units[units.length - 1]).getDay()).toBe(6);
    });

    it('should return day units depend on standard weekends', () => {
      const units = dayUnits(new Date(), 0, 7, [0, 6]);

      expect(units).toHaveLength(5);
      expect(new Date(units[0]).getDay()).toBe(1);
      expect(new Date(units[units.length - 1]).getDay()).toBe(5);
    });

    it('should return day units depend on weekends and day count', () => {
      const units = dayUnits(new Date(), 0, 5, [1, 3]);

      expect(units).toHaveLength(3);
      expect(new Date(units[0]).getDay()).toBe(0);
      expect(new Date(units[units.length - 1]).getDay()).toBe(4);
    });
  });
});
