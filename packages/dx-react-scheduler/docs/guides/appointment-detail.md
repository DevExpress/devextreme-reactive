# React Scheduler - Appointment Detail

The React Scheduler component's `AppointmentTooltip` and `AppointmentForm` plugins display appointment data.

## Related Plugins

The following plugins display an appointment data:

- [AppointmentTooltip](../reference/appointment-tooltip.md) - displays an appointment information in a short form
- [AppointmentForm](../reference/apppointment-form.md) - displays an all appointment information

## Basic Usage

Import the plugins listed above to enable a user to show an appointment information data. The `AppointmentTooltip` will be shown by a `click` on an appointment. The `AppointmentForm` will be shown by a `double click` on the appointment.

### Uncontrolled Mode

The following demo demonstrates simple way to display an appointment data.

.embedded-demo({ "path": "scheduler-tooltip/uncontrolled", "showThemeSelector": true })

### Controlled Mode

In controlled mode, you should control the all/particular `AppointmentTooltip's` state. Pass the `visible` property and `onVisibilityChange`  event to control the visibility externally. Pass the [appointmentMeta](../reference/appointment-tooltip.md#appointmentmeta) property and `onAppointmentMetaChange` event to control the display data externally.

.embedded-demo({ "path": "scheduler-tooltip/controlled", "showThemeSelector": true })

### Customization

To override default markup or add your own, you should define a `xxxComponent` properties, all list of these properties is available at plugin [API reference page](../appointment-tooltip.md). In the following demo shows how to use `AppointmentTooltip's` `headerComponent` and `contentComponent` properties to make custom markup.

.embedded-demo({ "path": "scheduler-tooltip/custom", "showThemeSelector": true })
