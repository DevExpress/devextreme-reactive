# React Grid - Tree Data

The Grid component can show tree data. Use the corresponding plugins to manage the expanded rows state and show tree data programmatically or via the UI (special column with ability to expand row).

## Related Plugins

The following plugins implement tree data visualization:

- [TreeDataState](../reference/tree-data-state.md) - controls the expanded rows state
- [CustomTreeData](../reference/custom-tree-data.md) - converts custom formatted tree data to a supported format
- [TableTreeData](../reference/table-tree-data.md) - renders the table column with toggle button and sorting indicators

Note that [plugin order](./plugin-overview.md#plugin-order) is important.

## Basic Setup

Use the `TreeDataState`, `CustomTreeData` and `TableTreeData` plugins to set up a Grid with simple tree data structure.

### Custom Grouping

If the data has a hierarchical structure (already grouped), use the `CustomTreeData` plugin.

In the following example, the data is specified as an array of groups. Specify the `CustomTreeData` plugin's `getChildRows` property to parse a custom tree structure.

.embedded-demo(grid-tree-data/static-hierarchical)

It is also possible to transform tree data defined as a plain array.

.embedded-demo(grid-tree-data/static-plain)

## Uncontrolled Mode

## Controlled Mode

## Configuring Selection Controls

## Configuring Select All

## Remote Data Loading on Demand
