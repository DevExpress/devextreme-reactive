import {
  validateResources, convertResourcesToPlain, addResourcesToAppointments,
} from './computeds';
import { getAppointmentResources } from './helpers';

jest.mock('./helpers', () => ({
  ...jest.requireActual('./helpers'),
  getAppointmentResources: jest.fn(),
}));

describe('Resources computeds', () => {
  describe('#validateResources', () => {
    const baseResources = [
      { fieldName: 'ownerId', instances: [{ id: 0 }] },
    ];
    const palette = ['red', 'brown', 'green', 'pink'];

    it('should assign properties according to resource title', () => {
      const resources = [
        { fieldName: 'ownerId', title: 'Owner', instances: [{ id: 0 }] },
      ];
      expect(validateResources(resources, undefined, palette))
        .toEqual([
          {
            fieldName: 'ownerId',
            allowMultiple: false,
            isMain: true,
            title: 'Owner',
            instances: [{
              id: 0,
              color: 'red',
              allowMultiple: false,
              isMain: true,
              text: 'Owner',
              title: 'Owner',
              fieldName: 'ownerId',
            }],
          },
        ]);
    });
    it('should assign properties according to resource text', () => {
      const resources = [
        { fieldName: 'ownerId', title: 'Owner', instances: [{ id: 0, text: 'Maxim' }] },
      ];
      expect(validateResources(resources, undefined, palette))
        .toEqual([
          {
            fieldName: 'ownerId',
            allowMultiple: false,
            isMain: true,
            title: 'Owner',
            instances: [{
              id: 0,
              color: 'red',
              allowMultiple: false,
              isMain: true,
              text: 'Maxim',
              title: 'Owner',
              fieldName: 'ownerId',
            }],
          },
        ]);
    });
    it('should assign the Main flag to single resource', () => {
      expect(validateResources(baseResources, undefined, palette))
        .toEqual([
          {
            fieldName: 'ownerId',
            allowMultiple: false,
            isMain: true,
            title: 'ownerId',
            instances: [{
              id: 0,
              color: 'red',
              allowMultiple: false,
              isMain: true,
              text: 'ownerId',
              title: 'ownerId',
              fieldName: 'ownerId',
            }],
          },
        ]);
    });
    it('should not assign the Main flag to two resource', () => {
      const resources = [
        { fieldName: 'ownerId', instances: [{ id: 0 }] },
        { fieldName: 'roomId', instances: [{ id: 0 }] },
      ];
      expect(validateResources(resources, undefined, palette))
        .toEqual([
          {
            fieldName: 'ownerId',
            allowMultiple: false,
            isMain: true,
            title: 'ownerId',
            instances: [{
              id: 0,
              color: 'red',
              allowMultiple: false,
              isMain: true,
              text: 'ownerId',
              title: 'ownerId',
              fieldName: 'ownerId',
            }],
          },
          {
            fieldName: 'roomId',
            allowMultiple: false,
            isMain: false,
            title: 'roomId',
            instances: [{
              id: 0,
              color: 'brown',
              allowMultiple: false,
              isMain: false,
              text: 'roomId',
              title: 'roomId',
              fieldName: 'roomId',
            }],
          },
        ]);
    });
    it('should assign the Main flag according to MainResourceName', () => {
      const resources = [
        { fieldName: 'ownerId', instances: [{ id: 0 }] },
        { fieldName: 'roomId', instances: [{ id: 0 }] },
      ];
      expect(validateResources(resources, 'roomId', palette))
        .toEqual([
          {
            fieldName: 'ownerId',
            allowMultiple: false,
            isMain: false,
            title: 'ownerId',
            instances: [{
              id: 0,
              color: 'red',
              allowMultiple: false,
              isMain: false,
              text: 'ownerId',
              title: 'ownerId',
              fieldName: 'ownerId',
            }],
          },
          {
            fieldName: 'roomId',
            allowMultiple: false,
            isMain: true,
            title: 'roomId',
            instances: [{
              id: 0,
              color: 'brown',
              allowMultiple: false,
              isMain: true,
              text: 'roomId',
              title: 'roomId',
              fieldName: 'roomId',
            }],
          },
        ]);
    });
    it('should assign correct colors even when palette length is less than the number of resource instances', () => {
      const resources = [{
        fieldName: 'roomId',
        instances: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
      }];
      const smallPalette = ['red', 'blue'];
      expect(validateResources(resources, 'roomId', smallPalette))
        .toEqual([
          {
            fieldName: 'roomId',
            allowMultiple: false,
            isMain: true,
            title: 'roomId',
            instances: [{
              id: 1,
              color: 'red',
              allowMultiple: false,
              isMain: true,
              text: 'roomId',
              title: 'roomId',
              fieldName: 'roomId',
            }, {
              id: 2,
              color: 'blue',
              allowMultiple: false,
              isMain: true,
              text: 'roomId',
              title: 'roomId',
              fieldName: 'roomId',
            }, {
              id: 3,
              color: 'red',
              allowMultiple: false,
              isMain: true,
              text: 'roomId',
              title: 'roomId',
              fieldName: 'roomId',
            }, {
              id: 4,
              color: 'blue',
              allowMultiple: false,
              isMain: true,
              text: 'roomId',
              title: 'roomId',
              fieldName: 'roomId',
            }],
          },
        ]);
    });
  });
  describe('#convertResourcesToPlain', () => {
    const validResources = [
      {
        fieldName: 'ownerId',
        allowMultiple: false,
        isMain: false,
        title: 'ownerId',
        instances: [{
          id: 0,
          color: 'red',
          allowMultiple: false,
          isMain: false,
          text: 'ownerId',
          title: 'ownerId',
          fieldName: 'ownerId',
        }],
      },
      {
        fieldName: 'roomId',
        allowMultiple: false,
        isMain: true,
        title: 'roomId',
        instances: [{
          id: 0,
          color: 'brown',
          allowMultiple: false,
          isMain: true,
          text: 'roomId',
          title: 'roomId',
          fieldName: 'roomId',
        }],
      },
    ];
    it('should convert resource', () => {
      expect(convertResourcesToPlain(validResources))
        .toEqual([{
          id: 0,
          color: 'red',
          allowMultiple: false,
          isMain: false,
          text: 'ownerId',
          title: 'ownerId',
          fieldName: 'ownerId',
        }, {
          id: 0,
          color: 'brown',
          allowMultiple: false,
          isMain: true,
          text: 'roomId',
          title: 'roomId',
          fieldName: 'roomId',
        }]);
    });
  });
  describe('#addResourcesToAppointments', () => {
    const appointments = [
      { dataItem: { test: 'test1' } },
      { dataItem: { test: 'test2' } },
    ];
    const resources = [];
    const plainResources = [];
    beforeEach(() => {
      getAppointmentResources.mockImplementation(() => 'getAppointmentResources');
    });
    it('should add resources to all the appointments and wrap them in an array', () => {
      expect(addResourcesToAppointments(appointments, resources, plainResources))
        .toEqual([[{
          dataItem: { test: 'test1' },
          resources: 'getAppointmentResources',
        }, {
          dataItem: { test: 'test2' },
          resources: 'getAppointmentResources',
        }]]);
      expect(getAppointmentResources)
        .toHaveBeenCalledTimes(2);
      expect(getAppointmentResources)
        .toHaveBeenCalledWith({ test: 'test1' }, resources, plainResources);
      expect(getAppointmentResources)
        .toHaveBeenCalledWith({ test: 'test1' }, resources, plainResources);
    });
  });
});
