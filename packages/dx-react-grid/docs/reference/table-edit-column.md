# TableEditColumn Plugin Reference

A plugin that renders a command column (a column containing controls used for row editing/creating/deleting and committing/canceling changes).

## User Reference

### Dependencies

- [EditingState](editing-state.md)
- [Table](table.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
cellTemplate | (args: [CommandCellArgs](#command-cell-args)) => ReactElement | | A component that renders a cell within the command column and data row.
headingCellTemplate | (args: [CommandHeadingCellArgs](#command-heading-cell-args)) => ReactElement | | A component that renders a cell within the command column and heading row.
commandTemplate | (args: [CommandArgs](#command-args)) => ReactElement | | A component that renders command controls within the command column cell.
allowAdding | boolean | false | If set to true, the 'New' command is rendered within the heading row's command cell.
allowEditing | boolean | false | If set to true, the 'Edit' command is rendered within the data row's command cell.
allowDeleting | boolean | false | If set to true, the 'Delete' command is rendered within the data row's command cell.
width | number &#124; string | | Specifies the edit column's width.
messages | object | | An object that specifies the [localization messages](#localization-messages).

## Interfaces

### <a name="command-cell-args"></a>CommandCellArgs

Describes properties passed to a data row's command cell template.

A value with the [TableCellProps](table.md#tablecellprops) shape extended by the following fields:

Field | Type | Description
------|------|------------
row | any | Specifies an edited table row with applied changes.
column | [Column](grid.md#column) | Specifies a table column.
startEditing | () => void | Switches a row to the editing mode.
cancelEditing | () => void | Switches a row to the read-only mode.
commitChanges | () => void | Initiates row changes committing.
deleteRow | () => void | Initiates row deletion.
allowEditing | boolean | Specifies if a row can be edited.
allowDeleting | boolean | Specifies if a row can be deleted.
commandTemplate | (args: [CommandArgs](#command-args)) => ReactElement | A component that renders command controls within the command column cell.
getMessage | ([messageKey](#localization-messages): string) => string | Returns the text displayed in command controls within the command column cell.

### <a name="command-heading-cell-args"></a>CommandHeadingCellArgs

Describes properties passed to a heading row's command cell template.

A value with the [TableCellProps](table.md#tablecellprops) shape extended by the following fields:

Field | Type | Description
------|------|------------
addRow | () => void | Creates a new row.
allowAdding | boolean | Specifies if a new row can be created.
commandTemplate | (args: [CommandArgs](#command-args)) => ReactElement | A component that renders command controls within the command column cell.
getMessage | ([messageKey](#localization-messages): string) => string | Returns the text displayed in command control within the command column cell.

### <a name="command-args"></a>CommandArgs

Describes properties passed to the command control template.

A value with the following shape:

Field | Type | Description
------|------|------------
executeCommand | () => void | Executes the command.
text | string | Specifies the text to be rendered within the command control.

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
tableColumns | Getter | Array&lt;[TableColumn](table.md#tablecolumn)&gt; | Table columns.
addRow | Action | () => void | Creates a row.
cancelAddedRows | Action | ({ rowIds: Array&lt;number&gt; }) => void | Removes uncommitted new rows from the `addedRows` array.
commitAddedRows | Action | ({ rowIds: Array&lt;number&gt; }) => void | Fires the `onCommitChanges` event with the corresponding [ChangeSet](editing-state.md#change-set) and removes the specified rows from the `addedRows` array.
startEditRows | Action | ({ rowIds: Array&lt;number &#124; string&gt; }) => void | Switches the rows specified by the ID to the edit mode.
stopEditRows | Action | ({ rowIds: Array&lt;number &#124; string&gt; }) => void | Switches the rows specified by the ID to the read-only mode.
cancelChangedRows | Action | ({ rowIds: Array&lt;number &#124; string&gt; }) => void | Cancels uncommitted changes in the rows specified by the ID.
commitChangedRows | Action | ({ rowIds: Array&lt;number &#124; string&gt; }) => void | Fires the `onCommitChanges` event with the corresponding [ChangeSet](editing-state.md#change-set) and removes the specified rows from the `changedRows` array.
deleteRows | Action | ({ rowIds: Array&lt;number &#124; string&gt; }) => void | Prepares rows specified by the ID for deletion, adding them to the `deletedRows` array.
commitDeletedRows | Action | ({ rowIds: Array&lt;number &#124; string&gt; }) => void | Fires the `onCommitChanges` event with the corresponding [ChangeSet](editing-state.md#change-set) and removes the specified rows from the `deletedRows` array.
tableCell | Template | [TableCellProps](table.md#tablecellprops) | A template that renders a table cell.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
tableColumns | Getter | Array&lt;[TableColumn](table.md#tablecolumn)&gt; | Table columns including the edit column.
