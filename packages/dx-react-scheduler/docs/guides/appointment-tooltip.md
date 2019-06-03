# React Scheduler - Appointment Tooltip

The React Scheduler component's `AppointmentTooltip` plugin displays detailed appointment data. Also, the appointment tooltip contains built-in action buttons for data management.

## Related Plugins

The following plugins display an appointment tooltip:

- [AppointmentTooltip](../reference/appointment-tooltip.md) - displays an appointment information in a short form

## Basic Usage

Import the plugin listed above to enable a user to show an appointment information data. The appointment tooltip will be shown by a `click` on an appointment.

### Uncontrolled Mode

The following demo demonstrates simple way to display an appointment data.

.embedded-demo({ "path": "scheduler-tooltip/uncontrolled", "showThemeSelector": true })

### Controlled Mode

In controlled mode, you should control the all/particular `AppointmentTooltip's` state. Pass the `visible` property and `onVisibilityChange`  event to control the visibility externally. Pass the [appointmentMeta](../reference/appointment-tooltip.md#appointmentmeta) property and `onAppointmentMetaChange` event to control the display data externally.

.embedded-demo({ "path": "scheduler-tooltip/controlled", "showThemeSelector": true })

### Customization

To override default markup or add your own, you should define a `xxxComponent` properties, a list of these properties is available at plugin [API reference page](../reference/appointment-tooltip.md). The following demo shows how to use `AppointmentTooltip's` `headerComponent` and `contentComponent` properties to make custom markup.

.embedded-demo({ "path": "scheduler-tooltip/custom", "showThemeSelector": true })
