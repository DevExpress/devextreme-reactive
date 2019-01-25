import { changedAppointmentById } from './computeds';

describe('EditingState computeds', () => {
  describe('#changedAppointmentById', () => {
    it('should work', () => {
      const changed = { b: 1 };
      const appointmentId = 'o2';

      const computed = changedAppointmentById(changed, appointmentId);
      expect(computed).toEqual({
        o2: { b: 1 },
      });
    });
  });
});
