# ConfirmationDialog Plugin Reference

A plugin that renders a dialog that prompts a user to confirm that an appointment should be deleted or changes to an appointment should be discarded.

## Import

Use the following statement to import the plugin with embedded theme components:

```js
import { ConfirmationDialog } from '@devexpress/dx-react-scheduler-material-ui';
```

If you are going to use custom theme components, import the themeless version of this plugin instead:

```js
import { ConfirmationDialog } from '@devexpress/dx-react-scheduler';
```

## User Reference

### Dependencies

- [EditingState](editing-state.md)
- [EditRecurrenceMenu](edit-recurrence-menu.md) [Optional]
- [IntegratedEditing](integrated-editing.md) [Optional]

### Properties

Name | Type | Default | Description
-----|------|---------|------------
ignoreDelete | boolean | false | Specifies whether to open the dialog when a user attempts to delete an appointment.
ignoreCancel | boolean | false | Specifies whether to open the dialog when a user attempts to discard edits made to an appointment.
layoutComponent | ComponentType&lt;[ConfirmationDialog.LayoutProps](#confirmationdialoglayoutprops)&gt; | | A component that renders the dialog's layout.
overlayComponent | ComponentType&lt;[ConfirmationDialog.OverlayProps](#confirmationdialogoverlayprops)&gt; | | A component that renders the overlay window.
buttonComponent | ComponentType&lt;[ConfirmationDialog.ButtonProps](#confirmationdialogbuttonprops)&gt; | | A component that renders the dialog's buttons.
messages | [ConfirmationDialog.LocalizationMessages](#localization-messages) | | An object that contains localized messages.

## Interfaces

### ConfirmationDialog.LayoutProps

Properties passed to a component that renders the dialog's layout.

Field | Type | Description
------|------|------------
isDeleting | boolean | **true** if the appointment is being deleted or **false** if it is being edited.
appointmentData? | [AppointmentModel](./scheduler.md#appointmentmodel) | The appointment's data.
buttonComponent | ComponentType&lt;[ConfirmationDialog.ButtonProps](#confirmationdialogbuttonprops)&gt; | A component that renders the dialog's buttons.
handleCancel | () => void | A function that is called when the action is canceled.
handleConfirm | () => void | A function that is called when the action is confirmed.
getMessage | (messageKey: string) => string | Uses a localization message's key to retrieve the message.

### ConfirmationDialog.OverlayProps

Properties passed to a component that renders the overlay window.

Field | Type | Description
------|------|------------
target | ReactInstance | A React component instance or a DOM element that is used to position the window.
visible | boolean | A flag that specifies whether the overlay window is visible.
onHide | () => void | A function that is executed when the window hides.
children | ReactNode | A React node used to render the window's content.

### ConfirmationDialog.ButtonProps

Properties passed to a component that renders the dialog's buttons.

Field | Type | Description
------|------|------------
title | string | The button's text.
onClick | () => void | A function that is executed when the button is clicked.

## Localization Messages

Field | Type | Default | Description
------|------|---------|------------
discardButton? | string | `Discard` | The Discard button's text.
deleteButton? | string | `Delete` | The Delete button's text.
cancelButton? | string | `Cancel` | The Cancel button's text.
confirmDeleteMessage? | string | `Are you sure you want to delete this appointment?` | Text that prompts a user to confirm that the appointment should be deleted.
confirmCancelMessage? | string | `Discard unsaved changes?` | Text that prompts a user to confirm that edits made to an appointment should be discarded.

## Plugin Components

Name | Properties | Description
-----|------------|------------
ConfirmationDialog.Layout | [ConfirmationDialog.LayoutProps](#confirmationdialoglayoutprops) | A component that renders the dialog's layout.
ConfirmationDialog.Overlay | [ConfirmationDialog.OverlayProps](#confirmationdialogoverlayprops) | A component that renders the overlay window.
ConfirmationDialog.Button | [ConfirmationDialog.ButtonProps](#confirmationdialogbuttonprops) | A component that renders the dialog's buttons.

Additional properties are added to the component's root element.
