# React Scheduler - View Types

The Scheduler component provides several types of views. Views display information in various ways, you can choose the most convenient view for your data source or combine few view and switching between them. This topic describes visual elements and their position for each view.

## Related Plugins

The following plugins implement view features:

- [DayView](../reference/day-view.md) - renders a day layout
- [WeekView](../reference/week-view.md) - renders a week layout
- [MonthView](../reference/month-view.md) - renders a month layout

## DayView

The Day View displays appointments for a specified date. The Scheduler component arranges appointments from top to bottom. If their time intervals overlap, their width is decreased and they are placed next to each other. To implement this view add the `DayView` plugin.

By default the length of time scale is 24 hours. To change this value define the view plugin's properties `startDayHour` and `endDayHour`. In the following example the start of time scale is 9 a.m. and end of it is 7 p.m..

.embedded-demo({ "path": "scheduler-basic/day", "showThemeSelector": true })

## Week View

The Week View display appointments for a week. The appointments layouting is same with the Day View feature.

.embedded-demo({ "path": "scheduler-basic/week", "showThemeSelector": true })

The work week view is a most common request. To implement this case define the `excludedDays` property of the [WeekView](../reference/week-view.md) plugin with `[0, 6]`.

## MonthView

The Month View displays appointments for a month. The Scheduler component arranges appointments from left to right. An appointment's size depends on its duration in days. However, it occupies the entire day cell if an appointment lasts only for several hours or minutes. The time scale and all-day panel are not displayed in this view.

.embedded-demo({ "path": "scheduler-basic/month", "showThemeSelector": true })

## View Switching

A user switches between views with the View Switcher feature. To implement it add the [ViewSwitcher](../reference/view-switcher.md) plugin.
