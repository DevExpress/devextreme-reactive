# TableEditRow Plugin Reference

A plugin that renders a row with data editors if the row is in editing state.

## User Reference

### Dependencies

- [EditingState](editing-state.md)
- [TableView](table-view.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
rowHeight | number | | Specifies the height for the edit row
editCellTemplate | Component&lt;[EditCellProps](#edit-cell-props)&gt; | | A component that renders a cell with the capability to change a row field value

## Interfaces

### <a name="edit-cell-props"></a>EditCellProps

Describes properties passed to the edit row cell template.

A value with the following shape:

Field | Type | Description
------|------|------------
row | [TableRow](#table-row) | Specifies an editing table row with applied changes
originalRow | [TableRow](#table-row)? | Specifies a source non-modified row
column | [TableColumn](#table-column) | Specifies a table column
value | any | Specifies a value to be edited
onValueChange | (newValue: any) => void | Handles the value change

## Plugin Developer Reference

To be described...
