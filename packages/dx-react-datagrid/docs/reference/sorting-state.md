# SortingState Plugin Reference

Plugin that manages sorting state.

## User Reference

### Dependencies

none

### Properties

Name | Type | Default | Description
-----|------|---------|------------
sortings | array&lt;[Sorting](#sorting)&gt; | | Specifies sortings applied
defaultSortings | array&lt;[Sorting](#sorting)&gt; | | Specifies starting sortings for uncontrolled scenario
sortingsChange | (sortings: array&lt;[Sorting](#sorting)&gt;) => void | | Handles sortings change

## Data Structures

### Sorting

Describes applied sorting to column

Field | Type | Description
------|------|------------
column | string | Specifies column name to apply sorting
direction | 'asc'&#124;'desc' | Specifies value with that rows will be sorted

## Plugin Developer Reference

### Imports

none

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
sortings | Getter | () => array&lt;[Sorting](#sorting)&gt; | Applied column sortings
setColumnSorting | Action | ({ columnName: string, direction: 'asc'&#124;'desc', keepOther: boolean }) => void | Change sorting for column

