# EditingMenu Plugin Reference

A plugin that renders the Scheduler's editing menu. Should not be used with the `IntegratedEditing` plugin.

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
layoutComponent | ComponentType&lt;[EditingMenu.RootProps](#editingmenulayoutprops)&gt; | | A component that renders the editing menu's layout element.
modalComponent | ComponentType&lt;[EditingMenu.ModalProps](#editingmenuomodalprops)&gt; | | A component that renders the editing menu's modal element.
buttonComponent | ComponentType&lt;[EditingMenu.ButtonProps](#editingmenubuttonprops)&gt; | | A component that renders editing menu's button element.
containerComponent | ComponentType&lt;[EditingMenu.ContainerProps](#editingmenucontainerprops)&gt; | | A component that renders the editing menu's container element.
messages | ComponentType&lt;[EditingMenu.LocalizationMessages](#editingmenulocalizationmessages)&gt; | | 	An object that specifies the localization messages.

## Interfaces

### EditingMenu.LayoutProps

Properties passed to a component that renders the date navigator's root element.

Field | Type | Description
------|------|------------
-

### EditingMenu.ModalProps

Properties passed to a component that renders the date navigator's overlay element.

Field | Type | Description
------|------|------------
-

### EditingMenu.ButtonProps

Properties passed to a component that renders the date navigator's open button.

Field | Type | Description
------|------|------------
-

### EditingMenu.ContainerProps

Properties passed to a component that renders the date navigator's navigation button.

Field | Type | Description
------|------|------------
-

## Localization Messages

Field | Type | Default | Description
------|------|---------|------------
current? | string | 'current' | Specifies the page size selector's 'All' item text.
currentAndFollowing? | string | 'current and following' | Specifies the 'Rows per page' label's text. Available in the "@devexpress/dx-react-grid-material-ui" package.
all? | string | all | Specifies the 'Row count' text template.
menuTitle? | string | 'Edit recurring event' | Specifies the 'Row count' text template.
closeButton? | string | 'cancel | Specifies the 'Row count' text template.
commitButton? | string | 'ok' | Specifies the 'Row count' text template.

## Plugin Components

Name | Properties | Description
-----|------------|------------
EditingMenu.Layout | [EditingMenu.LayoutProps](#editingmenulayoutprops) | A component that renders the editing menu's layout element.
EditingMenu.Modal | [EditingMenu.ModalProps](#editingmenuomodalprops) | A component that renders the editing menu's modal element.
EditingMenu.Button | [EditingMenu.ButtonProps](#editingmenubuttonprops) | A component that renders editing menu's button element.
EditingMenu.Container | [EditingMenu.ContainerProps](#editingmenucontainerprops) | A component that renders the editing menu's container element.

Additional properties are added to the component's root element.
