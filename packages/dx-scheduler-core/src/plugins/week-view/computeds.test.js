import {
  timeScale,
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
});
