import { getCellByDate } from './helpers';

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
  });
});
