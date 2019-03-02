# DragDropProvider Plugin Reference

A plugin that implements the drag-and-drop functionality and visualizes appointments that are being dragged.

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
- [Appointments](week-view.md)
- [AllDayPanel](all-day-panel.md) [Optional]

### Properties

Name | Type | Default | Description
-----|------|---------|------------
draggingPredicate | ([AppointmentModel](./scheduler.md#appointmentmodel)) => boolean | () => `true` | A drag predicate. A function that specifies which appointments are draggable.
draftAppointmentComponent | ComponentType&lt;[DragDropProvider.DraftAppointmentProps](#dragdropproviderdraftappointmentprops)&gt; | | A component that renders a appointment being dragged.
sourceAppointmentComponent | ComponentType&lt;[DragDropProvider.SourceAppointmentProps](#dragdropprovidersourceappointmentprops)&gt; | | A component that renders a source appointment.
containerComponent | ComponentType&lt;[DragDropProvider.ContainerProps](#dragdropprovidercontainerprops)&gt; | | A component that renders a container for appointment being dragged.

## Interfaces

### DragDropProvider.ContainerProps

Describes properties of the component that renders a container for appointment being dragged.

Field | Type | Description
------|------|------------
children | ReactNode | A React node representing appointment being dragged.

### DragDropProvider.DraftAppointmentProps

Describes properties of the component that renders a appointment being dragged.

Field | Type | Description
------|------|------------
data | [AppointmentModel](./scheduler.md#appointmentmodel) | Specifies a appointment's data that being dragged.
style | object | An object that configures the appointment geometry and position.
type | string | Specifies an appointment type.

### DragDropProvider.SourceAppointmentProps

Describes properties of the component that renders a source appointment.

Field | Type | Description
------|------|------------
data | [AppointmentModel](./scheduler.md#appointmentmodel) | Specifies a appointment's data that being dragged.
style | object | An object that configures the appointment geometry and position.
type | string | Specifies an appointment type.

## Plugin Components

Name | Properties | Description
-----|------------|------------
DragDropProvider.DraftAppointment | [DragDropProvider.DraftAppointmentProps](#dragdropproviderdraftappointmentprops) | A component that renders a appointment being dragged.
DragDropProvider.SourceAppointment | [DragDropProvider.SourceAppointmentProps](#dragdropprovidersourceappointmentprops) | A component that renders a source appointment.
DragDropProvider.Container | [DragDropProvider.ContainerProps](#dragdropprovidercontainerprops) | A component that renders a container for appointment being dragged.

Additional properties are added to the component's root element.
