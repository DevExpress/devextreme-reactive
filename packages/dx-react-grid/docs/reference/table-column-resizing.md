# TableColumnResizing Plugin Reference

A plugin that manages table column widths.

## User Reference

### Dependencies

- [Table](table.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
columnWidths | { [columnName: string]: number } | | Specifies column widths.
defaultColumnWidths | { [columnName: string]: number } | {} | Specifies initial column widths in the uncontrolled mode.
onColumnWidthsChange | (nextColumnWidths: { [columnName: string]: number }) => void | | Handles column width changes.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
tableColumns | Getter | Array&lt;[TableColumn](table.md#tablecolumn)&gt; | Table columns whose width the plugin manages.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
tableColumns | Getter | Array&lt;[TableColumn](table.md#tablecolumn)&gt; | Table columns with new width values applied.
allowTableColumnResizing | Getter | boolean | Specifies whether table column resizing is enabled.
changeTableColumnWidths | Action | ({ shifts: { [columnName: string]: number } }) => void | Changes the specified columns' width. Each column width is increased by the corresponding shift value, or decreased if the value is negative.
changeDraftTableColumnWidths | Action | ({ shifts: { [columnName: string]: number } }) => void | Changes the specified columns' width used for preview. Each column width is increased by the corresponding shift value, or decreased if the value is negative. Setting a shift to `null` clears the corresponding column's draft width.
