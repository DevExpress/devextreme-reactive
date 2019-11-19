import { toggleExpandedGroups } from './reducers';

describe('GroupingState reducers', () => {
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
  });
});
