# React Scheduler - Appointment Detail

The React Scheduler component's `AppointmentTooltip` and `AppointmentForm` plugins display appointment data.

## Related Plugins

The following plugins display an appointment data:

- [AppointmentTooltip](../reference/appointment-tooltip.md) - displays an appointment information in a short form
- [AppointmentForm](../reference/apppointment-form.md) - displays an all appointment information

## Basic Usage

Import the plugins listed above to enable a user to show an appointment data. The `AppointmentTooltip` will be shown by a `click` on an appointment. The `AppointmentForm` will be shown by a `double click` on an appointment.

### Uncontrolled Mode

The following demo demonstrates how to display an appointment data.

.embedded-demo({ "path": "scheduler-tooltip/uncontrolled", "showThemeSelector": true })

### Controlled Mode

In controlled mode, pass the current date to the `ViewState` plugin's `currentDate` property and handle the `onCurrentDateChange` event to control the date externally.

.embedded-demo({ "path": "scheduler-tooltip/controlled", "showThemeSelector": true })

### Customization

In controlled mode, pass the current date to the `ViewState` plugin's `currentDate` property and handle the `onCurrentDateChange` event to control the date externally.

.embedded-demo({ "path": "scheduler-tooltip/custom", "showThemeSelector": true })
