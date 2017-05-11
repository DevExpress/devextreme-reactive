import {
    getColumnSortingDirection,
} from './helpers';

describe('SortingState helpers', () => {
  describe('#getColumnSortingDirection', () => {
    test('returns sorting direction', () => {
      const sorting = [{ column: 'test', direction: 'testDirection' }];

      const direction = getColumnSortingDirection(sorting, 'test');
      expect(direction).toBe('testDirection');
    });

    test('returns null if a column is not sorted', () => {
      const sorting = [];

      const direction = getColumnSortingDirection(sorting, 'test');
      expect(direction).toBe(null);
    });
  });
});
