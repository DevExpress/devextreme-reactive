# React Grid Column Reordering

The Grid component allows reordering grid columns programmatically or using the drag-and-drop feature.

## Related Plugins

The following plugins implement column reordering features:

- [DragDropContext](../reference/drag-drop-context.md) - implements the drag-and-drop functionality and visualizes a column being dragged
- [TableView](../reference/table-view.md) - visualizes table column reordering
- [TableColumnReordering](../reference/table-column-reordering.md) - controls the column order
- [TableHeaderRow](../reference/table-header-row.md) - visualizes header row column reordering

Note that the [plugin order](./plugin-overview.md#plugin-order) is important.

## Column Reordering Setup

Import the plugins listed above to set up a simple Grid with column reordering enabled.

Enable end-user interactions by setting the [TableHeaderRow](../reference/table-header-row.md) plugin's `allowDragging` property to true.

## Uncontrolled Mode

In the [uncontrolled mode](controlled-and-uncontrolled-modes.md), specify the initial column order in the [TableColumnReordering](../reference/table-column-reordering.md) plugin's `defaultOrder` property.

.embedded-demo(column-reordering/uncontrolled)

## Controlled Mode

In the [controlled mode](controlled-and-uncontrolled-modes.md), pass the column order to the [TableColumnReordering](../reference/table-column-reordering.md) plugin's `order` property and handle the `onOrderChange` event to control the column order state.

.embedded-demo(column-reordering/controlled)
