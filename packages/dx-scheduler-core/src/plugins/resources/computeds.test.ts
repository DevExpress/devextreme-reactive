import { getAppointmentResources, validateResources, convertResourcesToPlain } from './computeds';

describe('Resources computeds', () => {
  describe('#validateResources', () => {
    const baseResources = [
      { fieldName: 'ownerId', items: [{ id: 0 }] },
    ];
    const palette = ['red', 'brown', 'green', 'pink'];

    it('should assign properties according to resource title', () => {
      const resources = [
        { fieldName: 'ownerId', title: 'Owner', items: [{ id: 0 }] },
      ];
      expect(validateResources(resources, undefined, palette))
        .toEqual([
          {
            fieldName: 'ownerId',
            allowMultiple: false,
            isMain: true,
            title: 'Owner',
            items: [{
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
        { fieldName: 'ownerId', title: 'Owner', items: [{ id: 0, text: 'Maxim' }] },
      ];
      expect(validateResources(resources, undefined, palette))
        .toEqual([
          {
            fieldName: 'ownerId',
            allowMultiple: false,
            isMain: true,
            title: 'Owner',
            items: [{
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
            items: [{
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
        { fieldName: 'ownerId', items: [{ id: 0 }] },
        { fieldName: 'roomId', items: [{ id: 0 }] },
      ];
      expect(validateResources(resources, undefined, palette))
        .toEqual([
          {
            fieldName: 'ownerId',
            allowMultiple: false,
            isMain: true,
            title: 'ownerId',
            items: [{
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
            items: [{
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
        { fieldName: 'ownerId', items: [{ id: 0 }] },
        { fieldName: 'roomId', items: [{ id: 0 }] },
      ];
      expect(validateResources(resources, 'roomId', palette))
        .toEqual([
          {
            fieldName: 'ownerId',
            allowMultiple: false,
            isMain: false,
            title: 'ownerId',
            items: [{
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
            items: [{
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
  });
  describe('#convertResourcesToPlain', () => {
    const validResources = [
      {
        fieldName: 'ownerId',
        allowMultiple: false,
        isMain: false,
        title: 'ownerId',
        items: [{
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
        items: [{
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
});
