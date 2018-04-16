# React Grid - Editing

The Grid supports editing features including creating, updating and deleting rows. Use the corresponding plugins to manage the editing state and perform editing operations programmatically or via the UI controls. The editing state contains information about rows currently being edited, changes applied to a particular row, and rows that have been deleted and created but not yet committed. Once a user accepts row addition or deletion, or changes made to a row (clicking the Save or Delete button), the Grid fires the `EditingState` plugin's `onCommitChanges` event and resets the row's editing state.

## Related Plugins

The following plugins implement editing features:

- [EditingState](../reference/editing-state.md) - controls the editing state
- [TableEditRow](../reference/table-edit-row.md) - renders a row being edited
- [TableEditColumn](../reference/table-edit-column.md) - renders a command column (a column containing controls used for row editing/creating/deleting and committing/canceling changes)

Note that the [plugin order](./plugin-overview.md#plugin-order) is important.

## Basic Setup

Add the plugins listed above to the Grid to set up a simple Grid supporting editing features.

Handle the `EditingState` plugin's `onCommitChanges` event to commit changes made by an end-user to your data store.

## Uncontrolled Mode

In the [uncontrolled mode](controlled-and-uncontrolled-modes.md), you can specify the initial editing state values using the following `EditingState` plugin's properties:

- `defaultEditingRowIds` - the rows being edited
- `defaultAddedRows` - the rows being added
- `defaultRowChanges` - the row changes
- `defaultDeletedRowIds` - the rows being deleted

.embedded-demo({ "path": "grid-editing/edit-row", "showThemeSelector": true })

## Controlled Mode

In the [controlled mode](controlled-and-uncontrolled-modes.md), specify the following `EditingState` plugin's property pairs to set a state value and handle its changes:

- `editingRowIds` and `onEditingRowIdsChange` - the rows being edited
- `addedRows` and `onAddedRowsChange` - the rows being added
- `rowChanges` and `onRowChangesChange` - the row changes
- `deletedRowIds` and `onDeletedRowIdsChange` - the rows being deleted

Note, you can also use the `onAddedRowsChange` event to initialize a created row with default property values.

.embedded-demo({ "path": "grid-editing/edit-row-controlled", "showThemeSelector": true })

## Disable Editing by a Column

You can prevent editing of a specific column using the [EditingState](../reference/editing-state.md) plugin's `columnExtensions` property.

.embedded-demo({ "path": "grid-editing/disable-column-editing", "showThemeSelector": true })
