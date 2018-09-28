export const addedAppointmentById = addedAppointment => addedAppointment;

export const changedAppointmentById = (changes, appointmentId) => { // !
  const result = {};
  result[appointmentId] = changes;
  return result;
};
