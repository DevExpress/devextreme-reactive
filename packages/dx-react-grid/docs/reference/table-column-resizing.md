# TableColumnResizing Plugin Reference

A plugin that manages table column widths.

## User Reference

### Dependencies

- [Table](table.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
columnWidths? | Array&lt;[TableColumnWidthInfo](#tablecolumnwidthinfo)&gt; | | Specifies column widths.
defaultColumnWidths? | Array&lt;[TableColumnWidthInfo](#tablecolumnwidthinfo)&gt; | [] | Specifies initial column widths in uncontrolled mode.
onColumnWidthsChange? | (nextColumnWidths: { [columnName: string]: number }) => void | | Handles column width changes.

## Interfaces

### TableColumnWidthInfo

Describes an object that specifies a column width.

Field | Type | Description
------|------|------------
columnName | string | A column name.
width | number | A column width.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
tableColumns | Getter | Array&lt;[TableColumn](table.md#tablecolumn)&gt; | Table columns whose width the plugin manages.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
tableColumns | Getter | Array&lt;[TableColumn](table.md#tablecolumn)&gt; | Table columns with new width values applied.
tableColumnResizingEnabled | Getter | boolean | Specifies whether table column resizing is enabled.
changeTableColumnWidth | Action | ({ columnName: string, shift: number }) => void | Changes the specified column width. The column width is increased by the corresponding shift value, or decreased if the value is negative.
draftTableColumnWidth | Action | ({ columnName: string, shift: number }) => void | Changes the specified column width used for preview. The column width is increased by the corresponding shift value, or decreased if the value is less than zero.
cancelTableColumnWidthDraft | Action | () => void | Cancels changes to the column width used for preview.
