# React Scheduler - Fundamentals

The [DevExtreme React Scheduler](https://devexpress.github.io/devextreme-reactive/react/scheduler) allow you to display a structure of appointments, events or tasks and provide a functionality to manage data.

## Overview

This React Scheduler has built-in functionality for appointment layouting in many available time views. The scheduler has ability to control basic operations such as date navigation, view switching and data visualization features like [All-Day Panel](../reference/all-day-panel.md), [Appointment Tooltip](../reference/appointment-tooltip.md), [Appointment Form](../reference/appointment-form.md) and others. Also this widget provide functionality to [data editing](../reference/editing-state.md) such as creating, updating and deleting, and UI components with special input forms and editing abilities.

The following image is an element map. It displays the basics concepts of the React Scheduler.

<p align="center">
  <img class="img-responsive" src="../../img/scheduler-elements.png">
</p>

In the image above demonstrates features that can be applied by adding special plugins.

- [ViewSwitcher](../reference/view-switcher.md) - allow quick switching between views
- [DateNavigator](../reference/date-navigator.md) - allow change current date and show visible time interval
- [AllDayPanel](../reference/all-day-panel.md) - allow display longer then a day appointments in a specific place
- [AppointmentTooltip](../reference/appointment-tooltip.md) - allow display short information about event in tooltip form also provide a some UI functionality to fast data editing.

## Basic Setup

The Scheduler displays data specified via the `data` property. Follow [AppointmentModel](../reference/scheduler.md/#appointmentmodel) interface to right define that property. Also, you can add custom properties to your data set and use them for your needs inside scheduler's components.

The Scheduler requires the following plugins for basic data visualization:

- [DayView](../reference/day-view.md) / [WeekView](../reference/week-view.md) / [MonthView](../reference/month-view.md) - each plugins render specific view layout
- [Appointments](../reference/appointments.md) - renders the appointments data structure and define template for single appointment visualization

The `Appointments` plugin should follow one of view plugin. In addition, you can define a date that should be initially displayed in the date navigator and used for internal calculations using the `currentDate` option of the [ViewState](../reference/view-state.md) plugin.

.embedded-demo({ "path": "scheduler-basic/basic-setup", "showThemeSelector": true })

## Appearance Customization

The Scheduler's visualization plugins provide a rich API to customize scheduler elements' appearance. Examples of the most popular customization tasks are described below.

The `WeekView` plugin (*and other view plugins*) allows you to customize the appearance of the layout by override these [properties](../reference/week-view.md/#properties). The following example demonstrated how to use the `timeTableCellComponent` and `dayScaleCellComponent` and highlight current date and weekends.

TODO: should change demo to "scheduler-basic/custom-template" after merge `Performance Optimization` guide.
.embedded-demo({ "path": "scheduler-basic/week", "showThemeSelector": true })

*Note: All UI plugins use the same API to customize UI elements' appearance.*
