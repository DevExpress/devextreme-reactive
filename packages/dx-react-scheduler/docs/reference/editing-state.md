# EditingState Plugin Reference

A plugin that manages scheduler appointment's editing state.

## Import

Use the following statement to import the plugin:

```js
import { EditingState } from '@devexpress/dx-react-scheduler';
```

## User Reference

### Dependencies

none

### Properties

Name | Type | Default | Description
-----|------|---------|------------
editingAppointmentId? | number &#124; string | | ID of the appointment being edited.
defaultEditingAppointmentId? | number &#124; string | | ID of the appointment initially added to the `editingAppointmentId` in uncontrolled mode.
onEditingAppointmentIdChange? | (editingAppointmentId: number &#124; string) => void | | Handles adding or removing an appointment to/from the `editingAppointmentId`.
addedAppointment? | object | | Created but not committed appointment.
defaultAddedAppointment? | object | | Appointment initially added to the `addedAppointment` in uncontrolled mode.
onAddedAppointmentChange? | (addedAppointment: object) => void | | Handles adding or removing an appointment to/from the `addedAppointment`.
appointmentChanges? | { [key: string]: object } | | Not committed appointment changes.
defaultAppointmentChanges? | { [key: string]: object } | | Appointment changes initially added to the `appointmentChanges` in uncontrolled mode.
onAppointmentChangesChange? | (appointmentChanges: { [key: string]: any }) => void | | Handles adding or removing an appointment changes to/from the `appointmentChanges`.
onCommitChanges | (changes: [ChangeSet](#changeset)) => void | | Handles appointment changes committing.

## Interfaces

### ChangeSet

Describes uncommitted changes made to the scheduler data.

Field | Type | Description
------|------|------------
added? | [AppointmentModel](./scheduler.md#appointmentmodel) | An appointment to be created.
changed? | { [key: number &#124; string]: object } | An object that stores changes made to existing data. Specifies changes made to a appointment. The item's key specifies the associated appointment's ID.
deleted? | number &#124; string | ID representing appointment to be deleted.
