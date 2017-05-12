# EditingState Plugin Reference

A plugin that manages the editing state. It controls the list of rows that are currently being edited and lists of changed, deleted and newly created rows.

## User Reference

### Dependencies

none

### Properties

Name | Type | Default | Description
-----|------|---------|------------
editingRows | Array&lt;number &#124; string&gt; | | Specifies IDs of the rows that are currently being edited
defaultEditingRows | Array&lt;number &#124; string&gt; | | Specifies IDs of the rows that should be switched to the edit mode initially for the uncontrolled state mode
onEditingRowsChange | (editingRows: Array&lt;number &#124; string&gt;) => void | | Handles editing row changes
addedRows | Array&lt;Object&gt; | | Specifies the newly created rows that are not yet committed
defaultAddedRows | Array&lt;Object&gt; | | Specifies the initial set of new rows for the uncontrolled mode
onAddedRowsChange | (addedRows: Array&lt;Object&gt;) => void | | Handles new row changes
changedRows | { [key: string]: Object } | | Specifies the rows that have been changed but not yet committed
defaultChangedRows | { [key: string]: Object } | | Specifies the initial set of changed rows for the uncontrolled mode
onChangedRowsChange | (changedRows: { [key: string]: Object }) => void | | Handles changed rows' changes
deletedRows | Array&lt;number &#124; string&gt; | | Specifies IDs of the rows that have been deleted but not yet committed
defaultDeletedRows | Array&lt;number &#124; string&gt; | | Specifies the initial set of deleted rows for the uncontrolled mode
onDeletedRowsChange | (deletedRows: Array&lt;number &#124; string&gt;) => void | | Handles deleted rows' changes
onCommitChanges | (Array&lt;[ChangeSet](#change-set)&gt;) => void | | Handles the request to commit the changes introduced to the data rows

## Interfaces

### <a name="change-set"></a>ChangeSet

Describes a set of changes that have been applied to the data rows such as created, deleted and modified rows

A value with the following shape:

Field | Type | Description
------|------|------------
added? | Array&lt;Object&gt; | Rows to be created as an array of data objects
changed? | { [key: number &#124; string]: Object } | Rows to be updated as a map of their IDs and changes
deleted? | Array&lt;number &#124; string&gt; | Rows to be deleted as an array of their IDs

## Plugin Developer Reference

### Imports

none

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
editingRows | Getter | () => Array&lt;number &#124; string&gt; | Rows that are currently being edited
startEditRows | Action | ({ rowIds: Array&lt;number &#124; string&gt; }) => void | Switches the rows with the corresponding IDs to the edit mode
stopEditRows | Action | ({ rowIds: Array&lt;number &#124; string&gt; }) => void | Switches the rows with the corresponding IDs to the read-only mode
addedRows | Getter | () => Array&lt;Object&gt; | Newlly created rows
addRow | Action | () => void | Creates a new row
changeAddedRow | Action | ({ rowId: number, change: Object }) => void | Applies a change to a new row. Note: `rowId` is represented by the new row index within all new rows created but not yet committed
cancelAddedRows | Action | ({ rowIds: Array&lt;number&gt; }) => void | Removes uncommitted new rows from the `addedRows` array by indexes
commitAddedRows | Action | ({ rowIds: Array&lt;number&gt; }) => void | Raises the `onCommitChanges` event with the corresponding [ChangeSet](#change-set) and removes the rows from the `addedRows` array
changedRows | Getter | () => { [key: string]: Object } | Changed rows that are not yet committed
changeRow | Action | ({ rowId: number &#124; string, change: Object }) => void | Applies a change to an existing row
cancelChangedRows | Action | ({ rowIds: Array&lt;number &#124; string&gt; }) => void | Cancels uncommitted changes in the rows specified by ID
commitChangedRows | Action | ({ rowIds: Array&lt;number &#124; string&gt; }) => void | Raises the `onCommitChanges` event with the corresponding [ChangeSet](#change-set) and removes the rows from the `changedRows` array
deletedRows | Getter | () => Array&lt;number &#124; string&gt; | Deleted rows that are not yet committed
deleteRows | Action | ({ rowIds: Array&lt;number &#124; string&gt; }) => void | Marks rows specified by ID as deleted by adding them into the `deletedRows` array
cancelDeletedRows | Action | ({ rowIds: Array&lt;number &#124; string&gt; }) => void | Cancels deleting of the rows specified by ID by removing them from the `deletedRows` array
commitDeletedRows | Action | ({ rowIds: Array&lt;number &#124; string&gt; }) => void | Raises the `onCommitChanges` event with the corresponding [ChangeSet](#change-set) and removes the rows from the `deletedRows` array


