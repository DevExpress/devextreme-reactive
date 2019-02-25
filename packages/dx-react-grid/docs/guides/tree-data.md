# React Grid - Tree Data

The Grid component can show tree data. Use the corresponding plugins to show tree data and manage the expanded rows' state programmatically or via the UI (a column that contains UI elements for row expanding/collapsing).

## Related Plugins

The following plugins implement tree data support:

- [TreeDataState](../reference/tree-data-state.md) - controls the expanded rows state
- [CustomTreeData](../reference/custom-tree-data.md) - converts custom tree data to a supported format
- [TableTreeColumn](../reference/table-tree-column.md) - renders the table column with an indent, toggle button, and selection controls

Note that the [plugin order](./plugin-overview.md#plugin-order) is important.

## Basic Setup

Use the `TreeDataState`, `CustomTreeData` and `TableTreeColumn` plugins to set up a Grid with simple tree data structure.

### Custom Tree Data

In the following example, the data is specified as grouped array. Specify the `CustomTreeData` plugin's `getChildRows` property to parse the given array.

.embedded-demo({ "path": "grid-tree-data/hierarchical-tree", "showThemeSelector": true })

You can also transform tree data defined as a plain array.

.embedded-demo({ "path": "grid-tree-data/plain-tree", "showThemeSelector": true })

### Uncontrolled Mode

In [uncontrolled mode](controlled-and-uncontrolled-modes.md), specify the initially expanded rows' IDs in the `TreeDataState` plugin's `defaultExpandedRowIds` property.

.embedded-demo({ "path": "grid-tree-data/uncontrolled-mode", "showThemeSelector": true })

### Controlled Mode

In [controlled mode](controlled-and-uncontrolled-modes.md), pass the expanded row ids to the `TreeDataState` plugin's `expandedRowIds` property and handle the `onExpandedRowIdsChange` event to control the tree data state externally.

.embedded-demo({ "path": "grid-tree-data/controlled-mode", "showThemeSelector": true })

## Configure Hierarchical Selection Controls

The `TableTreeColumn` plugin allows showing hierarchical selection controls.

### Basic Selection

Do the following to enable this feature:

- Configure the `SelectionState` plugin. See [Selection](selection.md).
- Set the `TableTreeColumn` plugin's `showSelectionControls` property to true to show checkboxes.

.embedded-demo({ "path": "grid-tree-data/selection-controls", "showThemeSelector": true })

You can also combine the `TableTreeColumn` plugin with the `TableSelection` plugin to highlight the selected rows and handle the click event on the entire row.

### Select All

Do the following to show the Select All checkbox in the header row:

- Configure the `TableHeaderRow` plugin. See [Fundamentals](fundamentals.md).
- Configure the `IntegratedSelection` plugin. See [Selection](selection.md).
- Set the `TableTreeColumn` plugin's `showSelectAll` property to true to show Select All checkbox.

.embedded-demo({ "path": "grid-tree-data/select-all", "showThemeSelector": true })

## Load Remote Data on Demand

You can handle the Grid's tree data state changes to request nested data from the server according to the expanded row ID.

Tree data options are updated once an end-user interacts with the UI. Handle option changes using the `TreeDataState` plugin's `onExpandedRowIdsChange` event and request data from the server using the applied tree data options. Once the page data is received from the server, pass it to the `Grid` component's `rows` property.

.embedded-demo({ "path": "grid-tree-data/remote", "showThemeSelector": true })
