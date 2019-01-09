# React Scheduler - Editing

The Scheduler supports editing features including creating, updating and deleting appointments. Use the corresponding plugins to manage the editing state and perform editing operations programmatically or via the UI controls. The editing state contains information about appointment currently being edited, changes applied to a particular appointment, and appointment that has been deleted and created but not yet committed. Once a user accepts a appointment addition or deletion, or changes made to an appointment (clicking the Save or Delete button), the Scheduler fires the `EditingState` plugin's `onCommitChanges` event and resets the appointment's editing state.

## Related Plugins

The following plugins implement editing features:

- [EditingState](../reference/editing-state.md) - controls the editing state
- [AppointmentTooltip](../reference/appointment-tooltip.md) - renders a appointment tooltip (an appointment tooltip containing controls used for appointment editing and deleting)
- [AppointmentForm](../reference/appointment-form.md) - renders an appointment editing form. It's provide a functionality to commit changes
- [Appointments](../reference/appointments.md) - renders appointments

## Basic Setup

Add the plugins listed above to the Scheduler to set up a simple Scheduler supporting editing features.

Handle the `EditingState` plugin's `onCommitChanges` event to commit changes made by an end-user to your data store.

### User Interactions

#### Add Appointment

- Double click a cell in the timetable. The appointment details will be shown here. - `!!!!`



## Uncontrolled Mode

In the [uncontrolled mode](controlled-and-uncontrolled-modes.md), you can specify the initial editing state values using the following `EditingState` plugin's properties:

- `defaultEditingAppointmentId` - the appointment id being edited
- `defaultAddedAppointment` - the appointment being added
- `defaultAppointmentChanges` - the appointment changes

.embedded-demo({ "path": "scheduler-editing/edit-appointment", "showThemeSelector": true })

## Controlled Mode

In the [controlled mode](controlled-and-uncontrolled-modes.md), specify the following `EditingState` plugin's property pairs to set a state value and handle its changes:

- `editingAppointmentId` and `onEditingAppointmentIdChange` - the appointment id being edited
- `addedAppointment` and `onAddedAppointmentChange` - the appointments being added
- `appointmentChanges` and `onAppointmentChangesChange` - the appointment changes

Note, you can also use the `onAddedAppointmentChange` event to initialize a created appointment with default property values.

.embedded-demo({ "path": "scheduler-editing/edit-appointment-controlled", "showThemeSelector": true })
