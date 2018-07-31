# Vue Grid - Editing

The Grid supports editing features including creating, updating and deleting rows. Use the corresponding plugins to manage the editing state and perform editing operations programmatically or via the UI controls. The editing state contains information about rows currently being edited, changes applied to a particular row, and rows that have been deleted and created but not yet committed. Once a user accepts row addition or deletion, or changes made to a row (clicking the Save or Delete button), the Grid fires the `DxEditingState` plugin's `commitChanges` event and resets the row's editing state.

## Related Plugins

The following plugins implement editing features:

- [DxEditingState](../reference/editing-state.md) - controls the editing state
- [DxTableEditRow](../reference/table-edit-row.md) - renders a row being edited
- [DxTableEditColumn](../reference/table-edit-column.md) - renders a command column (a column containing controls used for row editing/creating/deleting and committing/canceling changes)

Note that the [plugin order](./plugin-overview.md#plugin-order) is important.

## Basic Setup

Add the plugins listed above to the Grid to set up a simple Grid supporting editing features.

Specify the editing state values using the following `DxEditingState` plugin's property pairs to set a state value and subscribe its changes:

- `editingRowIds` and `update:editingRowIds` - the rows being edited
- `addedRows` and `update:addedRows` - the rows being added
- `rowChanges` and `update:rowChanges` - the row changes
- `deletedRowIds` and `update:deletedRowIds` - the rows being deleted

Use the `.sync` modifier for two-way binding.

Handle the `DxEditingState` plugin's `commitChanges` event to commit changes made by an end-user to your data store.

.embedded-demo({ "path": "grid-editing/basic", "showThemeSelector": true })

## Disable Editing by a Column

You can prevent editing of a specific column using the [DxEditingState](../reference/editing-state.md) plugin's `columnExtensions` property.

.embedded-demo({ "path": "grid-editing/disable-column-editing", "showThemeSelector": true })
