export const addedAppointmentById = addedAppointment => addedAppointment;

export const changedAppointmentById = (changes, appointmentId) => { // !
  const result = {};
  result[appointmentId] = changes[appointmentId];
  return result;
};

const defaultCreateAppointmentChange = (
  appointment, field, value,
) => ({ [field]: value });
export const createAppointmentChangeGetter = (
  createAppointmentChange = defaultCreateAppointmentChange,
) => (appointment, field, value) => createAppointmentChange(appointment, field, value);
