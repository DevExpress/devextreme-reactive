# React Scheduler - Current Time Visualization

The React Scheduler displays information about current time. It's implemented by the `CurrentTimeIndicator` plugin that shows current time in week and day views.

## Related Plugins

The following plugin implements this feature:

- [CurrentTimeIndicator](../reference/current-time-indicator.md) - displays current time

## Basic Usage

Import the [CurrentTimeIndicator](../reference/current-time-indicator.md) plugin. Use its `updateInterval` property to change the Indicator's update interval. Its `shadePastCells` and `shadePastAppointments` are used to differentiate between past and future (including present) cells and appointments. Note that the current time indicator is not displayed by [MonthView](../reference/month-view.md) but `shadePastCells` and `shadePastAppointments` work with this plugin as well.

The following demo shows how to use the current time indicator:

.embedded-demo({ "path": "scheduler-current-time-visualization/current-time-indicator", "showThemeSelector": true })

### Customize the Appearance

To customize the indicator's appearance, use its `indicatorComponent` prop. You may also customize cells and appointments depending on their date. The demo below demonstrates how to customize timetable cells, appointments and current time indicator:

.embedded-demo({ "path": "scheduler-current-time-visualization/customization", "showThemeSelector": true })
