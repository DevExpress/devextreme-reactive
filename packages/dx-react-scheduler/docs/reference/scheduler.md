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
height | number &#124; `auto` | `auto` | The scheduler's height. If the value is `auto`, the height equals that of the container component.
locale | string &#124; Array&lt;string&gt; | 'en-US' | The locale according to which dates should be formatted.
firstDayOfWeek | number | 0 | A number between 0 (Sunday) and 6 (Saturday) that specifies the first day of the week.
rootComponent | ComponentType&lt;[Scheduler.RootProps](#schedulerrootprops)&gt; | | A component that renders the root layout.

## Interfaces

### AppointmentModel

Describes an appointment data object. If you use another data structure, map it to this structure as shown in [this](https://devexpress.github.io/devextreme-reactive/react/scheduler/demos/featured/remote-data/) demo.

Field | Type | Description
------|------|------------
startDate | [SchedulerDateTime](#schedulerdatetime) | The start date.
endDate? | [SchedulerDateTime](#schedulerdatetime) | The end date.
title? | string | The title.
allDay? | boolean | The all day flag.
id? | number &#124; string | The identifier.
rRule? | string | Specifies the appointment recurrence rule. Follows the [iCalendar RRULE](https://tools.ietf.org/html/rfc5545#section-3.8.5.3) format.
exDate? | string | Specifies dates excluded from recurrence. Uses the [iCalendar EXDATE](https://tools.ietf.org/html/rfc5545#section-3.8.5.1) format.
[propertyName: string] | any | Any other properties.

### CellElementsMeta

Field | Type | Description
------|------|------------
parentRect | () => ClientRect &#124; DOMRect | A function that returns the rect of the parent element.
getCellRects | Array<() => ClientRect &#124; DOMRect> | An array of the cell rect functions.

### ScrollingStrategy

Field | Type | Description
------|------|------------
topBoundary | number | The position of the scrollable area's top boundary.
bottomBoundary | number | The position of the scrollable area's bottom boundary.
changeVerticalScroll | (value: number) => void | A function that is called when the vertical scroll position is changed.
leftBoundary? | number | The position of the scrollable area's left boundary.
rightBoundary? | number | The position of the scrollable area's right boundary.
changeHorizontalScroll? | (value: number) => void | A function that is called when the horizontal scroll position is changed.

### Scheduler.RootProps

Describes properties passed to a component that renders the root layout.

Field | Type | Description
------|------|------------
height | number &#124; `auto` | The Scheduler's height.
children? | ReactNode | A React node used to render the root layout.

### SchedulerDateTime

The type of date-time values in the Scheduler.

Type: `Date | string | number`

### FormatterFn

A function that formats dates according to the set locale.

Type: `(nextDate: Date | string | number | undefined, nextOptions: Intl.DateTimeFormatOptions) => string`

## Plugin Components

Name | Properties | Description
-----|------------|------------
Scheduler.Root | [Scheduler.RootProps](#schedulerrootprops) | A component that renders the root layout.

Additional properties are added to the component's root element.
