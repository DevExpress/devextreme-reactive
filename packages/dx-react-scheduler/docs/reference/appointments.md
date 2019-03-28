# Appointments Plugin Reference

A plugin that renders appointments.

## Import

Use the following statement to import a plugin with embedded theme components:

```js
import { Appointments } from '@devexpress/dx-react-scheduler-material-ui';
```

You can import the themeless plugin if you want to use custom components:

```js
import { Appointments } from '@devexpress/dx-react-scheduler';
```

## User Reference

### Dependencies

- [DayView](day-view.md) [Optional]
- [WeekView](week-view.md) [Optional]
- [MonthView](month-view.md) [Optional]
- [AllDayPanel](all-day-panel.md) [Optional]

### Properties

Name | Type | Default | Description
-----|------|---------|------------
sliceComponent | ComponentType&lt;[Appointments.SliceProps](#appointmentssliceprops)&gt; | | A component that rendered if appointment is sliced by time table.
containerComponent | ComponentType&lt;[Appointments.ContainerProps](#appointmentscontainerprops)&gt; | | A component that renders a container for appointment.
appointmentComponent | ComponentType&lt;[Appointments.AppointmentProps](#appointmentsappointmentprops)&gt; | | A component that renders an appointment.
appointmentContentComponent | ComponentType&lt;[Appointments.AppointmentContentProps](#appointmentsappointmentcontentprops)&gt; | | A component that renders the appointment content.

## Interfaces

### Appointments.AppointmentProps

Properties passed to a component that renders an appointment.

Field | Type | Description
------|------|------------
children | ReactNode | A React node used to render the appointment content.
data | object | An object that specifies the appointment data.
draggable | boolean | Specifies whether the appointment is draggable.
onClick? | (e: object) => void | A function that handles a click on the appointment.
onDoubleClick? | (e: object) => void | A function that handles a double click on the appointment.

### Appointments.AppointmentContentProps

Properties passed to a component that renders the appointment content.

Field | Type | Description
------|------|------------
children | ReactNode | A React node used to render the appointment content.
data | object | An object that represents appointment data.

### Appointments.SliceProps

Properties passed to a component that renders a slice.

Field | Type | Description
------|------|------------
position | string | Specifies where appointment is sliced.
appointmentType | string | Specifies an appointment type.

### Appointments.ContainerProps

Properties passed to a component that renders a container for appointment.

Field | Type | Description
------|------|------------
style | object | An object that configures the appointment geometry and position.

## Plugin Components

Name | Properties | Description
-----|------------|------------
sliceComponent | [Appointments.SliceProps](#appointmentssliceprops) | A component that rendered if appointment is sliced by time table.
containerComponent | [Appointments.ContainerProps](#appointmentscontainerprops) | A component that renders a container for appointment.
Appointments.Appointment | [Appointments.AppointmentProps](#appointmentsappointmentprops) | A component that renders an appointment.
Appointments.AppointmentContent | [Appointments.AppointmentContentProps](#appointmentsappointmentcontentprops) | A component that renders the appointment content.

Additional properties are added to the component's root element.
