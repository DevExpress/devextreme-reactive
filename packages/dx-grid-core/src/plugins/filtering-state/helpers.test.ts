import { getColumnFilterConfig } from './helpers';

describe('FilteringPlugin helpers', () => {
  describe('#getColumnFilterConfig', () => {
    it('returns null if no filters specified', () => {
      const filters = [];

      const value = getColumnFilterConfig(filters, 'test');
      expect(value).toBe(null);
    });

    it('returns a filter value by column name', () => {
      const filters = [{ columnName: 'a', value: 'test' }];

      const value = getColumnFilterConfig(filters, 'a');
      expect(value).toEqual({ columnName: 'a', value: 'test' });
    });
  });
});
