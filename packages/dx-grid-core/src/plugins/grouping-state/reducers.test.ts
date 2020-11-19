// tslint:disable-next-line: import-name
import Immutable from 'seamless-immutable';
import {
  changeColumnGrouping,
  draftColumnGrouping,
  cancelColumnGroupingDraft,
  toggleExpandedGroups,
} from './reducers';

describe('GroupingState reducers', () => {
  describe('#changeColumnGrouping', () => {
    it('can group by column', () => {
      const state = {
        grouping: [],
      };
      const payload = { columnName: 'test' };

      expect(changeColumnGrouping(state, payload))
        .toEqual({
          grouping: [{ columnName: 'test' }],
        });
    });

    it('can group by column with immutable properties', () => {
      const state = { grouping: Immutable([{ columnName: 'test' }]), expandedGroups: [] };
      const payload = { columnName: 'test' };

      expect(() => changeColumnGrouping(state, payload)).not.toThrow();
    });

    it('can ungroup by column', () => {
      const state = {
        grouping: [{ columnName: 'test' }],
        expandedGroups: ['a'],
      };
      const payload = { columnName: 'test' };

      expect(changeColumnGrouping(state, payload))
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

      expect(changeColumnGrouping(state, payload))
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

      expect(changeColumnGrouping(state, payload))
        .toEqual({
          grouping: [
            { columnName: 'column2' },
            { columnName: 'column1' },
          ],
          expandedGroups: [],
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

    it('should work with immutable properties', () => {
      const state = { expandedGroups: Immutable(['a', 'b']) };
      const payload = { groupKey: 'c' };

      expect(() => toggleExpandedGroups(state, payload)).not.toThrow();
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
  });

  describe('#draftColumnGrouping', () => {
    it('can start grouping change', () => {
      const state = {
        grouping: [{ columnName: 'column1' }],
        draftGrouping: null,
      };
      const payload = { columnName: 'test', groupIndex: 0 };

      expect(draftColumnGrouping(state, payload))
        .toEqual({
          draftGrouping: [{ columnName: 'test' }, { columnName: 'column1' }],
        });
    });
  });

  describe('#cancelColumnGroupingDraft', () => {
    it('can cancel grouping change', () => {
      const state = {
        draftGrouping: { columnName: 'test', groupIndex: 2 },
      };
      const payload = null;

      expect(cancelColumnGroupingDraft(state, payload))
        .toEqual({
          draftGrouping: null,
        });
    });
  });
});
