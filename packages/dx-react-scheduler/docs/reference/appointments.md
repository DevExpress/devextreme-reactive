# Appointments Plugin Reference

A plugin that renders appointments.

## Import

Use the following statement to import a plugin with embedded theme components:

```js
import { Appointments } from '@devexpress/dx-react-scheduler-material-ui';
```

If you want to use custom components, you can import the themeless plugin:

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
appointmentComponent | ComponentType&lt;[Appointments.AppointmentProps](#appointmentsappointmentprops)&gt; | | A component that renders an appointment.
appointmentContentComponent | ComponentType&lt;[Appointments.AppointmentContentProps](#appointmentsappointmentcontentprops)&gt; | | A component that renders an appointment content.

## Interfaces

### Appointments.AppointmentProps

Describes properties passed to a component that renders an appointment.

Field | Type | Description
------|------|------------
children | ReactNode | A React node used to render the appointment content.
style | object | An object used to render the appointment geometry.
data | object | An object that represents an appointment data.
onClick? | (e: object) => void | A function that handles an appointment click.
onDoubleClick? | (e: object) => void | A function that handles an appointment double click.

### Appointments.AppointmentContentProps

Describes properties passed to a component that renders an appointment content.

Field | Type | Description
------|------|------------
children | ReactNode | A React node used to render the appointment content.
data | object | An object that represents an appointment data.

## Plugin Components

Name | Properties | Description
-----|------------|------------
Appointments.Appointment | [Appointments.AppointmentProps](#appointmentsappointmentprops) | A component that renders an appointment.
Appointments.ContentAppointment | [Appointments.AppointmentContentProps](#appointmentsappointmentcontentprops) | A component that renders an appointment content.
