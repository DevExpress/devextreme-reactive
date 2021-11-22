# ColumnChooser Plugin Reference

The ColumnChooser plugin allows a user to toggle grid columns' visibility at runtime. The column chooser lists columns with checkboxes that control a corresponding column's visibility.

## Import

Use the following statement to import a plugin with embedded theme components:

```js
import { ColumnChooser } from '@devexpress/dx-react-grid-material-ui';
// import { ColumnChooser } from '@devexpress/dx-react-grid-bootstrap4';
// import { ColumnChooser } from '@devexpress/dx-react-grid-bootstrap3';
```

If you want to use custom components, you can import the themeless plugin:

```js
import { ColumnChooser } from '@devexpress/dx-react-grid';
```

## User reference

### Dependencies

- [TableColumnVisibility](table-column-visibility.md)
- [Toolbar](toolbar.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
overlayComponent | ComponentType&lt;[ColumnChooser.OverlayProps](#columnchooseroverlayprops)&gt; | | A component that renders the column chooser overlay.
toggleButtonComponent | ComponentType&lt;[ColumnChooser.ToggleButtonProps](#columnchoosertogglebuttonprops)&gt; | | A component that renders a button that invokes the column chooser.
containerComponent | ComponentType&lt;[ColumnChooser.ContainerProps](#columnchoosercontainerprops)&gt; | | A component that renders the column chooser container.
itemComponent | ComponentType&lt;[ColumnChooser.ItemProps](#columnchooseritemprops)&gt; | | A component that renders a column chooser item.
messages? | [ColumnChooser.LocalizationMessages](#localization-messages) | | An object that specifies localization messages.

## Interfaces

### ColumnChooser.OverlayProps

Describes properties passed to a component that renders the column chooser overlay.

Field | Type | Description
------|------|------------
visible | boolean | Specifies whether the overlay is visible.
target | ReactInstance | A React component instance or a DOM element that is used for overlay positioning.
onHide | () => void | An event that initiates overlay hiding.
children | ReactNode | A React node used to render overlay content.

### ColumnChooser.ToggleButtonProps

Describes properties passed to a component that renders the button that invokes the column chooser.

Field | Type | Description
------|------|------------
onToggle | () => void | An event that initiates overlay showing or hiding.
getMessage | ([messageKey](#localization-messages): string) => string | Returns a specified localization message. Available in the "@devexpress/dx-react-grid-material-ui" package.
buttonRef | (ref: ReactInstance) => void | A function that accepts the button's root React element.

### ColumnChooser.ContainerProps

Describes properties passed to a component that renders the column chooser container.

Field | Type | Description
------|------|------------
children | ReactNode | A React node used to render column chooser items.

### ColumnChooser.ItemProps

Describes properties passed to a component that renders a column chooser item.

Field | Type | Description
------|------|------------
item | [ColumnChooserItem](#columnchooseritem) | A column chooser item.
disabled | boolean | Specifies whether a column chooser item is disabled.
onToggle | () => void | Handles an associated column's visibility changes.

### ColumnChooserItem

An object representing a column chooser item.

Field | Type | Description
------|------|------------
column | [Column](grid.md#column) | The grid column associated with the item.
hidden | boolean | Specifies whether the associated column is hidden.

## Localization Messages

Field | Type | Default | Description
------|------|---------|------------
showColumnChooser? | string | 'Show Column Chooser' | The toggle button's tooltip text. Available in the "@devexpress/dx-react-grid-material-ui" package.

## Plugin Components

Name | Properties | Description
-----|------------|------------
ColumnChooser.ToggleButton | [ColumnChooser.ToggleButtonProps](#columnchoosertogglebuttonprops) | A component that renders a button that invokes the column chooser.
ColumnChooser.Overlay | [ColumnChooser.OverlayProps](#columnchooseroverlayprops) | A component that renders the column chooser overlay.
ColumnChooser.Container | [ColumnChooser.ContainerProps](#columnchoosercontainerprops) | A component that renders the column chooser container.
ColumnChooser.Item | [ColumnChooser.ItemProps](#columnchooseritemprops) | A component that renders a column chooser item.

Additional properties are added to a component's root element.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
columns | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;[Column](grid.md#column)&gt; | Grid columns.
hiddenColumnNames | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;string&gt; | Names of columns to be hidden.
isColumnTogglingEnabled | [Getter](../../../dx-react-core/docs/reference/getter.md) | (columnName: string) => boolean | A function used to define if an end-user can change column visibility.
toggleColumnVisibility | [Action](../../../dx-react-core/docs/reference/action.md) | (columnName: string) => void | Toggles a column's visibility.
toolbarContent | [Template](../../../dx-react-core/docs/reference/template.md) | object? | A template that renders toolbar content.

### Exports

none
