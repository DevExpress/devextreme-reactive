# TableHeaderRow Plugin Reference

A plugin that renders the table's header row. The [Column](grid.md#column)'s `title` field specifies the column title in the header row.

The plugin also allows you to manage a column's sorting and grouping state and initiate column dragging.

## User Reference

### Dependencies

- [SortingState](sorting-state.md) [Optional]
- [GroupingState](grouping-state.md) [Optional]
- [DragDropProvider](drag-drop-provider.md) [Optional]
- [Table](table.md)
- [TableColumnResizing](table-column-resizing.md) [Optional]

### Properties

Name | Type | Default | Description
-----|------|---------|------------
cellComponent | ElementType&lt;[TableHeaderCellProps](#tableheadercellprops)&gt; | | A component that renders a header cell.
rowComponent | ElementType&lt;[TableRowProps](table.md#tablerowprops)&gt; | | A component that renders a header row.
showSortingControls | boolean | false | Specifies whether to render controls that toggle the column's sorting state. Requires the [SortingState](sorting-state.md) dependency.
showGroupingControls | boolean | false | Specifies whether to display a button that groups data by column. Requires the [GroupingState](grouping-state.md) dependency.
messages | object | | An object that specifies [localization messages](#localization-messages).

## Interfaces

### TableHeaderCellProps

Describes properties used to render a table header cell.

A value with the [TableCellProps](table.md#tablecellprops) shape extended by the following fields:

Field | Type | Description
------|------|------------
column | [Column](grid.md#column) | A column object associated with a header cell.
showSortingControls | boolean | Specifies whether to render controls that toggle the column's sorting state.
sortingDirection? | 'asc' &#124; 'desc' | Specifies the associated column's sorting direction.
onSort | ({ direction?: 'asc' &#124; 'desc' &#124; null, keepOther?: boolean }) => void | An event that initiates changing the column sorting direction. Keeps the current sorting state if `keepOther` is set to true. Cancels sorting by the current column if `direction` is set to null.
showGroupingControls | boolean | Specifies whether to display a button that groups data by column.
onGroup | () => void | An event that invokes grouping by the associated column.
resizingEnabled | boolean | false | Specifies whether table column resizing is enabled.
onWidthChange | ({ shift: number }) => void | An event that initiates column width changing. The initial column width increases by the `shift` value or decreases if `shift` is negative.
onDraftWidthChange | ({ shift: number }) => void | An event that changes the column width used for preview. The initial column width increases by the `shift` value or decreases if `shift` is negative. Setting `shift` to `null` clears the column's draft width.
getMessage | ([messageKey](#localization-messages): string) => string | Returns the text displayed in a sorting control within the header cell.

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
tableColumns | Getter | Array&lt;[TableColumn](table.md#tablecolumn)&gt; | Table columns.
sorting | Getter | Array&lt;[Sorting](sorting-state.md#sorting)&gt; | Columns' sorting state.
setColumnSorting | Action | ({ columnName: string, direction?: 'asc' &#124; 'desc' &#124; null, keepOther?: boolean &#124; Array&lt;String&gt;, sortIndex?: number }) => void | Changes the column sorting direction. `keepOther` accepts `true` (keeps existing sorting), a column name array (keeps sorting by specified columns) and `false` (resets sorting). Set `direction` to `null` to cancel sorting by the current column. If `sortIndex` is omitted, the sorting is added to the end of the sorting list.
groupByColumn | Action | ({ columnName: string, groupIndex?: number }) => void | Groups a table by the specified column or cancels grouping. If `groupIndex` is omitted, the group is added to the end of the group list.
tableColumnResizingEnabled | Getter | boolean | Specifies whether table column resizing is enabled.
changeTableColumnWidths | Action | ({ shifts: { [columnName: string]: number } }) => void | Changes column widths. The initial column width increases by the `shift` value or decreases if `shift` is negative.
changeDraftTableColumnWidths | Action | ({ shifts: { [columnName: string]: number } }) => void | Changes column widths used for preview. The initial column width increases by the `shift` value or decreases if `shift` is negative. Setting `shift` to `null` clears the column's draft width.
draggingEnabled | Getter | boolean | Specifies whether drag-and-drop is enabled.
tableCell | Template | [TableCellProps](table.md#tablecellprops) | A template that renders a table cell.
tableRow | Template | [TableRowProps](table.md#tablerowprops) | A template that renders a table row.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
tableHeaderRows | Getter | Array&lt;[TableRow](table.md#tablerow)&gt; | Table header rows.
