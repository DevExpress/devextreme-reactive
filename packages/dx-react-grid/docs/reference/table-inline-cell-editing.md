# TableInlineCellEditing Plugin Reference

A plugin that renders a cell being edited.

## Import

Use the following statement to import a plugin with embedded theme components:

```js
import { TableInlineCellEditing } from '@devexpress/dx-react-grid-material-ui';
// import { TableInlineCellEditing } from '@devexpress/dx-react-grid-bootstrap4';
// import { TableInlineCellEditing } from '@devexpress/dx-react-grid-bootstrap3';
```

If you want to use custom components, you can import the themeless plugin:

```js
import { TableInlineCellEditing } from '@devexpress/dx-react-grid';
```

## User Reference

### Dependencies

- [EditingState](editing-state.md)
- [Table](table.md)
- [DataTypeProvider](data-type-provider.md) [Optional]

### Properties

Name | Type | Default | Description
-----|------|---------|------------
cellComponent | ComponentType&lt;[TableInlineCellEditing.CellProps](#tableinlinecelleditingcellprops)&gt; | | A component that renders an editable cell.
startEditAction | 'click' &#124; 'doubleClick' | 'click' | An action, that start editing cell.
selectTextOnEditStart | boolean | false | Define text selection on edit start.

## Interfaces

### TableInlineCellEditing.CellProps

Describes properties passed to a component that renders an editable cell.

Extends [Table.CellProps](table.md#tablecellprops)

Field | Type | Description
------|------|------------
row | any | A row to be edited.
column | [Column](grid.md#column) | A column.
value | any | A value to be edited.
editingEnabled | boolean | Specifies whether editing a column is enabled.
onValueChange | (newValue: any) => void | Handles value changes.
autoFocus | boolean | Define autoFocus on cell when editing start (`true` by default).
onKeyDown | (key: string) => void | Define actions when keyboard key pressed.
onBlur | () => void | Define actions when cell lost focus.

## Plugin Components

Name | Properties | Description
-----|------------|------------
TableInlineCellEditing.Cell | [TableInlineCellEditing.CellProps](#tableinlinecelleditingcellprops) | A component that renders an editable cell.

Additional properties are added to the component's root element.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
editingCells | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;{rowId: number, columnName: string}&gt; | Row ID and column name of cells that are being edited.
getCellValue | [Getter](../../../dx-react-core/docs/reference/getter.md) | (row: any, columnName: string) => any | A function used to get the specified row's column value.
createRowChange | [Getter](../../../dx-react-core/docs/reference/getter.md) | (row: any, value: any, columnName: string) => any | A function that returns a value that specifies row changes depending on the row's editable cell values. This function is called each time an editor's value changes.
rowChanges | [Getter](../../../dx-react-core/docs/reference/getter.md) | { [key: string]: any } | An associative array that stores changes made to existing rows. Each array item specifies changes made to a row. The item's key specifies the associated row's ID.
isColumnEditingEnabled | [Getter](../../../dx-react-core/docs/reference/getter.md) | (columnName: string) => boolean |  A function that returns a value that specifies if editing by a column is enabled.
changeRow | [Action](../../../dx-react-core/docs/reference/action.md) | ({ rowId: number &#124; string, change: object }) => void | Applies a change to an existing row.
startEditCells | [Action](../../../dx-react-core/docs/reference/action.md) | ({ editingCells: Array&lt;{rowId: number, columnName: string}&gt; }) => void | Switches cells with the specified row ID and column name to the edit mode.
stopEditCells | [Action](../../../dx-react-core/docs/reference/action.md) | ({ editingCells: Array&lt;{rowId: number, columnName: string}&gt; }) => void | Switches cells with the specified row ID and column name to the read-only mode.
cancelChangedRows | [Action](../../../dx-react-core/docs/reference/action.md) | ({ rowIds: Array&lt;number &#124; string&gt; }) => void | Cancels uncommitted changes in rows with the specified ID.
commitChangedRows | [Action](../../../dx-react-core/docs/reference/action.md) | ({ rowIds: Array&lt;number &#124; string&gt; }) => void | Fires the `onCommitChanges` event with the corresponding [ChangeSet](editing-state.md#changeset) and removes specified rows from the `rowChanges` array.

### Exports

none
