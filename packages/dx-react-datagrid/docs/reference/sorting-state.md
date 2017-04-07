# SortingState Plugin Reference

Plugin that manages sortings state.

Sorting data structure:

Field     | Type              | Description
----------|-------------------|----------------------------------------------
column    | string            | Specifies column name to apply sorting
direction | 'asc'&#124;'desc' | Specifies value with that rows will be sorted

Dependencies: none

Properties:

Property        | Type                                     | Default Value | Description
----------------|------------------------------------------|---------------|------------------------------------------------------
sortings        | array&lt;Sorting&gt;                     | undefined     | Specifies sortings applied
defaultSortings | array&lt;Sorting&gt;                     | undefined     | Specifies starting sortings for uncontrolled scenario
sortingsChange  | (sortings: array&lt;Sorting&gt;) => void | undefined     | Handles sortings change

Import: none

Exports:

Name             | Type   | Description
-----------------|--------|--------------------------
sortings         | Getter | Applied column sortings
setColumnSorting | Action | Change sorting for column

