# SortingState Plugin Reference

Plugin that manages sorting state. It controls the list of columns that are used to sort the passed rows by and their sort order.

## User Reference

### Dependencies

none

### Properties

Name | Type | Default | Description
-----|------|---------|------------
sortings | Array&lt;[Sorting](#sorting)&gt; | | Specifies the sortings applied
defaultSortings | Array&lt;[Sorting](#sorting)&gt; | | Specifies initial sortings for the the uncontrolled mode
sortingsChange | (sortings: Array&lt;[Sorting](#sorting)&gt;) => void | | Handles sortings change

## Interfaces

### Sorting

Describes a sorting apllied to a column

A value with the following shape:

Field | Type | Description
------|------|------------
column | string | Specifies a column name to apply the sorting by
direction | 'asc' &#124; 'desc' | Specifies the sort order for a column

## Plugin Developer Reference

### Imports

none

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
sortings | Getter | () => Array&lt;[Sorting](#sorting)&gt; | Applied column sortings
setColumnSorting | Action | ({ columnName: string, direction: 'asc' &#124; 'desc', keepOther: boolean }) => void | Change sorting for a column

