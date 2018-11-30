import { setAppointmentData } from './reducers';

describe('Appointment form reducers', () => {
  describe('#setAppointmentData', () => {
    it('should work', () => {
      const appointmentData = {};
      const nextAppointmentData = setAppointmentData({}, { appointmentData });
      expect(nextAppointmentData).toBe(appointmentData);
    });
  });
});
