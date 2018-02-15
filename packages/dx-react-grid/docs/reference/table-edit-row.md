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
cellComponent | ComponentType&lt;[TableEditRow.CellProps](#tableeditrowcellprops)&gt; | | A component that renders an editable cell.
rowComponent | ComponentType&lt;[TableEditRow.RowProps](#tableeditrowrowprops)&gt; | | A component that renders an editable row.
rowHeight? | number | | Specifies the editable row's height.

## Interfaces

### TableEditRow.CellProps

Describes properties passed to a component that renders an editable cell.

Extends [Table.CellProps](table.md#tablecellprops)

Field | Type | Description
------|------|------------
row | any | A row to be edited.
column | [Column](grid.md#column) | A column.
value | any | A value to be edited.
editingEnabled | boolean | Specifies whether editing by a column is enabled.
onValueChange | (newValue: any) => void | Handles value changes.

### TableEditRow.RowProps

Describes properties passed to a component that renders an editable row.

Extends [Table.RowProps](table.md#tablerowprops)

Field | Type | Description
------|------|------------
row | any | A row to be edited.

## Plugin Components

Name | Properties | Description
-----|------------|------------
TableEditRow.Cell | [TableEditRow.CellProps](#tableeditrowcellprops) | A component that renders an editable cell.
TableEditRow.Row | [TableEditRow.RowProps](#tableeditrowrowprops) | A component that renders an editable row.

Additional properties are added to the component's root element.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
tableBodyRows | Getter | Array&lt;[TableRow](table.md#tablerow)&gt; | Table body rows.
editingRowIds | Getter | Array&lt;number &#124; string&gt; | IDs of the rows that are being edited.
addedRows | Getter | Array&lt;any&gt; | Created but not committed rows.
isColumnEditingEnabled | Getter | (columnName: string) => boolean |  A function that returns a value that specifies if editing by a column is enabled.
changeAddedRow | Action | ({ rowId: number, change: any }) => void | Applies a change to a created but uncommitted row. Note: `rowId` is a row index within the `addedRows` array.
rowChanges | Getter | { [key: string]: any } | An associative array that stores changes made to existing rows. Each array item specifies changes made to a row. The item's key specifies the associated row's ID.
changeRow | Action | ({ rowId: number &#124; string, change: Object }) => void | Applies a change to an existing row.
getCellValue | Getter | (row: any, columnName: string) => any | A function used to get a column value for the specified row.
createRowChange | Getter | (row: any, value: any, columnName: string) => any | A function that returns a value that specifies row changes depending on the row's editable cell values. This function is called each time an editor value changes.
tableCell | Template | [Table.CellProps](table.md#tablecellprops) | A template that renders a table cell.
tableRow | Template | [Table.RowProps](table.md#tablerowprops) | A template that renders a table row.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
tableBodyRows | Getter | Array&lt;[TableRow](table.md#tablerow)&gt; | Table body rows including editable rows.
