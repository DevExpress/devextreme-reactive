# Scheduler Reference

The Scheduler is a root container component designed to process and display the specified data. The Scheduler's functionality (data visualization and processing) is implemented in several plugins specified as child components.

## Import

Use the following statement to import a plugin with embedded theme components:

```js
import { Scheduler } from '@devexpress/dx-react-scheduler-material-ui';
```

If you want to use custom components, you can import the themeless plugin:

```js
import { Scheduler } from '@devexpress/dx-react-scheduler';
```

## User reference

### Properties

Name | Type | Default | Description
-----|------|---------|------------
data | Array&lt;object&gt; | | An array of appointment data objects.
mapAppointmentData? | (appointment: object) => [AppointmentModel](#appointmentModel) | | A map function used to get an appointment data.
rootComponent | ComponentType&lt;[Scheduler.RootProps](#schedulerrootprops)&gt; | | A component that renders the root layout.

## Interfaces

### AppointmentModel

Describes an appointment data object that should be returned by `mapAppointmentData` function.

Field | Type | Description
------|------|------------
title | string | The title.
startDate | Date | The start date.
endDate | Date | The end date.
allDay | boolean | The all day flag.
id | number &#124; string | The identifier.

### Scheduler.RootProps

Describes properties passed to a component that renders the root layout.

Field | Type | Description
------|------|------------
children? | ReactNode | A React node used to render the root layout.

## Plugin Components

Name | Properties | Description
-----|------------|------------
Scheduler.Root | [Scheduler.RootProps](#schedulerrootprops) | A component that renders the root layout.

Additional properties are added to the component's root element.
