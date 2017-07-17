import Immutable from 'seamless-immutable';

import {
    groupByColumn,
    removeOutdatedExpandedGroups,
} from './reducers';

describe('GroupingState reducers', () => {
  describe('#groupByColumn', () => {
    it('can group by column', () => {
      const grouping = [];
      const payload = { columnName: 'test' };

      const nextGrouping = groupByColumn(grouping, payload);
      expect(nextGrouping).toEqual([
        { columnName: 'test' },
      ]);
    });

    it('can ungroup by column', () => {
      const grouping = [{ columnName: 'test' }];
      const payload = { columnName: 'test' };

      const nextGrouping = groupByColumn(grouping, payload);
      expect(nextGrouping).toEqual([]);
    });

    it('can group by several columns', () => {
      const grouping = [{ columnName: 'column1' }];
      const payload = { columnName: 'column2' };

      const nextGrouping = groupByColumn(grouping, payload);
      expect(nextGrouping).toEqual([
        { columnName: 'column1' },
        { columnName: 'column2' },
      ]);
    });

    it('can group by column with a group index', () => {
      const grouping = [{ columnName: 'column1' }];
      const payload = { columnName: 'column2', groupIndex: 0 };

      const nextGrouping = groupByColumn(grouping, payload);
      expect(nextGrouping).toEqual([
        { columnName: 'column2' },
        { columnName: 'column1' },
      ]);
    });

    it('should work with immutable grouping', () => {
      const grouping = Immutable([]);

      const nextGrouping = groupByColumn(grouping, { columnName: 'test' });
      expect(nextGrouping).toEqual([
        { columnName: 'test' },
      ]);
    });
  });

  describe('#removeOutdatedExpandedGroups', () => {
    it('should update expanded groups depend on ungrouped column index', () => {
      const expandedGroups = ['a', 'a|b', 'a|b|c'];
      const nextExpandedGroups = removeOutdatedExpandedGroups(expandedGroups, {
        prevGrouping: [{ columnName: 'w' }, { columnName: 'z' }],
        grouping: [{ columnName: 'w' }],
      });

      expect(nextExpandedGroups).toEqual(['a']);
    });

    it('should not update expanded groups id ungrouped column index is -1', () => {
      const expandedGroups = ['a', 'a', 'c'];
      const nextExpandedGroups = removeOutdatedExpandedGroups(expandedGroups, {
        prevGrouping: [{ columnName: 'w' }, { columnName: 'z' }],
        grouping: [{ columnName: 'w' }, { columnName: 'z' }, { columnName: 'y' }],
      });

      expect(nextExpandedGroups).toBe(expandedGroups);
    });
  });
});
