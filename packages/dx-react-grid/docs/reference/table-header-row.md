# TableHeaderRow Plugin Reference

A plugin that renders a simple table header showing column titles. The `title` field in a column's definition specifies its title. See a [Column](#column)'s extended data structure.

The plugin also allows an end-user to manage a column's sorting and grouping state or initiate column dragging.

## User Reference

### Dependencies

- [SortingState](sorting-state.md) [Optional]
- [GroupingState](grouping-state.md) [Optional]
- [DragDropContext](drag-drop-context.md) [Optional]
- [TableView](table-view.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
headerCellTemplate | (args: [HeaderCellArgs](#header-cell-args)) => ReactElement | | A component that renders a header cell
allowSorting | boolean | false | If true, it allows an end-user to change sorting by a column
allowDragging | boolean | false | If true, it allows an end-user to drag a column by the header cell
allowGroupingByClick | boolean | false | If true, it renders a component that toggles a column's grouping state

## Interfaces

### Column

Describes properties used to render the table header row.

Extends [Column](grid.md#column)

A value with the following shape:

Field | Type | Description
------|------|------------
title? | string | Specifies a table column title

### <a name="header-cell-args"></a>HeaderCellArgs

Describes properties used to render a table header cell.

A value with the following shape:

Field | Type | Description
------|------|------------
allowSorting | boolean | If true, an end-user can change sorting by a column
sortingDirection? | 'asc' &#124; 'desc' | Specifies the column sort order
changeSortingDirection | ({ keepOther: boolean, cancel: boolean }) | Changes column sort direction. Keeps the existing sorting if `keepOther` is set to `true`. Cancels sorting by the current column if `cancel` is set to true.
allowGroupingByClick | boolean | If true, a component that toggles a column's grouping state is rendered
groupByColumn | () => void | Toggles grouping for a column
allowDragging | boolean | If true, an end-user can start dragging a column by the header cell
dragPayload | any | A data object that identifies the corresponding column in the drag-and-drop context

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
tableHeaderRows | Getter | Array&lt;[TableRow](table-view.md#table-row)&gt; | Header rows to be rendered
sorting | Getter | Array&lt;[Sorting](sorting-state.md#sorting)&gt; | Column sorting
columns | Getter | Array&lt;[Column](grid.md#column)&gt; | Table columns
grouping | Getter | Array&lt;[Grouping](grouping-state.md#grouping)&gt; | Columns used for grouping
setColumnSorting | Action | ({ columnName: string, direction: 'asc' &#124; 'desc', keepOther: boolean, cancel: boolean }) => void | Changes column sorting
groupByColumn | Action | ({ columnName: string, groupIndex?: number }) => void | Groups a table by the specified column or cancels grouping. If `groupIndex` is omitted, the group is added to the end of the group list.
tableViewCell | Template | { row: [TableRow](table-view.md#table-row), column: [TableColumn](table-view.md#table-column), style?: Object } | A template that renders a table cell

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
tableHeaderRows | Getter | Array&lt;[TableRow](table-view.md#table-row)&gt; | Table rows including header rows
