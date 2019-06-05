# React Scheduler - Appointment Tooltip

An appointment tooltip displays brief information about the appointment and contains buttons that manage the appointment.

## Related Plugins

The following plugins are required:

- [AppointmentTooltip](../reference/appointment-tooltip.md) - displays the appointment tooltip

## Basic Usage

Import the plugin listed above. A user will be able to invoke the appointment tooltip by a click on an appointment.

### Uncontrolled Mode

The following demo shows the use of the appointment tooltip in uncontrolled mode:

.embedded-demo({ "path": "scheduler-tooltip/uncontrolled", "showThemeSelector": true })

### Controlled Mode

In controlled mode, the state of all or particular `AppointmentTooltip`s should be controlled externally. To control their visibility, pass the `visible` property and `onVisibilityChange` event to the plugin. To control the displayed data, pass the [appointmentMeta](../reference/appointment-tooltip.md#appointmentmeta) property and `onAppointmentMetaChange` event.

.embedded-demo({ "path": "scheduler-tooltip/controlled", "showThemeSelector": true })

### Customize the Appearance

To customize the appointment tooltip's appearance, redefine `xxxComponent` properties. `xxx` stands for the name of the element that you want to customize. For example, the tooltip's header and content are customized using the `headerComponent` and `contentComponent` properties, as shown in the code below. Refer to the [`AppointmentTooltip` API reference page](../reference/appointment-tooltip.md) for a list of all `xxxComponent` properties.

.embedded-demo({ "path": "scheduler-tooltip/custom", "showThemeSelector": true })
