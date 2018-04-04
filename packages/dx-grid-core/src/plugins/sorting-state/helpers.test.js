import {
  getColumnSortingDirection,
  getChangeColumnSorting,
} from './helpers';

describe('SortingState helpers', () => {
  describe('#getColumnSortingDirection', () => {
    it('returns sorting direction', () => {
      const sorting = [{ columnName: 'test', direction: 'testDirection' }];

      const direction = getColumnSortingDirection(sorting, 'test');
      expect(direction).toBe('testDirection');
    });

    it('returns null if a column is not sorted', () => {
      const sorting = [];

      const direction = getColumnSortingDirection(sorting, 'test');
      expect(direction).toBe(null);
    });
  });

  describe('#getChangeColumnSorting', () => {
    it('should not affect keepOther if persistent sorted columns are empty', () => {
      const reducer = jest.fn();
      const initialKeepOther = ['a'];
      const state = {};
      const changeColumnSorting = getChangeColumnSorting(reducer, []);
      changeColumnSorting(state, { keepOther: initialKeepOther });

      expect(reducer)
        .toBeCalledWith(state, { keepOther: initialKeepOther });
    });

    it('should return persistent sorted columns if keepOther is false', () => {
      const reducer = jest.fn();
      const state = {
        sorting: [
          { columnName: 'a' },
          { columnName: 'b' },
        ],
      };
      const changeColumnSorting = getChangeColumnSorting(reducer, [
        { columnName: 'b', sortingEnabled: false },
        { columnName: 'c', sortingEnabled: false },
      ]);

      changeColumnSorting(state, { keepOther: false });
      expect(reducer)
        .toBeCalledWith(state, { keepOther: ['b'] });
    });

    it('should merge keepOther and persistent sorted columns if keepOther is array', () => {
      const reducer = jest.fn();
      const state = {
        sorting: [
          { columnName: 'b' },
          { columnName: 'c' },
        ],
      };
      const changeColumnSorting = getChangeColumnSorting(reducer, [
        { columnName: 'b', sortingEnabled: false },
        { columnName: 'c', sortingEnabled: false },
      ]);

      changeColumnSorting(state, { keepOther: ['a', 'b'] });

      expect(reducer)
        .toBeCalledWith(state, { keepOther: ['a', 'b', 'c'] });
    });

    it('should merge sorting and persistent sorted columns if keepOther is true', () => {
      const reducer = jest.fn();
      const state = {
        sorting: [
          { columnName: 'a' },
          { columnName: 'b' },
          { columnName: 'c' },
        ],
      };
      const changeColumnSorting = getChangeColumnSorting(reducer, [
        { columnName: 'c', sortingEnabled: false },
      ]);

      changeColumnSorting(state, { keepOther: true });
      expect(reducer)
        .toBeCalledWith(state, { keepOther: ['a', 'b', 'c'] });
    });
  });
});
