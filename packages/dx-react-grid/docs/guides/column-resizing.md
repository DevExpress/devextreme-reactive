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

In [controlled mode](controlled-and-uncontrolled-modes.md), pass the column widths to the `TableColumnResizing` plugin's `columnWidths` property, and handle the `onColumnWidthsChange` event to control the column width state.

.embedded-demo({ "path": "grid-column-resizing/controlled", "showThemeSelector": true })
