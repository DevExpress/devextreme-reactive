import {
  getGroupingItemFromResourceInstance, addGroupInfoToCells,
} from './helpers';

describe('IntegratedGrouping helpers', () => {
  describe('#getGroupingItemFromResourceInstance', () => {
    it('should work', () => {
      const resourceInstance = {
        id: 1,
        text: 'text',
        fieldName: 'fieldName',
        color: '#ffffff',
      };
      expect(getGroupingItemFromResourceInstance(resourceInstance))
        .toEqual({
          id: 1,
          text: 'text',
          fieldName: 'fieldName',
        });
    });
  });

  describe('#addGroupInfoToCells', () => {
    it('should work', () => {
      const viewCellsDataRow = [
        { startDate: new Date('2018-06-24 08:00'), endDate: new Date('2018-06-24 08:30') },
        { startDate: new Date('2018-06-24 08:30'), endDate: new Date('2018-06-24 09:00') },
      ];
      const resources = [{
        fieldName: 'resource1',
        instances: [
          { id: 1, text: 'text1', fieldName: 'resource1' },
          { id: 2, text: 'text2', fieldName: 'resource1' },
        ],
      }];
      const groupingItems = [[
        { fieldName: 'resource1', id: 1 },
        { fieldName: 'resource1', id: 2 },
      ]];
      expect(addGroupInfoToCells(
        groupingItems[0][0], groupingItems, resources, viewCellsDataRow, 0,
      ))
        .toEqual([{
          startDate: new Date('2018-06-24 08:00'),
          endDate: new Date('2018-06-24 08:30'),
          groupingInfo: [groupingItems[0][0]],
        },
        {
          startDate: new Date('2018-06-24 08:30'),
          endDate: new Date('2018-06-24 09:00'),
          groupingInfo: [groupingItems[0][0]],
          isBorderRight: true,
        }]);
    });
  });
});
