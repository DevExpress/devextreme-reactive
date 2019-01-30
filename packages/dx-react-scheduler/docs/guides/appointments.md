# React Scheduler - Appointments

The Scheduler supports one-time and all-day appointments.

## Related Plugins

- [Appointments](../reference/appointments.md) - renders appointments
- [AllDayPanel](../reference/all-day-panel.md) - renders the all-day panel

## One-Time Appointments

One-time appointments are appointments with specified start and end date and time. They are shown in the following demo. To display one-time appointments on a view, add the [Appointments](../reference/appointments.md) plugin.

.embedded-demo({ "path": "scheduler-basic/day", "showThemeSelector": true })

## All-Day Appointments

All-day appointments last for the entire day or multiple days. They are displayed only on the [MonthView](../reference/month-view.md). To display them on the day or week views, use the [AllDayPanel](../reference/all-day-panel.md) plugin.

.embedded-demo({ "path": "scheduler-all-day-panel/week-view", "showThemeSelector": true })

## Customize the Appearance

The [Appointments](../reference/appointments.md) plugin allows you to customize the appearance of appointments. Override the plugin's `appointmentComponent` with a custom component. Use the [AppointmentProps](../reference/appointments.md#appointmentsappointmentprops) when you implement the custom component. The following example shows how to use this approach to add custom styles to appointments:

.embedded-demo({ "path": "scheduler-basic/simple-template", "showThemeSelector": true })
