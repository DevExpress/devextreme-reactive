import {
  getGroupFromResourceInstance, addGroupInfoToCells, addGroupInfoToCell,
  groupAppointments, expandGroupedAppointment, rearrangeResources,
} from './helpers';
import { HORIZONTAL_GROUP_ORIENTATION } from '../../constants';

describe('IntegratedGrouping helpers', () => {
  describe('#getGroupFromResourceInstance', () => {
    it('should work', () => {
      const resourceInstance = {
        id: 1,
        text: 'text',
        fieldName: 'fieldName',
        color: '#ffffff',
      };
      expect(getGroupFromResourceInstance(resourceInstance))
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
      const groups = [[
        { fieldName: 'resource1', id: 1 },
        { fieldName: 'resource1', id: 2 },
      ]];
      expect(addGroupInfoToCells(
        groups[0][0], groups, resources, viewCellsDataRow, 0, true, HORIZONTAL_GROUP_ORIENTATION,
      ))
        .toEqual([{
          startDate: new Date('2018-06-24 08:00'),
          endDate: new Date('2018-06-24 08:30'),
          groupingInfo: [groups[0][0]],
          endOfGroup: true,
          groupOrientation: HORIZONTAL_GROUP_ORIENTATION,
        },
        {
          startDate: new Date('2018-06-24 08:30'),
          endDate: new Date('2018-06-24 09:00'),
          groupingInfo: [groups[0][0]],
          endOfGroup: true,
          groupOrientation: HORIZONTAL_GROUP_ORIENTATION,
        }]);
    });
  });

  describe('#addGroupInfoToCell', () => {
    it('should work', () => {
      const viewCell = { startDate: new Date('2018-06-24 08:00'), endDate: new Date('2018-06-24 08:30') };
      const resources = [{
        fieldName: 'resource1',
        instances: [
          { id: 1, text: 'text1', fieldName: 'resource1' },
          { id: 2, text: 'text2', fieldName: 'resource1' },
        ],
      }];
      const groups = [[
        { fieldName: 'resource1', id: 1 },
        { fieldName: 'resource1', id: 2 },
      ]];
      expect(addGroupInfoToCell(
        groups[0][0], groups, resources, viewCell, 0,
      ))
        .toEqual({
          startDate: new Date('2018-06-24 08:00'),
          endDate: new Date('2018-06-24 08:30'),
          groupingInfo: [groups[0][0]],
        });
    });
  });

  describe('#groupAppointments', () => {
    it('should group appointments into different arrays depending on their resources', () => {
      const resources = [{
        fieldName: 'resource1',
        instances: [{ id: 'resource1_1' }, { id: 'resource1_2' }],
        isMain: true,
      }, {
        fieldName: 'resource2',
        instances: [{ id: 'resource2_1' }, { id: 'resource2_2' }],
      }, {
        fieldName: 'resource3',
        instances: [{ id: 'resource3_1' }, { id: 'resource3_2' }],
      }];
      const appointments = [{
        resource1: 'resource1_1',
        resource2: 'resource2_1',
        resource3: 'resource3_1',
        dataItem: {
          resource1: 'resource1_1',
          resource2: 'resource2_1',
          resource3: 'resource3_1',
        },
      }, {
        resource1: 'resource1_1',
        resource2: 'resource2_1',
        resource3: 'resource3_2',
        dataItem: {
          resource1: 'resource1_1',
          resource2: 'resource2_1',
          resource3: 'resource3_2',
        },
      }, {
        resource1: 'resource1_1',
        resource2: 'resource2_2',
        resource3: 'resource3_1',
        dataItem: {
          resource1: 'resource1_1',
          resource2: 'resource2_2',
          resource3: 'resource3_1',
        },
      }, {
        resource1: 'resource1_1',
        resource2: 'resource2_2',
        resource3: 'resource3_2',
        dataItem: {
          resource1: 'resource1_1',
          resource2: 'resource2_2',
          resource3: 'resource3_2',
        },
      }, {
        resource1: 'resource1_2',
        resource2: 'resource2_1',
        resource3: 'resource3_1',
        dataItem: {
          resource1: 'resource1_2',
          resource2: 'resource2_1',
          resource3: 'resource3_1',
        },
      }, {
        resource1: 'resource1_2',
        resource2: 'resource2_1',
        resource3: 'resource3_2',
        dataItem: {
          resource1: 'resource1_2',
          resource2: 'resource2_1',
          resource3: 'resource3_2',
        },
      }, {
        resource1: 'resource1_2',
        resource2: 'resource2_2',
        resource3: 'resource3_1',
        dataItem: {
          resource1: 'resource1_2',
          resource2: 'resource2_2',
          resource3: 'resource3_1',
        },
      }, {
        resource1: 'resource1_2',
        resource2: 'resource2_2',
        resource3: 'resource3_2',
        dataItem: {
          resource1: 'resource1_2',
          resource2: 'resource2_2',
          resource3: 'resource3_2',
        },
      }];
      const groups = [[
        { fieldName: 'resource1', id: 'resource1_1' },
        { fieldName: 'resource1', id: 'resource1_2' },
      ], [
        { fieldName: 'resource2', id: 'resource2_1' },
        { fieldName: 'resource2', id: 'resource2_2' },
        { fieldName: 'resource2', id: 'resource2_1' },
        { fieldName: 'resource2', id: 'resource2_2' },
      ], [
        { fieldName: 'resource3', id: 'resource3_1' },
        { fieldName: 'resource3', id: 'resource3_2' },
        { fieldName: 'resource3', id: 'resource3_1' },
        { fieldName: 'resource3', id: 'resource3_2' },
        { fieldName: 'resource3', id: 'resource3_1' },
        { fieldName: 'resource3', id: 'resource3_2' },
        { fieldName: 'resource3', id: 'resource3_1' },
        { fieldName: 'resource3', id: 'resource3_2' },
      ]];

      expect(groupAppointments(appointments, resources, groups))
        .toEqual([
          [appointments[0]], [appointments[1]], [appointments[2]], [appointments[3]],
          [appointments[4]], [appointments[5]], [appointments[6]], [appointments[7]],
        ]);
    });
    it('should group into one array if resources or groups are undefined', () => {
      const appointments = [{
        resource1: 'resource1_1',
        resource2: 'resource2_1',
        resource3: 'resource3_1',
      }, {
        resource1: 'resource1_1',
        resource2: 'resource2_1',
        resource3: 'resource3_2',
      }, {
        resource1: 'resource1_1',
        resource2: 'resource2_2',
        resource3: 'resource3_1',
      }];

      expect(groupAppointments(appointments, undefined, []))
        .toEqual([appointments]);
      expect(groupAppointments(appointments, [], undefined))
        .toEqual([appointments]);
    });
    it('should work with multiple resources', () => {
      const resources = [{
        fieldName: 'resource1',
        allowMultiple: true,
        instances: [{ id: 1 }, { id: 2 }],
        isMain: true,
      }];
      const appointments = [{
        resource1: 1,
        dataItem: { resource1: [1, 2] },
      }, {
        resource1: 2,
        dataItem: { resource1: [1, 2] },
      }];
      const groups = [[
        { fieldName: 'resource1', id: 1 },
        { fieldName: 'resource1', id: 2 },
      ]];

      expect(groupAppointments(appointments, resources, groups))
        .toEqual([[appointments[0]], [{
          ...appointments[1],
          dataItem: { resource1: [2, 1] },
        }]]);
    });
  });
  describe('#expandGroupedAppointment', () => {
    const grouping = [
      { resourceName: 'test1' },
      { resourceName: 'test2' },
    ];
    it('should add grouping fields from appointment\'s dataItem', () => {
      const resources = [
        { fieldName: 'test1' },
        { fieldName: 'test2' },
        { fieldName: 'test3' },
      ];
      const appointment = {
        dataItem: {
          test1: 1,
          test2: 2,
          test3: 3,
        },
      };

      expect(expandGroupedAppointment(appointment, grouping, resources))
        .toEqual([{
          dataItem: {
            test1: 1,
            test2: 2,
            test3: 3,
          },
          test1: 1,
          test2: 2,
        }]);
    });
    it('should create several appointments if a multiple resource is present', () => {
      const resources = [
        { fieldName: 'test1', allowMultiple: true },
        { fieldName: 'test2' },
        { resourceName: 'test3' },
      ];
      const appointment = {
        dataItem: {
          test1: [1, 2, 3],
          test2: 2,
          test3: 3,
        },
      };

      const result = expandGroupedAppointment(appointment, grouping, resources);
      expect(result[0])
        .toEqual({
          dataItem: {
            test1: [1, 2, 3],
            test2: 2,
            test3: 3,
          },
          test1: 1,
          test2: 2,
        });
      expect(result[1])
        .toEqual({
          dataItem: {
            test1: [1, 2, 3],
            test2: 2,
            test3: 3,
          },
          test1: 2,
          test2: 2,
        });
      expect(result[2])
        .toEqual({
          dataItem: {
            test1: [1, 2, 3],
            test2: 2,
            test3: 3,
          },
          test1: 3,
          test2: 2,
        });
    });
    it('should return appointment as it is (inside an array) if resources are undefined', () => {
      const appointment = {
        dataItem: {
          test1: 1,
          test2: 2,
          test3: 3,
        },
      };

      expect(expandGroupedAppointment(appointment, [], undefined))
        .toEqual([appointment]);
    });
    it('should return appointment as it is (inside an array) if grouping is undefined', () => {
      const appointment = {
        dataItem: {
          test1: 1,
          test2: 2,
          test3: 3,
        },
      };

      expect(expandGroupedAppointment(appointment, undefined, []))
        .toEqual([appointment]);
    });
  });

  describe('#rearrangeResources', () => {
    const appointment = {
      resources: [
        { id: 1, isMain: false },
        { id: 1, isMain: true },
        { id: 2, isMain: true },
      ],
    };
    it('should work', () => {
      const resource = {
        allowMultiple: true,
      };
      expect(rearrangeResources(resource, appointment, 2))
        .toEqual([
          { id: 1, isMain: false },
          { id: 2, isMain: true },
          { id: 1, isMain: true },
        ]);
    });
    it('should return resources without changes if main resource is not multiple', () => {
      const resource = {
        allowMultiple: false,
      };
      expect(rearrangeResources(resource, appointment, 2))
        .toEqual([
          { id: 1, isMain: false },
          { id: 1, isMain: true },
          { id: 2, isMain: true },
        ]);
    });
  });
});
