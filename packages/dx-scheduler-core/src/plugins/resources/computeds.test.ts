import { attachResources } from './computeds';

describe('Resources computeds', () => {
  describe('#attachResources', () => {
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

      expect(attachResources(appointment, resources, undefined))
        .toEqual(appointment);
    });
    it('should provide resources if these are existed', () => {
      const appointment = {
        start: new Date('2019-10-23T12:00'),
        end: new Date('2019-10-23T12:00'),
        dataItem: { data: 1, ownerId: 0 },
      };
      const resources = [{
        fieldName: 'ownerId',
        items: [{
          id: 0, color: 'red', text: 'owner 0',
        }],
      }];

      expect(attachResources(appointment, resources, undefined))
        .toEqual({
          ...appointment,
          resources: [
            {
              id: 0,
              fieldName: 'ownerId',
              color: 'red',
              text: 'owner 0',
              title: 'ownerId',
              isMain: true,
              allowMultiple: false,
            },
          ],
        });
    });
    it('should provide multiple resources', () => {
      const appointment = {
        start: new Date('2019-10-23T12:00'),
        end: new Date('2019-10-23T12:00'),
        dataItem: { data: 1, ownerId: [0, 1] },
      };
      const resources = [{
        fieldName: 'ownerId',
        allowMultiple: true,
        items: [
          { id: 0, color: 'red', text: 'owner 0' },
          { id: 1, color: 'blue', text: 'owner 1' },
        ],
      }];

      expect(attachResources(appointment, resources, undefined))
        .toEqual({
          ...appointment,
          resources: [
            {
              id: 0,
              fieldName: 'ownerId',
              color: 'red',
              text: 'owner 0',
              title: 'ownerId',
              isMain: true,
              allowMultiple: true,
            },
            {
              id: 1,
              fieldName: 'ownerId',
              color: 'blue',
              text: 'owner 1',
              title: 'ownerId',
              isMain: false,
              allowMultiple: true,
            },
          ],
        });
    });
    it('should not provide multiple resources without allowMultiple flag', () => {
      // maybe throw error?
      const appointment = {
        start: new Date('2019-10-23T12:00'),
        end: new Date('2019-10-23T12:00'),
        dataItem: { data: 1, ownerId: [1, 0] },
      };
      const resources = [{
        fieldName: 'ownerId',
        items: [
          { id: 0, color: 'red', text: 'owner 0' },
          { id: 1, color: 'blue', text: 'owner 1' },
        ],
      }];

      expect(attachResources(appointment, resources, undefined))
        .toEqual(appointment);
    });
    it('should not provide multiple resources groups', () => {
      const appointment = {
        start: new Date('2019-10-23T12:00'),
        end: new Date('2019-10-23T12:00'),
        dataItem: { data: 1, ownerId: 0, locationId: 1 },
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

      expect(attachResources(appointment, resources, undefined))
        .toEqual({
          ...appointment,
          resources: [
            {
              id: 0,
              fieldName: 'ownerId',
              color: 'red',
              text: 'owner 0',
              title: 'ownerId',
              isMain: true,
              allowMultiple: false,
            },
            {
              id: 1,
              fieldName: 'locationId',
              color: 'brown',
              text: 'location 1',
              title: 'locationId',
              isMain: false,
              allowMultiple: false,
            },
          ],
        });
    });
    // TODO: maybe remove this test because it is excess?
    it('should not provide main resource group to first appointment resource item', () => {
      const appointment = {
        start: new Date('2019-10-23T12:00'),
        end: new Date('2019-10-23T12:00'),
        dataItem: { data: 1, ownerId: 0, locationId: 1 },
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

      expect(attachResources(appointment, resources, undefined))
        .toEqual({
          ...appointment,
          resources: [
            {
              id: 0,
              fieldName: 'ownerId',
              color: 'red',
              text: 'owner 0',
              title: 'ownerId',
              isMain: true,
              allowMultiple: false,
            },
            {
              id: 1,
              fieldName: 'locationId',
              color: 'brown',
              text: 'location 1',
              title: 'locationId',
              isMain: false,
              allowMultiple: false,
            },
          ],
        });
    });
    it('should provide main resources groups', () => {
      const mainResourceName = 'locationId';
      const appointment = {
        start: new Date('2019-10-23T12:00'),
        end: new Date('2019-10-23T12:00'),
        dataItem: { data: 1, ownerId: 0, locationId: 1 },
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

      expect(attachResources(appointment, resources, mainResourceName))
        .toEqual({
          ...appointment,
          resources: [
            {
              id: 0,
              fieldName: 'ownerId',
              color: 'red',
              text: 'owner 0',
              title: 'ownerId',
              isMain: false,
              allowMultiple: false,
            },
            {
              id: 1,
              fieldName: 'locationId',
              color: 'brown',
              text: 'location 1',
              title: 'locationId',
              isMain: true,
              allowMultiple: false,
            },
          ],
        });
    });
  });
});
