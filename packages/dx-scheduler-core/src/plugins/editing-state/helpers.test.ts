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
        id: 0, startDate: new Date('2019-07-17 14:20'), endDate: new Date('2019-07-17 16:00'),
      };

      const changes = deleteCurrent(appointmentData);
      expect(changes).toEqual({ changed: { 0: { exDate: '20190717T112000Z' } } });
    });
    it('should work with the exDate field', () => {
      const appointmentData = {
        id: 0,
        startDate: new Date('2019-07-17 14:20'),
        endDate: new Date('2019-07-17 16:00'),
        exDate: '20190716T112000Z',
      };

      const changes = deleteCurrent(appointmentData);
      expect(changes).toEqual({ changed: { 0: { exDate: '20190716T112000Z, 20190717T112000Z' } } });
    });
  });

  describe('#deletedCurrentAndFollowing', () => {
    it('should work without the exDate field', () => {
      const appointmentData = {
        id: 0,
        startDate: new Date('2019-07-17 14:20'),
        endDate: new Date('2019-07-17 16:00'),
        rRule: 'FREQ=DAILY;COUNT=5',
        parentData: {
          startDate: new Date('2019-07-15 14:20'),
          endDate: new Date('2019-07-15 16:00'),
        },
      };

      const changes = deleteAll(appointmentData);
      expect(changes).toEqual({ changed: { 0: {
        rRule: 'FREQ=DAILY;COUNT=2',
      } } });
    });

    // TODO!!!!
    it('should work with exDate field', () => {
      const appointmentData = {
        id: 0,
        startDate: new Date('2019-07-17 14:20'),
        endDate: new Date('2019-07-17 16:00'),
        rRule: 'FREQ=DAILY;COUNT=5',
        exDate: '20190716T112000Z',
        parentData: {
          startDate: new Date('2019-07-15 14:20'),
          endDate: new Date('2019-07-15 16:00'),
        },
      };

      const changes = deleteAll(appointmentData);
      expect(changes).toEqual({ changed: { 0: {
        rRule: 'FREQ=DAILY;COUNT=2',
      } } });
    });
  });
});
