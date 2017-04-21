# SortingState Plugin Reference

A plugin that manages sorting state. It controls the list of columns that are used to sort the passed rows and their sort order.

## User Reference

### Dependencies

none

### Properties

Name | Type | Default | Description
-----|------|---------|------------
sortings | Array&lt;[Sorting](#sorting)&gt; | | Specifies the applied sortings
defaultSortings | Array&lt;[Sorting](#sorting)&gt; | | Specifies the initial sortings for the uncontrolled mode
sortingsChange | (sortings: Array&lt;[Sorting](#sorting)&gt;) => void | | Handles sorting changes

## Interfaces

### Sorting

Describes a sorting applied to a column

A value with the following shape:

Field | Type | Description
------|------|------------
column | string | Specifies a column name to which the sorting is applied
direction | 'asc' &#124; 'desc' | Specifies the sort order of a column

## Plugin Developer Reference

### Imports

none

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
sortings | Getter | () => Array&lt;[Sorting](#sorting)&gt; | Applied column sortings
setColumnSorting | Action | ({ columnName: string, direction: 'asc' &#124; 'desc', keepOther: boolean }) => void | Changes column sortings

