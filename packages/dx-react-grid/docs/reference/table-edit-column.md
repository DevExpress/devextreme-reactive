# TableEditColumn Plugin Reference

A plugin that renders a command column. This column contains controls used for row editing, creating, or deleting and committing/canceling changes.

## User Reference

### Dependencies

- [EditingState](editing-state.md)
- [Table](table.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
cellComponent | ElementType&lt;[TableEditColumnCellProps](#tableeditcolumncellprops)&gt; | | A component that renders a command cell within a data row.
headerCellComponent | ElementType&lt;[TableEditColumnHeaderCellProps](#tableeditcolumnheadercellprops)&gt; | | A component that renders a command cell within the header row.
commandComponent | ElementType&lt;[EditCommandProps](#editcommandprops)&gt; | | A component that renders command control within a command cell.
allowAdding | boolean | false | Specifies whether to render the 'New' command within the header row's command cell.
allowEditing | boolean | false | Specifies whether to render the 'Edit' command within the data row's command cell.
allowDeleting | boolean | false | Specifies whether to render the 'Delete' command within the data row's command cell.
width | number &#124; string | | Specifies the command column's width.
messages | object | | An object that specifies the [localization messages](#localization-messages).

## Interfaces

### TableEditColumnCellProps

Describes properties passed to a data row's command cell component.

A value with the [TableCellProps](table.md#tablecellprops) shape extended by the following fields:

Field | Type | Description
------|------|------------
row | any | Specifies an edited table row with the applied changes.
children? | ReactElement | A React element to be placed in the command cell.

### TableEditColumnHeaderCellProps

Describes properties passed to a component that renders a command cell within the header row.

A value with the [TableCellProps](table.md#tablecellprops) shape extended by the following fields:

Field | Type | Description
------|------|------------
children? | ReactElement | A React element to be placed in the command cell.

### EditCommandProps

Describes properties passed to a component that renders command control within a command cell.

A value with the following shape:

Field | Type | Description
------|------|------------
id | 'add' &#124; 'edit' &#124; 'delete' &#124; 'commit' &#124; 'cancel' | The command identifier.
text | string | The command action description.
onExecute | () => void | An event initiating the command execution.

## Localization Messages

An object with the following shape:

Field | Type | Default | Description
------|------|---------|------------
addCommand? | string | 'New' | Specifies the add command button text.
editCommand? | string | 'Edit' | Specifies the edit command button text.
deleteCommand? | string | 'Delete' | Specifies the delete command button text.
commitCommand? | string | 'Save' | Specifies the commit command button text.
cancelCommand? | string | 'Cancel' | Specifies the cancel command button text.

## Plugin Components

Name | Properties | Description
-----|------------|------------
TableEditColumn.Command | [EditCommandProps](#editcommandprops) | A component that renders command control within a command cell.
TableEditColumn.Cell | [TableEditColumnCellProps](#tableeditcolumncellprops) | A component that renders a command cell within a data row.
TableEditColumn.HeaderCell | [TableEditColumnHeaderCellProps](#tableeditcolumnheadercellprops) | A component that renders a command cell within the header row.

If you specify additional properties, they are added to the component's root element.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
tableColumns | Getter | Array&lt;[TableColumn](table.md#tablecolumn)&gt; | Table columns.
addRow | Action | () => void | Creates a row.
cancelAddedRows | Action | ({ rowIds: Array&lt;number&gt; }) => void | Removes uncommitted new rows from the `addedRows` array.
commitAddedRows | Action | ({ rowIds: Array&lt;number&gt; }) => void | Fires the `onCommitChanges` event with the corresponding [ChangeSet](editing-state.md#change-set) and removes the specified rows from the `addedRows` array.
startEditRows | Action | ({ rowIds: Array&lt;number &#124; string&gt; }) => void | Switches rows with the specified ID to the edit mode.
stopEditRows | Action | ({ rowIds: Array&lt;number &#124; string&gt; }) => void | Switches rows with the specified ID to the read-only mode.
cancelChangedRows | Action | ({ rowIds: Array&lt;number &#124; string&gt; }) => void | Cancels uncommitted changes in rows with the specified ID.
commitChangedRows | Action | ({ rowIds: Array&lt;number &#124; string&gt; }) => void | Fires the `onCommitChanges` event with the corresponding [ChangeSet](editing-state.md#change-set) and removes the specified rows from the `changedRows` array.
deleteRows | Action | ({ rowIds: Array&lt;number &#124; string&gt; }) => void | Prepares rows with the specified ID for deletion, adding them to the `deletedRows` array.
commitDeletedRows | Action | ({ rowIds: Array&lt;number &#124; string&gt; }) => void | Fires the `onCommitChanges` event with the corresponding [ChangeSet](editing-state.md#change-set) and removes the specified rows from the `deletedRows` array.
tableCell | Template | [TableCellProps](table.md#tablecellprops) | A template that renders a table cell.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
tableColumns | Getter | Array&lt;[TableColumn](table.md#tablecolumn)&gt; | Table columns including the edit column.
