# TableHeaderRow Plugin Reference

A plugin that renders a simple table header showing column titles. The `title` field in a column's definition specifies its title. See a [Column](#column)'s extended data structure.

The plugin also allows an end-user to manage a column's sorting and grouping state or initiate column dragging.

## User Reference

### Dependencies

- [SortingState](sorting-state.md) [Optional]
- [GroupingState](grouping-state.md) [Optional]
- [DragDropContext](drag-drop-context.md) [Optional]
- [TableView](table-view.md)
- [TableColumnResizing](table-column-resizing.md) [Optional]

### Properties

Name | Type | Default | Description
-----|------|---------|------------
headerCellTemplate | (args: [HeaderCellArgs](#header-cell-args)) => ReactElement | | A component that renders a header cell.
headerRowTemplate | (args: [TableRowArgs](table-view.md#table-row-args)) => ReactElement | | A component that renders a header row.
allowSorting | boolean | false | If true, it allows an end-user to change sorting by a column. Requires the [SortingState](sorting-state.md) dependency.
allowDragging | boolean | false | If true, it allows an end-user to drag a column by the header cell. Requires the [DragDropContext](drag-drop-context.md) dependency.
allowGroupingByClick | boolean | false | If true, it renders a component that toggles a column's grouping state. Requires the [GroupingState](grouping-state.md) dependency.
allowResizing | boolean | false | If true, it allows an end-user to change a column width. Requires the [TableColumnResizing](table-column-resizing.md) dependency.
messages | object | | An object that specifies [localization messages](#localization-messages).

## Interfaces

### <a name="column"></a>Column (Extension)

A value with the [Column](grid.md#column) shape extended by the following fields:

Field | Type | Description
------|------|------------
title? | string | Specifies a table column's title.

### <a name="header-cell-args"></a>HeaderCellArgs

Describes properties used to render a table header cell.

A value with the [TableHeaderCell](../components/table-header-cell.md#properties) shape extended by the following fields:

Field | Type | Description
------|------|------------
tableRow | [TableRow](table-view.md#table-row) | A table row.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
tableHeaderRows | Getter | Array&lt;[TableRow](table-view.md#table-row)&gt; | Header rows to be rendered.
sorting | Getter | Array&lt;[Sorting](sorting-state.md#sorting)&gt; | Column sorting.
columns | Getter | Array&lt;[Column](#column)&gt; | Table columns.
grouping | Getter | Array&lt;[Grouping](grouping-state.md#grouping)&gt; | Columns used for grouping.
setColumnSorting | Action | ({ columnName: string, direction: 'asc' &#124; 'desc', keepOther: boolean | Array&lt;String&gt;, cancel: boolean }) => void | Changes a column's sort direction. `keepOther` accepts `true` (keeps existing sorting), a column name array (keeps sorting by specified columns) and `false` (resets sorting). Set `cancel` to `true` to cancel sorting by the current column.
groupByColumn | Action | ({ columnName: string, groupIndex?: number }) => void | Groups a table by the specified column or cancels grouping. If `groupIndex` is omitted, the group is added to the end of the group list.
changeTableColumnWidths | Action | ({ shifts: { [columnName: string]: number } }) => void | Changes column widths. Each shift is added to the original column width value.
changeDraftTableColumnWidths | Action | ({ shifts: { [columnName: string]: number } }) => void | Changes draft column widths. Each shift is added to the original column width value. If a shift is `null`, the draft width for the column is cleared.
tableViewCell | Template | [TableCellArgs](table-view.md#table-cell-args) | A template that renders a table cell.
tableViewRow | Template | [TableRowArgs](table-view.md#table-row-args) | A template that renders a table row.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
tableHeaderRows | Getter | Array&lt;[TableRow](table-view.md#table-row)&gt; | Table rows including header rows.
