# React Scheduler - Appointments

The Scheduler component provides few appointment types.

## Related Plugins

- [Appointments](../reference/appointments.md)
- [AllDayPanel](../reference/all-day-panel.md)

## One-Time Appointment

The one-time appointment is a regular appointment with specified start and end date. These appointments are displayed in the following demo. To display one-time appointments in the views add the [Appointments](../reference/appointments.md) plugin.

.embedded-demo({ "path": "scheduler-basic/day", "showThemeSelector": true })

## All-Day Appointment

The all-day appointment covers the whole day or multiple days. By default, all-day appointments are rendered only in the [MonthView](../reference/month-view.md). To display them on the day or week views use the [AllDayPanel](../reference/all-day-panel.md) plugin.

.embedded-demo({ "path": "scheduler-all-day-panel/week-view", "showThemeSelector": true })

## Appearance Customization

The [Appointments](../reference/appointments.md) plugin provides customization functionality. To apply styles to various appointment types you can override component depending of use the [Appointments.AppointmentProps](../reference/appointments.md#appointmentsappointmentprops) props. The following example demonstrates how to add custom styles to appointments.

.embedded-demo({ "path": "scheduler-basic/simple-template", "showThemeSelector": true })
