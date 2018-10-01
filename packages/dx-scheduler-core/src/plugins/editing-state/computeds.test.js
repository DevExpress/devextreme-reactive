import {
  addedAppointmentById,
  changedAppointmentById,
  createAppointmentChangeGetter,
} from './computeds';

describe('EditingState computeds', () => {
  describe('#changedAppointmentById', () => {
    it('should work', () => {
      const changed = {
        o2: { b: 1 },
      };
      const appointmentId = ['o2'];

      const computed = changedAppointmentById(changed, appointmentId);
      expect(computed).toEqual({
        o2: { b: 1 },
      });
    });
  });

  describe('#addedAppointmentById', () => {
    it('should work', () => {
      const addedAppointment = { b: 1 };

      const computed = addedAppointmentById(addedAppointment);
      expect(computed).toEqual({ b: 1 });
    });
  });

  describe('#createAppointmentChangeGetter', () => {
    it('should work with default field access', () => {
      expect(createAppointmentChangeGetter(undefined)({ a: 1 }, 'a', 2))
        .toEqual({ a: 2 });
      expect(createAppointmentChangeGetter(undefined)({ b: 2 }, 'a', 1))
        .toEqual({ a: 1 });
    });

    it('should work with defined field access', () => {
      const createAppointmentChange = (appointment, columnName, value) => ({ [`_${columnName}`]: value });

      expect(createAppointmentChangeGetter(createAppointmentChange)({ a: 1 }, 'a', 2))
        .toEqual({ _a: 2 });
      expect(createAppointmentChangeGetter(createAppointmentChange)({ b: 2 }, 'a', 1))
        .toEqual({ _a: 1 });
    });
  });
});
