import {
  addAppointment,
  changeAddedAppointment,
  cancelAddedAppointment,
  deleteAppointment,
  cancelDeletedAppointment,
  startEditAppointment,
  stopEditAppointment,
  changeAppointment,
  cancelChanges,
} from './reducers';

describe('EditingState reducers', () => {
  describe('#addAppointment', () => {
    it('should work', () => {
      const addedAppointment = { a: 1 };
      const payload = { appointment: { a: 2 } };

      const nextAddedAppointment = addAppointment(addedAppointment, payload);
      expect(nextAddedAppointment).toEqual({ a: 2 });
    });
  });
  describe('#changeAddedAppointment', () => {
    it('should work', () => {
      const addedAppointment = { a: 2 };
      const payload = { change: { a: 3 } };

      const nextAddedAppointment = changeAddedAppointment(addedAppointment, payload);
      expect(nextAddedAppointment).toEqual({ a: 3 });
    });
    it('should combine many fields', () => {
      const addedAppointment = { a: 2 };
      const payload = { change: { b: 3 } };

      const nextAddedAppointment = changeAddedAppointment(addedAppointment, payload);
      expect(nextAddedAppointment).toEqual({ a: 2, b: 3 });
    });
  });
  describe('#cancelAddedAppointment', () => {
    it('should work', () => {
      const nextAddedAppointment = cancelAddedAppointment();
      expect(nextAddedAppointment).toEqual({});
    });
  });
  describe('#deleteAppointment', () => {
    it('should work', () => {
      const deletedAppointmentId = 10;
      const appointmentId = 20;
      const nextDeletedAppointmentId = deleteAppointment(deletedAppointmentId, { appointmentId });
      expect(nextDeletedAppointmentId).toEqual(20);
    });
  });
  describe('#cancelDeletedAppointment', () => {
    it('should work', () => {
      expect(cancelDeletedAppointment()).toEqual(null);
    });
  });
  describe('#startEditAppointment', () => {
    it('should work', () => {
      const prevEditingAppointmentId = 1;
      const appointmentId = 2;
      expect(startEditAppointment(prevEditingAppointmentId, { appointmentId }))
        .toEqual(appointmentId);
    });
  });
  describe('#stopEditAppointment', () => {
    it('should work', () => {
      expect(stopEditAppointment())
        .toEqual(null);
    });
  });
  describe('#changeAppointment', () => {
    it('should work', () => {
      const addedAppointment = { a: 0 };
      const change = { a: 1, b: 2 };
      expect(changeAppointment(addedAppointment, { change }))
        .toEqual({ a: 1, b: 2 });
    });
  });
  describe('#cancelChanges', () => {
    it('should work', () => {
      expect(cancelChanges())
        .toEqual({});
    });
  });
});
