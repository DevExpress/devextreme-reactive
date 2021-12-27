import {
  addAppointment,
  cancelAddedAppointment,
  startEditAppointment,
  stopEditAppointment,
  changeAppointment,
  cancelChanges,
} from './reducers';

describe('EditingState reducers', () => {
  describe('#addAppointment', () => {
    it('should work', () => {
      const addedAppointment = { a: 1 };
      const payload = { appointmentData: { a: 2 } };

      const nextAddedAppointment = addAppointment(addedAppointment, payload);
      expect(nextAddedAppointment).toEqual({ a: 2 });
    });
  });
  describe('#changeAppointment', () => {
    it('should work', () => {
      const addedAppointment = {};
      const payload = { change: { a: 3 } };

      const nextAddedAppointment = changeAppointment(addedAppointment, payload);
      expect(nextAddedAppointment).toEqual({ a: 3 });
    });
    it('should combine many fields', () => {
      const addedAppointment = { a: 2 };
      const payload = { change: { b: 3 } };

      const nextAddedAppointment = changeAppointment(addedAppointment, payload);
      expect(nextAddedAppointment).toEqual({ a: 2, b: 3 });
    });
  });
  describe('#cancelAddedAppointment', () => {
    it('should work', () => {
      const nextAddedAppointment = cancelAddedAppointment();
      expect(nextAddedAppointment).toEqual({});
    });
  });
  describe('#startEditAppointment', () => {
    it('should work', () => {
      const prevEditingAppointmentId = 1;
      const appointmentId = 2;
      expect(startEditAppointment(prevEditingAppointmentId, { appointmentId }))
        .toEqual({ appointmentId: 2 });
    });
  });
  describe('#stopEditAppointment', () => {
    it('should work', () => {
      expect(stopEditAppointment())
        .toEqual(null);
    });
  });
  describe('#cancelChanges', () => {
    it('should work', () => {
      expect(cancelChanges())
        .toEqual({});
    });
  });
});
