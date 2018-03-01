import { changeColumnSorting } from './reducers';

describe('SortingState reducers', () => {
  describe('#changeColumnSorting', () => {
    it('can initiate sorting', () => {
      const state = {
        sorting: [],
      };
      const payload = { columnName: 'test' };

      expect(changeColumnSorting(state, payload))
        .toEqual({
          sorting: [{ columnName: 'test', direction: 'asc' }],
        });
    });

    it('can initiate sorting with direction', () => {
      const state = {
        sorting: [],
      };
      const payload = { columnName: 'test', direction: 'desc' };

      expect(changeColumnSorting(state, payload))
        .toEqual({
          sorting: [{ columnName: 'test', direction: 'desc' }],
        });
    });

    it('can toggle sorting', () => {
      const state = {
        sorting: [{ columnName: 'test', direction: 'asc' }],
      };
      const payload = { columnName: 'test' };

      expect(changeColumnSorting(state, payload))
        .toEqual({
          sorting: [{ columnName: 'test', direction: 'desc' }],
        });
    });

    it('should reset sorting if no keepOther is specified', () => {
      const state = {
        sorting: [{ columnName: 'test', direction: 'asc' }],
      };
      const payload = { columnName: 'test2' };

      expect(changeColumnSorting(state, payload))
        .toEqual({
          sorting: [{ columnName: 'test2', direction: 'asc' }],
        });
    });

    it('can initiate multi-column sorting by keepOther option', () => {
      const state = {
        sorting: [{ columnName: 'test', direction: 'asc' }],
      };
      const payload = { columnName: 'test2', keepOther: true };

      expect(changeColumnSorting(state, payload))
        .toEqual({
          sorting: [{ columnName: 'test', direction: 'asc' }, { columnName: 'test2', direction: 'asc' }],
        });
    });

    it('can initiate multi-column sorting by keepOther option with array', () => {
      const state = {
        sorting: [{ columnName: 'test', direction: 'asc' }, { columnName: 'test1', direction: 'asc' }],
      };
      const payload = { columnName: 'test2', keepOther: ['test'] };

      expect(changeColumnSorting(state, payload))
        .toEqual({
          sorting: [{ columnName: 'test', direction: 'asc' }, { columnName: 'test2', direction: 'asc' }],
        });
    });

    it('can toggle multi-column sorting', () => {
      const state = {
        sorting: [{ columnName: 'test', direction: 'asc' }, { columnName: 'test2', direction: 'asc' }],
      };
      const payload = { columnName: 'test', keepOther: true };

      expect(changeColumnSorting(state, payload))
        .toEqual({
          sorting: [{ columnName: 'test', direction: 'desc' }, { columnName: 'test2', direction: 'asc' }],
        });
    });

    it('should cancel sorting by column if directions is set to null', () => {
      const state = {
        sorting: [{ columnName: 'test', direction: 'asc' }, { columnName: 'test2', direction: 'asc' }],
      };
      const payload = { columnName: 'test2', keepOther: true, direction: null };

      expect(changeColumnSorting(state, payload))
        .toEqual({
          sorting: [{ columnName: 'test', direction: 'asc' }],
        });
    });

    it('should clear sorting if direction is null and keepOther is not specified', () => {
      const state = {
        sorting: [{ columnName: 'test', direction: 'asc' }, { columnName: 'test2', direction: 'asc' }],
      };
      const payload = { columnName: 'test2', direction: null };

      expect(changeColumnSorting(state, payload))
        .toEqual({
          sorting: [],
        });
    });

    it('should set correct sorting if sortIndex is specified', () => {
      const state = {
        sorting: [{ columnName: 'test', direction: 'asc' }, { columnName: 'test1', direction: 'asc' }],
      };
      const payload = { columnName: 'test2', keepOther: true, sortIndex: 0 };

      expect(changeColumnSorting(state, payload))
        .toEqual({
          sorting: [
            { columnName: 'test2', direction: 'asc' },
            { columnName: 'test', direction: 'asc' },
            { columnName: 'test1', direction: 'asc' },
          ],
        });
    });
  });
});
