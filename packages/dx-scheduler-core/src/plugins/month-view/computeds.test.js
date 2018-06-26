import { cells } from './computeds';

describe('Month view computeds', () => {
  describe('#cells', () => {
    it('should work', () => {
      const result = cells(new Date(2018, 5, 25), 1);

      expect(result).toHaveLength(6);
      result.forEach(row => expect(row).toHaveLength(7));
      expect(result[0][0].toString()).toBe(new Date(2018, 4, 28).toString());
      expect(result[5][6].toString()).toBe(new Date(2018, 6, 8).toString());
    });

    it('should add a full week from previous month', () => {
      const result = cells(new Date(2010, 1, 1), 1);

      expect(result[0][0].toString()).toBe(new Date(2010, 0, 25).toString());
      expect(result[5][6].toString()).toBe(new Date(2010, 2, 7).toString());
    });

    it('should work with a custom first day of week', () => {
      const result = cells(new Date(2010, 1, 1), 3);

      expect(result[0][0].toString()).toBe(new Date(2010, 0, 27).toString());
      expect(result[5][6].toString()).toBe(new Date(2010, 2, 9).toString());
    });
  });
});
