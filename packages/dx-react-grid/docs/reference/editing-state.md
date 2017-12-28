# EditingState Plugin Reference

A plugin that manages grid rows' editing state. It arranges grid rows by different lists depending on a row's state.

## User Reference

### Dependencies

none

### Properties

Name | Type | Default | Description
-----|------|---------|------------
createRowChange | (row: any, columnName: string, value: string &#124; number) => any | | A function that returns a row changes object depending on row editor values. This function is called each time the row editor's value changes.
columnExtensions | Array&lt;[EditingColumnExtension](#editingcolumnextension)&gt; | | Additional column properties that the plugin can handle.
editingRows | Array&lt;number &#124; string&gt; | | Specifies IDs of the rows being edited.
defaultEditingRows | Array&lt;number &#124; string&gt; | | Specifies IDs of the rows initially added to the `editingRows` array in uncontrolled mode.
onEditingRowsChange | (editingRows: Array&lt;number &#124; string&gt;) => void | | Handles adding or removing a row to/from the `editingRows` array.
addedRows | Array&lt;any&gt; | | Specifies created but not committed rows.
defaultAddedRows | Array&lt;any&gt; | | Specifies rows initially added to the `addedRows` array in uncontrolled mode.
onAddedRowsChange | (addedRows: Array&lt;any&gt;) => void | | Handles adding or removing a row to/from the `addedRows` array.
changedRows | { [key: string]: any } | | Specifies changed but not committed rows.
defaultChangedRows | { [key: string]: any } | | Specifies rows initially added to the `changedRows` array in uncontrolled mode.
onChangedRowsChange | (changedRows: { [key: string]: any }) => void | | Handles adding or removing a row to/from the `changedRows` array.
deletedRows | Array&lt;number &#124; string&gt; | | Specifies IDs of the rows prepared for deletion.
defaultDeletedRows | Array&lt;number &#124; string&gt; | | Specifies rows initially added to the `deletedRows` array in uncontrolled mode.
onDeletedRowsChange | (deletedRows: Array&lt;number &#124; string&gt;) => void | | Handles adding a row to or removing from the `deletedRows` array.
onCommitChanges | (Array&lt;[ChangeSet](#change-set)&gt;) => void | | Handles row changes committing.

## Interfaces

### EditingColumnExtension

Describes additional column properties that the plugin can handle.

A value with the following shape:

Field | Type | Description
------|------|------------
columnName | string | The name of a column to extend.
createRowChange? | (row: any, value: any, columnName: string) => any | A function that returns a value specifying row changes depending on the columns's editor values for the current row. This function is called each time the editor's value changes.

### ChangeSet

Describes uncommitted changes made to the grid data.

A value with the following shape:

Field | Type | Description
------|------|------------
added? | Array&lt;any&gt; | An array of rows to be created.
changed? | { [key: number &#124; string]: any } | An associated array that stores changes made to existing data. Each array item specifies changes made to a row. The item's key specifies the associated row's ID.
deleted? | Array&lt;number &#124; string&gt; | An array of IDs representing rows to be deleted.

## Plugin Developer Reference

### Imports

none

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
editingRows | Getter | Array&lt;number &#124; string&gt; | Rows being edited.
startEditRows | Action | ({ rowIds: Array&lt;number &#124; string&gt; }) => void | Enables the edit mode for the rows the ID specifies.
stopEditRows | Action | ({ rowIds: Array&lt;number &#124; string&gt; }) => void | Disables the edit mode for the rows the ID specifies.
addedRows | Getter | Array&lt;any&gt; | Created but not committed rows.
addRow | Action | () => void | Adds an item to the `addedRows` array.
changeAddedRow | Action | ({ rowId: number, change: any }) => void | Applies a change to a created but uncommitted row. Note: `rowId` is a row index within the `addedRows` array.
cancelAddedRows | Action | ({ rowIds: Array&lt;number&gt; }) => void | Removes specified rows from the `addedRows` array.
commitAddedRows | Action | ({ rowIds: Array&lt;number&gt; }) => void | Fires the `onCommitChanges` event with the corresponding [ChangeSet](#changeset) and removes specified rows from the `addedRows` array.
changedRows | Getter | { [key: string]: any } | An associated array that stores changes made to existing rows. Each array item specifies changes made to a row. The item's key specifies the associated row's ID.
changeRow | Action | ({ rowId: number &#124; string, change: any }) => void | Adds an item representing changes made to an exsiting row to the `changedRows` array.
cancelChangedRows | Action | ({ rowIds: Array&lt;number &#124; string&gt; }) => void | Removes specified rows' data from the `changedRows` array.
commitChangedRows | Action | ({ rowIds: Array&lt;number &#124; string&gt; }) => void | Fires the `onCommitChanges` event with the corresponding [ChangeSet](#changeset) and removes specified rows from the `changedRows` array.
deletedRows | Getter | Array&lt;number &#124; string&gt; | Rows prepared for deletion.
deleteRows | Action | ({ rowIds: Array&lt;number &#124; string&gt; }) => void | Adds rows the ID specifies to the `deletedRows` array.
cancelDeletedRows | Action | ({ rowIds: Array&lt;number &#124; string&gt; }) => void | Removes specified rows from the `deletedRows` array.
commitDeletedRows | Action | ({ rowIds: Array&lt;number &#124; string&gt; }) => void | Fires the `onCommitChanges` event with the corresponding [ChangeSet](#changeset) and removes specified rows from the `deletedRows` array.
createRowChange | Getter | (row: any, value: any, columnName: string) => any | A function that returns a value that specifies row changes depending on columns editor values for the current row. This function is called each time the editor's value changes.
