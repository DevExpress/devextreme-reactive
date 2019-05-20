# Scheduler Reference

The Scheduler is a root container component designed to process and display the specified data. The Scheduler's functionality (data visualization and processing) is implemented in several plugins specified as child components.

## Import

Use the following statement to import a plugin with embedded theme components:

```js
import { Scheduler } from '@devexpress/dx-react-scheduler-material-ui';
```

You can import the themeless plugin if you want to use custom components:

```js
import { Scheduler } from '@devexpress/dx-react-scheduler';
```

## User reference

### Properties

Name | Type | Default | Description
-----|------|---------|------------
data | Array&lt;[AppointmentModel](#appointmentmodel)&gt; | | An array of appointment data objects.
rootComponent | ComponentType&lt;[Scheduler.RootProps](#schedulerrootprops)&gt; | | A component that renders the root layout.
locale | string | 'en-US' | The locale according to which dates should be formatted.

## Interfaces

### AppointmentModel

Describes an appointment data object. If you use another data structure, map it to this structure as shown in [this](https://devexpress.github.io/devextreme-reactive/react/scheduler/demos/featured/remote-data/) demo.

Field | Type | Description
------|------|------------
startDate | [SchedulerTime](#schedulertime) | The start date.
endDate | [SchedulerTime](#schedulertime) | The end date.
title? | string | The title.
allDay? | boolean | The all day flag.
id? | number &#124; string | The identifier.
rRule? | string | Specifies the appointment recurrence rule. Follows the [iCalendar RRULE](https://tools.ietf.org/html/rfc5545#section-3.8.5.3) format.
exDate? | string | Specifies dates excluded from recurrence. Follows the [iCalendar EXDATE](https://tools.ietf.org/html/rfc5545#section-3.8.5.1) format.
[propertyName: string] | any | Any other properties.

### Scheduler.RootProps

Describes properties passed to a component that renders the root layout.

Field | Type | Description
------|------|------------
children? | ReactNode | A React node used to render the root layout.

### SchedulerTime

Describes a scheduler time type.

Type: `Date | string | number`

### FormatterFn

Describes a function that format a date by locale.

Type: `(nextDate: Date | string | number | undefined, nextOptions: Intl.DateTimeFormatOptions) => string`

## Plugin Components

Name | Properties | Description
-----|------------|------------
Scheduler.Root | [Scheduler.RootProps](#schedulerrootprops) | A component that renders the root layout.

Additional properties are added to the component's root element.
