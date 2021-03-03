// tslint:disable-next-line: import-name
import Immutable from 'seamless-immutable';
import { ReadonlyObject } from '@devexpress/dx-core';
import { changeColumnSorting } from './reducers';
import { ColumnSortingState, ChangeSortingPayload } from '../../types';

describe('SortingState reducers', () => {
  describe('#changeColumnSorting', () => {
    it('can initiate sorting', () => {
      const state: ReadonlyObject<ColumnSortingState> = {
        sorting: [],
      };
      const payload: ReadonlyObject<ChangeSortingPayload> = { columnName: 'test' };

      expect(changeColumnSorting(state, payload))
        .toEqual({
          sorting: [{ columnName: 'test', direction: 'asc' }],
        });
    });

    it('can initiate sorting with direction', () => {
      const state: ReadonlyObject<ColumnSortingState> = {
        sorting: [],
      };
      const payload: ReadonlyObject<ChangeSortingPayload> = {
        columnName: 'test', direction: 'desc',
      };

      expect(changeColumnSorting(state, payload))
        .toEqual({
          sorting: [{ columnName: 'test', direction: 'desc' }],
        });
    });

    it('can toggle sorting', () => {
      const state: ReadonlyObject<ColumnSortingState> = {
        sorting: [{ columnName: 'test', direction: 'asc' }],
      };
      const payload: ReadonlyObject<ChangeSortingPayload> = { columnName: 'test' };

      expect(changeColumnSorting(state, payload))
        .toEqual({
          sorting: [{ columnName: 'test', direction: 'desc' }],
        });
    });

    it('should reset sorting if no keepOther is specified', () => {
      const state: ReadonlyObject<ColumnSortingState> = {
        sorting: [{ columnName: 'test', direction: 'asc' }],
      };
      const payload: ReadonlyObject<ChangeSortingPayload> = { columnName: 'test2' };

      expect(changeColumnSorting(state, payload))
        .toEqual({
          sorting: [{ columnName: 'test2', direction: 'asc' }],
        });
    });

    it('can initiate multi-column sorting by keepOther option', () => {
      const state: ReadonlyObject<ColumnSortingState> = {
        sorting: [{ columnName: 'test', direction: 'asc' }],
      };
      const payload: ReadonlyObject<ChangeSortingPayload> = {
        columnName: 'test2', keepOther: true,
      };

      expect(changeColumnSorting(state, payload))
        .toEqual({
          sorting: [
            { columnName: 'test', direction: 'asc' },
            { columnName: 'test2', direction: 'asc' },
          ],
        });
    });

    it('should work with immutable properties', () => {
      const state = { sorting: Immutable([{ columnName: 'test', direction: 'asc' }]) };

      expect(() => changeColumnSorting(state, { columnName: 'test2', keepOther: true }))
        .not.toThrow();

      expect(() => changeColumnSorting(state, { columnName: 'test2', keepOther: ['test'] }))
        .not.toThrow();
    });

    it('can initiate multi-column sorting by keepOther option with array', () => {
      const state: ReadonlyObject<ColumnSortingState> = {
        sorting: [
          { columnName: 'test', direction: 'asc' },
          { columnName: 'test1', direction: 'asc' },
        ],
      };
      const payload: ReadonlyObject<ChangeSortingPayload> = {
        columnName: 'test2', keepOther: ['test'],
      };

      expect(changeColumnSorting(state, payload))
        .toEqual({
          sorting: [
            { columnName: 'test', direction: 'asc' },
            { columnName: 'test2', direction: 'asc' },
          ],
        });
    });

    it('can toggle multi-column sorting', () => {
      const state: ReadonlyObject<ColumnSortingState> = {
        sorting: [
          { columnName: 'test', direction: 'asc' },
          { columnName: 'test2', direction: 'asc' },
        ],
      };
      const payload: ReadonlyObject<ChangeSortingPayload> = {
        columnName: 'test', keepOther: true,
      };

      expect(changeColumnSorting(state, payload))
        .toEqual({
          sorting: [
            { columnName: 'test', direction: 'desc' },
            { columnName: 'test2', direction: 'asc' },
          ],
        });
    });

    it('should cancel sorting by column if directions is set to null', () => {
      const state: ReadonlyObject<ColumnSortingState> = {
        sorting: [
          { columnName: 'test', direction: 'asc' },
          { columnName: 'test2', direction: 'asc' },
        ],
      };
      const payload: ReadonlyObject<ChangeSortingPayload> = {
        columnName: 'test2', keepOther: true, direction: null,
      };

      expect(changeColumnSorting(state, payload))
        .toEqual({
          sorting: [{ columnName: 'test', direction: 'asc' }],
        });
    });

    it('should clear sorting if direction is null and keepOther is not specified', () => {
      const state: ReadonlyObject<ColumnSortingState> = {
        sorting: [
          { columnName: 'test', direction: 'asc' },
          { columnName: 'test2', direction: 'asc' },
        ],
      };
      const payload: ReadonlyObject<ChangeSortingPayload> = {
        columnName: 'test2', direction: null,
      };

      expect(changeColumnSorting(state, payload))
        .toEqual({
          sorting: [],
        });
    });

    it('should set correct sorting if sortIndex is specified', () => {
      const state: ReadonlyObject<ColumnSortingState> = {
        sorting: [
          { columnName: 'test', direction: 'asc' },
          { columnName: 'test1', direction: 'asc' },
        ],
      };
      const payload: ReadonlyObject<ChangeSortingPayload> = {
        columnName: 'test2', keepOther: true, sortIndex: 0,
      };

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
