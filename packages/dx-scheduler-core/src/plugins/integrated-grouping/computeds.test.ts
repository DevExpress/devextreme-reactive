import {
  filterResourcesByGrouping, sortFilteredResources,
  getGroupsFromResources, expandViewCellsDataWithGroups,
  updateGroupingWithMainResource, expandGroups, updateTimeTableCellElementsMeta,
  updateAllDayCellElementsMeta, updateTimeCellsData,
} from './computeds';
import { expandGroupedAppointment, groupAppointments } from './helpers';
import { sliceAppointmentsByDays } from '../all-day-panel/helpers';
import { HORIZONTAL_GROUP_ORIENTATION, VERTICAL_GROUP_ORIENTATION } from '../../constants';

jest.mock('./helpers', () => ({
  ...jest.requireActual('./helpers'),
  expandGroupedAppointment: jest.fn(),
  groupAppointments: jest.fn(),
}));

jest.mock('../all-day-panel/helpers', () => ({
  ...jest.requireActual('../all-day-panel/helpers'),
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

  describe('#expandViewCellsDataWithGroups', () => {
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

  describe('#updateTimeTableCellElementsMeta', () => {
    it('should not update if getCellRects is undefined', () => {
      const timeTableCellElementsMeta = {};
      expect(updateTimeTableCellElementsMeta(
        timeTableCellElementsMeta, () => VERTICAL_GROUP_ORIENTATION, 'groups', true,
        'viewCellsData', {},
      ))
        .toEqual(timeTableCellElementsMeta);
    });
    it('should leave cell elements as they are if groupOrientation is horizontal or all day panel does not exist', () => {
      const timeTableCellElementsMeta = { getCellRects: 'test' };

      let allDayPanelExists = false;
      expect(updateTimeTableCellElementsMeta(
        timeTableCellElementsMeta, () => VERTICAL_GROUP_ORIENTATION, 'groups', allDayPanelExists,
        'viewCellsData', {},
      ))
        .toEqual(timeTableCellElementsMeta);

      allDayPanelExists = true;
      expect(updateTimeTableCellElementsMeta(
        timeTableCellElementsMeta, () => HORIZONTAL_GROUP_ORIENTATION, 'groups', allDayPanelExists,
        'viewCellsData', {},
      ))
        .toEqual(timeTableCellElementsMeta);
    });
    it('should delete elements belonging to all day cells', () => {
      const viewCellsData = [
        [{ groupingInfo: 'First group' }, { groupingInfo: 'First group' }],
        [{ groupingInfo: 'First group' }, { groupingInfo: 'First group' }],
        [{ groupingInfo: 'Second group' }, { groupingInfo: 'Second group' }],
        [{ groupingInfo: 'Second group' }, { groupingInfo: 'Second group' }],
      ];
      const timeTableCellElementsMeta = {
        parentRect: 'Parent rect',
        getCellRects: [
          // All-day panel
          'First cell',
          'Second cell',
          // TimeTable
          'Third cell',
          'Fourth cell',
          'Fifth cell',
          'Sixth cell',
          // All-day panel
          'Seventh cell',
          'Eighth cell',
          // TimeTable
          'Ninth cell',
          'Tenth cell',
          'Eleventh cell',
          'Twelfth cell',
        ],
      };
      const groups = [[{}, {}]];

      expect(updateTimeTableCellElementsMeta(
        timeTableCellElementsMeta, () => VERTICAL_GROUP_ORIENTATION, groups, true,
        viewCellsData, {},
      ))
        .toEqual({
          parentRect: 'Parent rect',
          getCellRects: [
            // TimeTable
            'Third cell',
            'Fourth cell',
            'Fifth cell',
            'Sixth cell',
            // TimeTable
            'Ninth cell',
            'Tenth cell',
            'Eleventh cell',
            'Twelfth cell',
          ],
        });
    });
  });

  describe('#updateAllDayCellElementsMeta', () => {
    it('should not update if timeTableCellElementsMeta\'s getCellRects is undefined', () => {
      const timeTableCellElementsMeta = {};
      const allDayElementsMeta = { test: 'test' };
      expect(updateAllDayCellElementsMeta(
        allDayElementsMeta, timeTableCellElementsMeta, () => VERTICAL_GROUP_ORIENTATION,
        'groups', true, 'viewCellsData', {},
      ))
        .toEqual(allDayElementsMeta);
    });
    it('should leave cell elements as they are if groupOrientation is horizontal or all day panel does not exist', () => {
      const timeTableCellElementsMeta = { getCellRects: 'test' };
      const allDayElementsMeta = { test: 'test' };

      let allDayPanelExists = false;
      expect(updateAllDayCellElementsMeta(
        allDayElementsMeta, timeTableCellElementsMeta, () => VERTICAL_GROUP_ORIENTATION,
        'groups', allDayPanelExists, 'viewCellsData', {},
      ))
        .toEqual(allDayElementsMeta);

      allDayPanelExists = true;
      expect(updateAllDayCellElementsMeta(
        allDayElementsMeta, timeTableCellElementsMeta, () => HORIZONTAL_GROUP_ORIENTATION,
        'groups', allDayPanelExists, 'viewCellsData', {},
      ))
        .toEqual(allDayElementsMeta);
    });
    it('should delete elements belonging to timetable cells', () => {
      const viewCellsData = [
        [{ groupingInfo: 'First group' }, { groupingInfo: 'First group' }],
        [{ groupingInfo: 'First group' }, { groupingInfo: 'First group' }],
        [{ groupingInfo: 'Second group' }, { groupingInfo: 'Second group' }],
        [{ groupingInfo: 'Second group' }, { groupingInfo: 'Second group' }],
      ];
      const timeTableCellElementsMeta = {
        parentRect: 'Parent rect',
        getCellRects: [
          // All-day panel
          'First cell',
          'Second cell',
          // TimeTable
          'Third cell',
          'Fourth cell',
          'Fifth cell',
          'Sixth cell',
          // All-day panel
          'Seventh cell',
          'Eighth cell',
          // TimeTable
          'Ninth cell',
          'Tenth cell',
          'Eleventh cell',
          'Twelfth cell',
        ],
      };
      const allDayElementsMeta = {};
      const groups = [[{}, {}]];

      expect(updateAllDayCellElementsMeta(
        allDayElementsMeta, timeTableCellElementsMeta, () => VERTICAL_GROUP_ORIENTATION,
        groups, true, viewCellsData, {},
      ))
        .toEqual({
          parentRect: 'Parent rect',
          getCellRects: [
            // All-day panel
            'First cell',
            'Second cell',
            // All-day panel
            'Seventh cell',
            'Eighth cell',
          ],
        });
    });
  });

  describe('#updateTimeCellsData', () => {
    const groups = [[
      { fieldName: 'resource1', id: 1 },
      { fieldName: 'resource1', id: 2 },
    ]];
    const resources = [
      { fieldName: 'resource1' },
    ];
    const pacificTimezoneOffset = 480;
    const winterDate = new Date(2020, 2, 7);
    const isPacificTimeZone = winterDate.getTimezoneOffset() === pacificTimezoneOffset;

    it('should return viewCellsData if DST change is not present', () => {
      const viewCellsData = [[{
        startDate: new Date(2020, 11, 7),
        endDate: new Date(2020, 11, 7, 1),
      }]];

      const timeCells = updateTimeCellsData(
        viewCellsData,
        undefined,
        groups,
        resources,
        HORIZONTAL_GROUP_ORIENTATION,
      );
      expect(timeCells)
        .toBe(viewCellsData);
    });

    if (isPacificTimeZone) {
      it('should return timeCells if DST change is present and horizontal grouping is used', () => {
        const viewCellsData = [[{
          startDate: new Date(2020, 2, 8),
          endDate: new Date(2020, 2, 8, 1),
        }]];
        const previousTimeCells = [[{
          startDate: new Date(2020, 2, 9),
          endDate: new Date(2020, 2, 9, 1),
        }]];

        const timeCells = updateTimeCellsData(
          viewCellsData,
          previousTimeCells,
          groups,
          resources,
          HORIZONTAL_GROUP_ORIENTATION,
        );

        expect(timeCells)
          .not.toBe(viewCellsData);
        expect(timeCells)
          .toBe(previousTimeCells);
      });

      // tslint:disable-next-line: max-line-length
      it('should return correct timeCells if DST change is present and vertical grouping is used', () => {
        const viewCellsData = [[{
          startDate: new Date(2020, 2, 8),
          endDate: new Date(2020, 2, 8, 1),
        }]];
        const previousTimeCells = [[{
          startDate: new Date(2020, 2, 9),
          endDate: new Date(2020, 2, 9, 1),
        }]];

        const timeCells = updateTimeCellsData(
          viewCellsData,
          previousTimeCells,
          groups,
          resources,
          VERTICAL_GROUP_ORIENTATION,
        );

        expect(timeCells)
          .not.toBe(viewCellsData);
        expect(timeCells)
          .not.toBe(previousTimeCells);

        expect(timeCells)
          .toEqual([[{
            startDate: new Date(2020, 2, 9),
            endDate: new Date(2020, 2, 9, 1),
            groupingInfo: [{
              id: 1,
              fieldName: 'resource1',
            }],
            endOfGroup: true,
            groupOrientation: VERTICAL_GROUP_ORIENTATION,
          }], [{
            startDate: new Date(2020, 2, 9),
            endDate: new Date(2020, 2, 9, 1),
            groupingInfo: [{
              id: 2,
              fieldName: 'resource1',
            }],
            endOfGroup: true,
            groupOrientation: VERTICAL_GROUP_ORIENTATION,
          }]]);
      });
    }
  });
});
