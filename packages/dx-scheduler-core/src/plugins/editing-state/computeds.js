export const addedAppointmentById = addedAppointment => addedAppointment;

export const changedAppointmentById = (changes, appointmentId) => (
  { [appointmentId]: changes }
);
