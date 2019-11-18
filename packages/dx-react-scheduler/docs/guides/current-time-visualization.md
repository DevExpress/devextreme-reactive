# React Scheduler - Current Time Visualization

The React Scheduler displays information about current time. It's implemented by the `CurrentTimeIndicator` plugin that shows current time in week and day views.

## Related Plugins

The following plugins implement this feature:

- [CurrentTimeIndicator](../reference/current-time-indicator.md) - displays current time
- [DayView](../reference/day-view.md) - renders a day view
- [WeekView](../reference/week-view.md) - renders a week view
- [MonthView](../reference/month-view.md) - renders a month view
- [Appointments](../reference/appointments.md) - renders appointments
- [DragDropProvider](../reference/drag-drop-provider.md) - implements drag-and-drop editing

## Basic Usage

Import the `CurrentTimeIndicator` plugin. Use its `updateInterval` property to change the Indicator's update interval. Its `shadePastCells` and `reduceBrightnessOfPastAppointments` are used to differentiate between past and future (including present) cells and appointments. Note that `CurrentTimeIndicator` is not displayed by `MonthView` but `shadePastCells` and `reduceBrightnessOfPastAppointments` work with this plugin as well.

The following demo shows how to use the current time indicator:

.embedded-demo({ "path": "scheduler-current-time-visualization/current-time-indicator", "showThemeSelector": true })

### Customize the Appearance

To customize the indicator's appearance, use its `indicatorComponent` prop. You may also customize cells and appointments depending on their date. The demo below demonstrates how to customize timetable cells, appointments and current time indicator:

.embedded-demo({ "path": "scheduler-current-time-visualization/customization", "showThemeSelector": true })
