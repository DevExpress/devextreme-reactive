import {
  deleteCurrent,
  deleteAll,
  deletedCurrentAndFollowing,
} from './helpers';

describe('EditingState helpers', () => {
  describe('#deleteAll', () => {
    it('should work', () => {
      const appointmentData = { id: 0 };

      const changes = deleteAll(appointmentData);
      expect(changes).toEqual({ deleted: 0 });
    });
  });

  describe('#deleteCurrent', () => {
    it('should work without the exDate field', () => {
      const appointmentData = {
        id: 0,
        startDate: new Date(Date.UTC(2019, 6, 17, 14, 20)),
        endDate: new Date(Date.UTC(2019, 6, 17, 16)),
      };

      const changes = deleteCurrent(appointmentData);
      expect(changes).toEqual({ changed: { 0: { exDate: '20190717T142000Z' } } });
    });
    it('should work with the exDate field', () => {
      const appointmentData = {
        id: 0,
        startDate: new Date(Date.UTC(2019, 6, 17, 14, 20)),
        endDate: new Date(Date.UTC(2019, 6, 17, 16)),
        exDate: '20190716T142000Z',
      };

      const changes = deleteCurrent(appointmentData);
      expect(changes).toEqual({ changed: { 0: { exDate: '20190716T142000Z, 20190717T142000Z' } } });
    });
  });

  describe('#deletedCurrentAndFollowing', () => {
    it('should work without the exDate field', () => {
      const appointmentData = {
        id: 0,
        startDate: new Date(Date.UTC(2019, 6, 17, 14, 20)),
        endDate: new Date(Date.UTC(2019, 6, 17, 16)),
        rRule: 'FREQ=DAILY;COUNT=5',
        parentData: {
          startDate: new Date(Date.UTC(2019, 6, 15, 14, 20)),
          endDate: new Date(Date.UTC(2019, 6, 15, 16)),
        },
      };

      const changes = deletedCurrentAndFollowing(appointmentData);
      expect(changes).toEqual({ changed: { 0: {
        rRule: 'FREQ=DAILY;UNTIL=20190717T142000Z',
      } } });
    });

    it('should remove exDate field if it placed after deleted date', () => {
      const appointmentData = {
        id: 0,
        startDate: new Date(Date.UTC(2019, 6, 17, 14, 20)),
        endDate: new Date(Date.UTC(2019, 6, 17, 16)),
        rRule: 'FREQ=DAILY;COUNT=5',
        exDate: '20190716T142000Z,20190718T142000Z',
        parentData: {
          startDate: new Date(Date.UTC(2019, 6, 15, 14, 20)),
          endDate: new Date(Date.UTC(2019, 6, 15, 16)),
        },
      };

      const changes = deletedCurrentAndFollowing(appointmentData);
      expect(changes).toEqual({ changed: { 0: {
        rRule: 'FREQ=DAILY;UNTIL=20190717T142000Z',
        exDate: '20190716T142000Z',
      } } });
    });

    it('should not remove exDate field if it placed before deleted date', () => {
      const appointmentData = {
        id: 0,
        startDate: new Date(Date.UTC(2019, 6, 17, 14, 20)),
        endDate: new Date(Date.UTC(2019, 6, 17, 16)),
        rRule: 'FREQ=DAILY;COUNT=5',
        exDate: '20190716T142000Z',
        parentData: {
          startDate: new Date(Date.UTC(2019, 6, 15, 14, 20)),
          endDate: new Date(Date.UTC(2019, 6, 15, 16)),
        },
      };

      const changes = deletedCurrentAndFollowing(appointmentData);
      expect(changes).toEqual({ changed: { 0: {
        rRule: 'FREQ=DAILY;UNTIL=20190717T142000Z',
      } } });
    });
  });
});
