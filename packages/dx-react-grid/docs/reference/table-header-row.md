# TableHeaderRow Plugin Reference

A plugin that renders the table's header row. The [Column](#column-extension)'s `title` field specifies the column title in the header row.

The plugin also allows you to manage a column's sorting and grouping state and initiate column dragging.

## User Reference

### Dependencies

- [SortingState](sorting-state.md) [Optional]
- [GroupingState](grouping-state.md) [Optional]
- [DragDropContext](drag-drop-context.md) [Optional]
- [Table](table.md)
- [TableColumnResizing](table-column-resizing.md) [Optional]

### Properties

Name | Type | Default | Description
-----|------|---------|------------
cellComponent | ElementType&lt;[TableHeaderCellProps](#tableheadercellprops)&gt; | | A component that renders a header cell.
rowComponent | ElementType&lt;[TableRowProps](table.md#tablerowprops)&gt; | | A component that renders a header row.
allowSorting | boolean | false | Specifies whether a user can change the column's sorting state. Requires the [SortingState](sorting-state.md) dependency.
allowDragging | boolean | false | Specifies whether a user can drag a column by the header cell. Requires the [DragDropContext](drag-drop-context.md) dependency.
allowGroupingByClick | boolean | false | Specifies whether to render controls that toggle the column's grouping state. Requires the [GroupingState](grouping-state.md) dependency.
allowResizing | boolean | false | Specifies whether a user can resize columns. Requires the [TableColumnResizing](table-column-resizing.md) dependency.
messages | object | | An object that specifies [localization messages](#localization-messages).

## Interfaces

### Column (Extension)

A value with the [Column](grid.md#column) shape extended by the following fields:

Field | Type | Description
------|------|------------
title? | string | Specifies a table column's title.

### TableHeaderCellProps

Describes properties used to render a table header cell.

A value with the [TableCellProps](table.md#tablecellprops) shape extended by the following fields:

Field | Type | Description
------|------|------------
column | [Column](#column-extension) | A column object associated with the header cell.
allowSorting | boolean | Specifies whether a user can change the associated column's sorting state.
sortingDirection? | 'asc' &#124; 'desc' | Specifies the associated column's sorting direction.
onSort | ({ keepOther: boolean, cancel: boolean }) | An event that changes the associated column's sorting state. The `keepOther` and `cancel` arguments specify whether to keep existing sorting and cancel sorting by the associated column.
allowGroupingByClick | boolean | Specifies whether to render a control that toggles the associated column's grouping state.
onGroup | () => void | An event that invokes grouping by the associated column.
allowDragging | boolean | Specifies whether a user can drag a column by the header cell.
dragPayload | any | A data object that identifies the associated column in the drag-and-drop context.
onWidthChange | ({ shift: number }) => void | An event that initiates the column width changing. The initial column width increases by the `shift` value or decreases if `shift` is negative
onDraftWidthChange | ({ shift: number }) => void | An event that changes the column width used for preview. The initial column width increases by the `shift` value or decreases if `shift` is negative. Setting `shift` to `null` clears the column's draft width.
getMessage | ([messageKey](#localization-messages): string) => string | Returns the text displayed in a sorting control within the  header cell.

## Localization Messages

An object with the following shape:

Field | Type | Default | Description
------|------|---------|------------
sortingHint? | string | 'Sort' | Specifies the 'Sort' hint's text. Available in the "@devexpress/dx-react-grid-material-ui" package.

## Plugin Components

Name | Properties | Description
-----|------------|------------
TableHeaderRow.Row | [TableRowProps](table.md#tablerowprops) | A component that renders a header row.
TableHeaderRow.Cell | [TableHeaderCellProps](#tableheadercellprops) | A component that renders a header cell.

If you specify additional properties, they are added to the component's root element.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
tableHeaderRows | Getter | Array&lt;[TableRow](table.md#tablerow)&gt; | Header rows to be rendered.
sorting | Getter | Array&lt;[Sorting](sorting-state.md#sorting)&gt; | Columns' sorting state.
columns | Getter | Array&lt;[Column](#column-extension)&gt; | Table columns.
grouping | Getter | Array&lt;[Grouping](grouping-state.md#grouping)&gt; | Columns used for grouping.
setColumnSorting | Action | ({ columnName: string, direction: 'asc' &#124; 'desc', keepOther: boolean &#124; Array&lt;String&gt;, cancel: boolean }) => void | A function used to set column's sorting state. `keepOther` accepts `true` (keeps existing sorting), a column name array (keeps sorting by specified columns) and `false` (resets sorting). Set `cancel` to `true` to cancel sorting by the current column.
groupByColumn | Action | ({ columnName: string, groupIndex?: number }) => void | Groups a table by the specified column or cancels grouping. If `groupIndex` is omitted, the group is added to the end of the group list.
changeTableColumnWidths | Action | ({ shifts: { [columnName: string]: number } }) => void | Changes column widths. The initial column width increases by the `shift` value or decreases if `shift` is negative.
changeDraftTableColumnWidths | Action | ({ shifts: { [columnName: string]: number } }) => void | Changes column widths used for preview. The initial column width increases by the `shift` value or decreases if `shift` is negative. Setting `shift` to `null` clears the column's draft width.
tableCell | Template | [TableCellProps](table.md#tablecellprops) | A template that renders a table cell.
tableRow | Template | [TableRowProps](table.md#tablerowprops) | A template that renders a table row.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
tableHeaderRows | Getter | Array&lt;[TableRow](table.md#tablerow)&gt; | Table header rows.
