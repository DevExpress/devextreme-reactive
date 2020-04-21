# React Scheduler - Appointments

Our React Scheduler supports the following appointment types:

- [One-time appointments](#one-time-appointments)
- [Zero-duration appointments](#zero-duration-appointments)
- [All-day appointments](#all-day-appointments)
- [Recurring appointments](#recurring-appointments)

## Related Plugins

- [Appointments](../reference/appointments.md) - renders appointments
- [AllDayPanel](../reference/all-day-panel.md) - renders the all-day panel

## One-Time Appointments

One-time appointments are those with specified start and end dates and times. They are shown in the following demo. To display one-time appointments on a view, add the [Appointments](../reference/appointments.md) plugin.

.embedded-demo({ "path": "scheduler-basic/day", "showThemeSelector": true })

## Zero-Duration Appointments

Zero-duration appointments do not have an end time and date. They represent events without duration (reminders, arrival/departure time, and so on).

To add a zero-duration appointment, specify the `startDate` in the [AppointmentModel](../reference/scheduler.md#appointmentmodel), leave the `endDate` field unspecified, and add the [Appointments](../reference/appointments.md) plugin.

.embedded-demo({ "path": "scheduler-basic/zero-duration", "showThemeSelector": true })

## All-Day Appointments

All-day appointments last for the entire day or multiple days. They are displayed only in the [MonthView](../reference/month-view.md). To display them in the day or week views, use the [AllDayPanel](../reference/all-day-panel.md) plugin.

.embedded-demo({ "path": "scheduler-all-day-panel/week-view", "showThemeSelector": true })

## Recurring Appointments

A recurring appointment is an appointment that is repeated after a specified time. An object that defines such an appointment should contain the `rRule` field whose value has the [iCalendar RRULE](https://tools.ietf.org/html/rfc5545#section-3.8.5.3) format. To exclude specific dates from recurrence, specify the exceptions in the `exDate` field. Its values should have the [iCalendar EXDATE](https://tools.ietf.org/html/rfc5545#section-3.8.5.1) format.

.embedded-demo({ "path": "scheduler-recurrence/basic", "showThemeSelector": true })

## Customize the Appearance

The [Appointments](../reference/appointments.md) plugin allows you to customize the appearance of appointments. Override the plugin's `appointmentComponent` with a custom component. Use the [AppointmentProps](../reference/appointments.md#appointmentsappointmentprops) when you implement the custom component. The following example shows how to use this approach to add custom styles to appointments:

.embedded-demo({ "path": "scheduler-basic/simple-template", "showThemeSelector": true })
