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
appointmentComponent | ComponentType&lt;[Appointments.AppointmentProps](#appointmentsappointmentprops)&gt; | | A component that renders an appointment.
appointmentContentComponent | ComponentType&lt;[Appointments.AppointmentContentProps](#appointmentsappointmentcontentprops)&gt; | | A component that renders the appointment content.

## Interfaces

### Appointments.AppointmentProps

Properties passed to a component that renders an appointment.

Field | Type | Description
------|------|------------
children | ReactNode | A React node used to render the appointment content.
style | object | An object that configures the appointment geometry and position.
data | object | An object that specifies the appointment data.
clickable | boolean | Specifies whether component is clickable.
onClick? | (e: object) => void | A function that handles a click on the appointment.
onDoubleClick? | (e: object) => void | A function that handles a double click on the appointment.

### Appointments.AppointmentContentProps

Properties passed to a component that renders the appointment content.

Field | Type | Description
------|------|------------
children | ReactNode | A React node used to render the appointment content.
data | object | An object that represents appointment data.

## Plugin Components

Name | Properties | Description
-----|------------|------------
Appointments.Appointment | [Appointments.AppointmentProps](#appointmentsappointmentprops) | A component that renders an appointment.
Appointments.AppointmentContent | [Appointments.AppointmentContentProps](#appointmentsappointmentcontentprops) | A component that renders the appointment content.
