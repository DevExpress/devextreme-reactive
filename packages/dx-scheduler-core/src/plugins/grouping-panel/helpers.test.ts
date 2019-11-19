import { getGroupingItemsFromResources } from './helpers';

describe('GroupingPanel helpers', () => {
  describe('#getGroupingItemsFromResources', () => {
    const resources = [
      {
        fieldName: 'resource1',
        title: 'Location',
        instances: [
          { id: 'Room 1', text: 'Room 1' },
          { id: 'Room 2', text: 'Room 2' },
        ],
      },
      {
        fieldName: 'members',
        title: 'Members',
        instances: [
          { id: 1, text: 'Andrew Glover' },
          { id: 2, text: 'Arnie Schwartz' },
        ],
      },
    ];

    it('should add an opened group', () => {
      expect(getGroupingItemsFromResources(state, payload))
        .toEqual({
          expandedGroups: ['a', 'b', 'c'],
        });
    });

    it('should remove a closed group', () => {
      const state = {
        expandedGroups: ['a', 'b', 'c'],
      };
      const payload = { groupKey: 'c' };

      expect(getGroupingItemsFromResources(state, payload))
        .toEqual({
          expandedGroups: ['a', 'b'],
        });
    });
  });
});
