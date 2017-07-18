# React Grid Column Reordering

## Overview

The Grid component allows reordering grid columns using the drag-and-drop feature.

## Plugin List

The following plugins implement column reordering features:
- [ColumnOrderState](../reference/column-order-state.md)
- [DragDropContext](../reference/drag-drop-context.md)
- [TableView](../reference/table-view.md)
- [TableHeaderRow](../reference/table-header-row.md)

Note that the [plugin order](../README.md#plugin-order) is important.

## Column Reordering Setup

You need to use the `ColumnOrderState`, `DragDropContext`, `TableView` and `TableHeaderRow` plugins to set up a simple Grid with column reordering enabled.

In the uncontrolled state mode, specify the initial column order by the `defaultOrder` property of the `ColumnOrderState` plugin.

The following setup is required to enable end-user interactions:
- set the `TableView` plugin's `allowColumnReordering` property to true;
- set the `TableHeaderRow` plugin's `allowDragging` property to true.

.embedded-demo(column-reordering/uncontrolled)

## Controlled Mode

Pass the column order to the `order` property of the `ColumnOrderState` plugin and handle the `onOrderChange` event to control the column order state.

.embedded-demo(column-reordering/controlled)
