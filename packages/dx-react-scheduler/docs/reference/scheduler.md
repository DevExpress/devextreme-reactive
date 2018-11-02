# Scheduler Reference

The Scheduler is a root container component designed to process and display data specified via the `data` property. The Scheduler's functionality (data visualization and data processing) is implemented in several plugins specified as child components.

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
data | Array&lt;object&gt; | | An array containing custom data. A user defines the access to this data.
mapAppointmentData? | (appointment: object) => [AppointmentModel](#appointmentModel) | | Specifies the map function used to get an appointment fields.
rootComponent | ComponentType&lt;[Scheduler.RootProps](#schedulerrootprops)&gt; | | A component that renders the scheduler root layout.

## Interfaces

### AppointmentModel

Describes an object that should be returned by mapAppointmentData function.

Field | Type | Description
------|------|------------
title | string | An appointment title text.
startDate | Date | An appointment start date.
endDate | Date | An appointment end date.
allDay | boolean | An appointment all day flag.
id | number &#124; string | An appointment all day flag.

### Scheduler.RootProps

Describes properties passed to a component that renders the scheduler root layout.

Field | Type | Description
------|------|------------
children? | ReactNode | A React node to be placed in the root layout.

## Plugin Components

Name | Properties | Description
-----|------------|------------
Scheduler.Root | [Scheduler.RootProps](#schedulerrootprops) | A component that renders the scheduler root layout.

Additional properties are added to the component's root element.
