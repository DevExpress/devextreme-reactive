# React Scheduler - Fundamentals

The Scheduler component displays data specified via the `data` property. Follow [AppointmentModel](../reference/scheduler.md/#appointmentmodel) interface to right define that property.

The Scheduler requires the following plugins for basic data visualization:

- [DayView](../reference/day-view.md) / [WeekView](../reference/week-view.md) / [MonthView](../reference/month-view.md) - each plugins render specific view layout
- [Appointments](../reference/appointments.md) - renders the appointments data

The `Appointments` plugin should follow one of view plugin. In addition, you can define a date that should be initially displayed in the date navigator and used for internal calculations using the `currentDate` option of the [ViewState](../reference/view-state.md) plugin.

.embedded-demo({ "path": "scheduler-basic/basic-setup", "showThemeSelector": true })

## Appearance Customization

The Scheduler's visualization plugins provide a rich API to customize scheduler elements' appearance. Examples of the most popular customization tasks are described below.

The `WeekView` plugin (*and other view plugins*) allows you to customize the appearance of the layout by override these [properties](../reference/week-view.md/#properties). The following example demonstrated how to use the `timeTableCellComponent` and `dayScaleCellComponent` and highlight current date and weekends.

TODO: should change demo to "scheduler-basic/custom-template" after merge `Performance Optimization` guide.
.embedded-demo({ "path": "scheduler-basic/week", "showThemeSelector": true })

*Note: All UI plugins use the same API to customize UI elements' appearance.*
