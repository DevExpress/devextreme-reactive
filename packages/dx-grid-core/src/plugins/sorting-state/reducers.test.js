import {
    setColumnSorting,
} from './reducers';

describe('SortingState reducers', () => {
  describe('#setColumnSorting', () => {
    it('can initiate sorting', () => {
      const sorting = [];
      const payload = { columnName: 'test' };

      const nextSorting = setColumnSorting(sorting, payload);
      expect(nextSorting).toEqual([{ columnName: 'test', direction: 'asc' }]);
    });

    it('can initiate sorting with direction', () => {
      const sorting = [];
      const payload = { columnName: 'test', direction: 'desc' };

      const nextSorting = setColumnSorting(sorting, payload);
      expect(nextSorting).toEqual([{ columnName: 'test', direction: 'desc' }]);
    });

    it('can toggle sorting', () => {
      const sorting = [{ columnName: 'test', direction: 'asc' }];
      const payload = { columnName: 'test' };

      const nextSorting = setColumnSorting(sorting, payload);
      expect(nextSorting).toEqual([{ columnName: 'test', direction: 'desc' }]);
    });

    it('should reset sorting if no keepOther is specified', () => {
      const sorting = [{ columnName: 'test', direction: 'asc' }];
      const payload = { columnName: 'test2' };

      const nextSorting = setColumnSorting(sorting, payload);
      expect(nextSorting).toEqual([{ columnName: 'test2', direction: 'asc' }]);
    });

    it('can initiate multi-column sorting by keepOther option', () => {
      const sorting = [{ columnName: 'test', direction: 'asc' }];
      const payload = { columnName: 'test2', keepOther: true };

      const nextSorting = setColumnSorting(sorting, payload);
      expect(nextSorting).toEqual([{ columnName: 'test', direction: 'asc' }, { columnName: 'test2', direction: 'asc' }]);
    });

    it('can toggle multi-column sorting', () => {
      const sorting = [{ columnName: 'test', direction: 'asc' }, { columnName: 'test2', direction: 'asc' }];
      const payload = { columnName: 'test', keepOther: true };

      const nextSorting = setColumnSorting(sorting, payload);
      expect(nextSorting).toEqual([{ columnName: 'test', direction: 'desc' }, { columnName: 'test2', direction: 'asc' }]);
    });

    it('should cancel sorting by column if cancel is set to true', () => {
      const sorting = [{ columnName: 'test', direction: 'asc' }, { columnName: 'test2', direction: 'asc' }];
      const payload = { columnName: 'test2', keepOther: true, cancel: true };

      const nextSorting = setColumnSorting(sorting, payload);
      expect(nextSorting).toEqual([{ columnName: 'test', direction: 'asc' }]);
    });

    it('should clear sorting if cancel is true and keepOther is not specified', () => {
      const sorting = [{ columnName: 'test', direction: 'asc' }, { columnName: 'test2', direction: 'asc' }];
      const payload = { columnName: 'test2', cancel: true };

      const nextSorting = setColumnSorting(sorting, payload);
      expect(nextSorting).toHaveLength(0);
    });
  });
});
