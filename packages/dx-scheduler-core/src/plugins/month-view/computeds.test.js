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
  });
});
