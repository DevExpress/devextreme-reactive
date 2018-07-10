import { calculateFirstDateOfWeek } from './helpers';

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
});
