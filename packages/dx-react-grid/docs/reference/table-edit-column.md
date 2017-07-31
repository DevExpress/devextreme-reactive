# TableEditColumn Plugin Reference

A plugin that renders a command column (a column containing controls used for row editing/creating/deleting and committing/canceling changes).

## User Reference

### Dependencies

- [EditingState](editing-state.md)
- [TableView](table-view.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
cellTemplate | (args: [CommandCellArgs](#command-cell-args)) => ReactElement | | A component that renders a cell within the command column and data row
headingCellTemplate | (args: [CommandHeadingCellArgs](#command-heading-cell-args)) => ReactElement | | A component that renders a cell within the command column and heading row
commandTemplate | (args: [CommandArgs](#command-args)) => ReactElement | | A component that renders command controls within the command column cell
allowAdding | boolean | false | If set to true, the 'New' command is rendered within the heading row's command cell
allowEditing | boolean | false | If set to true, the 'Edit' command is rendered within the data row's command cell
allowDeleting | boolean | false | If set to true, the 'Delete' command is rendered within the data row's command cell
width | number &#124; string | 140 | Specifies the width of the edit column

## Interfaces

### <a name="command-cell-args"></a>CommandCellArgs

Describes properties passed to a data row's command cell template.

A value with the following shape:

Field | Type | Description
------|------|------------
row | [TableRow](table-view.md#table-row) | Specifies an edited table row with applied changes
column | [TableColumn](table-view.md#table-column) | Specifies a table column
startEditing | () => void | Switches a row to the editing mode
cancelEditing | () => void | Switches a row to the read-only mode
commitChanges | () => void | Initiates committing of row changes
deleteRow | () => void | Initiates row deletion
allowEditing | boolean | Specifies if a row can be edited
allowDeleting | boolean | Specifies if a row can be deleted
commandTemplate | (args: [CommandArgs](#command-args)) => ReactElement | A component that renders command controls within the command column cell
style? | Object | Styles that should be applied to the root cell element

### <a name="command-heading-cell-args"></a>CommandHeadingCellArgs

Describes properties passed to a heading row's command cell template.

A value with the following shape:

Field | Type | Description
------|------|------------
row | [TableRow](table-view.md#table-row) | Specifies an editing table row with applied changes
column | [TableColumn](table-view.md#table-column) | Specifies a table column
addRow | () => void | Creates a new row
allowAdding | boolean | Specifies if a new row can be created
commandTemplate | (args: [CommandArgs](#command-args)) => ReactElement | A component that renders command controls within the command column cell
style? | Object | Styles that should be applied to the root cell element

### <a name="command-args"></a>CommandArgs

Describes properties passed to the command control template.

A value with the following shape:

Field | Type | Description
------|------|------------
executeCommand | () => void | Executes the command
text | string | Specifies the text to be rendered within the command control

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
tableColumns | Getter | Array&lt;[TableColumn](table-view.md#table-column)&gt; | Table columns
getRowId | Getter | (row: [Row](grid.md#row)) => number &#124; string | A function used to get a unique row identifier
addRow | Action | () => void | Creates a row
cancelAddedRows | Action | ({ rowIds: Array&lt;number&gt; }) => void | Removes uncommitted new rows from the `addedRows` array
commitAddedRows | Action | ({ rowIds: Array&lt;number&gt; }) => void | Fires the `onCommitChanges` event with the corresponding [ChangeSet](editing-state.md#change-set) and removes the specified rows from the `addedRows` array
startEditRows | Action | ({ rowIds: Array&lt;number &#124; string&gt; }) => void | Switches the rows specified by the ID to the edit mode
stopEditRows | Action | ({ rowIds: Array&lt;number &#124; string&gt; }) => void | Switches the rows specified by the ID to the read-only mode
cancelChangedRows | Action | ({ rowIds: Array&lt;number &#124; string&gt; }) => void | Cancels uncommitted changes in the rows specified by the ID
commitChangedRows | Action | ({ rowIds: Array&lt;number &#124; string&gt; }) => void | Fires the `onCommitChanges` event with the corresponding [ChangeSet](editing-state.md#change-set) and removes the specified rows from the `changedRows` array
deleteRows | Action | ({ rowIds: Array&lt;number &#124; string&gt; }) => void | Prepares rows specified by the ID for deletion, adding them to the `deletedRows` array
commitDeletedRows | Action | ({ rowIds: Array&lt;number &#124; string&gt; }) => void | Fires the `onCommitChanges` event with the corresponding [ChangeSet](editing-state.md#change-set) and removes the specified rows from the `deletedRows` array
tableViewCell | Template | { row: [TableRow](table-view.md#table-row), column: [TableColumn](table-view.md#table-column), style?: Object } | A template that renders a table cell

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
tableColumns | Getter | Array&lt;[TableColumn](table-view.md#table-column)&gt; | Table columns including the edit column
