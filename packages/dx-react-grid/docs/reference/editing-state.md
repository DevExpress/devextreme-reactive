# EditingState Plugin Reference

A plugin that manages grid rows' editing state. It arranges grid rows by different lists depending on a row's state.

## Import

Use the following statement to import the plugin:

```js
import { EditingState } from '@devexpress/dx-react-grid';
```

## User Reference

### Dependencies

none

### Properties

Name | Type | Default | Description
-----|------|---------|------------
createRowChange? | (row: any, value: string &#124; number, columnName: string) => any | | A function that returns a row change object depending on row editor values. This function is called each time the row editor's value changes.
columnEditingEnabled? | boolean | true | Specifies whether editing is enabled for all columns.
columnExtensions? | Array&lt;[EditingState.ColumnExtension](#editingstatecolumnextension)&gt; | | Additional column properties that the plugin can handle.
editingRowIds? | Array&lt;number &#124; string&gt; | | IDs of the rows being edited.
defaultEditingRowIds? | Array&lt;number &#124; string&gt; | [] | IDs of the rows initially added to the `editingRowIds` array in uncontrolled mode.
onEditingRowIdsChange? | (editingRowIds: Array&lt;number &#124; string&gt;) => void | | Handles adding or removing a row to/from the `editingRowIds` array.
onEditingCellsChange? | (editingCells: Array&lt;{rowId: number, columnName: string}&gt;) => void | | Handles the add or remove a row to/from the `editingCells` array function.
addedRows? | Array&lt;any&gt; | | Created but not committed rows.
defaultAddedRows? | Array&lt;any&gt; | [] | Rows initially added to the `addedRows` array in uncontrolled mode.
onAddedRowsChange? | (addedRows: Array&lt;any&gt;) => void | | Handles adding or removing a row to/from the `addedRows` array.
rowChanges? | { [key: string]: any } | | Not committed row changes.
defaultRowChanges? | { [key: string]: any } | {} | Row changes initially added to the `rowChanges` array in uncontrolled mode.
onRowChangesChange? | (rowChanges: { [key: string]: any }) => void | | Handles adding or removing a row changes to/from the `rowChanges` array.
onCommitChanges | (changes: [ChangeSet](#changeset)) => void | | Handles row changes committing.
editingCells? | Array&lt;{rowId: number &#124; string, columnName: string}&gt; | | Edited cells identified by the row ID and column name.
defaultEditingCells? | Array&lt;{rowId: number &#124; string, columnName: string}&gt; | | Cells initially added to the `editingCells` array in uncontrolled mode. The cells are identified by the row ID and column name.

## Interfaces

### EditingState.ColumnExtension

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
editingRowIds | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;number &#124; string&gt; | Rows being edited.
editingCells | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;{rowId: number &#124; string, columnName: string}&gt; | Edited cells identified by the row ID and column name.
startEditRows | [Action](../../../dx-react-core/docs/reference/action.md) | ({ rowIds: Array&lt;number &#124; string&gt; }) => void | Enables the edit mode for the rows the ID specifies.
stopEditRows | [Action](../../../dx-react-core/docs/reference/action.md) | ({ rowIds: Array&lt;number &#124; string&gt; }) => void | Disables the edit mode for the rows the ID specifies.
startEditCells | [Action](../../../dx-react-core/docs/reference/action.md) | ({ editingCells: Array&lt;{rowId: number &#124; string, columnName: string}&gt; }) => void | Switches cells identified by the row ID and column name to edit mode.
stopEditCells | [Action](../../../dx-react-core/docs/reference/action.md) | ({ editingCells: Array&lt;{rowId: number &#124; string, columnName: string}&gt; }) => void | Switches cells identified by the row ID and column name to normal mode.
addedRows | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;any&gt; | Created but not committed rows.
addRow | [Action](../../../dx-react-core/docs/reference/action.md) | () => void | Adds an item to the `addedRows` array.
changeAddedRow | [Action](../../../dx-react-core/docs/reference/action.md) | ({ rowId: number, change: any }) => void | Applies a change to a created but uncommitted row. Note: `rowId` is a row index within the `addedRows` array.
cancelAddedRows | [Action](../../../dx-react-core/docs/reference/action.md) | ({ rowIds: Array&lt;number&gt; }) => void | Removes the specified rows from the `addedRows` array.
commitAddedRows | [Action](../../../dx-react-core/docs/reference/action.md) | ({ rowIds: Array&lt;number&gt; }) => void | Fires the `onCommitChanges` event with the corresponding [ChangeSet](#changeset) and removes specified rows from the `addedRows` array.
rowChanges | [Getter](../../../dx-react-core/docs/reference/getter.md) | { [key: string]: any } | An associative array that stores changes made to existing rows. Each array item specifies changes made to a row. The item's key specifies the associated row's ID.
changeRow | [Action](../../../dx-react-core/docs/reference/action.md) | ({ rowId: number &#124; string, change: any }) => void | Adds an item representing changes made to an exsiting row to the `rowChanges` array.
cancelChangedRows | [Action](../../../dx-react-core/docs/reference/action.md) | ({ rowIds: Array&lt;number &#124; string&gt; }) => void | Removes specified rows' data from the `rowChanges` array.
commitChangedRows | [Action](../../../dx-react-core/docs/reference/action.md) | ({ rowIds: Array&lt;number &#124; string&gt; }) => void | Fires the `onCommitChanges` event with the corresponding [ChangeSet](#changeset) and removes specified rows from the `rowChanges` array.
deletedRowIds | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;number &#124; string&gt; | Rows prepared for deletion.
deleteRows | [Action](../../../dx-react-core/docs/reference/action.md) | ({ rowIds: Array&lt;number &#124; string&gt; }) => void | Adds rows the ID specifies to the `deletedRowIds` array.
cancelDeletedRows | [Action](../../../dx-react-core/docs/reference/action.md) | ({ rowIds: Array&lt;number &#124; string&gt; }) => void | Removes the specified rows from the `deletedRowIds` array.
commitDeletedRows | [Action](../../../dx-react-core/docs/reference/action.md) | ({ rowIds: Array&lt;number &#124; string&gt; }) => void | Fires the `onCommitChanges` event with the corresponding [ChangeSet](#changeset) and removes specified rows from the `deletedRowIds` array.
createRowChange | [Getter](../../../dx-react-core/docs/reference/getter.md) | (row: any, value: any, columnName: string) => any | A function that returns a value that specifies row changes depending on the column's editor values for the current row. This function is called each time the editor's value changes.
isColumnEditingEnabled | [Getter](../../../dx-react-core/docs/reference/getter.md) | (columnName: string) => boolean |  A function that returns a value that specifies if editing by a column is enabled.
