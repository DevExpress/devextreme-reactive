# React Grid Detail Row

## Overview

The 'Detail Row' feature allows you to display extended representation of a data row that can be expanded/collapsed either programmatically or via an end-user interaction with the Grid UI.

## Plugin List

Two plugins are required to enable this feature:
- [RowDetailState](../reference/row-detail-state.md)
- [TableRowDetail](../reference/table-row-detail.md)

Note that the [plugin order](../README.md#plugin-order) is very important.

## Detail Row Setup

To set up a simple Grid with detail rows, you need to use the `RowDetailState` and `TableRowDetail` plugins. Specify the detail row template via the `template` property of the `TableRowDetail` plugin. In uncontrolled state mode, you can also pass IDs of rows that should be initially expanded into the `defaultExpandedRows` property of the `RowDetailState` plugin, and the expanded state will be managed by the plugin internally.

.embedded-demo(detail-row/simple-detail-row)

## Controlled Expanded State Mode

To control the expanded state of the detail rows from the outside, pass an array of the expanded row IDs to the `expandedRows` property of the `RowDetailState` plugin and handle the `onExpandedRowsChange` event of the same plugin.

.embedded-demo(detail-row/detail-row-controlled)
