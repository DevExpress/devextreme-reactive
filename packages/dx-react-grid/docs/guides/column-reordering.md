# React Grid - Column Reordering

The Grid component allows reordering grid columns programmatically or using the drag-and-drop feature.

## Related Plugins

The following plugins implement column reordering features:

- [DragDropProvider](../reference/drag-drop-provider.md) - implements the drag-and-drop functionality and visualizes a column being dragged
- [Table](../reference/table.md) - visualizes table column reordering
- [TableColumnReordering](../reference/table-column-reordering.md) - controls the column order
- [TableHeaderRow](../reference/table-header-row.md) - visualizes header row column reordering

Note that the [plugin order](./plugin-overview.md#plugin-order) is important.

## Basic Setup

Import the plugins listed above to set up a simple Grid with column reordering enabled.

### Uncontrolled Mode

In [uncontrolled mode](controlled-and-uncontrolled-modes.md), specify the initial column order in the [TableColumnReordering](../reference/table-column-reordering.md) plugin's `defaultOrder` property.

.embedded-demo({ "path": "grid-column-reordering/uncontrolled", "showThemeSelector": true })

### Controlled Mode

In [controlled mode](controlled-and-uncontrolled-modes.md), pass the column order to the [TableColumnReordering](../reference/table-column-reordering.md) plugin's `order` property and handle the `onOrderChange` event to control the column order state.

.embedded-demo({ "path": "grid-column-reordering/controlled", "showThemeSelector": true })
