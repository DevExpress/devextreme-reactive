# Vue Grid - Tree Data

You can use the corresponding plugins to show tree data in the Grid component and manage the expanded rows' state programmatically or via the UI (a column that contains UI elements to expand/collapse rows).

## Related Plugins

The following plugins implement tree data support:

- [DxTreeDataState](../reference/tree-data-state.md) - controls the expanded rows state
- [DxCustomTreeData](../reference/custom-tree-data.md) - converts custom tree data to a supported format
- [DxTableTreeColumn](../reference/table-tree-column.md) - renders the table column with an indent, toggle button, and selection controls

Note that the [plugin order](./plugin-overview.md#plugin-order) is important.

## Basic Setup

Use the `DxTreeDataState`, `DxCustomTreeData` and `DxTableTreeColumn` plugins to set up a Grid with simple tree data structure.

Specify the expanded row IDs in the `DxTreeDataState` plugin's `expandedRowIds` property and subscribe to the `update:expandedRowIds` event. Use the `.sync` modifier for two-way binding.

### Custom Tree Data

In the following example, the data is specified as grouped array. Specify the `DxCustomTreeData` plugin's `getChildRows` property to parse the given array.

.embedded-demo({ "path": "grid-tree-data/hierarchical-tree", "showThemeSelector": true })

You can also transform tree data defined as a plain array.

.embedded-demo({ "path": "grid-tree-data/plain-tree", "showThemeSelector": true })

## Configuring Hierarchical Selection Controls

The `DxTableTreeColumn` plugin allows showing hierarchical selection controls.

### Basic Selection

Do the following to enable this feature:

- Configure the `DxSelectionState` plugin. See [Selection](selection.md).
- Set the `DxTableTreeColumn` plugin's `showSelectionControls` property to true to show checkboxes.

.embedded-demo({ "path": "grid-tree-data/selection-controls", "showThemeSelector": true })

You can also combine the `DxTableTreeColumn` plugin with the `DxTableSelection` plugin to highlight the selected rows and handle the click event on the entire row.

### Select All

Do the following to show the Select All checkbox in the header row:

- Configure the `DxTableHeaderRow` plugin. See [Fundamentals](fundamentals.md).
- Configure the `DxIntegratedSelection` plugin. See [Selection](selection.md).
- Set the `DxTableTreeColumn` plugin's `showSelectAll` property to true to show Select All checkbox.

.embedded-demo({ "path": "grid-tree-data/select-all", "showThemeSelector": true })

## Remote Data Loading on Demand

You can handle the Grid's tree data state changes to request nested data from the server according to the expanded row ID.

Tree data options are updated once an end-user interacts with the UI. Handle option changes using the `DxTreeDataState` plugin's `update:expandedRowIds` event and request data from the server using the applied tree data options. Once the page data is received from the server, pass it to the `DxGrid` component's `rows` property.

.embedded-demo({ "path": "grid-tree-data/remote", "showThemeSelector": true })
