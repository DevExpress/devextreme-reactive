# React Scheduler - Appointment Tooltip

An appointment tooltip displays information about the appointment and contains buttons that manage the appointment.

## Related Plugins

The following plugin is required:

- [AppointmentTooltip](../reference/appointment-tooltip.md) - displays the appointment tooltip

## Basic Usage

Import the plugin listed above. A user can click on an appointment to show its tooltip.

### Uncontrolled Mode

The following demo shows how to use the appointment tooltip in uncontrolled mode:

.embedded-demo({ "path": "scheduler-tooltip/uncontrolled", "showThemeSelector": true })

### Controlled Mode

In controlled mode, the state of `AppointmentTooltip`s should be controlled externally. To control their visibility, pass the `visible` property and `onVisibilityChange` event to the plugin. To manage the displayed data, pass the [appointmentMeta](../reference/appointment-tooltip.md#appointmentmeta) property and `onAppointmentMetaChange` event.

.embedded-demo({ "path": "scheduler-tooltip/controlled", "showThemeSelector": true })

### Customize the Appearance

To customize the tooltip's appearance, specify the `xxxComponent` properties (`xxx` is the name of the element you want to customize). For example, the `headerComponent` and `contentComponent` properties are used to customize the tooltip's header and content, as shown in the code below. Refer to the [AppointmentTooltip API reference page](../reference/appointment-tooltip.md) for a list of all `xxxComponent` properties.

.embedded-demo({ "path": "scheduler-tooltip/custom", "showThemeSelector": true })
