# EditingState Plugin Reference

A plugin that manages grid rows' editing state. It arranges grid rows by different lists depending on a row's state.

## User Reference

### Dependencies

none

### Properties

Name | Type | Default | Description
-----|------|---------|------------
editingRows | Array&lt;number &#124; string&gt; | | Specifies IDs of the rows being edited.
defaultEditingRows | Array&lt;number &#124; string&gt; | | Specifies IDs of the rows initially added to the `editingRows` array in the uncontrolled mode.
onEditingRowsChange | (editingRows: Array&lt;number &#124; string&gt;) => void | | Handles adding or removing a row from the `editingRows` array.
addedRows | Array&lt;Object&gt; | | Specifies created but not committed rows.
defaultAddedRows | Array&lt;Object&gt; | | Specifies rows initially added to the `addedRows` array in the uncontrolled mode.
onAddedRowsChange | (addedRows: Array&lt;Object&gt;) => void | | Handles adding or removing a row from the `addedRows` array.
changedRows | { [key: string]: Object } | | Specifies changed but not committed rows.
defaultChangedRows | { [key: string]: Object } | | Specifies rows initially added to the `changedRows` array in the uncontrolled mode.
onChangedRowsChange | (changedRows: { [key: string]: Object }) => void | | Handles adding or removing a row from the `changedRows` array.
deletedRows | Array&lt;number &#124; string&gt; | | Specifies IDs of the rows prepared for deletion.
defaultDeletedRows | Array&lt;number &#124; string&gt; | | Specifies rows initially added to the `deletedRows` array in the uncontrolled mode.
onDeletedRowsChange | (deletedRows: Array&lt;number &#124; string&gt;) => void | | Handles adding a row to or removing from the `deletedRows` array.
onCommitChanges | (Array&lt;[ChangeSet](#change-set)&gt;) => void | | Handles row changes committing.
createRowChange | (row: [Row](grid.md#row), columnName: string, value: string &#124; number) => object | | A function that returns an object specifying row changes depending on the values or row's editors. This function is called each time a row editor's value changes.

## Interfaces

### <a name="change-set"></a>ChangeSet

Describes uncommitted changes made to the grid data.

A value with the following shape:

Field | Type | Description
------|------|------------
added? | Array&lt;Object&gt; | An array of objects representing a row to be created.
changed? | { [key: number &#124; string]: Object } | An associative array storing changes made to existing rows. Each array item is an object that specifies changes made to a row. The item's key specifies the associated row's ID.
deleted? | Array&lt;number &#124; string&gt; | An array of IDs representing the rows to be deleted.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
columns | Getter | Array&lt;[Column](grid.md#column)&gt; | The grid columns.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
editingRows | Getter | Array&lt;number &#124; string&gt; | The rows being edited.
startEditRows | Action | ({ rowIds: Array&lt;number &#124; string&gt; }) => void | Enables the edit mode for the rows specified by the ID.
stopEditRows | Action | ({ rowIds: Array&lt;number &#124; string&gt; }) => void | Disables the edit mode for the rows specified by the ID.
addedRows | Getter | Array&lt;Object&gt; | Created but not committed rows.
addRow | Action | () => void | Adds an item to the `addedRows` array.
changeAddedRow | Action | ({ rowId: number, change: Object }) => void | Applies a change to a created but uncommitted row. Note: `rowId` is a row index within the `addedRows` array.
cancelAddedRows | Action | ({ rowIds: Array&lt;number&gt; }) => void | Removes the specified rows from the `addedRows` array.
commitAddedRows | Action | ({ rowIds: Array&lt;number&gt; }) => void | Fires the `onCommitChanges` event with the corresponding [ChangeSet](#change-set) and removes the specified rows from the `addedRows` array.
changedRows | Getter | { [key: string]: Object } | An associative array storing changes made to existing rows. Each array item is an object that specifies changes made to a row. The item's key specifies the associated row's ID.
changeRow | Action | ({ rowId: number &#124; string, change: Object }) => void | Adds an item representing changes made to an exsiting row to the `changedRows` array.
cancelChangedRows | Action | ({ rowIds: Array&lt;number &#124; string&gt; }) => void | Removes the specified rows' data from the `changedRows` array.
commitChangedRows | Action | ({ rowIds: Array&lt;number &#124; string&gt; }) => void | Fires the `onCommitChanges` event with the corresponding [ChangeSet](#change-set) and removes the specified rows from the `changedRows` array.
deletedRows | Getter | Array&lt;number &#124; string&gt; | Rows prepared for deletion.
deleteRows | Action | ({ rowIds: Array&lt;number &#124; string&gt; }) => void | Adds rows specified by the ID to the `deletedRows` array.
cancelDeletedRows | Action | ({ rowIds: Array&lt;number &#124; string&gt; }) => void | Removes the specified rows from the `deletedRows` array.
commitDeletedRows | Action | ({ rowIds: Array&lt;number &#124; string&gt; }) => void | Fires the `onCommitChanges` event with the corresponding [ChangeSet](#change-set) and removes the specified rows from the `deletedRows` array.


