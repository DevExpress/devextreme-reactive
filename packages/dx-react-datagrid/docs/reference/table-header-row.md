# TableHeaderRow Plugin Reference

A plugin that renders a simple table header that shows column titles. A column title is specified by the `title` field in a column definition. See the extended data structure for a [Column](#column).

Optionally, the plugin allows an end-user to manage a column's sorting and grouping state.

## User Reference

### Dependencies

- [SortingState](sorting-state.md) [Optional]
- [GroupingState](grouping-state.md) [Optional]
- [TableView](table-view.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
headerCellTemplate | Component&lt;[HeaderCellProps](#header-cell-props)&gt; | | A component that renders a header cell
allowSorting | boolean | false | If true, allows an end-user to change sorting by a column
allowGrouping | boolean | false | If true, renders a component that toggles a column's grouping state

## Interfaces

### Column

Describes properties used to render the table header row

Extends [Column](datagrid.md#column)

A value with the following shape:

Field | Type | Description
------|------|------------
title? | string | Specifies a table column title

### <a name="header-cell-props"></a>HeaderCellProps

Describes properties used to render a table header cell.

A value with the following shape:

Field | Type | Description
------|------|------------
allowSorting | boolean | If true, an end-user can change sorting by a column
allowGrouping | boolean | If true, a component that toggles a column's grouping state is rendered
sortingDirection? | 'asc' &#124; 'desc' | Specifies the column sort order
changeSortingDirection | ({ keepOther: boolean }) | Changes column sort direction. Keeps existing sorting if `keepOther` is set to `true`
groupByColumn | () => void | Toggles grouping for a column

## Plugin Developer Reference

To be described...
