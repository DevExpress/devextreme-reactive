# ExportPanel Plugin Reference

A plugin that renders the Export Panel.

## Import

Use the following statement to import a plugin with embedded theme components:

```js
import { ExportPanel } from '@devexpress/dx-react-grid-material-ui';
// import { ExportPanel } from '@devexpress/dx-react-grid-bootstrap4';
// import { ExportPanel } from '@devexpress/dx-react-grid-bootstrap3';
```

If you want to use custom components, you can import the themeless plugin:

```js
import { ExportPanel } from '@devexpress/dx-react-grid';
```

## User Reference

### Dependencies

- [SelectionState](selection-state.md) [Optional]
- [Toolbar](toolbar.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
toggleButtonComponent | ComponentType&lt;[ExportPanel.ToggleButtonProps](#exportpaneltogglebuttonprops)&gt; | | A component that renders a button that invokes export menu.
menuComponent | ComponentType&lt;[ExportPanel.MenuProps](#exportpanelmenuprops)&gt; | | A component that renders the Export Panel menu.
menuItemComponent | ComponentType&lt;[ExportPanel.MenuItemProps](#exportpanelmenuitemprops)&gt; | | A component that renders the Export Panel menu item.
startExport | (options: object) => void | A function that initiates export.
messages? | [ExportPanel.LocalizationMessages](#localization-messages) | | An object that specifies localization messages.

## Interfaces

### ExportPanel.ToggleButtonProps

Describes properties passed to a component that renders the button that invokes the export menu.

Field | Type | Description
------|------|------------
buttonRef | (ref: ReactInstance) => void | A function that accepts the button's root React element.
onToggle | () => void | An event that initiates menu showing or hiding.
getMessage | ([messageKey](#localization-messages): string) => string | Returns a specified localization message.

### ExportPanel.MenuProps

Describes properties passed to a component that renders the export menu.

Field | Type | Description
------|------|------------
visible | boolean | Specifies whether the menu is visible.
target | ReactInstance | A React component instance or a DOM element that is used for menu positioning.
onHide | () => void | An event that initiates menu hiding.
children | ReactNode | A React node used to render menu content.

### ExportPanel.MenuItemProps

Describes properties passed to a component that renders the export menu item.

Field | Type | Description
------|------|------------
text | string | A menu item text.
onClick | () => void | A function that handles a click on the menu item.

## Localization Messages

Field | Type | Default | Description
------|------|---------|------------
showExportMenu? | string | 'Export' | The toggle button's tooltip text. Available in the "@devexpress/dx-react-grid-material-ui" package.
exportAll? | string | 'Export all data' | A menu item caption.
exportSelected? | string | 'Export selected rows' | A menu item caption.

## Plugin Components

Name | Properties | Description
-----|------------|------------
ExportPanel.ToggleButton | [ExportPanel.ToggleButtonProps](#exportpaneltogglebuttonprops) | A component that renders a button that invokes export menu.
ExportPanel.Menu | [ExportPanel.MenuProps](#exportpanelmenuprops) | A component that renders the Export Panel menu.
ExportPanel.MenuItem | [ExportPanel.MenuItemProps](#exportpanelmenuitemprops) | A component that renders the Export Panel menu item.

Additional properties are added to the component's root element.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
selection | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;number &#124; string&gt; | The selected row's IDs.
toolbarContent | [Template](../../../dx-react-core/docs/reference/template.md) | object? | A template that renders toolbar content.

### Exports

none
