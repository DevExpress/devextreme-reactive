# EditingMenu Plugin Reference

A plugin that renders the Scheduler's editing menu and implement editing logic for recurrence appointments. Should not be used with the [IntegratedEditing](integrated-editing.md) plugin.

## Import

Use the following statement to import a plugin with embedded theme components:

```js
import { EditingMenu } from '@devexpress/dx-react-scheduler-material-ui';
```

You can import the themeless plugin to use custom components:

```js
import { EditingMenu } from '@devexpress/dx-react-scheduler';
```

## User Reference

### Dependencies

- [EditingState](editing-state.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
layoutComponent | ComponentType&lt;[EditingMenu.LayoutProps](#editingmenulayoutprops)&gt; | | A component that renders the editing menu's layout.
overlayComponent | ComponentType&lt;[EditingMenu.OverlayProps](#editingmenuoverlayprops)&gt; | | A component that renders the editing menu's overlay.
buttonComponent | ComponentType&lt;[EditingMenu.ButtonProps](#editingmenubuttonprops)&gt; | | A component that renders the editing menu's button.
messages | ComponentType&lt;[EditingMenu.LocalizationMessages](#editingmenulocalizationmessages)&gt; | | 	An object that specifies the localization messages.

## Interfaces

### EditingMenu.LayoutProps

Properties passed to a component that renders the editing menu's layout.

Field | Type | Description
------|------|------------
isDeleting | boolean | The flag that specifies what type of the editing is (deleting or editing).
buttonComponent | ComponentType&lt;[EditingMenu.ButtonProps](#editingmenubuttonprops)&gt; | A component that renders the editing menu's button.
handleClose | () => void | The function that closed the window.
commit | () => void | The function that committed changes.
availableOperations | Array&lt;string&gt; | The editing operations are available to choose.
getMessage | (messageKey: string) => string | Returns a specified localization message.

### EditingMenu.OverlayProps

Properties passed to a component that renders the editing menu's overlay.

Field | Type | Description
------|------|------------
target | ReactInstance | A React component instance or a DOM element that is used for overlay positioning.
visible | boolean | Specifies whether the overlay is visible.
onHide | () => void | An event that initiates overlay hiding.
children | ReactNode | A React node used to render overlay content.

### EditingMenu.ButtonProps

Properties passed to a component that renders the editing menu's button.

Field | Type | Description
------|------|------------
title | string | The buttons text.
onClick | () => void | The function that should be fired by click.

## Localization Messages

Field | Type | Default | Description
------|------|---------|------------
current? | string | 'This appointment' | Specifies the 'current' option's text.
currentAndFollowing? | string | 'This and following appointments' | Specifies the 'Current and following' option's text.
all? | string | 'All appointments' | Specifies the 'All appointments' option's text.
menuEditingTitle? | string | 'Edit recurring appointment' | Specifies the menu title while editing.
menuDeletingTitle? | string | 'Delete recurring appointment' | Specifies the menu title while deleting.
closeButton? | string | 'Cancel | Specifies the cancel button's text.
commitButton? | string | 'OK' | Specifies the commit button's text.

## Plugin Components

Name | Properties | Description
-----|------------|------------
EditingMenu.Layout | [EditingMenu.LayoutProps](#editingmenulayoutprops) | A component that renders the editing menu's layout.
EditingMenu.Overlay | [EditingMenu.OverlayProps](#editingmenuomodalprops) | A component that renders the editing menu's overlay.
EditingMenu.Button | [EditingMenu.ButtonProps](#editingmenubuttonprops) | A component that renders the editing menu's button.

Additional properties are added to the component's root element.
