import {
  addAppointment,
  changeAddedAppointment,
  cancelAddedAppointment,
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
});
