# Vue Grid - Detail Row

The "Detail Row" feature displays data row details on an expandable pane. The pane can be expanded and collapsed either programmatically or via the Grid's UI.

## Related Plugins

The "Detail Row" feature requires the following plugins:

- [DxRowDetailState](../reference/row-detail-state.md) - controls the detail rows' expanded status
- [DxTableRowDetail](../reference/table-row-detail.md) - renders detail rows

Note that the [plugin order](./plugin-overview.md#plugin-order) is important.

## Basic Setup

Add the required plugins listed above to the Grid and specify the detail row component via the `DxTableRowDetail` plugin's `contentComponent` property to set up a simple Grid with detail rows.

Specify an array of the expanded row IDs using the `DxRowDetailState` plugin's `expandedRowIds` property and subscribe to the `update:expandedRowIds` event. Use the `.sync` modifier for two-way binding.

.embedded-demo({ "path": "grid-detail-row/basic", "showThemeSelector": true })
