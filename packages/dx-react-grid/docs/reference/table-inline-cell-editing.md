# TableInlineCellEditing Plugin Reference

A plugin that renders a cell being edited.

## Import

Use the following statement to import the plugin with embedded theme components:

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
startEditAction | 'click' &#124; 'doubleClick' | 'click' | The action that switches a cell to edit mode.
selectTextOnEditStart | boolean | false | Specifies whether cell value should be selected when the cell switches to edit mode.

## Interfaces

### TableInlineCellEditing.CellProps

Describes properties passed to a component that renders an editable cell.

Extends [Table.CellProps](table.md#tablecellprops)

Field | Type | Description
------|------|------------
row | any | The cell's row.
column | [Column](grid.md#column) | The cell's column.
value | any | The cell's value.
editingEnabled | boolean | Specifies whether cells in this column can be edited.
onValueChange | (newValue: any) => void | Handles value changes.
autoFocus | boolean | Specifies whether the cell should be automatically focused when it switches to edit mode. The default value is `true`.
onFocus | (event: any) => void | An event raised when the cell gets focus.
onBlur | () => void | An event raised when the cell loses focus.
onKeyDown | (key: string) => void | An event raised when a key on the keyboard is pressed.

## Plugin Components

Name | Properties | Description
-----|------------|------------
TableInlineCellEditing.Cell | [TableInlineCellEditing.CellProps](#tableinlinecelleditingcellprops) | A component that renders an editable cell.

Additional properties are added to the component's root element.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
editingCells | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;{rowId: number &#124; string, columnName: string}&gt; | Edited cells identified by the row ID and column name.
getCellValue | [Getter](../../../dx-react-core/docs/reference/getter.md) | (row: any, columnName: string) => any | A function used to get the value of a cell identified by the row ID and column name.
createRowChange | [Getter](../../../dx-react-core/docs/reference/getter.md) | (row: any, value: any, columnName: string) => any | A function that allows you to modify edited cell values before they are added to the `rowChanges` array. This function is called each time an editor's value changes and should return an object of the following format: `{ columnName1: value1, columnName2: value2, ... }`
rowChanges | [Getter](../../../dx-react-core/docs/reference/getter.md) | { [key: string]: any } | An associative array in which each item consists of a row ID (the `key` field) and changes made to this row.
isColumnEditingEnabled | [Getter](../../../dx-react-core/docs/reference/getter.md) | (columnName: string) => boolean |  A function that returns a Boolean value that specifies whether users are allowed to edit the column identified by the `columnName`.
changeRow | [Action](../../../dx-react-core/docs/reference/action.md) | ({ rowId: number &#124; string, change: object }) => void | Applies a change to a row identified by ID.
startEditCells | [Action](../../../dx-react-core/docs/reference/action.md) | ({ editingCells: Array&lt;{rowId: number &#124; string, columnName: string}&gt; }) => void | Switches cells identified by the row ID and column name to edit mode.
stopEditCells | [Action](../../../dx-react-core/docs/reference/action.md) | ({ editingCells: Array&lt;{rowId: number &#124; string, columnName: string}&gt; }) => void | Switches cells identified by the row ID and column name to normal mode.
cancelChangedRows | [Action](../../../dx-react-core/docs/reference/action.md) | ({ rowIds: Array&lt;number &#124; string&gt; }) => void | Cancels uncommitted changes in rows with the specified IDs.
commitChangedRows | [Action](../../../dx-react-core/docs/reference/action.md) | ({ rowIds: Array&lt;number &#124; string&gt; }) => void | Raises the `onCommitChanges` event with the corresponding [ChangeSet](editing-state.md#changeset) and removes the specified rows from the `rowChanges` array.
tableCell | [Template](../../../dx-react-core/docs/reference/template.md) | [Table.CellProps](table.md#tablecellprops) | A template that renders a table cell.

### Exports

none
