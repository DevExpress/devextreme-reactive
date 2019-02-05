# React Scheduler - Editing

The React Scheduler allows users to create, update, and delete appointments. The editing state contains information about pending changes made to an appointment and is managed by the `EditingState` plugin. Once a user clicks Save or Delete, the plugin fires the `onCommitChanges` event and clears the editing state.

## Related Plugins

The following plugins implement this feature:

- [EditingState](../reference/editing-state.md) - controls the editing state
- [AppointmentTooltip](../reference/appointment-tooltip.md) - renders a tooltip with controls that manage the appointment
- [AppointmentForm](../reference/appointment-form.md) - renders a form that allows a user to edit an appointment

## User Interaction

The user can edit appointments as follows:

### Add an Appointment

1. Double-click a cell in the timetable to open the appointment editing form.
2. Fill out the form and click Create to add a new appointment to the dataset.

### Update an Appointment

Double-click an appointment to open the appointment editing form.

OR

Click an appointment for the appointment tooltip to appear, and then click Edit in the tooltip to open the appointment editing form.

### Delete an Appointment

Click an appointment to invoke the appointment tooltip, and then click Delete in the tooltip to remove the appointment.

## Basic Setup

Add the plugins listed above to the Scheduler and handle the `EditingState` plugin's `onCommitChanges` event to commit edits to the data storage.

### Uncontrolled Mode

In uncontrolled mode, specify the initial editing state via the following `EditingState` properties:

- `defaultEditingAppointmentId` - the ID of the appointment being edited
- `defaultAddedAppointment` - the appointment being added
- `defaultAppointmentChanges` - changes made to the appointment

.embedded-demo({ "path": "scheduler-editing/uncontrolled", "showThemeSelector": true })

### Controlled Mode

In controlled mode, specify the following `EditingState` properties in pairs to set a state value and handle the event when it changes:

- `editingAppointmentId` and `onEditingAppointmentIdChange` - the ID of the appointment being edited
- `addedAppointment` and `onAddedAppointmentChange` - the appointment being added
- `appointmentChanges` and `onAppointmentChangesChange` - changes made to the appointment

You can also use the `onAddedAppointmentChange` event to initialize a new appointment's properties with default values.

.embedded-demo({ "path": "scheduler-editing/controlled", "showThemeSelector": true })

## Preprocess Changes

To validate user input or prevent user actions, handle the `EditingState` plugin's `onCommitChanges` event.

For example, you can show a confirmation dialog before an appointment is removed. To detect an attempt to remove an appointment, check the `deleted` parameter's value in the `commitChanges` handler:

.embedded-demo({ "path": "scheduler-editing/delete-confirmation", "showThemeSelector": true })
