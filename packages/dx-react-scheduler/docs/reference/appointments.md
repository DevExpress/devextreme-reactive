# Appointments Plugin Reference

A plugin that renders appointments.

## Import

Use the following statement to import the plugin:

```js
import { Appointments } from '@devexpress/dx-react-scheduler';
```

## User Reference

### Dependencies

none

### Properties

Name | Type | Default | Description
-----|------|---------|------------
appointmentComponent | ComponentType&lt;[Appointments.AppointmentProps](#appointmentsappointmentprops)&gt; | | A component that renders an appointment.

## Interfaces

### Appointments.AppointmentProps

Describes properties passed to a component that renders an appointment.

Field | Type | Description
------|------|------------
children | ReactNode | A React node used to render the appointment content. ???
style | object | An object used to render the appointment geometry.

## Plugin Components

Name | Properties | Description
-----|------------|------------
Appointments.Appointment | [Appointments.AppointmentProps](#appointmentsappointmentprops) | A component that renders an appointment.