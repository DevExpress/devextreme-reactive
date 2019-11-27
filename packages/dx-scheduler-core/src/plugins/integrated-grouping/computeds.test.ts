import { filterResourcesByGrouping, sortFilteredResources, getGroupingItemsFromResources, expandViewCellsDataWithGroups } from './computeds';

describe('IntegratedGrouping computeds', () => {
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

  describe('#getGroupedViewCellsData', () => {
    const viewCellsDataBase = [
      [{ startDate: new Date('2018-06-24 08:00'), endDate: new Date('2018-06-24 08:30') }],
      [{ startDate: new Date('2018-06-24 08:30'), endDate: new Date('2018-06-24 09:00') }],
    ];
    const resourcesBase = [{
      fieldName: 'resource1',
      instances: [{ id: 1 }, { id: 2 }],
    }];

    it('should add cells and groupingInfo to the cells depending on groupingItems', () => {
      const groupingItems = [[
        { fieldName: 'resource1', id: 1 },
        { fieldName: 'resource1', id: 2 },
      ]];

      const result = expandViewCellsDataWithGroups(viewCellsDataBase, groupingItems, resourcesBase);
      expect(result[0][0])
        .toEqual({
          ...viewCellsDataBase[0][0],
          groupingInfo: [{
            fieldName: 'resource1',
            id: 1,
          }],
        });
      expect(result[0][1])
        .toEqual({
          ...viewCellsDataBase[0][0],
          groupingInfo: [{
            fieldName: 'resource1',
            id: 2,
          }],
        });
      expect(result[1][0])
        .toEqual({
          ...viewCellsDataBase[1][0],
          groupingInfo: [{
            fieldName: 'resource1',
            id: 1,
          }],
        });
      expect(result[1][1])
        .toEqual({
          ...viewCellsDataBase[1][0],
          groupingInfo: [{
            fieldName: 'resource1',
            id: 2,
          }],
        });
    });

    it('should work with multiple groupingItems', () => {
      const viewCellsData = [
        [{ startDate: new Date('2018-06-24 08:00'), endDate: new Date('2018-06-24 08:30') }],
      ];
      const groupingItems = [[
        { fieldName: 'resource1', id: 1 },
        { fieldName: 'resource1', id: 2 },
      ], [
        { fieldName: 'resource2', id: 1 },
        { fieldName: 'resource2', id: 2 },
        { fieldName: 'resource2', id: 1 },
        { fieldName: 'resource2', id: 2 },
      ]];
      const resources = [{
        fieldName: 'resource1',
        instances: [{ id: 1 }, { id: 2 }],
      }, {
        fieldName: 'resource2',
        instances: [{ id: 1 }, { id: 2 }],
      }];

      const result = expandViewCellsDataWithGroups(viewCellsData, groupingItems, resources);
      expect(result[0][0])
        .toEqual({
          ...viewCellsData[0][0],
          groupingInfo: [{
            fieldName: 'resource2',
            id: 1,
          }, {
            fieldName: 'resource1',
            id: 1,
          }],
        });
      expect(result[0][1])
        .toEqual({
          ...viewCellsData[0][0],
          groupingInfo: [{
            fieldName: 'resource2',
            id: 2,
          }, {
            fieldName: 'resource1',
            id: 1,
          }],
        });
      expect(result[0][2])
        .toEqual({
          ...viewCellsData[0][0],
          groupingInfo: [{
            fieldName: 'resource2',
            id: 1,
          }, {
            fieldName: 'resource1',
            id: 2,
          }],
        });
      expect(result[0][3])
        .toEqual({
          ...viewCellsData[0][0],
          groupingInfo: [{
            fieldName: 'resource2',
            id: 2,
          }, {
            fieldName: 'resource1',
            id: 2,
          }],
        });
    });

    it('should not add groupingInfo if groupingItems is an empty array', () => {
      const groupingItems = [];

      expect(expandViewCellsDataWithGroups(viewCellsDataBase, groupingItems, resourcesBase))
        .toEqual(viewCellsDataBase);
    });
  });
});
