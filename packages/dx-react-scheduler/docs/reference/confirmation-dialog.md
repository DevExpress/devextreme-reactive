# ConfirmationDialog Plugin Reference

A plugin that renders the dialog that allows users to confirm or to discard delete and cancel appointment actions.

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

### Properties

Name | Type | Default | Description
-----|------|---------|------------
doNotOpenOnDelete | boolean | false | Specifies whether to open the dialog on delete events.
doNotOpenOnCancel | boolean | false | Specifies whether to open the dialog on cancel events.
layoutComponent | ComponentType&lt;[ConfirmationDialog.LayoutProps](#confirmationdialoglayoutprops)&gt; | | A component that renders the dialog's layout.
overlayComponent | ComponentType&lt;[ConfirmationDialog.OverlayProps](#confirmationdialogoverlayprops)&gt; | | A component that renders the overlay window.
buttonComponent | ComponentType&lt;[ConfirmationDialog.ButtonProps](#confirmationdialogbuttonprops)&gt; | | A component that renders the dialog's buttons.
messages | ComponentType&lt;[ConfirmationDialog.LocalizationMessages](#localization-messages)&gt; | | An object that contains localized messages.

## Interfaces

### ConfirmationDialog.LayoutProps

Properties passed to a component that renders the dialog's layout.

Field | Type | Description
------|------|------------
isDeleting | boolean | **true** if the appointment is being deleted or **false** if it is being edited.
buttonComponent | ComponentType&lt;[ConfirmationDialog.ButtonProps](#confirmationdialogbuttonprops)&gt; | A component that renders the dialog's buttons.
handleClose | () => void | A function that closes the dialog.
confirm | () => void | A function that confirms changes.
getMessage | (messageKey: string) => string | Uses a localization message's key to retrieve the message.

### ConfirmationDialog.OverlayProps

Properties passed to a component that renders the overlay window.

Field | Type | Description
------|------|------------
target | ReactInstance | A React component instance or a DOM element that is used to position the window.
visible | boolean | A flag that specifies whether the overlay window is visible.
onHide | () => void | A function that is executed when the window is hidden.
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
confirmDeleteMeesage? | string | `Are you sure you want to delete this appointment?` | The delete confirmation dialog text.
confirmCancelMessage? | string | `Discard unsaved changes?` | The cancel confirmation dialog text.

## Plugin Components

Name | Properties | Description
-----|------------|------------
ConfirmationDialog.Layout | [ConfirmationDialog.LayoutProps](#confirmationdialoglayoutprops) | A component that renders the dialog's layout.
ConfirmationDialog.Overlay | [ConfirmationDialog.OverlayProps](#confirmationdialogoverlayprops) | A component that renders the overlay window.
ConfirmationDialog.Button | [ConfirmationDialog.ButtonProps](#confirmationdialogbuttonprops) | A component that renders the dialog's buttons.

Additional properties are added to the component's root element.
