# React Scheduler - Validation Actions


The React Scheduler allows to prevent user actions, such as delete appointment or cancel appointment changes events. To do that, add the [ConfirmationDialog](../reference/confirmation-dialog.md) plugin. If added, the dialog opens on delete an appointment and cancel appointment changes events. If you do not want the dialog to open on cancel appointment changes events, use `doNotOpenOnCancel` property, as shown in the demo below. To not open the dialog on delete events, use `doNotOpenOnDeete` property.

.embedded-demo({ "path": "scheduler-editing/delete-confirmation", "showThemeSelector": true })
