# React Scheduler - Fundamentals

The [DevExtreme React Scheduler](https://devexpress.github.io/devextreme-reactive/react/scheduler) component displays appointments and provide a functionality to manage data.

## Overview

The React Scheduler has built-in functionality for appointment layouting in different views. The scheduler contains easily customizable UI elements such as [date navigator](../reference/date-navigator.md), [view switcher](../reference/view-switcher.md), [all-day panel](../reference/all-day-panel.md), [appointment tooltip](../reference/appointment-tooltip.md), and [appointment form](../reference/appointment-form.md). The [editing](../reference/editing-state.md) functionality is supported, as well. Moreover, you can specify which one of [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) operations is available.

The following image describes the main UI elements of the React Scheduler.

<p align="center">
  <img class="img-responsive" src="../../img/scheduler-elements.png">
</p>

The React Scheduler adheres to plugin-based architecture. This says that every feature is encapsulated in a particular plugin (or React component).

## Basic Setup

The Scheduler displays data specified via the `data` property. You should follow the [AppointmentModel](../reference/scheduler.md/#appointmentmodel) interface to define that property. Also you can add [custom](https://github.com/DevExpress/devextreme-reactive/blob/master/packages/dx-react-scheduler-demos/src/demo-sources/scheduler-featured-remote-data/material-ui/demo.jsx#L53) fields.

The Scheduler requires the following plugins for basic data visualization:

- One of [DayView](../reference/day-view.md) / [WeekView](../reference/week-view.md) / [MonthView](../reference/month-view.md) - each plugin renders a specific view layout
- [Appointments](../reference/appointments.md) - renders the appointments data structure and define template for single appointment visualization

By default, the widget uses current time. You can define a date that should be initially displayed in the date navigator and used for internal calculations using the `currentDate` option of the [ViewState](../reference/view-state.md) plugin.

.embedded-demo({ "path": "scheduler-basic/basic-setup", "showThemeSelector": true })

## Appearance Customization

The Scheduler's visualization plugins provide a rich API to customize its elements' appearance. Examples of the most popular customization tasks are described below.

For example, the `WeekView` plugin allows you to customize the appearance of the layout by override these [properties](../reference/week-view.md/#properties). The following sample demonstrates how to use the `timeTableCellComponent` and `dayScaleCellComponent` and highlight current date and weekends.

.embedded-demo({ "path": "scheduler-basic/custom-template", "showThemeSelector": true })

*Note: All UI plugins use the same API to customize UI elements' appearance.*
