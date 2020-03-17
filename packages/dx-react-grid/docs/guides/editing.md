# React Grid - Editing

The Grid allows users to create, update, and delete rows. You can manage the editing state and edit data programmatically. The editing state contains information about rows and cells being edited, and rows that have been created or deleted but not yet committed. Once a user finishes editing a row (clicks the Save or Delete button), the `EditingState` plugin raises the `onCommitChanges` event, and resets the row's editing state. This same event is also raised when a user finishes editing a cell in inline editing mode.

## Related Plugins

The following plugins implement editing features:

- [EditingState](../reference/editing-state.md) - controls the editing state
- [TableEditRow](../reference/table-edit-row.md) - renders the row being edited
- [TableEditColumn](../reference/table-edit-column.md) - renders a command column (a column containing controls used for row editing/creating/deleting and committing/canceling changes)
- [TableInlineCellEditing](../reference/table-inline-cell-editing.md) - renders the cell being edited

Note that the [plugin order](./plugin-overview.md#plugin-order) is important.

## Basic Setup

Add the plugins listed above to the Grid to set up a simple Grid supporting editing features.

Handle the `EditingState` plugin's `onCommitChanges` event to commit changes made by an end-user to your data store.

### Uncontrolled Mode

In [uncontrolled mode](controlled-and-uncontrolled-modes.md), you can specify the initial editing state values using the following `EditingState` plugin's properties:

- `defaultEditingRowIds` - the rows being edited
- `defaultAddedRows` - the rows being added
- `defaultRowChanges` - the row changes
- `defaultDeletedRowIds` - the rows being deleted

.embedded-demo({ "path": "grid-editing/edit-row", "showThemeSelector": true })

### Controlled Mode

In [controlled mode](controlled-and-uncontrolled-modes.md), specify the following `EditingState` plugin's property pairs to set a state value and handle its changes:

- `editingRowIds` and `onEditingRowIdsChange` - the rows being edited
- `addedRows` and `onAddedRowsChange` - the rows being added
- `rowChanges` and `onRowChangesChange` - the row changes
- `deletedRowIds` and `onDeletedRowIdsChange` - the rows being deleted

Note, you can also use the `onAddedRowsChange` event to initialize a created row with default property values.

.embedded-demo({ "path": "grid-editing/edit-row-controlled", "showThemeSelector": true })

## Inline Cell Editing


End-users can click cells to activate in-place editors if you include the `TableInlineCellEditing` plugin in the Grid's configuration. They can move focus or press Enter to save changes, or press Esc to discard the changes and deactivate the cell editor.

You can handle other keyboard actions. For example, the demo below shows how to [override](./fundamentals.md#customize-the-appearance) the `Table.Cell` component so that the Tab key advances the cursor to the next cell:

.embedded-demo({ "path": "grid-editing/inline-cell-editing", "showThemeSelector": true })


`TableInlineCellEditing` does not provide the capability to add new rows. To implement it, use the `EditingState` plugin in controlled mode as shown in the following demo:

.embedded-demo({ "path": "grid-editing/cell-editing-tab-with-edit-column", "showThemeSelector": true })

## Disable Editing in a Column

You can use the [EditingState](../reference/editing-state.md) plugin's `columnExtensions` property to prevent a specific column for being edited.

.embedded-demo({ "path": "grid-editing/disable-column-editing", "showThemeSelector": true })

## Data Validation

Changes can be validated as the user types. You can disable the Save button if any required field is empty.

.embedded-demo({ "path": "grid-editing/validation-on-typing", "showThemeSelector": true })

Changes can also be validated in the `onCommit` function. In this case, you can omit the `setState` call and rollback the changes if they are invalid.

.embedded-demo({ "path": "grid-editing/validation-on-commit", "showThemeSelector": true })
