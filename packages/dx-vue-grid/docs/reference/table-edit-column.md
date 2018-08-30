# DxTableEditColumn Plugin Reference

A plugin that renders a command column. This column contains controls used for row editing, creating, or deleting and committing/canceling changes.

## Import

Use the following statement to import a plugin with embedded theme components:

```js
import { DxTableEditColumn } from '@devexpress/dx-vue-grid-bootstrap4';
```

If you want to use custom components, you can import the themeless plugin:

```js
import { DxTableEditColumn } from '@devexpress/dx-vue-grid';
```

## User Reference

### Dependencies

- [DxEditingState](editing-state.md)
- [DxTable](table.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
cellComponent | [DxTableEditColumn.DxCell](#dxtableeditcolumndxcell) | | A component that renders a command cell within a data row.
headerCellComponent | [DxTableEditColumn.DxHeaderCell](#dxtableeditcolumndxheadercell) | | A component that renders a command cell within the header row.
commandComponent | [DxTableEditColumn.DxCommand](#dxtableeditcolumndxcommand) | | A component that renders command control within a command cell.
showAddCommand? | boolean | false | Specifies whether to render the 'New' command within the header row's command cell.
showEditCommand? | boolean | false | Specifies whether to render the 'Edit' command within the data row's command cell.
showDeleteCommand? | boolean | false | Specifies whether to render the 'Delete' command within the data row's command cell.
width? | number &#124; string | | Specifies the command column's width.
messages? | [DxTableEditColumn.LocalizationMessages](#localization-messages) | | An object that specifies the localization messages.

## Component Types

### DxTableEditColumn.DxCell

#### Props

Field | Type | Description
------|------|------------
tableRow | [TableRow](table.md#tablerow) | Specifies a table row.
tableColumn | [TableColumn](table.md#tablecolumn) | Specifies a table column.
colSpan? | number | The count of columns that the root cell element spans.
rowSpan? | number | The count of rows that the root cell element spans.
row | any | Specifies an edited table row with the applied changes.

#### Slots

Field | Description
------|------------
default | The default Vue slot.

### DxTableEditColumn.DxHeaderCell

#### Props

Field | Type | Description
------|------|------------
tableRow | [TableRow](table.md#tablerow) | Specifies a table row.
tableColumn | [TableColumn](table.md#tablecolumn) | Specifies a table column.
colSpan? | number | The count of columns that the root cell element spans.
rowSpan? | number | The count of rows that the root cell element spans.

#### Slots

Field | Description
------|------------
default | The default Vue slot.

### DxTableEditColumn.DxCommand

#### Props

Field | Type | Description
------|------|------------
id | 'add' &#124; 'edit' &#124; 'delete' &#124; 'commit' &#124; 'cancel' | The command identifier.
text | string | The command action description.

#### Events

Field | Type | Description
------|------|------------
execute | () => void | An event initiating the command execution.

## Localization Messages

Field | Type | Default | Description
------|------|---------|------------
addCommand? | string | 'New' | Specifies the add command button text.
editCommand? | string | 'Edit' | Specifies the edit command button text.
deleteCommand? | string | 'Delete' | Specifies the delete command button text.
commitCommand? | string | 'Save' | Specifies the commit command button text.
cancelCommand? | string | 'Cancel' | Specifies the cancel command button text.

## Plugin Components

Name | Type | Description
-----|------|------------
DxTableEditColumn.components.DxCell | [DxTableEditColumn.DxCell](#dxtableeditcolumndxcell) | A component that renders a command cell within a data row.
DxTableEditColumn.components.DxHeaderCell | [DxTableEditColumn.DxHeaderCell](#dxtableeditcolumndxheadercell) | A component that renders a command cell within the header row.
DxTableEditColumn.components.DxCommand | [DxTableEditColumn.DxCommand](#dxtableeditcolumndxcommand) | A component that renders command control within a command cell.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
tableColumns | Getter | Array&lt;[TableColumn](table.md#tablecolumn)&gt; | Table columns.
addRow | Action | () => void | Creates a row.
cancelAddedRows | Action | ({ rowIds: Array&lt;number&gt; }) => void | Removes uncommitted new rows from the `addedRows` array.
commitAddedRows | Action | ({ rowIds: Array&lt;number&gt; }) => void | Fires the `commitChanges` event with the corresponding [ChangeSet](editing-state.md#changeset) and removes specified rows from the `addedRows` array.
startEditRows | Action | ({ rowIds: Array&lt;number &#124; string&gt; }) => void | Switches rows with the specified ID to the edit mode.
stopEditRows | Action | ({ rowIds: Array&lt;number &#124; string&gt; }) => void | Switches rows with the specified ID to the read-only mode.
cancelChangedRows | Action | ({ rowIds: Array&lt;number &#124; string&gt; }) => void | Cancels uncommitted changes in rows with the specified ID.
commitChangedRows | Action | ({ rowIds: Array&lt;number &#124; string&gt; }) => void | Fires the `commitChanges` event with the corresponding [ChangeSet](editing-state.md#changeset) and removes specified rows from the `rowChanges` array.
deleteRows | Action | ({ rowIds: Array&lt;number &#124; string&gt; }) => void | Prepares rows with the specified ID for deletion by adding them to the `deletedRows` array.
commitDeletedRows | Action | ({ rowIds: Array&lt;number &#124; string&gt; }) => void | Fires the `commitChanges` event with the corresponding [ChangeSet](editing-state.md#changeset) and removes specified rows from the `deletedRowIds` array.
tableCell | Template | object? | A template that renders a table cell.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
tableColumns | Getter | Array&lt;[TableColumn](table.md#tablecolumn)&gt; | Table columns including the edit column.
