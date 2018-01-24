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
sortingEnabled | boolean | true | Specifies whether sorting is enabled for all columns.
columnExtensions | Array&lt;[SortingColumnExtension](#sortingcolumnextension)&gt; | | Additional column properties that the plugin can handle.
onSortingChange | (sorting: Array&lt;[Sorting](#sorting)&gt;) => void | | Handles sorting changes.

## Interfaces

### Sorting

Describes the sorting applied to a column

A value with the following shape:

Field | Type | Description
------|------|------------
columnName | string | Specifies a column's name to which the sorting is applied.
direction | 'asc' &#124; 'desc' | Specifies a column's sort order.

### SortingColumnExtension

Describes additional column properties that the plugin can handle.

A value with the following shape:

Field | Type | Description
------|------|------------
columnName | string | The name of a column to extend.
sortingEnabled | boolean | Specifies whether sorting is enabled for a column.

## Plugin Developer Reference

### Imports

none

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
sorting | Getter | Array&lt;[Sorting](#sorting)&gt; | Applied column sorting.
columnSortingEnabled | Getter | (columnName: string) => boolean | A function used to define if sorting by column is enabled.
changeColumnSorting | Action | ({ columnName: string, direction?: 'asc' &#124; 'desc' &#124; null, keepOther?: boolean &#124; Array&lt;String&gt;, sortIndex?: number }) => void | Changes the column sorting direction. `keepOther` accepts `true` (keeps existing sorting), a column name array (keeps sorting by specified columns) and `false` (resets sorting). Set `direction` to `null` to cancel sorting by the current column. If `sortIndex` is omitted, the sorting is added to the end of the sorting list.
