# ColumnChooser Plugin Reference

The ColumnChooser plugin allows a user to show and hide grid columns at runtime. The column chooser lists columns with checkboxes that control a corresponding column's visibility.

## User reference

### Dependencies

- [TableColumnVisiblity](table-column-visibility.md)
- [Toolbar](toolbar.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
overlayComponent | ElementType&lt;[ColumnChooserOverlayProps](#columnchooseroverlayprops)&gt; | | A component that renders the column chooser overlay.
toggleButtonComponent | ElementType&lt;[ColumnChooserToggleButtonProps](#columnchoosertogglebuttonprops)&gt; | | A component that renders a button that invokes the column chooser.
containerComponent | ElementType&lt;[ColumnChooserContainerProps](#columnchoosercontainerprops)&gt; | | A component that renders the column chooser container.
itemComponent | ElementType&lt;[ColumnChooserItemProps](#columnchooseritemprops)&gt; | | A component that renders a column chooser item.
messages | object | | An object that specifies [localization messages](#localization-messages).

## Interfaces

### ColumnChooserOverlayProps

Describes properties passed to a component that renders the column chooser overlay.

A value with the following shape:

Field | Type | Description
------|------|------------
visible | boolean | Specifies whether the overlay is visible.
target | ReactComponent | A React component that is used for overlay positioning.
onHide | () => void | An event that initiates overlay hiding.
children | Array&lt;ReactElement&gt; | React elements used to render overlay content.

### ColumnChooserToggleButtonProps

Describes properties passed to a component that renders the button that invokes the column chooser.

A value with the following shape:

Field | Type | Description
------|------|------------
onToggle | () => void | An event that initiates overlay showing or hiding.
getMessage | ([messageKey](#localization-messages): string) => string | Returns a specified localization message. Available in the "@devexpress/dx-react-grid-material-ui" package.
buttonRef | (ref: ReactElement) => void | A function that accepts the button's root React element.

### ColumnChooserContainerProps

Describes properties passed to a component that renders the column chooser container.

A value with the following shape:

Field | Type | Description
------|------|------------
children | Array&lt;ReactElement&gt; | React elements used to render column chooser items.

### ColumnChooserItemProps

Describes properties passed to a component that renders a column chooser item.

A value with the following shape:

Field | Type | Description
------|------|------------
item | [ColumnChooserItem](#columnchooseritem) | A column chooser item.
onToggle | () => void | Handles an associated column's visbility changes.

### ColumnChooserItem

An object representing a column chooser item.

A value with the following shape:

Field | Type | Description
------|------|------------
column | [Column](grid.md#column) | The grid column associated with the item.
hidden | boolean | Specifies whether the associated column is hidden.

## Localization Messages

An object with the following shape:

Field | Type | Default | Description
------|------|---------|------------
showColumnChooser? | string | 'Show Column Chooser' |The toggle button's tooltip text. Available in the "@devexpress/dx-react-grid-material-ui" package.

## Plugin Components

Name | Properties | Description
-----|------------|------------
ColumnChooser.ToggleButton | [ColumnChooserToggleButtonProps](#columnchoosertogglebuttonprops) | A component that renders a button that invokes the column chooser.
ColumnChooser.Overlay | [ColumnChooserOverlayProps](#columnchooseroverlayprops) | A component that renders the column chooser overlay.
ColumnChooser.Container | [ColumnChooserContainerProps](#columnchoosercontainerprops) | A component that renders the column chooser container.
ColumnChooser.Item | [ColumnChooserItemProps](#columnchooseritemprops) | A component that renders a column chooser item.

If you specify additional properties, they are added to a component's root element.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
columns | Getter | Array&lt;[Column](grid.md#column)&gt; | Grid columns.
hiddenColumns | Getter | Array&lt;[Column](grid.md#column)&gt; | Columns to be hidden.
toggleColumnVisibility | Action | ({ columnName: string }) => void | Toggles a column's visibility.
toolbarContent | Template | Object? | A template that renders toolbar content.

### Exports

none
