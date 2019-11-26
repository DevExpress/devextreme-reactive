import { filterResourcesByGrouping, sortFilteredResources, getGroupingItemsFromResources } from './computeds';

describe('GroupingPanel helpers', () => {
  describe('#filterResourcesByGrouping', () => {
    it('should work', () => {
      const resources = [{
        fieldName: 'resource1',
      }, {
        fieldName: 'resource2',
      }, {
        fieldName: 'resource3',
      }];
      const grouping = [{
        resourceName: 'resource3',
      }, {
        resourceName: 'resource1',
      }];
      expect(filterResourcesByGrouping(resources, grouping))
        .toEqual([{
          fieldName: 'resource1',
        }, {
          fieldName: 'resource3',
        }]);
    });
  });

  describe('#sortFilteredResources', () => {
    it('should work', () => {
      const resources = [{
        fieldName: 'resource1',
      }, {
        fieldName: 'resource2',
      }];
      const grouping = [{
        resourceName: 'resource2',
      }, {
        resourceName: 'resource1',
      }];
      expect(sortFilteredResources(resources, grouping))
        .toEqual([{
          fieldName: 'resource2',
        }, {
          fieldName: 'resource1',
        }]);
    });
  });

  describe('#getGroupingItemsFromResources', () => {
    it('should work', () => {
      const resources = [{
        fieldName: 'resource2',
        instances: [{
          id: 'resource2_1',
        }, {
          id: 'resource2_2',
        }],
      }, {
        fieldName: 'resource1',
        instances: [{
          id: 'resource1_1',
        }, {
          id: 'resource1_2',
        }],
      }];
      const grouping = [{
        resourceName: 'resource2',
      }, {
        resourceName: 'resource1',
      }];

      expect(getGroupingItemsFromResources(resources, grouping))
        .toEqual([[{
          id: 'resource2_1',
        }, {
          id: 'resource2_2',
        }], [{
          id: 'resource1_1',
        }, {
          id: 'resource1_2',
        }, {
          id: 'resource1_1',
        }, {
          id: 'resource1_2',
        }]]);
    });
  });
});
