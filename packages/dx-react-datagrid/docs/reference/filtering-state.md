# FilteringState Plugin Reference

Plugin that manages filtering state.

Filter data structure:

Field  | Type   | Description
-------|--------|------------------------------------------------
column | string | Specifies column name to apply filter
value  | string | Specifies value with that rows will be filtered

Dependencies: none

Properties:

Property      | Type                                   | Default Value | Description
--------------|----------------------------------------|---------------|-----------------------------------------------------
filters       | array&lt;Filter&gt;                    | undefined     | Specifies filters applied
defaultFilter | array&lt;Filter&gt;                    | undefined     | Specifies starting filters for uncontrolled scenario
filtersChange | (filters: array&lt;Filter&gt;) => void | undefined     | Handles filters change

Import: none

Exports:

Name            | Type   | Description
----------------|--------|-------------------------
filters         | Getter | Applied column filters
setColumnFilter | Action | Change filter for column

