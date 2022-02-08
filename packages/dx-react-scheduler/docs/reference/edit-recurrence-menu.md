# EditRecurrenceMenu Plugin Reference

A plugin that renders the menu that allows users to edit recurrent appointments. Should not be used with the [IntegratedEditing](integrated-editing.md) plugin.

## Import

Use the following statement to import the plugin with embedded theme components:

```js
import { EditRecurrenceMenu } from '@devexpress/dx-react-scheduler-material-ui';
```

If you are going to use custom theme components, import the themeless version of this plugin instead:

```js
import { EditRecurrenceMenu } from '@devexpress/dx-react-scheduler';
```

## User Reference

### Dependencies

- [EditingState](editing-state.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
layoutComponent | ComponentType&lt;[EditRecurrenceMenu.LayoutProps](#editrecurrencemenulayoutprops)&gt; | | A component that renders the menu's layout.
overlayComponent | ComponentType&lt;[EditRecurrenceMenu.OverlayProps](#editrecurrencemenuoverlayprops)&gt; | | A component that renders the overlay window.
buttonComponent | ComponentType&lt;[EditRecurrenceMenu.ButtonProps](#editrecurrencemenubuttonprops)&gt; | | A component that renders the OK and Cancel buttons.
messages | [EditRecurrenceMenu.LocalizationMessages](#localization-messages) | | An object that contains localized messages.

## Interfaces

### EditRecurrenceMenu.LayoutProps

Properties passed to a component that renders the edit menu's layout.

Field | Type | Description
------|------|------------
isDeleting | boolean | **true** if the appointment is being deleted or **false** if it is being edited.
buttonComponent | ComponentType&lt;[EditRecurrenceMenu.ButtonProps](#editrecurrencemenubuttonprops)&gt; | A component that renders the OK and Cancel buttons.
handleClose | () => void | A function that closes the menu.
commit | (value?: string) => void | A function that commits changes.
availableOperations | Array&lt;string&gt; | A list of available editing operations.
getMessage | (messageKey: string) => string | A function that returns a message with the specified key.

### EditRecurrenceMenu.OverlayProps

Properties passed to a component that renders the overlay window.

Field | Type | Description
------|------|------------
target | ReactInstance | A React component instance or a DOM element that is used to position the window.
visible | boolean | A flag that specifies whether the overlay window is visible.
onHide | () => void | A function that is executed when the window is hidden.
children | ReactNode | A React node used to render the window's content.

### EditRecurrenceMenu.ButtonProps

Properties passed to a component that renders the OK and Cancel buttons.

Field | Type | Description
------|------|------------
title | string | The button's text.
onClick | () => void | A function that is executed when the button is clicked.

## Localization Messages

Field | Type | Default | Description
------|------|---------|------------
current? | string | 'This appointment' | Text for the 'Current appointment' option.
currentAndFollowing? | string | 'This and following appointments' | Text for the 'Current and following appointments' option.
all? | string | 'All appointments' | Text for the 'All appointments' option.
menuEditingTitle? | string | 'Edit recurring appointment' | The menu's title that should be displayed when an appointment is being edited.
menuDeletingTitle? | string | 'Delete recurring appointment' | The menu's title that should be displayed when an appointment is being deleted.
cancelButton? | string | 'Cancel' | The Cancel button's text.
commitButton? | string | 'OK' | The OK button's text.

## Plugin Components

Name | Properties | Description
-----|------------|------------
EditRecurrenceMenu.Layout | [EditRecurrenceMenu.LayoutProps](#editrecurrencemenulayoutprops) | A component that renders the edit menu's layout.
EditRecurrenceMenu.Overlay | [EditRecurrenceMenu.OverlayProps](#editrecurrencemenuoverlayprops) | A component that renders the overlay window.
EditRecurrenceMenu.Button | [EditRecurrenceMenu.ButtonProps](#editrecurrencemenubuttonprops) | A component that renders the OK and Cancel buttons.

Additional properties are added to the component's root element.
