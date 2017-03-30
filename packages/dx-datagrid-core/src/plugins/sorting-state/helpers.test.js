import {
    getColumnSortingDirection,
} from './helpers';

describe('SortingState helpers', () => {
  describe('#getColumnSortingDirection', () => {
    test('returns sorting direction', () => {
      const sortings = [{ column: 'test', direction: 'testDirection' }];

      const direction = getColumnSortingDirection(sortings, 'test');
      expect(direction).toBe('testDirection');
    });

    test('returns false if a column is not sorted', () => {
      const sortings = [];

      const direction = getColumnSortingDirection(sortings, 'test');
      expect(direction).toBe(false);
    });
  });
});
