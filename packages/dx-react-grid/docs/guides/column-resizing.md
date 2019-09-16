# React Grid - Column Resizing

Table columns in the Grid component can be resized programmatically or via the Grid's UI.

## Related Plugins

The following plugins implement column resizing features:

- [Table](../reference/table.md) - visualizes table column widths
- [TableColumnResizing](../reference/table-column-resizing.md) - controls table column widths
- [TableHeaderRow](../reference/table-header-row.md) - renders the table columns' resize handles

The [plugin's order](./plugin-overview.md#plugin-order) is important.

## Basic Setup

Import the plugins listed above to set up a simple Grid with column resizing enabled.

### Uncontrolled Mode

In [uncontrolled mode](controlled-and-uncontrolled-modes.md), use the `TableColumnResizing` plugin's `defaultColumnWidths` property to specify the initial column widths. This property must define every column's width; otherwise, it throws an error.

.embedded-demo({ "path": "grid-column-resizing/uncontrolled", "showThemeSelector": true })

### Controlled Mode

In [controlled mode](controlled-and-uncontrolled-modes.md), pass the column widths to the `TableColumnResizing` plugin's `columnWidths` property and handle the `onColumnWidthsChange` event to manage the column width state.

.embedded-demo({ "path": "grid-column-resizing/controlled", "showThemeSelector": true })

## Resizing Modes

Columns can be resized in the following modes:

- `nextColumn`        
When a user resizes a column, the width of the next column changes.

- `widget`        
When a user resizes a column, columns on the right shift but retain their widths. In this mode, `auto` and percentage values cannot be used to specify column widths.

To specify the resizing mode, use the `TableColumnResizing` plugin's `columnResizingMode` property. 

The following example demonstrates the resizing modes:

.embedded-demo({ "path": "grid-column-resizing/resizing-mode", "showThemeSelector": true })
