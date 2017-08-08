# React Grid Data Editing

The Grid supports creating, updating and deleting rows. Use the editing state to manage these operations. The editing state contains information about rows being added, deleted and updated, and about rows containing uncommitted changes. Once the changes held in the editing state have been commited, the Grid applies them and resets the editing state.

## Required Plugins

The following plugins implement editing features:
- [EditingState](../reference/editing-state.md) - controls the editing state  
- [TableEditRow](../reference/table-edit-row.md) - renders a row being edited  
- [TableEditColumn](../reference/table-edit-column.md) - renders a command column (a column containing controls used for row editing/creating/deleting and committing/canceling changes)

Note that the [plugin order](../README.md#plugin-order) is important.

## Set up a Simple Editable Grid

Add the plugins listed above to the Grid to set up a simple Grid supporting editing features.

Process the committed changes and send them to the data source using the `EditingState` plugin's `onCommitChanges` event.

## Uncontrolled Mode

In the [uncontrolled mode](controlled-and-uncontrolled-modes.md), you can specify the initial editing state values using the following `EditingState` plugins's properties:

- `defaultEditingRows` - the rows being edited  
- `defaultAddedRows` - the rows being added  
- `defaultChangedRows` - the changed rows  
- `defaultDeletedRows` - the rows being deleted

.embedded-demo(editing/edit-row)

## Controlled State

In the [controlled mode](controlled-and-uncontrolled-modes.md), specify the following `EditingState` plugin's property pairs to set a state value and handle its changes respectively:

- `editingRows` and `onEditingRowsChange` - the rows being edited  
- `addedRows` and `onAddedRowsChange` - the rows being added  
- `changedRows` and `onChangedRowsChange` - the changed rows  
- `deletedRows` and `onDeletedRowsChange` - the rows being deleted

Note, you can also use the `onAddedRowsChange` event to initialize a created row with default property values.

.embedded-demo(editing/edit-row-controlled)


