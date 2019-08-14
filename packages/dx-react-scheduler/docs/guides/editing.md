# React Scheduler - Editing

The React Scheduler allows users to create, update, and delete appointments. The editing state contains information about pending changes made to an appointment and is managed by the `EditingState` plugin. Once a user clicks Save or Delete, the plugin fires the `onCommitChanges` event and clears the editing state.

## Related Plugins

The following plugins implement this feature:

- [EditingState](../reference/editing-state.md) - controls the editing state
- [IntegratedEditing](../reference/integrated-editing.md) - performs built-in edit processing
- [EditingMenu](../reference/integrated-editing.md) - renders editing menu and performs user edit processing
- [AppointmentTooltip](../reference/appointment-tooltip.md) - renders a tooltip with controls that manage the appointment
- [AppointmentForm](../reference/appointment-form.md) - renders a form that allows a user to edit an appointment
- [DragDropProvider](../reference/drag-drop-provider.md) - implements drag-and-drop editing

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

## Preprocess Changes

To validate user input or prevent user actions, handle the `EditingState` plugin's `onCommitChanges` event.

For example, you can show a confirmation dialog before an appointment is removed. To detect an attempt to remove an appointment, check the `deleted` parameter's value in the `commitChanges` handler:

.embedded-demo({ "path": "scheduler-editing/delete-confirmation", "showThemeSelector": true })

## Drag-and-Drop Editing

Add the [DragDropProvider](../reference/drag-drop-provider.md) plugin to enable users to drag and drop appointments and the `EditingMenu` to specify editing type for recurrence appointments. Use its `allowDrag` and `allowResize` properties to disallow dragging and resizing specific appointments.

.embedded-demo({ "path": "scheduler-editing/drag-drop", "showThemeSelector": true })

The [DragDropProvider](../reference/drag-drop-provider.md) plugin also allows you to customize the appointment being dragged (via the `draftAppointmentComponent` property) and its copy displayed in its previous location (via `sourceAppointmentComponent`). In addition, it provides the `resizeComponent` property that allows you to customize the handles used to resize appointments.
