# React Scheduler - Editing

The React Scheduler supports editing features including creating, updating and deleting appointments. Use the corresponding plugins to manage the editing state. The editing state contains information about appointment currently being edited, changes applied to a particular appointment, and appointment that has been deleted and created but not yet committed. Once a user accepts an appointment addition, deletion, or changes made to an appointment (clicking the Save or Delete button), the Scheduler fires the `EditingState` plugin's `onCommitChanges` event and resets the appointment's editing state.

## Related Plugins

The following plugins implement editing features:

- [EditingState](../reference/editing-state.md) - controls the editing state
- [AppointmentTooltip](../reference/appointment-tooltip.md) - renders a appointment tooltip with editing controls
- [AppointmentForm](../reference/appointment-form.md) - renders an appointment editing form

## User Interactions

The React Scheduler provides a functionality to manage the data source via user interface. End-user can add, edit and delete appointments by built-in UI controls. Rules below introduce to user's editing manipulations.

### Add an Appointment

1. Double click a cell in a timetable. The appointment editing form will be shown.
2. In the form, specify required fields and clicks the `Create` button. This will create an appointment and add it.

### Update an Appointment

- Double click an appointment. The appointment editing form will be shown.
- Click an appointment. The appointment tooltip will be shown with an `Edit` button. The `Edit` button will open an appointment editing form.

### Delete an Appointment

- Click an appointment. The appointment tooltip will be shown with a `Delete` button.

## Basic Setup

Add the plugins listed above to the Scheduler to set up a simple Scheduler supporting editing features.

Handle the `EditingState` plugin's `onCommitChanges` event to commit changes made by an end-user to your data store.

## Uncontrolled Mode

In the [uncontrolled mode](controlled-and-uncontrolled-modes.md), you can specify the initial editing state values using the following `EditingState` plugin's properties:

- `defaultEditingAppointmentId` - the appointment ID being edited
- `defaultAddedAppointment` - the appointment being added
- `defaultAppointmentChanges` - the appointment changes

.embedded-demo({ "path": "scheduler-editing/uncontrolled", "showThemeSelector": true })

## Controlled Mode

In the [controlled mode](controlled-and-uncontrolled-modes.md), specify the following `EditingState` plugin's property pairs to set a state value and handle its changes:

- `editingAppointmentId` and `onEditingAppointmentIdChange` - the appointment ID being edited
- `addedAppointment` and `onAddedAppointmentChange` - the appointment being added
- `appointmentChanges` and `onAppointmentChangesChange` - the appointment changes

Note, you can also use the `onAddedAppointmentChange` event to initialize a created appointment with default property values.

.embedded-demo({ "path": "scheduler-editing/controlled", "showThemeSelector": true })

## Changes Preprocessing

You can validate user input or prevent user action using the `onCommintChanges` property of the `EditingState` plugin. For example, it's a quite popular task to show a confirmation dialog to prevent accidental data removing.

To implement a delete confirmation functionality you should detect the `deleted` argument of the `commitChanges` handler. And open confirmation dialog before commit deleting.

.embedded-demo({ "path": "scheduler-editing/delete-confirmation", "showThemeSelector": true })
