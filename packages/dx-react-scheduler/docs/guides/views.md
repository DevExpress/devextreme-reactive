# React Scheduler - Views

Views arrange appointments in different layouts. The Scheduler provides several view types. You can choose a single view type that presents your data in the best way or allow users to switch between several view types.

## Related Plugins

The following plugins render particular views:

- [DayView](../reference/day-view.md) - renders a day view
- [WeekView](../reference/week-view.md) - renders a week view
- [MonthView](../reference/month-view.md) - renders a month view

## Day View

The `DayView` displays appointments for a specific date.

The Scheduler arranges appointments from top to bottom. If their time intervals overlap, their width is decreased and they are placed next to each other.

The [time scale](fundamentals.md#overview)'s duration is 24 hours. To change this value, define the `startDayHour` and `endDayHour` in the view plugin. In the following example, the time scale starts at 9 a.m. and ends at 7 p.m.

.embedded-demo({ "path": "scheduler-basic/day", "showThemeSelector": true })

## Week View

The `WeekView` displays appointments for a week. Appointments are arranged similarly to the day view.

.embedded-demo({ "path": "scheduler-basic/week", "showThemeSelector": true })

You can use the [WeekView](../reference/week-view.md) plugin's `excludedDays` property to exclude specific days from the week view. For example, to implement a work week view, set this property to `[0, 6]`.

## Month View

The `MonthView` displays appointments for a month.

The Scheduler arranges appointments left to right. An appointment's size depends on its duration in days. Even if an appointment lasts less than a day, it occupies the entire day cell.

The time scale and all-day panel are hidden on this view.

.embedded-demo({ "path": "scheduler-basic/month", "showThemeSelector": true })
