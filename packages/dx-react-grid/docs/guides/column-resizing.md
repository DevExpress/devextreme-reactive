# React Grid Column Resizing

The Grid component allows resizing grid table columns programmatically or via the Grid's UI.

## Related Plugins

The following plugins implement column resizing features:
- [TableView](../reference/table-view.md) - visualizes table column widths
- [TableColumnResizing](../reference/table-column-resizing.md) - controls the table column widths
- [TableHeaderRow](../reference/table-header-row.md) - renders table column resize handle

Note that the [plugin order](../README.md#plugin-order) is important.

## Column Resizing Setup

Import the plugins listed above to set up a simple Grid with column resizing enabled.

Enable end-user interactions:
- set the `TableHeaderRow` plugin's `allowResizing` property to true.

## Uncontrolled Mode

In the [uncontrolled mode](controlled-and-uncontrolled-modes.md), specify the initial column widths in the `TableColumnResizing` plugin's `defaultColumnWidths` property.

The `defaultColumnWidths` property should contain specified width for each columns. It will throw an error otherwise.

.embedded-demo(column-resizing/uncontrolled)

## Controlled Mode

In the [controlled mode](controlled-and-uncontrolled-modes.md), pass the column widths to the `TableColumnResizing` plugin's `columnWidths` property and handle the `onColumnWidthsChange` event to control the column widths state.

.embedded-demo(column-resizing/controlled)
