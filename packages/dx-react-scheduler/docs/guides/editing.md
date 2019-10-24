# React Scheduler - Editing

The React Scheduler allows users to create, update, and delete appointments. The editing state contains information about pending changes made to an appointment and is managed by the `EditingState` plugin. Once a user clicks Save or Delete, the plugin fires the `onCommitChanges` event and clears the editing state.

## Related Plugins

The following plugins implement this feature:

- [EditingState](../reference/editing-state.md) - controls the editing state
- [IntegratedEditing](../reference/integrated-editing.md) - implements editing
- [EditRecurrenceMenu](../reference/integrated-editing.md) - renders the edit menu and allows you to process user edits
- [AppointmentTooltip](../reference/appointment-tooltip.md) - renders a tooltip with controls that manage the appointment
- [AppointmentForm](../reference/appointment-form.md) - renders a form that allows a user to edit an appointment
- [DragDropProvider](../reference/drag-drop-provider.md) - implements drag-and-drop editing
- [ConfirmationDialog](../reference/confirmation-dialog.md) - renders a dialog that prompts a user to confirm that an appointment should be deleted or changes to an appointment should be discarded

## User Interaction

The user can edit appointments as follows:

### Add an Appointment

1. Double-click a cell in the timetable to open the appointment editing form.
2. Fill out the form and click Create to add a new appointment to the dataset.

### Update an Appointment

- Double-click an appointment to open the appointment editing form;
- Click an appointment to invoke its tooltip, and then click Edit in the tooltip to open the appointment editing form;
- Drag an appointment to another cell to reschedule it. This functionality requires the [DragDropProvider](../reference/drag-drop-provider.md) plugin;
- Drag an appointment's top or bottom border (left or right border for horizontal appointments) to change the appointment's duration.

### Delete an Appointment

- Click an appointment to invoke its tooltip, and then click Delete in the tooltip to remove the appointment.

## Basic Setup

Add the plugins listed above to the Scheduler and handle the `EditingState` plugin's `onCommitChanges` event to commit edits to the data storage.

### Uncontrolled Mode

In uncontrolled mode, specify the initial editing state via the following `EditingState` properties:

- `defaultEditingAppointment` - the appointment being edited
- `defaultAddedAppointment` - the appointment being added
- `defaultAppointmentChanges` - changes made to the appointment

.embedded-demo({ "path": "scheduler-editing/uncontrolled", "showThemeSelector": true })

### Controlled Mode

In controlled mode, specify the following `EditingState` properties in pairs to set a state value and handle the event when it changes:

- `editingAppointment` and `onEditingAppointmentChange` - the appointment being edited
- `addedAppointment` and `onAddedAppointmentChange` - the appointment being added
- `appointmentChanges` and `onAppointmentChangesChange` - changes made to the appointment

You can also use the `onAddedAppointmentChange` event to initialize a new appointment's properties with default values.

.embedded-demo({ "path": "scheduler-editing/controlled", "showThemeSelector": true })

## Drag-and-Drop Editing

Add the [DragDropProvider](../reference/drag-drop-provider.md) plugin to enable users to drag and drop appointments. Use its `allowDrag` and `allowResize` properties to disallow dragging and resizing specific appointments. You can also add the `EditRecurrenceMenu` plugin to allow users to specify how recurrent appointments are edited.

.embedded-demo({ "path": "scheduler-editing/drag-drop", "showThemeSelector": true })

The [DragDropProvider](../reference/drag-drop-provider.md) plugin also allows you to customize the appointment being dragged (via the `draftAppointmentComponent` property) and its copy displayed in its previous location (via `sourceAppointmentComponent`). In addition, it provides the `resizeComponent` property that allows you to customize the handles used to resize appointments.

## Preprocess Changes

To validate user input or prevent user actions, handle the `EditingState` plugin's `onCommitChanges` event.

For example, you can copy an appointment if it was drag-and-dropped while a specific key was pressed (the `shift` key is used in the demo below). To detect the drop event, check the `changed` parameter's value in the `commitChanges` handler:

.embedded-demo({ "path": "scheduler-editing/copy-after-dragdrop", "showThemeSelector": true })

## Customize the Appointment Form

To add and remove editors to/from the appointment form or change its layout, use [components](../reference/appointment-form.md#plugin-components) the `AppointmentForm` plugin provides. They include editors for Boolean values, text, and dates, multi-choice editors, and several layout components.

The following demo shows how to customize the appointment form. A custom `TextEditor` with a `Label` is added to the form's `BasicLayout` and a predefined `multilineTextEditor` is removed from it.

.embedded-demo({ "path": "scheduler-editing/form-customization", "showThemeSelector": true })

## Add a Confirmation Dialog


To enable the confirmation dialog, add the [ConfirmationDialog](../reference/confirmation-dialog.md) plugin. The dialog pops up when a user attempts to delete an appointment or discard edits made to it. If the dialog should not appear in these cases, set the `ignoreDelete` or `ignoreCancel` property to `true`. 

.embedded-demo({ "path": "scheduler-editing/delete-confirmation", "showThemeSelector": true })
