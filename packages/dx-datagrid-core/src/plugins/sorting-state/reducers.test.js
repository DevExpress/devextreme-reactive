import {
    setColumnSorting,
} from './reducers';

describe('SortingState reducers', () => {
  describe('#setColumnSorting', () => {
    test('can initiate sorting', () => {
      const sorting = [];
      const payload = { columnName: 'test' };

      const nextSorting = setColumnSorting(sorting, payload);
      expect(nextSorting).toEqual([{ column: 'test', direction: 'asc' }]);
    });

    test('can initiate sorting with direction', () => {
      const sorting = [];
      const payload = { columnName: 'test', direction: 'desc' };

      const nextSorting = setColumnSorting(sorting, payload);
      expect(nextSorting).toEqual([{ column: 'test', direction: 'desc' }]);
    });

    test('can toggle sorting', () => {
      const sorting = [{ column: 'test', direction: 'asc' }];
      const payload = { columnName: 'test' };

      const nextSorting = setColumnSorting(sorting, payload);
      expect(nextSorting).toEqual([{ column: 'test', direction: 'desc' }]);
    });

    test('should reset sorting if no keepOther is specified', () => {
      const sorting = [{ column: 'test', direction: 'asc' }];
      const payload = { columnName: 'test2' };

      const nextSorting = setColumnSorting(sorting, payload);
      expect(nextSorting).toEqual([{ column: 'test2', direction: 'asc' }]);
    });

    test('can initiate multi-column sorting by keepOther option', () => {
      const sorting = [{ column: 'test', direction: 'asc' }];
      const payload = { columnName: 'test2', keepOther: true };

      const nextSorting = setColumnSorting(sorting, payload);
      expect(nextSorting).toEqual([{ column: 'test', direction: 'asc' }, { column: 'test2', direction: 'asc' }]);
    });

    test('can toggle multi-column sorting', () => {
      const sorting = [{ column: 'test', direction: 'asc' }, { column: 'test2', direction: 'asc' }];
      const payload = { columnName: 'test', keepOther: true };

      const nextSorting = setColumnSorting(sorting, payload);
      expect(nextSorting).toEqual([{ column: 'test', direction: 'desc' }, { column: 'test2', direction: 'asc' }]);
    });
  });
});
