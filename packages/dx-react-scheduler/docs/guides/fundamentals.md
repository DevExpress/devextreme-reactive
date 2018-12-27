# React Scheduler - Fundamentals

## Basic Setup

The Scheduler is a widget that represents scheduled data and allows a user to manage it. The displays data specified via the `data` property. Follow [AppointmentModel](../reference/scheduler.md/#appointmentmodel) interface to right define that property.

The Scheduler requires the following plugins for basic data visualization:

- [DayView](../reference/day-view.md) / [WeekView](../reference/week-view.md) / [MonthView](../reference/month-view.md) - each plugins render specific view layout
- [Appointments](../reference/appointments.md) - renders the appointments data

The `Appointments` plugin should follow one of view plugin. In addition, you can define a date that should be initially displayed in the date navigator and used for internal calculations using the `currentDate` option of the [ViewState](../reference/view-state.md) plugin.

.embedded-demo({ "path": "scheduler-basic/basic-setup", "showThemeSelector": true })

## Overview

This widget has built-in functionality for basic operations such as date navigation, view switching and easy visualization features such as All Day Panel, Appointment Tooltip, Appointment Form and others. The following image is an element map.

<p align="center">
  <img src="../../img/scheduler-overview.png" width="100%">
</p>

In the image above demonstrates features that can be applied by adding special plugins.

- [ViewSwitcher](../reference/view-switcher.md) - allow quick switching between views
- [DateNavigator](../reference/date-navigator.md) - allow change current date
- [AllDayPanel](../reference/all-day-panel.md) - allow display long-time appointments in a simple form
- [AppointmentTooltip](../reference/appointment-tooltip.md) - allow display short information about event in tooltip form

## Appearance Customization

The Scheduler's visualization plugins provide a rich API to customize scheduler elements' appearance. Examples of the most popular customization tasks are described below.

The `WeekView` plugin (*and other view plugins*) allows you to customize the appearance of the layout by override these [properties](../reference/week-view.md/#properties). The following example demonstrated how to use the `timeTableCellComponent` and `dayScaleCellComponent` and highlight current date and weekends.

TODO: should change demo to "scheduler-basic/custom-template" after merge `Performance Optimization` guide.
.embedded-demo({ "path": "scheduler-basic/week", "showThemeSelector": true })

*Note: All UI plugins use the same API to customize UI elements' appearance.*
