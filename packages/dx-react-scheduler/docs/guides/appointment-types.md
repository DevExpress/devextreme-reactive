# React Scheduler - Appointment Types

The Scheduler component provides few appointment types.

## Related Plugins

- [Appointments](../reference/appointments.md)
- [AllDayPanel](../reference/all-day-panel.md)

## One-Time Appointment

The one-time appointment is a non-recurring appointment with specified start and end dates. These appointments displayed in the following demo. To display one-time appointments in the views add the [Appointments](../reference/appointments.md) plugin to scheduler configuration.

.embedded-demo({ "path": "scheduler-basic/day", "showThemeSelector": true })

## All-Day Appointment

The all-day appointment is a non-recurring appointment that covers the whole timetable's period. By default all-day appointments doesn't shown in the basic views, to display their add the [AllDayPanel](../reference/all-day-panel.md) plugin.

.embedded-demo({ "path": "scheduler-all-day-panel/week-view", "showThemeSelector": true })

## Appearance Customization

As all other React Scheduler component's UI plugins, the [Appointments](../reference/appointments.md) plugin provide a flexible customization functionality. To apply various styles to various appointment types you can override template depend of use the [Appointments.AppointmentProps](../reference/appointments.md#appointmentsappointmentprops) props. The following example demonstrates how to add custom styles to appointments.

.embedded-demo({ "path": "scheduler-basic/simple-template", "showThemeSelector": true })
