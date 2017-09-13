# React Grid Column Resizing

Table columns in the Grid component can be resized programmatically or via the Grid's UI.

## Related Plugins

The following plugins implement column resizing features:
- [TableView](../reference/table-view.md) - visualizes table column widths
- [TableColumnResizing](../reference/table-column-resizing.md) - controls table column widths
- [TableHeaderRow](../reference/table-header-row.md) - renders the table columns' resize handles

The [plugin's order](../README.md#plugin-order) is important.

## Column Resizing Setup

Import the plugins listed above to set up a simple Grid with column resizing enabled.

Enable end-user interactions:
- set the `TableHeaderRow` plugin's `allowResizing` property to `true`.

## Uncontrolled Mode

In the [uncontrolled mode](controlled-and-uncontrolled-modes.md), use the `TableColumnResizing` plugin's `defaultColumnWidths` property to specify the initial column widths. This property should define the width of every column; otherwise, it throws an error.

.embedded-demo(column-resizing/uncontrolled)

## Controlled Mode

In the [controlled mode](controlled-and-uncontrolled-modes.md), pass the column widths to the `TableColumnResizing` plugin's `columnWidths` property, and handle the `onColumnWidthsChange` event to control the column width state.

.embedded-demo(column-resizing/controlled)
