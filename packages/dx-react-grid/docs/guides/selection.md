# React Grid Row Selection

The Grid component supports selecting/deselecting rows programmatically or via the UI. It seamlessly integrates with paging, sorting, filtering, and grouping.

## Related Plugins

The following plugins implement selection features:

- [SelectionState](../reference/selection-state.md) - controls the selection state  
- [TableSelection](../reference/table-selection.md) - renders selection check boxes or highlights the selected rows

Note that [plugin order](./plugin-overview.md#plugin-order) is important.

## Basic setup

Import the plugins listed above to set up a simple Grid with selection enabled. The following example demonstrates how to configure selection in the [controlled mode](controlled-and-uncontrolled-modes.md). Pass the initially selected rows to the `SelectionState` plugin's `selection` property and handle the `onSelectionChange` event to control the selection.

.embedded-demo(selection/basic)

## Select by Row Click

A user can select a row using a check box click by default. Set the `TableSelection` plugin's `selectByRowClick` property to true to check/uncheck a check box by a row click as demonstrated in the following example:

.embedded-demo(selection/select-by-row-click)

In some scenarios, it is useful to highlight selected rows instead of using check boxes. For this, hide check boxes setting the `TableSelection` plugin's `showSelectionColumn` property to false and assign true to the `selectByRowClick` and `highlightSelected` properties as demonstrated in the following demo:

.embedded-demo(selection/hidden-checkboxes)

## Select All

If your Grid configuration includes the `TableHeaderRow` plugin and the `TableSelection` plugin's `showSelectionColumn` property is set to true, the header row displays the Select All check box that provides the capability to select/deselect all rows.

### Without Paging

The following example demonstrates selection without paging. We increase the row count using the TableView's [virtual mode](virtual-scrolling.md).

.embedded-demo(selection/select-all-virtual)

### With Paging

If you are using the `LocalPaging` plugin, you can integrate the Select All behavior with the `PagingState` plugin.

The Select All check box selects/deselects all rows on a page or all pages depending on the `SelectionState` and `LocalPaging` plugin's order.

Place the `SelectionState` plugin after `LocalPaging` to implement the Select All behavior within a visible page:

.embedded-demo(selection/select-all-by-page)

Place the `SelectionState` plugin before `LocalPaging` to select/deselect all rows on all pages:

.embedded-demo(selection/select-all-by-all-pages)

### Hide Select All Check Box

Hide the Select All check box by assigning false to the `TableSelection` plugin's `showSelectAll` property:

.embedded-demo(selection/hidden-select-all)
