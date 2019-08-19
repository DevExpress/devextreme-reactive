# EditingMenu Plugin Reference

A plugin that renders the menu that allows users to edit recurrent appointments. Should not be used with the [IntegratedEditing](integrated-editing.md) plugin.

## Import

Use the following statement to import the plugin with embedded theme components:

```js
import { EditingMenu } from '@devexpress/dx-react-scheduler-material-ui';
```

If you are going to use custom theme components, import the themeless version of this plugin instead:

```js
import { EditingMenu } from '@devexpress/dx-react-scheduler';
```

## User Reference

### Dependencies

- [EditingState](editing-state.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
layoutComponent | ComponentType&lt;[EditingMenu.LayoutProps](#editingmenulayoutprops)&gt; | | A component that renders the menu's layout.
overlayComponent | ComponentType&lt;[EditingMenu.OverlayProps](#editingmenuoverlayprops)&gt; | | A component that renders the overlay window.
buttonComponent | ComponentType&lt;[EditingMenu.ButtonProps](#editingmenubuttonprops)&gt; | | A component that renders the OK and Cancel buttons.
messages | ComponentType&lt;[EditingMenu.LocalizationMessages](#editingmenulocalizationmessages)&gt; | | An object that contains localized messages.

## Interfaces

### EditingMenu.LayoutProps

Properties passed to a component that renders the editing menu's layout.

Field | Type | Description
------|------|------------
isDeleting | boolean | **true** if the appointment is being deleted, **false** if it is being edited.
buttonComponent | ComponentType&lt;[EditingMenu.ButtonProps](#editingmenubuttonprops)&gt; | A component that renders the OK and Cancel buttons.
handleClose | () => void | A function that closes the menu.
commit | () => void | A function that commits changes.
availableOperations | Array&lt;string&gt; | A list of editing operations available to users.
getMessage | (messageKey: string) => string | A function that returns a message that has the specified key.

### EditingMenu.OverlayProps

Properties passed to a component that renders the overlay window.

Field | Type | Description
------|------|------------
target | ReactInstance | A React component instance or a DOM element that is used to position the window.
visible | boolean | A flag that specifies whether the overlay window is visible.
onHide | () => void | A function to execute when the window hides.
children | ReactNode | A React node used to render the window's content.

### EditingMenu.ButtonProps

Properties passed to a component that renders the OK and Cancel buttons.

Field | Type | Description
------|------|------------
title | string | The button's text.
onClick | () => void | A function to execute when the button is clicked.

## Localization Messages

Field | Type | Default | Description
------|------|---------|------------
current? | string | 'This appointment' | A text for the 'Current appointment' choice.
currentAndFollowing? | string | 'This and following appointments' | A text for the 'Current and following appointments' choice.
all? | string | 'All appointments' | A text for the 'All appointments' choice.
menuEditingTitle? | string | 'Edit recurring appointment' | The menu's title to display when an appointment is being edited.
menuDeletingTitle? | string | 'Delete recurring appointment' | The menu's title to display when an appointment is being deleted.
closeButton? | string | 'Cancel' | The Cancel button's text.
commitButton? | string | 'OK' | Specifies the OK button's text.

## Plugin Components

Name | Properties | Description
-----|------------|------------
EditingMenu.Layout | [EditingMenu.LayoutProps](#editingmenulayoutprops) | A component that renders the editing menu's layout.
EditingMenu.Overlay | [EditingMenu.OverlayProps](#editingmenuomodalprops) | A component that renders the overlay window.
EditingMenu.Button | [EditingMenu.ButtonProps](#editingmenubuttonprops) | A component that renders the OK and Cancel buttons.

Additional properties are added to the component's root element.
