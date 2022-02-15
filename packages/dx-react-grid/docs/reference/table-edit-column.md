# TableEditColumn Plugin Reference

A plugin that renders a command column. This column contains controls used for row editing, creating, or deleting and committing/canceling changes.

## Import

Use the following statement to import a plugin with embedded theme components:

```js
import { TableEditColumn } from '@devexpress/dx-react-grid-material-ui';
// import { TableEditColumn } from '@devexpress/dx-react-grid-bootstrap4';
// import { TableEditColumn } from '@devexpress/dx-react-grid-bootstrap3';
```

If you want to use custom components, you can import the themeless plugin:

```js
import { TableEditColumn } from '@devexpress/dx-react-grid';
```

## User Reference

### Dependencies

- [EditingState](editing-state.md)
- [Table](table.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
cellComponent | ComponentType&lt;[TableEditColumn.CellProps](#tableeditcolumncellprops)&gt; | | A component that renders a command cell within a data row.
headerCellComponent | ComponentType&lt;[TableEditColumn.HeaderCellProps](#tableeditcolumnheadercellprops)&gt; | | A component that renders a command cell within the header row.
commandComponent | ComponentType&lt;[TableEditColumn.CommandProps](#tableeditcolumncommandprops)&gt; | | A component that renders command control within a command cell.
showAddCommand? | boolean | false | Specifies whether to render the 'New' command within the header row's command cell.
showEditCommand? | boolean | false | Specifies whether to render the 'Edit' command within the data row's command cell.
showDeleteCommand? | boolean | false | Specifies whether to render the 'Delete' command within the data row's command cell.
width? | number &#124; string | | Specifies the command column's width.
messages? | [TableEditColumn.LocalizationMessages](#localization-messages) | | An object that specifies the localization messages.

## Interfaces

### TableEditColumn.CellProps

Describes properties passed to a data row's command cell component.

Extends [Table.CellProps](table.md#tablecellprops)

Field | Type | Description
------|------|------------
row | any | Specifies an edited table row with the applied changes.
children? | ReactNode | A React node to be placed in the command cell.

### TableEditColumn.HeaderCellProps

Describes properties passed to a component that renders a command cell within the header row.

Extends [Table.CellProps](table.md#tablecellprops)

Field | Type | Description
------|------|------------
children? | ReactNode | A React node to be placed in the command cell.

### TableEditColumn.CommandProps

Describes properties passed to a component that renders command control within a command cell.

Field | Type | Description
------|------|------------
id | 'add' &#124; 'edit' &#124; 'delete' &#124; 'commit' &#124; 'cancel' | The command identifier.
text | string | The command action description.
onExecute | () => void | An event initiating the command execution.

## Localization Messages

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
TableEditColumn.Command | [TableEditColumn.CommandProps](#tableeditcolumncommandprops) | A component that renders a command control within a command cell.
TableEditColumn.Cell | [TableEditColumn.CellProps](#tableeditcolumncellprops) | A component that renders a command cell within a data row.
TableEditColumn.HeaderCell | [TableEditColumn.HeaderCellProps](#tableeditcolumnheadercellprops) | A component that renders a command cell within the header row.

Additional properties are added to the component's root element.

## Static Fields

Field | Type | Description
------|------|------------
COLUMN&lowbar;TYPE | symbol | The edit column type's identifier.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
tableColumns | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;[TableColumn](table.md#tablecolumn)&gt; | Table columns.
addRow | [Action](../../../dx-react-core/docs/reference/action.md) | () => void | Creates a row.
cancelAddedRows | [Action](../../../dx-react-core/docs/reference/action.md) | ({ rowIds: Array&lt;number&gt; }) => void | Removes uncommitted new rows from the `addedRows` array.
commitAddedRows | [Action](../../../dx-react-core/docs/reference/action.md) | ({ rowIds: Array&lt;number&gt; }) => void | Fires the `onCommitChanges` event with the corresponding [ChangeSet](editing-state.md#changeset) and removes specified rows from the `addedRows` array.
startEditRows | [Action](../../../dx-react-core/docs/reference/action.md) | ({ rowIds: Array&lt;number &#124; string&gt; }) => void | Switches rows with the specified ID to edit mode.
stopEditRows | [Action](../../../dx-react-core/docs/reference/action.md) | ({ rowIds: Array&lt;number &#124; string&gt; }) => void | Switches rows with the specified ID back to normal mode.
cancelChangedRows | [Action](../../../dx-react-core/docs/reference/action.md) | ({ rowIds: Array&lt;number &#124; string&gt; }) => void | Cancels uncommitted changes in rows with the specified ID.
commitChangedRows | [Action](../../../dx-react-core/docs/reference/action.md) | ({ rowIds: Array&lt;number &#124; string&gt; }) => void | Fires the `onCommitChanges` event with the corresponding [ChangeSet](editing-state.md#changeset) and removes specified rows from the `rowChanges` array.
deleteRows | [Action](../../../dx-react-core/docs/reference/action.md) | ({ rowIds: Array&lt;number &#124; string&gt; }) => void | Prepares rows with the specified ID for deletion by adding them to the `deletedRows` array.
commitDeletedRows | [Action](../../../dx-react-core/docs/reference/action.md) | ({ rowIds: Array&lt;number &#124; string&gt; }) => void | Fires the `onCommitChanges` event with the corresponding [ChangeSet](editing-state.md#changeset) and removes specified rows from the `deletedRowIds` array.
tableCell | [Template](../../../dx-react-core/docs/reference/template.md) | [Table.CellProps](table.md#tablecellprops) | A template that renders a table cell.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
tableColumns | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;[TableColumn](table.md#tablecolumn)&gt; | Table columns including the edit column.
