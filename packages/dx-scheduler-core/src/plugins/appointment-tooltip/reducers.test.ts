import { setAppointmentMeta } from './reducers';

describe('Appointment tooltip reducers', () => {
  describe('#setAppointmentMeta', () => {
    it('should work', () => {
      const target = {};
      const data = {};
      const { target: nextTarget, data: nextData } = setAppointmentMeta({}, { target, data });
      expect(nextTarget).toBe(target);
      expect(nextData).toBe(nextData);
    });
  });
});
