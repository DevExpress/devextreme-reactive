import Immutable from 'seamless-immutable';

import {
  setColumnFilter,
} from './reducers';

describe('SortingState reducers', () => {
  describe('#setColumnFilter', () => {
    it('can set column filter', () => {
      const filters = [];
      const payload = { columnName: 'column', config: { value: 'value' } };

      const nextFilters = setColumnFilter(filters, payload);
      expect(nextFilters).toEqual([{ columnName: 'column', value: 'value' }]);
    });

    it('can change column filter', () => {
      const filters = [{ columnName: 'column', value: 'value' }];
      const payload = { columnName: 'column', config: { value: 'new value' } };

      const nextFilters = setColumnFilter(filters, payload);
      expect(nextFilters).toEqual([{ columnName: 'column', value: 'new value' }]);
    });

    it('can add column filter', () => {
      const filters = [{ columnName: 'column1', value: 'value' }];
      const payload = { columnName: 'column2', config: { value: 'new value' } };

      const nextFilters = setColumnFilter(filters, payload);
      expect(nextFilters).toEqual([
        { columnName: 'column1', value: 'value' },
        { columnName: 'column2', value: 'new value' },
      ]);
    });

    it('can remove column filter', () => {
      const filters = [{ columnName: 'column', value: 'value' }];
      const payload = { columnName: 'column', config: null };

      const nextFilters = setColumnFilter(filters, payload);
      expect(nextFilters).toEqual([]);
    });

    it('should work with immutable filter', () => {
      const filters = Immutable([]);

      const nextFilters = setColumnFilter(filters, { columnName: 'column', config: { value: 'value' } });
      expect(nextFilters).toEqual([{ columnName: 'column', value: 'value' }]);
    });
  });
});
