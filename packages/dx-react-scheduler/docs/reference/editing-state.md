# EditingState Plugin Reference

A plugin that manages the scheduler appointment editing state.

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
editingAppointment? | Partial&lt;[AppointmentModel](./scheduler.md#appointmentmodel)&gt; | | The appointment being edited.
defaultEditingAppointment? | Partial&lt;[AppointmentModel](./scheduler.md#appointmentmodel)&gt; | | The initial value of the `editingAppointment` property in uncontrolled mode.
onEditingAppointmentChange? | (editingAppointment: Partial&lt;[AppointmentModel](./scheduler.md#appointmentmodel)&gt;) => void | | Handles changes to the `editingAppointment` property value.
addedAppointment? | object | | A created but not committed appointment.
defaultAddedAppointment? | object | | The initial value of the `addedAppointment` property in uncontrolled mode.
onAddedAppointmentChange? | (addedAppointment: object) => void | | Handles changes to the `addedAppointment` property value.
appointmentChanges? | { [key: string]: object } | | Uncommitted appointment changes.
defaultAppointmentChanges? | { [key: string]: object } | | The initial value of the `appointmentChanges` property in uncontrolled mode.
onAppointmentChangesChange? | (appointmentChanges: { [key: string]: any }) => void | | Handles changes to the `appointmentChanges` property value.
onCommitChanges | (changes: [ChangeSet](#changeset)) => void | | Handles commiting appointment changes.
preCommitChanges? | (changes: object, appointmentData: Partial&lt;[AppointmentModel](./scheduler.md#appointmentmodel)&gt;, type: `all` &#124; `current` &#124; `currentAndFollowing`) => [ChangeSet](#changeset) | | Allows you to process changes that are not committed yet.

## Interfaces

### ChangeSet

Describes uncommitted changes made to the scheduler data.

Field | Type | Description
------|------|------------
added? | { [key: string]: any } | An appointment to be created.
changed? | { [key: string]: any } | Changes made to an appointment. The item's key specifies the associated appointment's ID.
deleted? | number &#124; string | The identifier of an appointment to be deleted.
