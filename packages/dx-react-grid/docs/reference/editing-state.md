# EditingState Plugin Reference

A plugin that manages the editing state of grid rows. It arranges grid rows by different lists depending on a row's state.

## User Reference

### Dependencies

none

### Properties

Name | Type | Default | Description
-----|------|---------|------------
editingRows | Array&lt;number &#124; string&gt; | | Specifies IDs of the rows being edited
defaultEditingRows | Array&lt;number &#124; string&gt; | | Specifies IDs of the rows initially added to the `editingRows` array in the uncontrolled mode
onEditingRowsChange | (editingRows: Array&lt;number &#124; string&gt;) => void | | Handles adding or removing a row from the `editingRows` array
addedRows | Array&lt;Object&gt; | | Specifies the created but not committed rows
defaultAddedRows | Array&lt;Object&gt; | | Specifies rows initially added to the `addedRows` array in the uncontrolled mode
onAddedRowsChange | (addedRows: Array&lt;Object&gt;) => void | | Handles adding or removing a row from the `addedRows` array
changedRows | { [key: string]: Object } | | Specifies the changed, but not committed rows
defaultChangedRows | { [key: string]: Object } | | Specifies rows initially added to the `changedRows` array in the uncontrolled mode
onChangedRowsChange | (changedRows: { [key: string]: Object }) => void | | Handles adding a row to or removing from the `changedRows` array
deletedRows | Array&lt;number &#124; string&gt; | | Specifies IDs of the rows prepared for deletion
defaultDeletedRows | Array&lt;number &#124; string&gt; | | Specifies rows initially added to the `deletedRows` array in the uncontrolled mode
onDeletedRowsChange | (deletedRows: Array&lt;number &#124; string&gt;) => void | | Handles adding or removing a row from the `deletedRows` array
onCommitChanges | (Array&lt;[ChangeSet](#change-set)&gt;) => void | | Handles row changes committing

## Interfaces

### <a name="change-set"></a>ChangeSet

Describes changes made to the data rows: creation, deletion, modification.

A value with the following shape:

Field | Type | Description
------|------|------------
added? | Array&lt;Object&gt; | A data object array representing the rows to be created
changed? | { [key: number &#124; string]: Object } | An associative array where an item key is a row ID and an item value is data that should be changed
deleted? | Array&lt;number &#124; string&gt; | An array of IDs representing rows to be deleted.

## Plugin Developer Reference

### Imports

none

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
editingRows | Getter | Array&lt;number &#124; string&gt; | Rows being edited
startEditRows | Action | ({ rowIds: Array&lt;number &#124; string&gt; }) => void | Switches rows specified by the ID to the edit mode
stopEditRows | Action | ({ rowIds: Array&lt;number &#124; string&gt; }) => void | Switches rows specified by the ID to the read-only mode
addedRows | Getter | Array&lt;Object&gt; | Created rows
addRow | Action | () => void | Creates a row
changeAddedRow | Action | ({ rowId: number, change: Object }) => void | Applies a change to a new row. Note: `rowId` is a row index within the `addedRows` array
cancelAddedRows | Action | ({ rowIds: Array&lt;number&gt; }) => void | Removes new rows specified by index from the `addedRows` array
commitAddedRows | Action | ({ rowIds: Array&lt;number&gt; }) => void | Fires the `onCommitChanges` event with the corresponding [ChangeSet](#change-set) and removes the specified rows from the `addedRows` array
changedRows | Getter | { [key: string]: Object } | Uncommitted changed rows
changeRow | Action | ({ rowId: number &#124; string, change: Object }) => void | Applies a change to an existing row
cancelChangedRows | Action | ({ rowIds: Array&lt;number &#124; string&gt; }) => void | Cancels rows' uncommitted changes specified by the ID
commitChangedRows | Action | ({ rowIds: Array&lt;number &#124; string&gt; }) => void | Fires the `onCommitChanges` event with the corresponding [ChangeSet](#change-set) and removes the specified rows from the `changedRows` array
deletedRows | Getter | Array&lt;number &#124; string&gt; | Rows prepared for deletion
deleteRows | Action | ({ rowIds: Array&lt;number &#124; string&gt; }) => void | Adds rows specified by the ID to the `deletedRows` array
cancelDeletedRows | Action | ({ rowIds: Array&lt;number &#124; string&gt; }) => void | Cancels rows' deletion specified by the ID removing them from the `deletedRows` array
commitDeletedRows | Action | ({ rowIds: Array&lt;number &#124; string&gt; }) => void | Fires the `onCommitChanges` event with the corresponding [ChangeSet](#change-set) and removes the specified rows from the `deletedRows` array


