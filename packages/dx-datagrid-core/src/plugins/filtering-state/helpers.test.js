import {
    getColumnFilterValue,
} from './helpers';

describe('FilteringPlugin helpers', () => {
  describe('#getColumnFilterValue', () => {
    test('returns an empty string if no filters specified', () => {
      const filters = [];

      const value = getColumnFilterValue(filters, 'test');
      expect(value).toBe('');
    });

    test('returns a filter value by column name', () => {
      const filters = [{ column: 'a', value: 'test' }];

      const value = getColumnFilterValue(filters, 'a');
      expect(value).toBe('test');
    });
  });
});
