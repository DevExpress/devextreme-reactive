export const changeAppointmentField = (
  condition, actionWhileTrue, actionWhileFalse, setAppointmentField,
) => (nextValue) => {
  if (condition) {
    actionWhileTrue({ change: setAppointmentField({}, nextValue) });
  } else {
    actionWhileFalse({ change: setAppointmentField({}, nextValue) });
  }
};

export const conditionalActionCall = (action, payload) => {
  if (action) {
    action(payload);
  }
};
