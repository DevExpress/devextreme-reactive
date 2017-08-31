# TableColumnResizing Plugin Reference

The plugin that manages the widths in pixels of table columns.

## User Reference

### Dependencies

- [TableView](table-view.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
columnWidths | { [columnName: string]: number } | | Specifies the column widths.
defaultColumnWidths | { [columnName: string]: number } | {} | Specifies initial column widths in the uncontrolled mode.
onColumnWidthChange | (nextColumnWidths: { [columnName: string]: number }) => void | | Handles column widths change.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
tableColumns | Getter | Array&lt;[TableColumn](table-view.md#table-column)&gt; | Table columns to associate widths with.


### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
tableColumns | Getter | Array&lt;[TableColumn](table-view.md#table-column)&gt; | Table columns with associated widths.
changeTableColumnWidths | Action | ({ shifts: { [columnName: string]: number } }) => void | Changes column widths. Each shift is added to the original column width value.
changeDraftTableColumnWidths | Action | ({ shifts: { [columnName: string]: number } }) => void | Changes draft column widths. Each shift is added to the original column width value. If a shift is `null`, the draft width for the column will be cleaned.
