import {
    setColumnFilter,
} from './reducers';

describe('SortingState reducers', () => {
  describe('#setColumnFilter', () => {
    test('can set column filter', () => {
      const filters = [];
      const payload = { columnName: 'column', config: { value: 'value' } };

      const nextFilters = setColumnFilter(filters, payload);
      expect(nextFilters).toEqual([{ columnName: 'column', value: 'value' }]);
    });

    test('can change column filter', () => {
      const filters = [{ columnName: 'column', value: 'value' }];
      const payload = { columnName: 'column', config: { value: 'new value' } };

      const nextFilters = setColumnFilter(filters, payload);
      expect(nextFilters).toEqual([{ columnName: 'column', value: 'new value' }]);
    });

    test('can add column filter', () => {
      const filters = [{ columnName: 'column1', value: 'value' }];
      const payload = { columnName: 'column2', config: { value: 'new value' } };

      const nextFilters = setColumnFilter(filters, payload);
      expect(nextFilters).toEqual([
        { columnName: 'column1', value: 'value' },
        { columnName: 'column2', value: 'new value' },
      ]);
    });

    test('can remove column filter', () => {
      const filters = [{ columnName: 'column', value: 'value' }];
      const payload = { columnName: 'column', config: null };

      const nextFilters = setColumnFilter(filters, payload);
      expect(nextFilters).toEqual([]);
    });
  });
});
