# DxColumnChooser Plugin Reference

The DxColumnChooser plugin allows a user to toggle grid columns' visibility at runtime. The column chooser lists columns with checkboxes that control a corresponding column's visibility.

## Import

Use the following statement to import a plugin with embedded theme components:

```js
import { DxColumnChooser } from '@devexpress/dx-vue-grid-bootstrap4';
```

If you want to use custom components, you can import the themeless plugin:

```js
import { DxColumnChooser } from '@devexpress/dx-vue-grid';
```

## User reference

### Dependencies

- [DxTableColumnVisibility](table-column-visibility.md)
- [DxToolbar](toolbar.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
overlayComponent | [DxColumnChooser.DxOverlay](#dxcolumnchooserdxoverlay) | | A component that renders the column chooser overlay.
toggleButtonComponent | [DxColumnChooser.DxToggleButton](#dxcolumnchooserdxtogglebutton) | | A component that renders a button that invokes the column chooser.
containerComponent | [DxColumnChooser.DxContainer](#dxcolumnchooserdxcontainer) | | A component that renders the column chooser container.
itemComponent | [DxColumnChooser.DxItem](#dxcolumnchooserdxitem) | | A component that renders a column chooser item.

## Interfaces

### ColumnChooserItem

An object representing a column chooser item.

Field | Type | Description
------|------|------------
column | [Column](grid.md#column) | The grid column associated with the item.
hidden | boolean | Specifies whether the associated column is hidden.

## Component Types

### DxColumnChooser.DxOverlay

#### Props

Field | Type | Description
------|------|------------
visible | boolean | Specifies whether the overlay is visible.
target | HTMLElement | An HTML element that is used for overlay positioning.

#### Events

Field | Type | Description
------|------|------------
hide | () => void | An event that initiates overlay hiding.

#### Slots

Field | Description
------|------------
default | The default Vue slot

### DxColumnChooser.DxToggleButton

#### Props

Field | Type | Description
------|------|------------
buttonRef | (ref: HTMLElement) => void | A function that accepts the button's root HTML element.

#### Events

Field | Type | Description
------|------|------------
toggle | () => void | An event that initiates overlay showing or hiding.

### DxColumnChooser.DxContainer

#### Slots

Field | Description
------|------------
default | The default Vue slot

### DxColumnChooser.DxItem

#### Props

Field | Type | Description
------|------|------------
item | [ColumnChooserItem](#columnchooseritem) | A column chooser item.
disabled | boolean | Specifies whether a column chooser item is disabled.

#### Events

Field | Type | Description
------|------|------------
toggle | () => void | Handles an associated column's visibility changes.

## Plugin Components

Name | Type | Description
-----|------------|------------
DxColumnChooser.components.DxToggleButton | [DxColumnChooser.DxToggleButton](#dxcolumnchooserdxtogglebutton) | A component that renders a button that invokes the column chooser.
DxColumnChooser.components.DxOverlay | [DxColumnChooser.DxOverlay](#dxcolumnchooserdxoverlay) | A component that renders the column chooser overlay.
DxColumnChooser.components.DxContainer | [DxColumnChooser.DxContainer](#dxcolumnchooserdxcontainer) | A component that renders the column chooser container.
DxColumnChooser.components.DxItem | [DxColumnChooser.DxItem](#dxcolumnchooserdxitem) | A component that renders a column chooser item.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
columns | Getter | Array&lt;[Column](grid.md#column)&gt; | Grid columns.
hiddenColumnNames | Getter | Array&lt;string&gt; | Names of columns to be hidden.
isColumnTogglingEnabled | Getter | (columnName: string) => boolean | A function used to define if an end-user can change column visibility.
toggleColumnVisibility | Action | (columnName: string) => void | Toggles a column's visibility.
toolbarContent | Template | object? | A template that renders toolbar content.

### Exports

none
