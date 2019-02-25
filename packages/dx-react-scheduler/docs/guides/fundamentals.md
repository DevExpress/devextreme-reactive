# React Scheduler - Fundamentals

The [DevExtreme React Scheduler](https://devexpress.github.io/devextreme-reactive/react/scheduler) is a component that displays appointments in different layouts. It also allows a user to [edit](./editing.md) appointments. You can enable each of the [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) operations separately.

The Scheduler's UI elements include [date navigator](../reference/date-navigator.md), [view switcher](../reference/view-switcher.md), [all-day panel](../reference/all-day-panel.md), [appointment tooltip](../reference/appointment-tooltip.md), [appointment form](../reference/appointment-form.md), and others. The following image illustrates these elements:

<p align="center">
  <img class="img-responsive" src="../../img/scheduler-elements.png">
</p>

The Scheduler adheres to the plugin-based architecture: every feature is encapsulated in a dedicated plugin (or React component).

## Basic Setup

The Scheduler displays data specified via the `data` property. Data objects should have the same structure as the [AppointmentModel](../reference/scheduler.md/#appointmentmodel). You can also [extend the objects with custom fields](https://github.com/DevExpress/devextreme-reactive/blob/master/packages/dx-react-scheduler-demos/src/demo-sources/scheduler-featured-remote-data/material-ui/demo.jsx#L53).

The Scheduler requires the following plugins for basic data visualization:

- One of the [DayView](../reference/day-view.md) / [WeekView](../reference/week-view.md) / [MonthView](../reference/month-view.md) - each of them renders a specific appointment layout.
- [Appointments](../reference/appointments.md) - renders appointments.

To specify the date that should be initially displayed in the date navigator and used for calculations, use the [ViewState](../reference/view-state.md) plugin's `currentDate` option. Otherwise, the widget uses current date.

.embedded-demo({ "path": "scheduler-basic/basic-setup", "showThemeSelector": true })

## Customize the Appearance

The Scheduler's visualization plugins provide an API that allows you to customize the appearance of the UI elements.

For example, the `WeekView` plugin provides [properties](../reference/week-view.md/#properties) that you should specify to customize the layout's appearance. The following sample demonstrates how you can implement the `timeTableCellComponent` and `dayScaleCellComponent` to highlight current date and weekends. You can use the same approach with any other UI plugin.

.embedded-demo({ "path": "scheduler-basic/custom-template", "showThemeSelector": true })
