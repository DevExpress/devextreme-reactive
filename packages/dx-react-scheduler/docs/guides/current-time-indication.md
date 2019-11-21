# React Scheduler - Current Time Indication

The React Scheduler can display a current time indicator and shade appointments and cells up to the current time. This feature can be enabled in the day, week, and month views (the month view supports shading only).

## Related Plugins


- [CurrentTimeIndicator](../reference/current-time-indicator.md) - renders the current time indicator and the shading that covers appointments and timetable cells up to the current time

## Basic Usage

Import the [CurrentTimeIndicator](../reference/current-time-indicator.md) plugin. Its `updateInterval` property specifies how frequently the indicator's position should be updated. Set the `shadePastAppointments` and `shadePastCells` properties to `true` to shade previous appointments and timetable cells:


.embedded-demo({ "path": "scheduler-current-time-indication/current-time-indicator", "showThemeSelector": true })

### Customize the Appearance

To customize the current time indicator, use the `indicatorComponent` property. You can also customize appointments  and timetable cells:

.embedded-demo({ "path": "scheduler-current-time-indication/customization", "showThemeSelector": true })
