# TableEditColumn Plugin Reference

A plugin that renders a command column (a column containing controls used for row editing/creating/deleting and committing/canceling changes).

## User Reference

### Dependencies

- [EditingState](editing-state.md)
- [Table](table.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
cellComponent | ElementType&lt;[TableEditColumnCellProps](#tableeditcolumncellprops)&gt; | | A component that renders a cell within the command column and data row.
headerCellComponent | ElementType&lt;[TableEditColumnHeaderCellProps](#tableeditcolumnheadercellprops)&gt; | | A component that renders a cell within the command column and header row.
getCommandComponent | (id: 'add' &#124; 'edit' &#124; 'delete' &#124; 'commit' &#124; 'cancel') => ElementType&lt;[EditCommandProps](#editcommandprops)&gt; | | A function returning a component that renders command controls within the command column cell for a specific command.
allowAdding | boolean | false | If set to true, the 'New' command is rendered within the header row's command cell.
allowEditing | boolean | false | If set to true, the 'Edit' command is rendered within the data row's command cell.
allowDeleting | boolean | false | If set to true, the 'Delete' command is rendered within the data row's command cell.
width | number &#124; string | | Specifies the edit column's width.
messages | object | | An object that specifies the [localization messages](#localization-messages).

## Interfaces

### TableEditColumnCellProps

Describes properties passed to a data row's command cell template.

A value with the [TableCellArgs](table.md#table-cell-args) shape extended by the following fields:

Field | Type | Description
------|------|------------
row | any | Specifies an edited table row with applied changes.
children? | ReactElement | A React element to be placed inside.

### TableEditColumnHeaderCellProps

Describes properties passed to a component that renders a cell within the command column and header row.

A value with the [TableCellArgs](table.md#table-cell-args) shape extended by the following fields:

Field | Type | Description
------|------|------------
children? | ReactElement | A React element to be placed inside.

### EditCommandProps

Describes properties passed to a component that renders command controls within the command column cell.

A value with the following shape:

Field | Type | Description
------|------|------------
text | string | Specifies the text to be rendered within the command control.
executeCommand | () => void | Executes the command.

## Localization Messages

An object with the following shape:

Field | Type | Default | Description
------|------|---------|------------
addCommand? | string | 'New' | Specifies the add command button text.
editCommand? | string | 'Edit' | Specifies the edit command button text.
deleteCommand? | string | 'Delete' | Specifies the delete command button text.
commitCommand? | string | 'Save' | Specifies the commit command button text.
cancelCommand? | string | 'Cancel' | Specifies the cancel command button text.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
tableColumns | Getter | Array&lt;[TableColumn](table.md#table-column)&gt; | Table columns.
addRow | Action | () => void | Creates a row.
cancelAddedRows | Action | ({ rowIds: Array&lt;number&gt; }) => void | Removes uncommitted new rows from the `addedRows` array.
commitAddedRows | Action | ({ rowIds: Array&lt;number&gt; }) => void | Fires the `onCommitChanges` event with the corresponding [ChangeSet](editing-state.md#change-set) and removes the specified rows from the `addedRows` array.
startEditRows | Action | ({ rowIds: Array&lt;number &#124; string&gt; }) => void | Switches the rows specified by the ID to the edit mode.
stopEditRows | Action | ({ rowIds: Array&lt;number &#124; string&gt; }) => void | Switches the rows specified by the ID to the read-only mode.
cancelChangedRows | Action | ({ rowIds: Array&lt;number &#124; string&gt; }) => void | Cancels uncommitted changes in the rows specified by the ID.
commitChangedRows | Action | ({ rowIds: Array&lt;number &#124; string&gt; }) => void | Fires the `onCommitChanges` event with the corresponding [ChangeSet](editing-state.md#change-set) and removes the specified rows from the `changedRows` array.
deleteRows | Action | ({ rowIds: Array&lt;number &#124; string&gt; }) => void | Prepares rows specified by the ID for deletion, adding them to the `deletedRows` array.
commitDeletedRows | Action | ({ rowIds: Array&lt;number &#124; string&gt; }) => void | Fires the `onCommitChanges` event with the corresponding [ChangeSet](editing-state.md#change-set) and removes the specified rows from the `deletedRows` array.
tableCell | Template | [TableCellArgs](table.md#table-cell-args) | A template that renders a table cell.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
tableColumns | Getter | Array&lt;[TableColumn](table.md#table-column)&gt; | Table columns including the edit column.
