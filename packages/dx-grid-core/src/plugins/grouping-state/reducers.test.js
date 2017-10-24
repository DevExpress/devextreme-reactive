import Immutable from 'seamless-immutable';

import {
  groupByColumn,
  draftGroupingChange,
  cancelGroupingChange,
  toggleExpandedGroups,
} from './reducers';

describe('GroupingState reducers', () => {
  describe('#groupByColumn', () => {
    it('can group by column', () => {
      const state = {
        grouping: [],
      };
      const payload = { columnName: 'test' };

      expect(groupByColumn(state, payload))
        .toEqual({
          grouping: [{ columnName: 'test' }],
        });
    });

    it('can ungroup by column', () => {
      const state = {
        grouping: [{ columnName: 'test' }],
        expandedGroups: ['a'],
      };
      const payload = { columnName: 'test' };

      expect(groupByColumn(state, payload))
        .toEqual({
          grouping: [],
          expandedGroups: [],
        });
    });

    it('can group by several columns', () => {
      const state = {
        grouping: [{ columnName: 'column1' }],
      };
      const payload = { columnName: 'column2' };

      expect(groupByColumn(state, payload))
        .toEqual({
          grouping: [
            { columnName: 'column1' },
            { columnName: 'column2' },
          ],
        });
    });

    it('can group by column with a group index', () => {
      const state = {
        grouping: [{ columnName: 'column1' }],
        expandedGroups: ['a'],
      };
      const payload = { columnName: 'column2', groupIndex: 0 };

      expect(groupByColumn(state, payload))
        .toEqual({
          grouping: [
            { columnName: 'column2' },
            { columnName: 'column1' },
          ],
          expandedGroups: [],
        });
    });

    it('should work with immutable grouping', () => {
      const state = {
        grouping: Immutable([]),
      };
      const payload = { columnName: 'test' };

      expect(groupByColumn(state, payload))
        .toEqual({
          grouping: [
            { columnName: 'test' },
          ],
        });
    });
  });

  describe('#toggleExpandedGroups', () => {
    it('should add an opened group', () => {
      const state = {
        expandedGroups: ['a', 'b'],
      };
      const payload = { groupKey: 'c' };

      expect(toggleExpandedGroups(state, payload))
        .toEqual({
          expandedGroups: ['a', 'b', 'c'],
        });
    });

    it('should remove a closed group', () => {
      const state = {
        expandedGroups: ['a', 'b', 'c'],
      };
      const payload = { groupKey: 'c' };

      expect(toggleExpandedGroups(state, payload))
        .toEqual({
          expandedGroups: ['a', 'b'],
        });
    });

    it('should work with immutable groups', () => {
      const state = {
        expandedGroups: Immutable(['a']),
      };
      const payload = { groupKey: 'b' };

      expect(toggleExpandedGroups(state, payload))
        .toEqual({
          expandedGroups: ['a', 'b'],
        });
    });
  });

  describe('#draftGroupingChange', () => {
    it('can start grouping change', () => {
      const state = {
        groupingChange: null,
      };
      const payload = { columnName: 'test', groupIndex: 2 };

      expect(draftGroupingChange(state, payload))
        .toEqual({
          groupingChange: { columnName: 'test', groupIndex: 2 },
        });
    });
  });

  describe('#cancelGroupingChange', () => {
    it('can cancel grouping change', () => {
      const state = {
        groupingChange: { columnName: 'test', groupIndex: 2 },
      };
      const payload = null;

      expect(cancelGroupingChange(state, payload))
        .toEqual({
          groupingChange: null,
        });
    });
  });
});
