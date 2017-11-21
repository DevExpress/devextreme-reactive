# TableColumnResizing Plugin Reference

A plugin that manages table column widths measured in pixels.

## User Reference

### Dependencies

- [Table](table.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
columnWidths | { [columnName: string]: number } | | Specifies column widths.
defaultColumnWidths | { [columnName: string]: number } | {} | Specifies initial column widths in the uncontrolled mode.
onColumnWidthChange | (nextColumnWidths: { [columnName: string]: number }) => void | | Handles changes to column widths.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
tableColumns | Getter | Array&lt;[TableColumn](table.md#table-column)&gt; | Table columns the widths are associated with.


### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
tableColumns | Getter | Array&lt;[TableColumn](table.md#table-column)&gt; | Table columns with associated widths.
changeTableColumnWidths | Action | ({ shifts: { [columnName: string]: number } }) => void | Changes column widths. Each shift is added to the original column width value.
changeDraftTableColumnWidths | Action | ({ shifts: { [columnName: string]: number } }) => void | Changes draft column widths. Each shift is added to the original column width value. If a shift is `null`, the draft width for the column is cleared.
