import { timeUnits } from './computeds';

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
});
