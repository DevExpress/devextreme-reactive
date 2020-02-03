import {
  filterResourcesByGrouping, sortFilteredResources,
  getGroupsFromResources, expandViewCellsDataWithGroups,
  updateGroupingWithMainResource, expandGroups,
} from './computeds';
import { expandGroupedAppointment, groupAppointments } from './helpers';
import { sliceAppointmentsByDays } from '../all-day-panel/helpers';
import { HORIZONTAL_GROUP_ORIENTATION, VERTICAL_GROUP_ORIENTATION } from '../../constants';

jest.mock('./helpers', () => ({
  ...require.requireActual('./helpers'),
  expandGroupedAppointment: jest.fn(),
  groupAppointments: jest.fn(),
}));

jest.mock('../all-day-panel/helpers', () => ({
  ...require.requireActual('../all-day-panel/helpers'),
  sliceAppointmentsByDays: jest.fn(),
}));

describe('IntegratedGrouping computeds', () => {
  describe('#filterResourcesByGrouping', () => {
    it('should work', () => {
      const resources = [
        { fieldName: 'resource1' },
        { fieldName: 'resource2' },
        { fieldName: 'resource3' },
      ];
      const grouping = [
        { resourceName: 'resource3' },
        { resourceName: 'resource1' },
      ];
      expect(filterResourcesByGrouping(resources, grouping))
        .toEqual([
          { fieldName: 'resource1' },
          { fieldName: 'resource3' },
        ]);
    });
  });

  describe('#sortFilteredResources', () => {
    it('should work', () => {
      const resources = [
        { fieldName: 'resource1' },
        { fieldName: 'resource2' },
      ];
      const grouping = [
        { resourceName: 'resource2' },
        { resourceName: 'resource1' },
      ];
      expect(sortFilteredResources(resources, grouping))
        .toEqual([
          { fieldName: 'resource2' },
          { fieldName: 'resource1' },
        ]);
    });
  });

  describe('#getGroupsFromResources', () => {
    it('should work', () => {
      const resources = [{
        fieldName: 'resource2',
        instances: [
          { id: 'resource2_1' },
          { id: 'resource2_2' },
        ],
      }, {
        fieldName: 'resource1',
        instances: [
          { id: 'resource1_1' },
          { id: 'resource1_2' },
        ],
      }];
      const grouping = [
        { resourceName: 'resource2' },
        { resourceName: 'resource1' },
      ];

      expect(getGroupsFromResources(resources, grouping))
        .toEqual([[
          { id: 'resource2_1' },
          { id: 'resource2_2' },
        ], [
          { id: 'resource1_1' },
          { id: 'resource1_2' },
          { id: 'resource1_1' },
          { id: 'resource1_2' },
        ]]);
    });
  });

  describe('#expandViewCellsDataWithGroups ', () => {
    const viewCellsDataBase = [
      [{ startDate: new Date('2018-06-24 08:00'), endDate: new Date('2018-06-24 08:30') }],
      [{ startDate: new Date('2018-06-24 08:30'), endDate: new Date('2018-06-24 09:00') }],
    ];
    const resourcesBase = [{
      fieldName: 'resource1',
      instances: [{ id: 1 }, { id: 2 }],
    }];

    it('should add cells and groupingInfo to the cells depending on groups', () => {
      const groups = [[
        { fieldName: 'resource1', id: 1 },
        { fieldName: 'resource1', id: 2 },
      ]];

      const result = expandViewCellsDataWithGroups(
        viewCellsDataBase, groups, resourcesBase, false, HORIZONTAL_GROUP_ORIENTATION,
      );
      expect(result[0][0])
        .toEqual({
          ...viewCellsDataBase[0][0],
          groupingInfo: [{ fieldName: 'resource1', id: 1 }],
          endOfGroup: true,
          groupOrientation: HORIZONTAL_GROUP_ORIENTATION,
        });
      expect(result[0][1])
        .toEqual({
          ...viewCellsDataBase[0][0],
          groupingInfo: [{ fieldName: 'resource1', id: 2 }],
          endOfGroup: true,
          groupOrientation: HORIZONTAL_GROUP_ORIENTATION,
        });
      expect(result[1][0])
        .toEqual({
          ...viewCellsDataBase[1][0],
          groupingInfo: [{ fieldName: 'resource1', id: 1 }],
          endOfGroup: true,
          groupOrientation: HORIZONTAL_GROUP_ORIENTATION,
        });
      expect(result[1][1])
        .toEqual({
          ...viewCellsDataBase[1][0],
          groupingInfo: [{ fieldName: 'resource1', id: 2 }],
          endOfGroup: true,
          groupOrientation: HORIZONTAL_GROUP_ORIENTATION,
        });
    });

    it('should work with multiple groups', () => {
      const viewCellsData = [
        [{ startDate: new Date('2018-06-24 08:00'), endDate: new Date('2018-06-24 08:30') }],
      ];
      const groups = [[
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

      const result = expandViewCellsDataWithGroups(
        viewCellsData, groups, resources, false, HORIZONTAL_GROUP_ORIENTATION,
      );
      expect(result[0][0])
        .toEqual({
          ...viewCellsData[0][0],
          groupingInfo: [
            { fieldName: 'resource2', id: 1 },
            { fieldName: 'resource1', id: 1 },
          ],
          endOfGroup: true,
          groupOrientation: HORIZONTAL_GROUP_ORIENTATION,
        });
      expect(result[0][1])
        .toEqual({
          ...viewCellsData[0][0],
          groupingInfo: [
            { fieldName: 'resource2', id: 2 },
            { fieldName: 'resource1', id: 1 },
          ],
          endOfGroup: true,
          groupOrientation: HORIZONTAL_GROUP_ORIENTATION,
        });
      expect(result[0][2])
        .toEqual({
          ...viewCellsData[0][0],
          groupingInfo: [
            { fieldName: 'resource2', id: 1 },
            { fieldName: 'resource1', id: 2 },
          ],
          endOfGroup: true,
          groupOrientation: HORIZONTAL_GROUP_ORIENTATION,
        });
      expect(result[0][3])
        .toEqual({
          ...viewCellsData[0][0],
          groupingInfo: [
            { fieldName: 'resource2', id: 2 },
            { fieldName: 'resource1', id: 2 },
          ],
          endOfGroup: true,
          groupOrientation: HORIZONTAL_GROUP_ORIENTATION,
        });
    });

    it('should not add groupingInfo if groups is an empty array', () => {
      const groups = [];

      expect(expandViewCellsDataWithGroups(viewCellsDataBase, groups, resourcesBase))
        .toEqual(viewCellsDataBase);
    });

    it('should work when grouping by dates is used', () => {
      const groups = [[
        { fieldName: 'resource1', id: 1 },
        { fieldName: 'resource1', id: 2 },
      ]];
      const viewCellsData = [
        [{ startDate: new Date('2018-06-24 08:00'), endDate: new Date('2018-06-24 08:30') }],
        [{ startDate: new Date('2018-06-25 08:00'), endDate: new Date('2018-06-25 08:30') }],
      ];

      const result = expandViewCellsDataWithGroups(
        viewCellsData, groups, resourcesBase, true, HORIZONTAL_GROUP_ORIENTATION,
      );
      expect(result[0][0])
        .toEqual({
          ...viewCellsData[0][0],
          groupingInfo: [{ fieldName: 'resource1', id: 1 }],
          endOfGroup: false,
          groupOrientation: HORIZONTAL_GROUP_ORIENTATION,
        });
      expect(result[0][1])
        .toEqual({
          ...viewCellsData[0][0],
          groupingInfo: [{ fieldName: 'resource1', id: 2 }],
          endOfGroup: true,
          groupOrientation: HORIZONTAL_GROUP_ORIENTATION,
        });
      expect(result[1][0])
        .toEqual({
          ...viewCellsData[1][0],
          groupingInfo: [{ fieldName: 'resource1', id: 1 }],
          endOfGroup: false,
          groupOrientation: HORIZONTAL_GROUP_ORIENTATION,
        });
      expect(result[1][1])
        .toEqual({
          ...viewCellsData[1][0],
          groupingInfo: [{ fieldName: 'resource1', id: 2 }],
          endOfGroup: true,
          groupOrientation: HORIZONTAL_GROUP_ORIENTATION,
        });
    });

    it('should work with vertical grouping', () => {
      const groups = [[
        { fieldName: 'resource1', id: 1 },
        { fieldName: 'resource1', id: 2 },
      ]];

      const result = expandViewCellsDataWithGroups(
        viewCellsDataBase, groups, resourcesBase, false, VERTICAL_GROUP_ORIENTATION,
      );
      expect(result[0][0])
        .toEqual({
          ...viewCellsDataBase[0][0],
          groupingInfo: [{ fieldName: 'resource1', id: 1 }],
          endOfGroup: false,
          groupOrientation: VERTICAL_GROUP_ORIENTATION,
        });
      expect(result[1][0])
        .toEqual({
          ...viewCellsDataBase[1][0],
          groupingInfo: [{ fieldName: 'resource1', id: 1 }],
          endOfGroup: true,
          groupOrientation: VERTICAL_GROUP_ORIENTATION,
        });
      expect(result[2][0])
        .toEqual({
          ...viewCellsDataBase[0][0],
          groupingInfo: [{ fieldName: 'resource1', id: 2 }],
          endOfGroup: false,
          groupOrientation: VERTICAL_GROUP_ORIENTATION,
        });
      expect(result[3][0])
        .toEqual({
          ...viewCellsDataBase[1][0],
          groupingInfo: [{ fieldName: 'resource1', id: 2 }],
          endOfGroup: true,
          groupOrientation: VERTICAL_GROUP_ORIENTATION,
        });
    });
  });

  describe('#updateGroupingWithMainResource', () => {
    it('should return grouping if it is defined', () => {
      expect(updateGroupingWithMainResource('test'))
        .toBe('test');
    });

    it('should return grouping use the main resource for grouping', () => {
      const resources = [
        { fieldName: 'test 1', isMain: false },
        { fieldName: 'test 2', isMain: true },
      ];
      expect(updateGroupingWithMainResource(undefined, resources))
        .toEqual([{
          resourceName: 'test 2',
        }]);
    });
  });

  describe('#expandGroups', () => {
    beforeEach(() => {
      expandGroupedAppointment.mockImplementation(() => ['expandGroupedAppointment']);
      sliceAppointmentsByDays.mockImplementation(() => [{}]);
    });
    afterEach(() => {
      jest.resetAllMocks();
    });
    it('should group and expand appointments', () => {
      expandGroups([[{}]], 'grouping', 'resources', 'groups', [], false);

      expect(expandGroupedAppointment)
        .toHaveBeenCalledWith({}, 'grouping', 'resources');
      expect(groupAppointments)
        .toHaveBeenCalledWith(['expandGroupedAppointment'], 'resources', 'groups');
    });

    it('should slice appointments if sliceByDay is true', () => {
      expandGroups([[{}]], 'grouping', 'resources', 'groups', [], true);

      expect(expandGroupedAppointment)
        .toHaveBeenCalledWith({}, 'grouping', 'resources');
      expect(groupAppointments)
        .toHaveBeenCalledWith(['expandGroupedAppointment'], 'resources', 'groups');
      expect(sliceAppointmentsByDays)
        .toHaveBeenCalledWith({}, []);
    });
  });
});
