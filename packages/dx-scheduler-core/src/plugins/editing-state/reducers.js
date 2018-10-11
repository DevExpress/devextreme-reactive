export const addAppointment = (
  addedAppointment, { appointment } = { appointment: {} },
) => appointment;

export const changeAddedAppointment = (
  addedAppointment, { change },
) => ({ ...addedAppointment, ...change });

export const cancelAddedAppointment = () => ({});

export const startEditAppointment = (prevEditingAppointmentId, { appointmentId }) => appointmentId;

export const stopEditAppointment = () => undefined;

export const changeAppointment = (
  addedAppointment, { change },
) => ({ ...addedAppointment, ...change });

export const cancelChanges = () => ({});
