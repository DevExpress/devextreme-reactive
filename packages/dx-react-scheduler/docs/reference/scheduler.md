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

## Interfaces

### AppointmentModel

Describes an appointment data object. If you are using another data structure you should map it yourself. Please refer to [this](https://devexpress.github.io/devextreme-reactive/react/scheduler/demos/featured/remote-data/) demo for more details.

Field | Type | Description
------|------|------------
startDate | Date &#124; string &#124; number | The start date.
endDate | Date &#124; string &#124; number | The end date.
title? | string | The title.
allDay? | boolean | The all day flag.
id? | number &#124; string | The identifier.
[propertyName: string] | any | Any other properties.

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
