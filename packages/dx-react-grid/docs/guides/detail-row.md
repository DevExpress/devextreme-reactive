# React Grid - Detail Row

The "Detail Row" feature displays data row details on an expandable pane. The pane can be expanded and collapsed either programmatically or via the Grid's UI.

## Related Plugins

The "Detail Row" feature requires the following plugins:

- [RowDetailState](../reference/row-detail-state.md) - controls the detail rows' expanded status
- [TableRowDetail](../reference/table-row-detail.md) - renders detail rows

Note that the [plugin order](./plugin-overview.md#plugin-order) is important.

## Detail Row Setup

Add the required plugins listed above to the Grid and specify the detail row component via the `TableRowDetail` plugin's `contentComponent` property to set up a simple Grid with detail rows.

## Uncontrolled Mode

In the [uncontrolled mode](controlled-and-uncontrolled-modes.md), you can specify the initially expanded detail rows using the `RowDetailState` plugin's `defaultExpandedRowIds` property.

.embedded-demo({ "path": "grid-detail-row/simple-detail-row", "showThemeSelector": true })

## Controlled Mode

In the [controlled mode](controlled-and-uncontrolled-modes.md), pass an array of the expanded row IDs to the `RowDetailState` plugin's `expandedRowIds` property and handle the `onExpandedRowIdsChange` event to control the detail rows' expanded state externally.

.embedded-demo({ "path": "grid-detail-row/detail-row-controlled", "showThemeSelector": true })
