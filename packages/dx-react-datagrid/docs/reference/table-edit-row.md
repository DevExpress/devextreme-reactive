# TableEditRow Plugin Reference

A plugin that renders a row being edited.

## User Reference

### Dependencies

- [EditingState](editing-state.md)
- [TableView](table-view.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
rowHeight | number | | Specifies the height of the edit row
editCellTemplate | Component&lt;[EditCellProps](#edit-cell-props)&gt; | | A component that renders an editable cell

## Interfaces

### <a name="edit-cell-props"></a>EditCellProps

Describes properties passed to the edit row cell template.

A value with the following shape:

Field | Type | Description
------|------|------------
row | [TableRow](#table-row) | Specifies an initial row
column | [TableColumn](#table-column) | Specifies a table column
value | any | Specifies a value to be edited
onValueChange | (newValue: any) => void | Handles the value change

## Plugin Developer Reference

To be described...
