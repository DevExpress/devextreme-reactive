# React Scheduler - Current Time Indication

The React Scheduler can display a current time indicator and shade appointments and cells up to the current time. This feature can be enabled in the day, week, and month views, but the month view supports only the shading.

## Related Plugins

The following plugin implements this feature:

- [CurrentTimeIndicator](../reference/current-time-indicator.md) - renders the current time indicator and shades that cover appointments and timetable cells up to the current time

## Basic Usage

Import the [CurrentTimeIndicator](../reference/current-time-indicator.md) plugin. Its `updateInterval` property specify how frequently the indicator's position should be updated. Set the `shadePastAppointments` and `shadePastCells` properties to `true` to shade past appointments and timetable cells:


.embedded-demo({ "path": "scheduler-current-time-visualization/current-time-indicator", "showThemeSelector": true })

### Customize the Appearance

To customize the current time indicator, use the `indicatorComponent` property. You can also customize appointments  and timetable cells:

.embedded-demo({ "path": "scheduler-current-time-visualization/customization", "showThemeSelector": true })
