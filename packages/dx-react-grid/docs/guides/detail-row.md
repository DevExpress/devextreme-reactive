# React Grid Detail Row

The "Detail Row" feature displays data row details on an expandable pane. The pane can be expanded and collapsed either programmatically or via the Grid's UI.

## Required Plugins

The "Detail Row" feature requires the following plugins:
- [RowDetailState](../reference/row-detail-state.md) - controls the detail rows' expanded status
- [TableRowDetail](../reference/table-row-detail.md) - renders detail rows

Note that the [plugin order](../README.md#plugin-order) is important.

## Detail Row Setup

Add the required plugins listed above to the Grid and specify the detail row template via the `TableRowDetail` plugin's `template` property to set up a simple Grid with detail rows.

## Uncontrolled Mode

In the [uncontrolled mode](controlled-and-uncontrolled-modes.md), you can specify the initially expanded detail rows using the `RowDetailState` plugins's `defaultExpandedRows` property.

.embedded-demo(detail-row/simple-detail-row)

## Controlled Mode

In the [controlled mode](controlled-and-uncontrolled-modes.md), pass an array of the expanded row IDs to the `RowDetailState` plugin's `expandedRows` property and handle the `onExpandedRowsChange` event to control the detail rows' expanded state externally.

.embedded-demo(detail-row/detail-row-controlled)
