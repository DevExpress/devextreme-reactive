export const addAppointment = (
  addedAppointment, { appointment } = { appointment: {} },
) => appointment;

export const changeAddedAppointment = (
  addedAppointment, { change },
) => ({ ...addedAppointment, ...change });

export const cancelAddedAppointment = () => ({});
