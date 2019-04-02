# React Grid - Selection

The Grid component supports selecting/deselecting rows programmatically or via the UI. It seamlessly integrates with paging, sorting, filtering, and grouping.

## Related Plugins

The following plugins implement selection features:

- [SelectionState](../reference/selection-state.md) - controls the selection state
- [IntegratedSelection](../reference/integrated-selection.md) - performs built-in selection
- [TableSelection](../reference/table-selection.md) - renders selection checkboxes or highlights the selected rows

Note that [plugin order](./plugin-overview.md#plugin-order) is important.

## Basic Setup

Import the `SelectionState` and `TableSelection` plugins to set up a simple Grid with selection enabled. The following example demonstrates how to configure selection in the [controlled mode](controlled-and-uncontrolled-modes.md). Pass the initially selected rows to the `SelectionState` plugin's `selection` property and handle the `onSelectionChange` event to control the selection.

.embedded-demo({ "path": "grid-selection/basic", "showThemeSelector": true })

## Select on a Row Click

A user can select a row using a checkbox click by default. Set the `TableSelection` plugin's `selectByRowClick` property to true to check/uncheck a checkbox by a row click as demonstrated in the following example:

.embedded-demo({ "path": "grid-selection/select-by-row-click", "showThemeSelector": true })

In some scenarios, it is useful to highlight selected rows instead of using checkboxes. For this, hide checkboxes by setting the `TableSelection` plugin's `showSelectionColumn` property to false and assign true to the `selectByRowClick` and `highlightRow` properties as demonstrated in the following demo:

.embedded-demo({ "path": "grid-selection/hidden-checkboxes", "showThemeSelector": true })

## Select All

Perform the following steps to enable the Select All capability:

- Add the `IntegratedSelection` plugin above the `TableSelection` one.
- Add the `TableHeaderRow` plugin.
- Set the `TableSelection` plugin's `showSelectAll` property to true.

### Without Paging

The following example demonstrates selection without paging. You can increase the row count using the Table's [virtual mode](virtual-scrolling.md).

.embedded-demo({ "path": "grid-selection/select-all-virtual", "showThemeSelector": true })

### With Paging

If you are using the `IntegratedPaging` plugin, you can integrate the Select All behavior with the `PagingState` plugin.

The Select All checkbox selects/deselects all rows on a page or all pages depending on the `IntegratedSelection` and `IntegratedPaging` plugin's order.

Place the `IntegratedSelection` plugin after `IntegratedPaging` to implement the Select All behavior within a visible page:

.embedded-demo({ "path": "grid-selection/select-all-by-page", "showThemeSelector": true })

Place the `IntegratedSelection` plugin before `IntegratedPaging` to select/deselect all rows on all pages:

.embedded-demo({ "path": "grid-selection/select-all-by-all-pages", "showThemeSelector": true })
