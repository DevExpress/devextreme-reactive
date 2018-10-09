export const addedAppointmentById = addedAppointment => addedAppointment;

export const changedAppointmentById = (changes, appointmentId) => (
  { [appointmentId]: changes }
);

const defaultCreateAppointmentChange = (
  appointment, field, value,
) => ({ [field]: value });

export const createAppointmentChangeGetter = (
  createAppointmentChange = defaultCreateAppointmentChange,
) => (appointment, field, value) => createAppointmentChange(appointment, field, value);
