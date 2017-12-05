# TableEditRow Plugin Reference

A plugin that renders a row being edited.

## User Reference

### Dependencies

- [EditingState](editing-state.md)
- [Table](table.md)
- [DataTypeProvider](data-type-provider.md) [Optional]

### Properties

Name | Type | Default | Description
-----|------|---------|------------
rowHeight | number | | Specifies the edit row height.
editCellTemplate | (args: [EditCellArgs](#edit-cell-args)) => ReactElement | | A component that renders an editable cell.
editRowTemplate | (args: [EditRowArgs](#edit-row-args)) => ReactElement | | A component that renders an editable row.

## Interfaces

### <a name="edit-cell-args"></a>EditCellArgs

Describes properties passed to the edit row's cell template.

A value with the [TableCellProps](table.md#tablecellprops) shape extended by the following fields:

Field | Type | Description
------|------|------------
row | any | Specifies the initial row.
column | [Column](grid.md#column) | Specifies a column.
value | any | Specifies a value to be edited.
onValueChange | (newValue: any) => void | Handles value changes.

### <a name="edit-row-args"></a>EditRowArgs

Describes properties passed to the edit row template.

A value with the [TableRowProps](table.md#tablerowprops) shape extended by the following fields:

Field | Type | Description
------|------|------------
row | any | Specifies the initial row.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
tableBodyRows | Getter | Array&lt;[TableRow](table.md#tablerow)&gt; | Rows to be rendered inside the table body.
editingRows | Getter | Array&lt;number &#124; string&gt; | IDs of the rows being edited.
addedRows | Getter | Array&lt;any&gt; | Created but not committed rows.
changeAddedRow | Action | ({ rowId: number, change: any }) => void | Applies a change to a created but uncommitted row. Note: `rowId` is a row index within the `addedRows` array.
changedRows | Getter | { [key: string]: any } | An associative array storing changes made to existing rows. Each array item specifies changes made to a row. The item's key specifies the associated row's ID.
changeRow | Action | ({ rowId: number &#124; string, change: Object }) => void | Applies a change to an existing row.
getCellValue | Getter | (row: any, columnName: string) => any | A function used to get the column value for a given row.
createRowChange | Getter | (row: any, columnName: string, value: string &#124; string) => any | A function that returns a value specifying row changes depending on the columns's editor values for the current row. This function is called each time the editor's value changes.
tableCell | Template | [TableCellProps](table.md#tablecellprops) | A template that renders a table cell.
tableRow | Template | [TableRowProps](table.md#tablerowprops) | A template that renders a table row.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
tableBodyRows | Getter | Array&lt;[TableRow](table.md#tablerow)&gt; | Table data rows including editing rows.
