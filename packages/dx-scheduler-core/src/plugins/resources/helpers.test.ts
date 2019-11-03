import { getAppointmentResources } from './helpers';

describe('Resources helpers', () => {
  describe('#getAppointmentResources', () => {
    it('should not provide resources if these are zero array', () => {
      const appointment = {
        start: new Date('2019-10-23T12:00'),
        end: new Date('2019-10-23T12:00'),
        dataItem: { data: 1 },
      };
      const resources = [];

      expect(getAppointmentResources(appointment, resources, undefined))
        .toEqual([]);
    });
    it('should not provide resources if these are not existed', () => {
      const appointment = {
        start: new Date('2019-10-23T12:00'),
        end: new Date('2019-10-23T12:00'),
        dataItem: { data: 1 },
      };
      const resources = [{
        fieldName: 'ownerId',
        items: [{
          id: 0, color: 'red', text: 'owner 0',
        }],
      }];

      expect(getAppointmentResources(appointment, resources, undefined))
        .toEqual([]);
    });
    it('should provide resources if these are existed', () => {
      const appointment = {
        start: new Date('2019-10-23T12:00'),
        end: new Date('2019-10-23T12:00'),
        dataItem: { data: 1 },
        ownerId: 0,
      };
      const resources = [{
        fieldName: 'ownerId',
        items: [{
          id: 0, color: 'red', text: 'owner 0', fieldName: 'ownerId', allowMultiple: false, title: 'owner 0', isMain: true,
        }],
      }];
      const plainResources = [{
        id: 0, color: 'red', text: 'owner 0', fieldName: 'ownerId', allowMultiple: false, title: 'owner 0', isMain: true,
      }];

      expect(getAppointmentResources(appointment, resources, plainResources))
        .toEqual([
          {
            id: 0,
            fieldName: 'ownerId',
            color: 'red',
            text: 'owner 0',
            title: 'owner 0',
            isMain: true,
            allowMultiple: false,
          },
        ]);
    });
    it('should provide multiple resources', () => {
      const appointment = {
        start: new Date('2019-10-23T12:00'),
        end: new Date('2019-10-23T12:00'),
        dataItem: { data: 1 },
        ownerId: [0, 1],
      };
      const resources = [{
        fieldName: 'ownerId',
        allowMultiple: true,
        items: [
          { id: 0, color: 'red', text: 'owner 0', fieldName: 'ownerId', allowMultiple: true, title: 'owner 0', isMain: true },
          { id: 1, color: 'blue', text: 'owner 1', fieldName: 'ownerId', allowMultiple: true, title: 'owner 1', isMain: true },
        ],
      }];
      const plainResources = [
        { id: 0, color: 'red', text: 'owner 0', fieldName: 'ownerId', allowMultiple: true, title: 'owner 0', isMain: true },
        { id: 1, color: 'blue', text: 'owner 1', fieldName: 'ownerId', allowMultiple: true, title: 'owner 1', isMain: true },
      ];

      expect(getAppointmentResources(appointment, resources, plainResources))
        .toEqual([
          {
            id: 0,
            fieldName: 'ownerId',
            color: 'red',
            text: 'owner 0',
            title: 'owner 0',
            isMain: true,
            allowMultiple: true,
          },
          {
            id: 1,
            fieldName: 'ownerId',
            color: 'blue',
            text: 'owner 1',
            title: 'owner 1',
            isMain: true,
            allowMultiple: true,
          },
        ]);
    });
    it('should not provide multiple resources without allowMultiple flag', () => {
      // maybe throw error?
      const appointment = {
        start: new Date('2019-10-23T12:00'),
        end: new Date('2019-10-23T12:00'),
        dataItem: { data: 1 },
        ownerId: [1, 0],
      };
      const resources = [{
        fieldName: 'ownerId',
        items: [
          { id: 0, color: 'red', text: 'owner 0' },
          { id: 1, color: 'blue', text: 'owner 1' },
        ],
      }];
      const plainResources = [
        { id: 0, color: 'red', text: 'owner 0' },
        { id: 1, color: 'blue', text: 'owner 1' },
      ];

      expect(getAppointmentResources(appointment, resources, plainResources))
        .toEqual([]);
    });
    it('should not provide multiple resources groups', () => {
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
          { id: 0, color: 'red', text: 'owner 0' },
          { id: 1, color: 'blue', text: 'owner 1' },
        ],
      }, {
        fieldName: 'locationId',
        items: [
          { id: 0, color: 'green', text: 'location 0' },
          { id: 1, color: 'brown', text: 'location 1' },
        ],
      }];
      const plainResources = [
        { id: 0, color: 'red', text: 'owner 0', fieldName: 'ownerId', isMain: true, allowMultiple: false },
        { id: 1, color: 'blue', text: 'owner 1', fieldName: 'ownerId', isMain: true, allowMultiple: false },
        { id: 0, color: 'green', text: 'location 0', fieldName: 'locationId', isMain: false, allowMultiple: false },
        { id: 1, color: 'brown', text: 'location 1', fieldName: 'locationId', isMain: false, allowMultiple: false },
      ];

      expect(getAppointmentResources(appointment, resources, plainResources))
        .toEqual([
          {
            id: 0,
            fieldName: 'ownerId',
            color: 'red',
            text: 'owner 0',
            isMain: true,
            allowMultiple: false,
          },
          {
            id: 1,
            fieldName: 'locationId',
            color: 'brown',
            text: 'location 1',
            isMain: false,
            allowMultiple: false,
          },
        ]);
    });
    it('should provide main resources groups', () => {
      const mainResourceName = 'locationId';
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
          { id: 0, color: 'red', text: 'owner 0' },
          { id: 1, color: 'blue', text: 'owner 1' },
        ],
      }, {
        fieldName: 'locationId',
        items: [
          { id: 0, color: 'green', text: 'location 0' },
          { id: 1, color: 'brown', text: 'location 1' },
        ],
      }];
      const plainResources = [
        { id: 0, color: 'red', text: 'owner 0', fieldName: 'ownerId', isMain: false, allowMultiple: false },
        { id: 1, color: 'blue', text: 'owner 1', fieldName: 'ownerId', isMain: false, allowMultiple: false },
        { id: 0, color: 'green', text: 'location 0', fieldName: 'locationId', isMain: true, allowMultiple: false },
        { id: 1, color: 'brown', text: 'location 1', fieldName: 'locationId', isMain: true, allowMultiple: false },
      ];

      expect(getAppointmentResources(appointment, resources, plainResources))
        .toEqual([
          {
            id: 0,
            fieldName: 'ownerId',
            color: 'red',
            text: 'owner 0',
            isMain: false,
            allowMultiple: false,
          },
          {
            id: 1,
            fieldName: 'locationId',
            color: 'brown',
            text: 'location 1',
            isMain: true,
            allowMultiple: false,
          },
        ]);
    });
  });
});
