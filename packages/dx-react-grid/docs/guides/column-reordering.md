# React Grid Column Reordering

The Grid component allows reordering grid columns programmatically or using the drag-and-drop feature.

## Required Plugins

The following plugins implement column reordering features:
- [ColumnOrderState](../reference/column-order-state.md) - controls the column order
- [DragDropContext](../reference/drag-drop-context.md) - implements the drag-and-drop functionality and visualizes a column being dragged
- [TableView](../reference/table-view.md) - visualizes table column reordering
- [TableHeaderRow](../reference/table-header-row.md) - visualizes header row column reordering

Note that the [plugin order](../README.md#plugin-order) is important.

## Column Reordering Setup

Import the plugins listed above to set up a simple Grid with column reordering enabled.

Enable end-user interactions:
- set the `TableView` plugin's `allowColumnReordering` property to true;
- set the `TableHeaderRow` plugin's `allowDragging` property to true.

## Uncontrolled Mode

In the [uncontrolled state mode](controlled-and-uncontrolled-modes.md), specify the initial column order by the `defaultOrder` property of the `ColumnOrderState` plugin.

.embedded-demo(column-reordering/uncontrolled)

## Controlled Mode

In the [controlled state mode](controlled-and-uncontrolled-modes.md), pass the column order to the `order` property of the `ColumnOrderState` plugin and handle the `onOrderChange` event to control the column order state.

.embedded-demo(column-reordering/controlled)
