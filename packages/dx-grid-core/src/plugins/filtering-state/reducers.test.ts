import { changeColumnFilter } from './reducers';
// tslint:disable-next-line: import-name
import Immutable from 'seamless-immutable';

describe('FilteringState reducers', () => {
  describe('#changeColumnFilter', () => {
    it('can set column filter', () => {
      const filters = [];
      const payload = { columnName: 'column', config: { value: 'value' } };

      const nextFilters = changeColumnFilter(filters, payload);
      expect(nextFilters).toEqual([{ columnName: 'column', value: 'value' }]);
    });

    it('can change column filter', () => {
      const filters = [{ columnName: 'column', value: 'value' }];
      const payload = { columnName: 'column', config: { value: 'new value' } };

      const nextFilters = changeColumnFilter(filters, payload);
      expect(nextFilters).toEqual([{ columnName: 'column', value: 'new value' }]);
    });

    it('should work with immutable column filter', () => {
      const filters = Immutable([{ columnName: 'column', value: 'value' }]);
      const payload = { columnName: 'column', config: { value: 'new value' } };

      expect(() => changeColumnFilter(filters, payload)).not.toThrow();
    });

    it('can add column filter', () => {
      const filters = [{ columnName: 'column1', value: 'value' }];
      const payload = { columnName: 'column2', config: { value: 'new value' } };

      const nextFilters = changeColumnFilter(filters, payload);
      expect(nextFilters).toEqual([
        { columnName: 'column1', value: 'value' },
        { columnName: 'column2', value: 'new value' },
      ]);
    });

    it('can remove column filter', () => {
      const filters = [{ columnName: 'column', value: 'value' }];
      const payload = { columnName: 'column', config: null };

      const nextFilters = changeColumnFilter(filters, payload);
      expect(nextFilters).toEqual([]);
    });

    it('should not remove column filter if payload contains non existing column name', () => {
      const filters = [{ columnName: 'column', value: 'value' }];
      const payload = { columnName: 'column1', config: null };

      const nextFilters = changeColumnFilter(filters, payload);
      expect(nextFilters).toEqual([{ columnName: 'column', value: 'value' }]);
    });
  });
});
