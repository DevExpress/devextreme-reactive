import {
    setColumnSorting,
} from './reducers';

describe('SortingState reducers', () => {
  describe('#setColumnSorting', () => {
    test('can initiate sorting', () => {
      const sortings = [];
      const payload = { columnName: 'test' };

      const nextSortings = setColumnSorting(sortings, payload);
      expect(nextSortings).toEqual([{ column: 'test', direction: 'asc' }]);
    });

    test('can initiate sorting with direction', () => {
      const sortings = [];
      const payload = { columnName: 'test', direction: 'desc' };

      const nextSortings = setColumnSorting(sortings, payload);
      expect(nextSortings).toEqual([{ column: 'test', direction: 'desc' }]);
    });

    test('can toggle sorting', () => {
      const sortings = [{ column: 'test', direction: 'asc' }];
      const payload = { columnName: 'test' };

      const nextSortings = setColumnSorting(sortings, payload);
      expect(nextSortings).toEqual([{ column: 'test', direction: 'desc' }]);
    });

    test('should reset sorting if no keepOther is specified', () => {
      const sortings = [{ column: 'test', direction: 'asc' }];
      const payload = { columnName: 'test2' };

      const nextSortings = setColumnSorting(sortings, payload);
      expect(nextSortings).toEqual([{ column: 'test2', direction: 'asc' }]);
    });

    test('can initiate multi-column sorting by keepOther option', () => {
      const sortings = [{ column: 'test', direction: 'asc' }];
      const payload = { columnName: 'test2', keepOther: true };

      const nextSortings = setColumnSorting(sortings, payload);
      expect(nextSortings).toEqual([{ column: 'test', direction: 'asc' }, { column: 'test2', direction: 'asc' }]);
    });

    test('can toggle multi-column sorting', () => {
      const sortings = [{ column: 'test', direction: 'asc' }, { column: 'test2', direction: 'asc' }];
      const payload = { columnName: 'test', keepOther: true };

      const nextSortings = setColumnSorting(sortings, payload);
      expect(nextSortings).toEqual([{ column: 'test', direction: 'desc' }, { column: 'test2', direction: 'asc' }]);
    });
  });
});
