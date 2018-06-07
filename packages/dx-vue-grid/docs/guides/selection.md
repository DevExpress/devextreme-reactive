# Vue Grid - Selection

The Grid component supports selecting/deselecting rows programmatically or via the UI. It seamlessly integrates with paging, sorting, filtering, and grouping.

## Related Plugins

The following plugins implement selection features:

- [DxSelectionState](../reference/selection-state.md) - controls the selection state
- [DxIntegratedSelection](../reference/integrated-selection.md) - performs built-in selection
- [DxTableSelection](../reference/table-selection.md) - renders selection checkboxes or highlights the selected rows

Note that [plugin order](./plugin-overview.md#plugin-order) is important.

## Basic Setup

Import the `DxSelectionState` and `DxTableSelection` plugins to set up a simple Grid with selection enabled. Specify the selection using the `DxSelectionState` plugin’s `selection` property and subscribe to the `update:selection` event. Use the `.sync` modifier for two-way binding.

.embedded-demo({ "path": "grid-selection/basic", "showThemeSelector": true })

## Select by Row Click

A user can select a row using a checkbox click by default. Set the `DxTableSelection` plugin's `selectByRowClick` property to true to check/uncheck a checkbox by a row click as demonstrated in the following example:

.embedded-demo({ "path": "grid-selection/select-by-row-click", "showThemeSelector": true })

In some scenarios, it is useful to highlight selected rows instead of using checkboxes. For this, hide checkboxes by setting the `DxTableSelection` plugin's `showSelectionColumn` property to false and assign true to the `selectByRowClick` and `highlightRow` properties as demonstrated in the following demo:

.embedded-demo({ "path": "grid-selection/hidden-checkboxes", "showThemeSelector": true })

## Select All

Perform the following steps to enable the Select All capability:

- Add the `DxIntegratedSelection` plugin above the `DxTableSelection` one.
- Add the `DxTableHeaderRow` plugin.
- Set the `DxTableSelection` plugin's `showSelectAll` property to true.

### Without Paging

The following example demonstrates selection without paging. You can increase the row count using the Table's [virtual mode](virtual-scrolling.md).

.embedded-demo({ "path": "grid-selection/select-all-virtual", "showThemeSelector": true })

### With Paging

If you are using the `DxIntegratedPaging` plugin, you can integrate the Select All behavior with the `DxPagingState` plugin.

The Select All checkbox selects/deselects all rows on a page or all pages depending on the `DxIntegratedSelection` and `DxIntegratedPaging` plugin's order.

Place the `DxIntegratedSelection` plugin after `DxIntegratedPaging` to implement the Select All behavior within a visible page:

.embedded-demo({ "path": "grid-selection/select-all-by-page", "showThemeSelector": true })

Place the `DxIntegratedSelection` plugin before `DxIntegratedPaging` to select/deselect all rows on all pages:

.embedded-demo({ "path": "grid-selection/select-all-by-all-pages", "showThemeSelector": true })
