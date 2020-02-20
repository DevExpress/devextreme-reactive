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

- [Toolbar](toolbar.md)
- [SelectionState](selection-state.md) [Optional]

### Properties

Name | Type | Default | Description
-----|------|---------|------------
toggleButtonComponent | ComponentType&lt;[ExportPanel.ToggleButtonProps](#exportpaneltogglebuttonprops)&gt; | | A component that renders a button that opens the export menu.
menuComponent | ComponentType&lt;[ExportPanel.MenuProps](#exportpanelmenuprops)&gt; | | A component that renders the export menu.
menuItemComponent | ComponentType&lt;[ExportPanel.MenuItemProps](#exportpanelmenuitemprops)&gt; | | A component that renders a menu item.
startExport | (options: object) => void | A function that initiates the export.
messages? | [ExportPanel.LocalizationMessages](#localization-messages) | | Localization messages.

## Interfaces

### ExportPanel.ToggleButtonProps

Properties passed to the `toggleButtonComponent`.

Field | Type | Description
------|------|------------
buttonRef | (ref: ReactInstance) => void | A function that accepts a reference to the toggle button.
onToggle | () => void | A function that is executed when the export menu shows or hides.
getMessage | ([messageKey](#localization-messages): string) => string | A function that returns a specified localization message.

### ExportPanel.MenuProps

Properties passed to the `menuComponent`.

Field | Type | Description
------|------|------------
visible | boolean | Specifies whether the export menu is visible.
target | ReactInstance | A React component instance or a DOM element used to position the menu.
onHide | () => void | A function that is executed when the menu hides.
children | ReactNode | A React node used to render menu content.

### ExportPanel.MenuItemProps

Properties passed to the `menuItemComponent`.

Field | Type | Description
------|------|------------
text | string | Menu item text.
onClick | () => void | A function that handles a click on the menu item.

## Localization Messages

Field | Type | Default | Description
------|------|---------|------------
showExportMenu? | string | 'Export' | The text of the toggle button tooltip. Available only with the `@devexpress/dx-react-grid-material-ui` package.
exportAll? | string | 'Export all data' | The text of the command that exports all data.
exportSelected? | string | 'Export selected rows' | The text of the command that exports selected rows.

## Plugin Components

Name | Properties | Description
-----|------------|------------
ExportPanel.ToggleButton | [ExportPanel.ToggleButtonProps](#exportpaneltogglebuttonprops) | A component that renders a button that opens the export menu.
ExportPanel.Menu | [ExportPanel.MenuProps](#exportpanelmenuprops) | A component that renders the export menu.
ExportPanel.MenuItem | [ExportPanel.MenuItemProps](#exportpanelmenuitemprops) | A component that renders a menu item.

Additional properties are added to the component's root element.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
selection | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;number &#124; string&gt; | Selected row IDs.
toolbarContent | [Template](../../../dx-react-core/docs/reference/template.md) | object? | A template that renders toolbar content.

### Exports

none
