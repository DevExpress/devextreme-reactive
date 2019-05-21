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
splitIndicatorComponent | ComponentType&lt;[Appointments.SplitIndicatorProps](#appointmentssplitindicatorprops)&gt; | | A component that renders an element which indicates the appointment is divided.
recurringIconComponent | ComponentType&lt;object&gt; | | A component that renders an icon for recurring appointments.
containerComponent | ComponentType&lt;[Appointments.ContainerProps](#appointmentscontainerprops)&gt; | | A component that renders a container for the appointment.

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
formatDate | [FormatterFn](scheduler.md#formatterfn) | A function that formats dates according to the locale.
recurringIconComponent | ComponentType&lt;object&gt; | A component that renders an icon for recurring appointments.

### Appointments.SplitIndicatorProps

Properties passed to a component that renders an element which indicates the appointment is divided.

Field | Type | Description
------|------|------------
position | 'start' &#124; 'end' | Specifies whether the element is rendered at the start or end of the divided appointment.
appointmentType | 'vertical' &#124; 'horizontal' | Specifies whether the appointment is vertical or horizontal.

### Appointments.ContainerProps

Properties passed to a component that renders a container for the appointment.

Field | Type | Description
------|------|------------
style | object | An object that configures the appointment's geometry and position.

## Plugin Components

Name | Properties | Description
-----|------------|------------
Appointments.Appointment | [Appointments.AppointmentProps](#appointmentsappointmentprops) | A component that renders an appointment.
Appointments.AppointmentContent | [Appointments.AppointmentContentProps](#appointmentsappointmentcontentprops) | A component that renders the appointment content.
Appointments.SplitIndicator | [Appointments.SplitIndicatorProps](#appointmentssplitindicatorprops) | A component that renders an element which indicates the appointment is divided.
Appointments.Container | [Appointments.ContainerProps](#appointmentscontainerprops) | A component that renders a container for the appointment.

Additional properties are added to the component's root element.
