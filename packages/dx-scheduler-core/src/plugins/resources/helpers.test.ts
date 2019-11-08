import { getAppointmentResources } from './helpers';

describe('Resources helpers', () => {
  describe('#getAppointmentResources', () => {
    it('should return an empty array if resources is an empty array', () => {
      const appointment = {};
      const resources = [];

      expect(getAppointmentResources(appointment, resources, undefined))
        .toEqual([]);
    });
    it('should not return resources if none of them belong to the appointment', () => {
      const appointment = {};
      const resources = [{
        fieldName: 'ownerId',
        items: [{ id: 0 }],
      }];

      expect(getAppointmentResources(appointment, resources, undefined))
        .toEqual([]);
    });
    it('should provide resources in simple case', () => {
      const appointment = { ownerId: 0 };
      const resources = [{
        fieldName: 'ownerId',
        items: [{ id: 0, fieldName: 'ownerId', allowMultiple: false }],
      }];
      const plainResources = [{ id: 0, fieldName: 'ownerId', allowMultiple: false }];

      expect(getAppointmentResources(appointment, resources, plainResources))
        .toEqual([
          { id: 0, fieldName: 'ownerId', allowMultiple: false },
        ]);
    });
    it('should provide multiple resources', () => {
      const appointment = {
        ownerId: [0, 1],
      };
      const resources = [{
        fieldName: 'ownerId',
        allowMultiple: true,
        items: [
          { id: 0, fieldName: 'ownerId', allowMultiple: true },
          { id: 1, fieldName: 'ownerId', allowMultiple: true },
        ],
      }];
      const plainResources = [
        { id: 0, fieldName: 'ownerId', allowMultiple: true },
        { id: 1, fieldName: 'ownerId', allowMultiple: true },
      ];

      expect(getAppointmentResources(appointment, resources, plainResources))
        .toEqual([
          { id: 0, fieldName: 'ownerId', allowMultiple: true },
          { id: 1, fieldName: 'ownerId', allowMultiple: true },
        ]);
    });
    it('should not provide multiple resources without allowMultiple flag', () => {
      // maybe throw error?
      const appointment = { ownerId: [1, 0] };
      const resources = [{
        fieldName: 'ownerId',
        items: [{ id: 0, fieldName: 'ownerId' }, { id: 1, fieldName: 'ownerId' }],
      }];
      const plainResources = [
        { id: 0, fieldName: 'ownerId' },
        { id: 1, fieldName: 'ownerId' },
      ];

      expect(getAppointmentResources(appointment, resources, plainResources))
        .toEqual([]);
    });
    it('should not provide multiple resources groups', () => {
      const appointment = { ownerId: 0, locationId: 1 };
      const resources = [{
        fieldName: 'ownerId',
        items: [{ id: 0, fieldName: 'ownerId' }, { id: 1, fieldName: 'ownerId' }],
      }, {
        fieldName: 'locationId',
        items: [{ id: 0, fieldName: 'locationId' }, { id: 1, fieldName: 'locationId' }],
      }];
      const plainResources = [
        { id: 0, fieldName: 'ownerId', allowMultiple: false },
        { id: 1, fieldName: 'ownerId', allowMultiple: false },
        { id: 0, fieldName: 'locationId', allowMultiple: false },
        { id: 1, fieldName: 'locationId', allowMultiple: false },
      ];

      expect(getAppointmentResources(appointment, resources, plainResources))
        .toEqual([
          { id: 0, fieldName: 'ownerId', allowMultiple: false },
          { id: 1, fieldName: 'locationId', allowMultiple: false },
        ]);
    });
    it('should provide main resources groups', () => {
      const appointment = {
        start: new Date('2019-10-23T12:00'),
        end: new Date('2019-10-23T12:00'),
        dataItem: { data: 1 },
        ownerId: 0,
        locationId: 1,
      };
      const resources = [{
        fieldName: 'ownerId',
        items: [
          { id: 0, fieldName: 'ownerId' },
          { id: 1, fieldName: 'ownerId' },
        ],
      }, {
        fieldName: 'locationId',
        items: [
          { id: 0, fieldName: 'locationId' },
          { id: 1, fieldName: 'locationId' },
        ],
      }];
      const plainResources = [
        { id: 0, fieldName: 'ownerId', allowMultiple: false },
        { id: 1, fieldName: 'ownerId', allowMultiple: false },
        { id: 0, fieldName: 'locationId', allowMultiple: false },
        { id: 1, fieldName: 'locationId', allowMultiple: false },
      ];

      expect(getAppointmentResources(appointment, resources, plainResources))
        .toEqual([
          { id: 0, fieldName: 'ownerId', allowMultiple: false },
          { id: 1, fieldName: 'locationId', allowMultiple: false },
        ]);
    });
  });
});
