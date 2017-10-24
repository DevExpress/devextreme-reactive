# SortingState Plugin Reference

A plugin that manages the sorting state. It controls the list of columns that participate in sorting.

## User Reference

### Dependencies

none

### Properties

Name | Type | Default | Description
-----|------|---------|------------
sorting | Array&lt;[Sorting](#sorting)&gt; | | Specifies the applied sorting.
defaultSorting | Array&lt;[Sorting](#sorting)&gt; | [] | Specifies initial sorting in the uncontrolled mode.
onSortingChange | (sorting: Array&lt;[Sorting](#sorting)&gt;) => void | | Handles sorting changes.

## Interfaces

### Sorting

Describes the sorting applied to a column

A value with the following shape:

Field | Type | Description
------|------|------------
columnName | string | Specifies a column's name to which the sorting is applied.
direction | 'asc' &#124; 'desc' | Specifies a column's sort order.

## Plugin Developer Reference

### Imports

none

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
sorting | Getter | Array&lt;[Sorting](#sorting)&gt; | Applied column sorting.
setColumnSorting | Action | ({ columnName: string, direction: 'asc' &#124; 'desc', keepOther: boolean | Array&lt;String&gt;, cancel: boolean }) => void | Changes a column's sort direction. `keepOther` accepts `true` (keeps existing sorting), a column name array (keeps sorting by specified columns) and `false` (resets sorting). Set `cancel` to `true` to cancel sorting by the current column.
