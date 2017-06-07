# TableHeaderRow Plugin Reference

A plugin that renders a simple table header that shows column titles. The `title` field in a column's definition specifies its title. See the extended data structure for a [Column](#column).

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
allowSorting | boolean | false | If true, allows an end-user to change sorting by a column
allowGrouping | boolean | false | If true, renders a component that toggles a column's grouping state
allowDragging | boolean | false | If true, allows an end-user to start dragging a column by the header cell

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
changeSortingDirection | ({ keepOther: boolean, cancel: boolean }) | Changes column sort direction. Keeps existing sorting if `keepOther` is set to `true`. Cancels sorting by the current column if `cancel` is set to true.
allowGrouping | boolean | If true, a component that toggles a column's grouping state is rendered
groupByColumn | () => void | Toggles grouping for a column
allowDragging | boolean | If true, an end-user can start dragging a column by the header cell
dragPayload | any | A data object that identifies the corresponding column in the drag-and-drop context

## Plugin Developer Reference

To be described...
