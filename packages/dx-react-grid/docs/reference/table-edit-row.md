# TableEditRow Plugin Reference

A plugin that renders a row being edited.

## User Reference

### Dependencies

- [EditingState](editing-state.md)
- [TableView](table-view.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
rowHeight | number | | Specifies the edit row height
editCellTemplate | (args: [EditCellArgs](#edit-cell-args)) => ReactElement | | A component that renders an editable cell

## Interfaces

### <a name="edit-cell-args"></a>EditCellArgs

Describes properties passed to the edit row's cell template.

A value with the [TableCellArgs](table-view.md#table-cell-args) shape extended by the following fields:

Field | Type | Description
------|------|------------
row | [Row](grid.md#row) | Specifies the initial row
column | [Column](grid.md#column) | Specifies a column
value | any | Specifies a value to be edited
onValueChange | (newValue: any) => void | Handles value changes

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
tableBodyRows | Getter | Array&lt;[TableRow](table-view.md#table-row)&gt; | Rows to be rendered inside the table body
editingRows | Getter | Array&lt;number &#124; string&gt; | IDs of the rows being edited
addedRows | Getter | Array&lt;Object&gt; | The created rows
changedRows | Getter | { [key: string]: Object } | Uncommitted changed rows
changeRow | Action | ({ rowId: number &#124; string, change: Object }) => void | Applies a change to an existing row
changeAddedRow | Action | ({ rowId: number, change: Object }) => void | Applies a change to a new row. Note: `rowId` is a row index within the `addedRows` array
tableViewCell | Template | [TableCellArgs](table-view.md#table-cell-args) | A template that renders a table cell

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
tableBodyRows | Getter | Array&lt;[TableRow](table-view.md#table-row)&gt; | Table data rows including editing rows
