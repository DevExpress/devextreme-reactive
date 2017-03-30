import {
    setColumnFilter,
} from './reducers';

describe('SortingState reducers', () => {
  describe('#setColumnFilter', () => {
    test('can set column filter', () => {
      const filters = [];
      const payload = { columnName: 'column', value: 'value' };

      const nextFilters = setColumnFilter(filters, payload);
      expect(nextFilters).toEqual([{ column: 'column', value: 'value' }]);
    });

    test('can change column filter', () => {
      const filters = [{ column: 'column', value: 'value' }];
      const payload = { columnName: 'column', value: 'new value' };

      const nextFilters = setColumnFilter(filters, payload);
      expect(nextFilters).toEqual([{ column: 'column', value: 'new value' }]);
    });

    test('can add column filter', () => {
      const filters = [{ column: 'column1', value: 'value' }];
      const payload = { columnName: 'column2', value: 'new value' };

      const nextFilters = setColumnFilter(filters, payload);
      expect(nextFilters).toEqual([
        { column: 'column1', value: 'value' },
        { column: 'column2', value: 'new value' },
      ]);
    });

    test('can remove column filter', () => {
      const filters = [{ column: 'column', value: 'value' }];
      const payload = { columnName: 'column', value: '' };

      const nextFilters = setColumnFilter(filters, payload);
      expect(nextFilters).toEqual([]);
    });
  });
});
