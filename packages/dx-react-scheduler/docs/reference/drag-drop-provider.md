# DragDropProvider Plugin Reference

A plugin that enables users to edit appointments via drag-and-drop.

## Import

Use the following statement to import a plugin with embedded theme components:

```js
import { DragDropProvider } from '@devexpress/dx-react-scheduler-material-ui';
```

If you want to use custom components, you can import the themeless plugin:

```js
import { DragDropProvider } from '@devexpress/dx-react-scheduler';
```

## User Reference

### Dependencies

- [EditingState](editing-state.md)
- [EditRecurrenceMenu](edit-recurrence-menu.md) [Optional]
- [IntegratedEditing](integrated-editing.md) [Optional]
- [Appointments](appointments.md)
- [DayView](day-view.md) [Optional]
- [WeekView](week-view.md) [Optional]
- [MonthView](month-view.md) [Optional]
- [AllDayPanel](all-day-panel.md) [Optional]

### Properties

Name | Type | Default | Description
-----|------|---------|------------
allowDrag? | (appointmentData: [AppointmentModel](./scheduler.md#appointmentmodel)) => boolean | () => true | A function that specifies draggable appointments.
allowResize? | (appointmentData: [AppointmentModel](./scheduler.md#appointmentmodel)) => boolean | () => true | A function that specifies resizable appointments.
draftAppointmentComponent | ComponentType&lt;[DragDropProvider.DraftAppointmentProps](#dragdropproviderdraftappointmentprops)&gt; | | A component that renders the appointment being dragged.
sourceAppointmentComponent | ComponentType&lt;[DragDropProvider.SourceAppointmentProps](#dragdropprovidersourceappointmentprops)&gt; | | A component that renders a copy of the appointment being dragged in its previous location.
resizeComponent | ComponentType&lt;[DragDropProvider.ResizeProps](#dragdropproviderresizeprops)&gt; | | A component that renders a handle used to resize the appointment.
containerComponent | ComponentType&lt;[DragDropProvider.ContainerProps](#dragdropprovidercontainerprops)&gt; | | A component that renders a container for the appointment being dragged.

## Interfaces

### DragDropProvider.DraftAppointmentProps

Describes properties of the component that renders the appointment being dragged.

Field | Type | Description
------|------|------------
data | [AppointmentModel](./scheduler.md#appointmentmodel) | Specifies the appointment's data.
style | object | Configures the appointment's geometry and position.
type | string | Specifies the appointment's type.
fromPrev | boolean | **true** if the appointment is continued from the previous day/week/month/year.
toNext | boolean | **true** if the appointment continues on the next day/week/month/year.

### DragDropProvider.SourceAppointmentProps

Describes properties of the component that renders a copy of the appointment being dragged in its previous location.

Field | Type | Description
------|------|------------
data | [AppointmentModel](./scheduler.md#appointmentmodel) | Specifies the appointment's data.
type | string | Specifies the appointment's type.

### DragDropProvider.ResizeProps

Describes properties of the component that renders a handle used to resize the appointment.

Field | Type | Description
------|------|------------
position | 'start' &#124; 'end' | Specifies the handle's position in the appointment.
appointmentType | 'vertical' &#124; 'horizontal' | Specifies whether the appointment is vertical or horizontal.

### DragDropProvider.ContainerProps

Describes properties of the component that renders a container for the appointment being dragged.

Field | Type | Description
------|------|------------
children | ReactNode | Represents the appointment being dragged.

## Plugin Components

Name | Properties | Description
-----|------------|------------
DragDropProvider.DraftAppointment | [DragDropProvider.DraftAppointmentProps](#dragdropproviderdraftappointmentprops) | A component that renders the appointment being dragged.
DragDropProvider.SourceAppointment | [DragDropProvider.SourceAppointmentProps](#dragdropprovidersourceappointmentprops) | A component that renders a copy of the appointment being dragged in its previous location.
DragDropProvider.Resize | [DragDropProvider.ResizeProps](#dragdropproviderresizeprops) | A component that renders the handle of the appointment being resized.
DragDropProvider.Container | [DragDropProvider.ContainerProps](#dragdropprovidercontainerprops) | A component that renders a container for the appointment being dragged.

Additional properties are added to the component's root element.
