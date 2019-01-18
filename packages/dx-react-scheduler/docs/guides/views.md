# React Scheduler - Views

The Scheduler component provides several types of views. Views display information in various ways, you can choose the most convenient view for your data source or combine few views and switch between them.

## Related Plugins

The following plugins render corresponding views:

- [DayView](../reference/day-view.md) - renders a day layout
- [WeekView](../reference/week-view.md) - renders a week layout
- [MonthView](../reference/month-view.md) - renders a month layout

## DayView

The `DayView` displays appointments for a specified date. The Scheduler component arranges appointments from top to bottom. If their time intervals overlap, their width is decreased and they are placed next to each other.

By default the duration of [time scale](fundamentals.md#overview) is 24 hours. To change this value define the view plugin's properties `startDayHour` and `endDayHour`. In the following example a time scale starts at 9 a.m. and ends at 7 p.m.

.embedded-demo({ "path": "scheduler-basic/day", "showThemeSelector": true })

## Week View

The `WeekView` display appointments for a week. On this view, appointments are rendered like on the day view.

.embedded-demo({ "path": "scheduler-basic/week", "showThemeSelector": true })

You can exclude some days from the week view by using the excludedDays property. For example, to implement work week view define the `excludedDays` property of the [WeekView](../reference/week-view.md) plugin with `[0, 6]`.

## MonthView

The `MonthView` displays appointments for a month. The Scheduler component arranges appointments from left to right. An appointment's size depends on its duration in days. However, it occupies the entire day cell if an appointment lasts only for several hours or minutes. The time scale and all-day panel are not displayed in this view.

.embedded-demo({ "path": "scheduler-basic/month", "showThemeSelector": true })
