# React Grid - Tree Data

The Grid component can show tree data. Use the corresponding plugins to manage the expanded rows state and show tree data programmatically or via the UI (special column with ability to expand row).

## Related Plugins

The following plugins implement tree data visualization:

- [TreeDataState](../reference/tree-data-state.md) - controls the expanded rows state
- [CustomTreeData](../reference/custom-tree-data.md) - converts custom formatted tree data to a supported format
- [TableTreeColumn](../reference/table-tree-column.md) - renders the table column with toggle button and sorting indicators

Note that [plugin order](./plugin-overview.md#plugin-order) is important.

## Basic Setup

Use the `TreeDataState`, `CustomTreeData` and `TableTreeColumn` plugins to set up a Grid with simple tree data structure.

### Custom Grouping

If the data has a hierarchical structure (already grouped), use the `CustomTreeData` plugin.

In the following example, the data is specified as an array of groups. Specify the `CustomTreeData` plugin's `getChildRows` property to parse a custom tree structure.

.embedded-demo(grid-tree-data/hierarchical-tree)

It is also possible to transform tree data defined as a plain array.

.embedded-demo(grid-tree-data/plain-tree)

## Uncontrolled Mode

In the [uncontrolled mode](controlled-and-uncontrolled-modes.md), specify the initial sorting conditions in the `TreeDataState` plugin's `defaultExpandedRowIds` property.

.embedded-demo(grid-tree-data/uncontrolled-mode)

## Controlled Mode

In the [controlled mode](controlled-and-uncontrolled-modes.md), pass the sorting options to the `TreeDataState` plugin's `expandedRowIds` property and handle the `onExpandedRowIdsChange` event to control the sorting state externally.

.embedded-demo(grid-tree-data/controlled-mode)

## Configuring Hierarchical Selection Controls

The `TableTreeColumn` plugin allows showing hierarchical selection controls.

### Basic Selection

To enable this feature you need:

- Configure the `SelectionState` plugin. Refer the [Selection](selection.md) guide.
- Set the `showSelectionControls` property of the `TableTreeColumn` plugin to true to show checkboxes.

.embedded-demo(grid-tree-data/selection-controls)

It is also possible to combine the `TableTreeColumn` plugin with the `TableSelection` plugin to highlight selected rows and listen to click on the whole row.

### Select All

To show the Select All checkbox in the header row you need:

- Configure the `TableHeaderRow` plugin. Refer the [Fundamentals](fundamentals.md) guide.
- Configure the `IntegratedSelection` plugin. Refer the [Selection](selection.md) guide.
- Set the `showSelectAll` property of the `TableTreeColumn` plugin to true to show Select All checkbox.

.embedded-demo(grid-tree-data/select-all)

## Remote Data Loading on Demand

You can handle the Grid's tree data state changes to request nested data from the server according to the expanded row id.

Tree data options are updated once an end-user interacts with the UI. Handle option changes using the `TreeDataState` plugin's `onExpandedRowIdsChange` event, and request data from the server using the applied tree data options. Once the page data is received from the server, pass it to the `Grid` component's `rows` property.

.embedded-demo(grid-tree-data/remote)
