# React Grid Column Reordering

## Overview

The Grid component allows to change column order. End-users can use drag-and-drop to manage column order within table view.

## Plugin List

There are several plugins that implement column reordering features:
- [ColumnOrderState](../reference/column-order-state.md)
- [DragDropContext](../reference/drag-drop-context.md)
- [TableView](../reference/table-view.md)
- [TableHeaderRow](../reference/table-header-row.md)

Note that the [plugin order](../README.md#plugin-order) is very important.

## Column Reordering Setup

To set up a simple Grid with enabled column reordering feature, you need to use the `ColumnOrderState`, `DragDropContext`, `TableView` and `TableRowDetail` plugins.

In the uncontrolled state mode, specify the initial column order by the `defaultOrder` property of the `ColumnOrderState` plugin.

To enable end-user interactions the following setup is required:
- set the `allowColumnReordering` property of the `TableView` plugin to true;
- set the `allowDragging` property of the `TableHeaderRow` plugin to true.

[DEMO](http://devexpress.github.io/devextreme-reactive/react/grid/demos/#/column-reordering/uncontrolled)

[SOURCE](https://github.com/DevExpress/devextreme-reactive/tree/master/packages/dx-react-demos/src/bootstrap3/column-reordering/uncontrolled.jsx)

## Controlled Mode

To control the column order state from the outside, pass the column order to the `order` property of the `ColumnOrderState` plugin and handle the `onOrderChange` event of the same plugin.

[DEMO](http://devexpress.github.io/devextreme-reactive/react/grid/demos/#/column-reordering/controlled)

[SOURCE](https://github.com/DevExpress/devextreme-reactive/tree/master/packages/dx-react-demos/src/bootstrap3/column-reordering/controlled.jsx)
