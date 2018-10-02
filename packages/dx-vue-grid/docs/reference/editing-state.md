# DxEditingState Plugin Reference

A plugin that manages grid rows' editing state. It arranges grid rows by different lists depending on a row's state.

## Import

Use the following statement to import the plugin:

```js
import { DxEditingState } from '@devexpress/dx-vue-grid';
```

## User Reference

### Dependencies

none

### Properties

Name | Type | Default | Description
-----|------|---------|------------
createRowChange? | (row: any, value: string &#124; number, columnName: string) => any | | A function that returns a row change object depending on row editor values. This function is called each time the row editor's value changes.
columnEditingEnabled? | boolean | true | Specifies whether editing is enabled for all columns.
columnExtensions? | Array&lt;[DxEditingState.ColumnExtension](#dxeditingstatecolumnextension)&gt; | | Additional column properties that the plugin can handle.
editingRowIds? | Array&lt;number &#124; string&gt; | | IDs of the rows being edited.
addedRows? | Array&lt;any&gt; | | Created but not committed rows.
rowChanges? | { [key: string]: any } | | Not committed row changes.

### Events

Name | Type | Default | Description
-----|------|---------|------------
update:addedRows? | (addedRows: Array&lt;any&gt;) => void | | Handles adding or removing a row to/from the `addedRows` array.
update:editingRowIds? | (editingRowIds: Array&lt;number &#124; string&gt;) => void | | Handles adding or removing a row to/from the `editingRowIds` array.
update:rowChanges? | (rowChanges: { [key: string]: any }) => void | | Handles adding or removing a row changes to/from the `rowChanges` array.
commitChanges | (changes: [ChangeSet](#changeset)) => void | | Handles row changes committing.

## Interfaces

### DxEditingState.ColumnExtension

Describes additional column properties that the plugin can handle.

Field | Type | Description
------|------|------------
columnName | string | The name of a column to extend.
editingEnabled? | boolean | Specifies whether editing is enabled for a column.
createRowChange? | (row: any, value: any, columnName: string) => any | A function that returns a value specifying row changes depending on the columns' editor values for the current row. This function is called each time the editor's value changes.

### ChangeSet

Describes uncommitted changes made to the grid data.

Field | Type | Description
------|------|------------
added? | Array&lt;any&gt; | An array of rows to be created.
changed? | { [key: number &#124; string]: any } | An associative array that stores changes made to existing data. Each array item specifies changes made to a row. The item's key specifies the associated row's ID.
deleted? | Array&lt;number &#124; string&gt; | An array of IDs representing rows to be deleted.

## Plugin Developer Reference

### Imports

none

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
editingRowIds | Getter | Array&lt;number &#124; string&gt; | Rows being edited.
startEditRows | Action | ({ rowIds: Array&lt;number &#124; string&gt; }) => void | Enables the edit mode for the rows the ID specifies.
stopEditRows | Action | ({ rowIds: Array&lt;number &#124; string&gt; }) => void | Disables the edit mode for the rows the ID specifies.
addedRows | Getter | Array&lt;any&gt; | Created but not committed rows.
addRow | Action | () => void | Adds an item to the `addedRows` array.
changeAddedRow | Action | ({ rowId: number, change: any }) => void | Applies a change to a created but uncommitted row. Note: `rowId` is a row index within the `addedRows` array.
cancelAddedRows | Action | ({ rowIds: Array&lt;number&gt; }) => void | Removes the specified rows from the `addedRows` array.
commitAddedRows | Action | ({ rowIds: Array&lt;number&gt; }) => void | Fires the `commitChanges` event with the corresponding [ChangeSet](#changeset) and removes specified rows from the `addedRows` array.
rowChanges | Getter | { [key: string]: any } | An associative array that stores changes made to existing rows. Each array item specifies changes made to a row. The item's key specifies the associated row's ID.
changeRow | Action | ({ rowId: number &#124; string, change: any }) => void | Adds an item representing changes made to an exsiting row to the `rowChanges` array.
cancelChangedRows | Action | ({ rowIds: Array&lt;number &#124; string&gt; }) => void | Removes specified rows' data from the `rowChanges` array.
commitChangedRows | Action | ({ rowIds: Array&lt;number &#124; string&gt; }) => void | Fires the `commitChanges` event with the corresponding [ChangeSet](#changeset) and removes specified rows from the `rowChanges` array.
deletedRowIds | Getter | Array&lt;number &#124; string&gt; | Rows prepared for deletion.
deleteRows | Action | ({ rowIds: Array&lt;number &#124; string&gt; }) => void | Adds rows the ID specifies to the `deletedRowIds` array.
cancelDeletedRows | Action | ({ rowIds: Array&lt;number &#124; string&gt; }) => void | Removes the specified rows from the `deletedRowIds` array.
commitDeletedRows | Action | ({ rowIds: Array&lt;number &#124; string&gt; }) => void | Fires the `commitChanges` event with the corresponding [ChangeSet](#changeset) and removes specified rows from the `deletedRowIds` array.
createRowChange | Getter | (row: any, value: any, columnName: string) => any | A function that returns a value that specifies row changes depending on the column's editor values for the current row. This function is called each time the editor's value changes.
isColumnEditingEnabled | Getter | (columnName: string) => boolean |  A function that returns a value that specifies if editing by a column is enabled.
