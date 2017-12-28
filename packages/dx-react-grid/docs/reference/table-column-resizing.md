# TableColumnResizing Plugin Reference

A plugin that manages table column widths.

## User Reference

### Dependencies

- [Table](table.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
columnWidths | Array&lt;[ColumnWidthInfo](#ColumnWidthInfo)&gt; | | Specifies column widths.
defaultColumnWidths | Array&lt;[ColumnWidthInfo](#ColumnWidthInfo)&gt; | [] | Specifies initial column widths in the uncontrolled mode.
onColumnWidthsChange | (nextColumnWidths: { [columnName: string]: number }) => void | | Handles column width changes.

## Interfaces

### ColumnWidthInfo

Describes the sorting applied to a column

A value with the following shape:

Field | Type | Description
------|------|------------
columnName | string | Specifies a column's name to which the sorting is applied.
width | number | Specifies a column's width.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
tableColumns | Getter | Array&lt;[TableColumn](table.md#tablecolumn)&gt; | Table columns whose width the plugin manages.


### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
tableColumns | Getter | Array&lt;[TableColumn](table.md#tablecolumn)&gt; | Table columns with new width values applied.
changeTableColumnWidths | Action | ({ shifts: { [columnName: string]: number } }) => void | Changes the specified columns' width. Each column width is increased by the corresponding shift value, or decreased if the value is negative.
changeDraftTableColumnWidths | Action | ({ shifts: { [columnName: string]: number } }) => void | Changes the specified columns' width used for preview. Each column width is increased by the corresponding shift value, or decreased if the value is negative. Setting a shift to `null` clears the corresponding column's draft width.
